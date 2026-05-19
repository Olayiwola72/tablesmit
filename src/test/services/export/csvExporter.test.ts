import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { CSVExporter } from '../../../services/export/csvExporter'
import type { CellData } from '../../../types/table.types'

const mockUnparse = vi.hoisted(() => vi.fn(() => 'a,b,c\n1,2,3'))
vi.mock('papaparse', () => ({ unparse: mockUnparse }))

function makeCell(value: string, overrides: Partial<CellData> = {}): CellData {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

function el(): HTMLElement {
  return document.createElement('div')
}

describe('CSVExporter', () => {
  let mockAnchor: { href: string; download: string; click: ReturnType<typeof vi.fn> }
  let createElementSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    mockAnchor = { href: '', download: '', click: vi.fn() }
    const originalCreateElement = document.createElement.bind(document)
    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement
      return originalCreateElement(tag)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('export', () => {
    const sampleCells: CellData[][] = [
      [makeCell('Name'), makeCell('Age')],
      [makeCell('Alice'), makeCell('30')],
    ]

    it('passes cell values as 2D string array to unparse', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: sampleCells })
      expect(mockUnparse).toHaveBeenCalledWith([
        ['Name', 'Age'],
        ['Alice', '30'],
      ])
    })

    it('uses default filename tablesmit-table.csv when none provided', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('x')]] })
      expect(mockAnchor.download).toBe('tablesmit-table.csv')
    })

    it('uses custom filename with .csv extension', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('x')]], filename: 'my-report' })
      expect(mockAnchor.download).toBe('my-report.csv')
    })

    it('handles undefined cells gracefully', async () => {
      await new CSVExporter().export(el(), { format: 'csv' })
      expect(mockUnparse).toHaveBeenCalledWith([])
    })

    it('handles empty cells array', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [] })
      expect(mockUnparse).toHaveBeenCalledWith([])
    })

    it('includes all cells including hidden ones', async () => {
      const cells: CellData[][] = [
        [makeCell('visible'), makeCell('hidden', { isHidden: true })],
      ]
      await new CSVExporter().export(el(), { format: 'csv', cells })
      expect(mockUnparse).toHaveBeenCalledWith([['visible', 'hidden']])
    })

    it('creates an anchor element and calls click', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('test')]] })
      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(mockAnchor.click).toHaveBeenCalledOnce()
    })

    it('sets href and download on the anchor tag', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('data')]], filename: 'my-file' })
      expect(mockAnchor.href).toBe('blob:mock-url')
      expect(mockAnchor.download).toBe('my-file.csv')
    })

    it('creates a Blob for CSV export', async () => {
      const blobSpy = vi.spyOn(URL, 'createObjectURL')
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('hello')]] })
      expect(blobSpy).toHaveBeenCalledWith(expect.any(Blob))
    })
  })

  describe('sanitizeCsvValue', () => {
    it('prefixes = with single quote', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('=SUM(A1:A10)')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'=SUM(A1:A10)"]])
    })

    it('prefixes + with single quote', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('+123')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'+123"]])
    })

    it('prefixes - with single quote', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('-456')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'-456"]])
    })

    it('prefixes @ with single quote', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('@REF')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'@REF"]])
    })

    it('prefixes tab with single quote', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('\tindent')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'\tindent"]])
    })

    it('passes normal text through unchanged', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('Hello World')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['Hello World']])
    })

    it('passes numbers through unchanged', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('42'), makeCell('3.14')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['42', '3.14']])
    })

    it('passes empty strings through unchanged', async () => {
      await new CSVExporter().export(el(), { format: 'csv', cells: [[makeCell('')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['']])
    })

    it('handles mixed formula and normal values', async () => {
      const cells: CellData[][] = [
        [makeCell('Normal'), makeCell('=DANGER'), makeCell('Safe'), makeCell('+evil')],
      ]
      await new CSVExporter().export(el(), { format: 'csv', cells })
      expect(mockUnparse).toHaveBeenCalledWith([['Normal', "'=DANGER", 'Safe', "'+evil"]])
    })
  })
})
