import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { exportTable } from '../../services/exportService'
import type { CellData, MergeRange } from '../../types/table.types'

// ── Hoisted mocks ──────────────────────────────────────

const mockCanvas = vi.hoisted(() => ({
  toDataURL: vi.fn(() => 'data:image/png;base64,fakedata'),
  width: 800,
  height: 600,
}))

const mockHtml2canvas = vi.hoisted(() => vi.fn().mockResolvedValue(mockCanvas))
vi.mock('html2canvas', () => ({ default: mockHtml2canvas }))

const mockPdfInstance = vi.hoisted(() => ({
  internal: {
    pageSize: { getWidth: vi.fn(() => 595.28), getHeight: vi.fn(() => 841.89) },
  },
  addImage: vi.fn(),
  save: vi.fn(),
}))
const mockJspdf = vi.hoisted(() => {
  const spy = vi.fn().mockReturnValue(mockPdfInstance)
  return new Proxy(spy, {
    construct(target, args) {
      target(...args)
      return mockPdfInstance
    },
  })
})
vi.mock('jspdf', () => ({ default: mockJspdf }))

const mockUnparse = vi.hoisted(() => vi.fn(() => 'a,b,c\n1,2,3'))
vi.mock('papaparse', () => ({ unparse: mockUnparse }))

const mockWorksheet: Record<string, unknown> = vi.hoisted(() => ({}))
const mockWorkbook = vi.hoisted(() => ({ SheetNames: [], Sheets: {} }))
const mockUtils = vi.hoisted(() => ({
  aoa_to_sheet: vi.fn(() => mockWorksheet),
  encode_cell: vi.fn((addr: { r: number; c: number }) => `R${addr.r}C${addr.c}`),
  book_new: vi.fn(() => mockWorkbook),
  book_append_sheet: vi.fn(),
}))
const mockWriteFile = vi.hoisted(() => vi.fn())
vi.mock('@e965/xlsx', () => ({ utils: mockUtils, writeFile: mockWriteFile }))

const mockIsHeaderCell = vi.hoisted(() => vi.fn())
vi.mock('../../context/TableContext', () => ({ isHeaderCell: mockIsHeaderCell }))

// ── Helpers ─────────────────────────────────────────────

function makeCell(value: string, overrides: Partial<CellData> = {}): CellData {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

function el(): HTMLElement {
  return document.createElement('div')
}

// ── Tests ───────────────────────────────────────────────

describe('exportService', () => {
  let createElementSpy: ReturnType<typeof vi.spyOn>
  let mockAnchor: { href: string; download: string; click: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    mockCanvas.width = 800
    mockCanvas.height = 600
    mockCanvas.toDataURL.mockReturnValue('data:image/png;base64,fakedata')
    mockPdfInstance.internal.pageSize.getWidth.mockReturnValue(595.28)
    mockPdfInstance.internal.pageSize.getHeight.mockReturnValue(841.89)
    Object.getOwnPropertyNames(mockWorksheet).forEach(k => delete (mockWorksheet as Record<string, unknown>)[k])
    Object.getOwnPropertyNames(mockWorkbook).forEach(k => delete (mockWorkbook as Record<string, unknown>)[k])
    mockUtils.aoa_to_sheet = vi.fn(() => mockWorksheet)
    mockUtils.encode_cell = vi.fn((addr: { r: number; c: number }) => `R${addr.r}C${addr.c}`)
    mockUtils.book_new = vi.fn(() => mockWorkbook)
    mockUtils.book_append_sheet = vi.fn()
    mockIsHeaderCell.mockReset()
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

  // ── exportTable dispatch ──────────────────────────

  describe('exportTable', () => {
    it('is a function', () => {
      expect(typeof exportTable).toBe('function')
    })

    it('dispatches to PDF strategy', async () => {
      await exportTable(el(), { format: 'pdf' })
      expect(mockHtml2canvas).toHaveBeenCalledOnce()
    })

    it('dispatches to PNG strategy', async () => {
      await exportTable(el(), { format: 'png' })
      expect(mockHtml2canvas).toHaveBeenCalledOnce()
    })

    it('dispatches to JPEG strategy', async () => {
      await exportTable(el(), { format: 'jpeg', quality: 0.8 })
      expect(mockHtml2canvas).toHaveBeenCalledOnce()
    })

    it('dispatches to CSV strategy', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('a')]] })
      expect(mockUnparse).toHaveBeenCalledOnce()
    })

    it('dispatches to Excel strategy', async () => {
      await exportTable(el(), { format: 'excel', cells: [[makeCell('a')]] })
      expect(mockUtils.aoa_to_sheet).toHaveBeenCalledOnce()
    })
  })

  // ── sanitizeCsvValue (tested through CSV exporter) ──

  describe('sanitizeCsvValue', () => {
    it('prefixes = with single quote', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('=SUM(A1:A10)')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'=SUM(A1:A10)"]])
    })

    it('prefixes + with single quote', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('+123')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'+123"]])
    })

    it('prefixes - with single quote', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('-456')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'-456"]])
    })

    it('prefixes @ with single quote', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('@REF')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'@REF"]])
    })

    it('prefixes tab with single quote', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('\tindent')]] })
      expect(mockUnparse).toHaveBeenCalledWith([["'\tindent"]])
    })

    it('passes normal text through unchanged', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('Hello World')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['Hello World']])
    })

    it('passes numbers through unchanged', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('42'), makeCell('3.14')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['42', '3.14']])
    })

    it('passes empty strings through unchanged', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('')]] })
      expect(mockUnparse).toHaveBeenCalledWith([['']])
    })

    it('handles mixed formula and normal values', async () => {
      const cells: CellData[][] = [
        [makeCell('Normal'), makeCell('=DANGER'), makeCell('Safe'), makeCell('+evil')],
      ]
      await exportTable(el(), { format: 'csv', cells })
      expect(mockUnparse).toHaveBeenCalledWith([['Normal', "'=DANGER", 'Safe', "'+evil"]])
    })
  })

  // ── CSV exporter ──────────────────────────────────

  describe('CSV export', () => {
    const sampleCells: CellData[][] = [
      [makeCell('Name'), makeCell('Age')],
      [makeCell('Alice'), makeCell('30')],
    ]

    it('passes cell values as 2D string array to unparse', async () => {
      await exportTable(el(), { format: 'csv', cells: sampleCells })
      expect(mockUnparse).toHaveBeenCalledWith([
        ['Name', 'Age'],
        ['Alice', '30'],
      ])
    })

    it('uses default filename tablesmit-table.csv when none provided', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('x')]] })
      expect(mockAnchor.download).toBe('tablesmit-table.csv')
    })

    it('uses custom filename with .csv extension', async () => {
      await exportTable(el(), { format: 'csv', cells: [[makeCell('x')]], filename: 'my-report' })
      expect(mockAnchor.download).toBe('my-report.csv')
    })

    it('handles undefined cells gracefully', async () => {
      await exportTable(el(), { format: 'csv' })
      expect(mockUnparse).toHaveBeenCalledWith([])
    })

    it('handles empty cells array', async () => {
      await exportTable(el(), { format: 'csv', cells: [] })
      expect(mockUnparse).toHaveBeenCalledWith([])
    })

    it('includes all cells including hidden ones', async () => {
      const cells: CellData[][] = [
        [makeCell('visible'), makeCell('hidden', { isHidden: true })],
      ]
      await exportTable(el(), { format: 'csv', cells })
      expect(mockUnparse).toHaveBeenCalledWith([['visible', 'hidden']])
    })
  })

  // ── PDF exporter ──────────────────────────────────

  describe('PDF export', () => {
    it('calls html2canvas with correct options', async () => {
      const element = el()
      await exportTable(element, { format: 'pdf' })
      expect(mockHtml2canvas).toHaveBeenCalledWith(element, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
      })
    })

    it('creates jsPDF with landscape for wide canvas', async () => {
      mockCanvas.width = 1000
      mockCanvas.height = 600
      await exportTable(el(), { format: 'pdf' })
      expect(mockJspdf).toHaveBeenCalledWith({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      })
    })

    it('creates jsPDF with portrait for tall canvas', async () => {
      mockCanvas.width = 600
      mockCanvas.height = 1000
      await exportTable(el(), { format: 'pdf' })
      expect(mockJspdf).toHaveBeenCalledWith({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      })
    })

    it('creates jsPDF with portrait when canvas is square', async () => {
      mockCanvas.width = 800
      mockCanvas.height = 800
      await exportTable(el(), { format: 'pdf' })
      expect(mockJspdf).toHaveBeenCalledWith({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      })
    })

    it('adds image to pdf', async () => {
      await exportTable(el(), { format: 'pdf' })
      expect(mockPdfInstance.addImage).toHaveBeenCalled()
    })

    it('passes correct arguments to addImage', async () => {
      mockCanvas.width = 800
      mockCanvas.height = 600
      await exportTable(el(), { format: 'pdf' })
      expect(mockPdfInstance.addImage).toHaveBeenCalledWith(
        'data:image/png;base64,fakedata',
        'PNG',
        expect.any(Number),
        32,
        expect.any(Number),
        expect.any(Number),
      )
    })

    it('saves with default filename', async () => {
      await exportTable(el(), { format: 'pdf' })
      expect(mockPdfInstance.save).toHaveBeenCalledWith('tablesmit-table.pdf')
    })

    it('saves with custom filename', async () => {
      await exportTable(el(), { format: 'pdf', filename: 'my-document' })
      expect(mockPdfInstance.save).toHaveBeenCalledWith('my-document.pdf')
    })
  })

  // ── Image exporter (PNG / JPEG) ───────────────────

  describe('Image export', () => {
    it('PNG calls html2canvas with correct options', async () => {
      const element = el()
      await exportTable(element, { format: 'png' })
      expect(mockHtml2canvas).toHaveBeenCalledWith(element, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
      })
    })

    it('PNG uses image/png mime type with default quality', async () => {
      await exportTable(el(), { format: 'png' })
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png', 0.94)
    })

    it('JPEG uses image/jpeg mime type with custom quality', async () => {
      await exportTable(el(), { format: 'jpeg', quality: 0.5 })
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.5)
    })

    it('JPEG defaults quality to 0.94 when not provided', async () => {
      await exportTable(el(), { format: 'jpeg' })
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.94)
    })

    it('PNG uses default filename tablesmit-table.png', async () => {
      await exportTable(el(), { format: 'png' })
      expect(mockAnchor.download).toBe('tablesmit-table.png')
    })

    it('JPEG uses default filename tablesmit-table.jpeg', async () => {
      await exportTable(el(), { format: 'jpeg' })
      expect(mockAnchor.download).toBe('tablesmit-table.jpeg')
    })

    it('PNG sets href from canvas data URL', async () => {
      await exportTable(el(), { format: 'png' })
      expect(mockAnchor.href).toBe('data:image/png;base64,fakedata')
    })

    it('uses custom filename with correct extension for PNG', async () => {
      await exportTable(el(), { format: 'png', filename: 'chart' })
      expect(mockAnchor.download).toBe('chart.png')
    })

    it('uses custom filename with correct extension for JPEG', async () => {
      await exportTable(el(), { format: 'jpeg', filename: 'photo' })
      expect(mockAnchor.download).toBe('photo.jpeg')
    })
  })

  // ── Excel exporter ────────────────────────────────

  describe('Excel export', () => {
    const sampleCells: CellData[][] = [
      [makeCell('Product'), makeCell('Price')],
      [makeCell('Widget'), makeCell('9.99')],
      [makeCell('Gadget'), makeCell('24.99')],
    ]

    it('creates worksheet from cell values', async () => {
      await exportTable(el(), { format: 'excel', cells: sampleCells })
      expect(mockUtils.aoa_to_sheet).toHaveBeenCalledWith([
        ['Product', 'Price'],
        ['Widget', '9.99'],
        ['Gadget', '24.99'],
      ])
    })

    it('handles undefined cells gracefully', async () => {
      await exportTable(el(), { format: 'excel' })
      expect(mockUtils.aoa_to_sheet).toHaveBeenCalledWith([])
    })

    it('applies merged ranges to worksheet !merges', async () => {
      const merges: MergeRange[] = [
        { key: 'R0C0:R1C1', startRow: 0, startCol: 0, endRow: 1, endCol: 1 },
        { key: 'R2C0:R2C1', startRow: 2, startCol: 0, endRow: 2, endCol: 1 },
      ]
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('A')]],
        mergedRanges: merges,
      })
      expect(mockWorksheet['!merges']).toEqual([
        { s: { r: 0, c: 0 }, e: { r: 1, c: 1 } },
        { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
      ])
    })

    it('does not set !merges when mergedRanges is undefined', async () => {
      await exportTable(el(), { format: 'excel', cells: [[makeCell('A')]] })
      expect(mockWorksheet['!merges']).toBeUndefined()
    })

    it('does not set !merges when mergedRanges is empty', async () => {
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('A')]],
        mergedRanges: [],
      })
      expect(mockWorksheet['!merges']).toBeUndefined()
    })

    it('applies header-style formatting when headerStyle is first-row', async () => {
      mockIsHeaderCell.mockImplementation((_style: string, row: number) => row === 0)
      const cells: CellData[][] = [
        [makeCell('H1'), makeCell('H2')],
        [makeCell('D1'), makeCell('D2')],
      ]
      await exportTable(el(), {
        format: 'excel',
        cells,
        headerStyle: 'first-row',
      })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 0, c: 0 })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 0, c: 1 })
      expect(mockUtils.encode_cell).not.toHaveBeenCalledWith({ r: 1, c: 0 })
      expect(mockUtils.encode_cell).not.toHaveBeenCalledWith({ r: 1, c: 1 })
    })

    it('applies header-style formatting when headerStyle is first-column', async () => {
      mockIsHeaderCell.mockImplementation((_style: string, _row: number, col: number) => col === 0)
      const cells: CellData[][] = [
        [makeCell('H1'), makeCell('D1')],
        [makeCell('H2'), makeCell('D2')],
      ]
      await exportTable(el(), {
        format: 'excel',
        cells,
        headerStyle: 'first-column',
      })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 0, c: 0 })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 1, c: 0 })
      expect(mockUtils.encode_cell).not.toHaveBeenCalledWith({ r: 0, c: 1 })
      expect(mockUtils.encode_cell).not.toHaveBeenCalledWith({ r: 1, c: 1 })
    })

    it('applies header-style formatting when headerStyle is both', async () => {
      mockIsHeaderCell.mockImplementation(
        (_style: string, row: number, col: number) => row === 0 || col === 0,
      )
      const cells: CellData[][] = [
        [makeCell('H'), makeCell('H')],
        [makeCell('H'), makeCell('D')],
      ]
      await exportTable(el(), {
        format: 'excel',
        cells,
        headerStyle: 'both',
      })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 0, c: 0 })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 0, c: 1 })
      expect(mockUtils.encode_cell).toHaveBeenCalledWith({ r: 1, c: 0 })
      expect(mockUtils.encode_cell).not.toHaveBeenCalledWith({ r: 1, c: 1 })
    })

    it('does not call encode_cell when headerStyle is none', async () => {
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('A')]],
        headerStyle: 'none',
      })
      expect(mockUtils.encode_cell).not.toHaveBeenCalled()
    })

    it('does not call encode_cell when headerStyle is undefined', async () => {
      await exportTable(el(), { format: 'excel', cells: [[makeCell('A')]] })
      expect(mockUtils.encode_cell).not.toHaveBeenCalled()
    })

    it('ensures worksheet cell object exists for header cells', async () => {
      mockIsHeaderCell.mockReturnValue(true)
      const mockWorksheetLocal: Record<string, unknown> = {}
      const mockAoaToSheetLocal = vi.fn(() => mockWorksheetLocal)
      mockUtils.aoa_to_sheet = mockAoaToSheetLocal
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('Header')]],
        headerStyle: 'first-row',
      })
      expect(mockWorksheetLocal['R0C0']).toBeDefined()
    })

    it('preserves existing worksheet cell value when header cell already exists', async () => {
      mockIsHeaderCell.mockReturnValue(true)
      const mockWorksheetLocal: Record<string, { v: string }> = { 'R0C0': { v: 'Existing' } }
      const mockAoaToSheetLocal = vi.fn(() => mockWorksheetLocal)
      mockUtils.aoa_to_sheet = mockAoaToSheetLocal
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('Header')]],
        headerStyle: 'first-row',
      })
      expect(mockWorksheetLocal['R0C0']).toEqual({ v: 'Existing' })
    })

    it('creates workbook and appends sheet with brand name', async () => {
      await exportTable(el(), { format: 'excel', cells: [[makeCell('A')]] })
      expect(mockUtils.book_new).toHaveBeenCalledOnce()
      expect(mockUtils.book_append_sheet).toHaveBeenCalledWith(mockWorkbook, mockWorksheet, 'Tablesmit')
    })

    it('writes file with default filename', async () => {
      await exportTable(el(), { format: 'excel', cells: [[makeCell('A')]] })
      expect(mockWriteFile).toHaveBeenCalledWith(mockWorkbook, 'tablesmit-table.xlsx')
    })

    it('writes file with custom filename', async () => {
      await exportTable(el(), {
        format: 'excel',
        cells: [[makeCell('A')]],
        filename: 'data-export',
      })
      expect(mockWriteFile).toHaveBeenCalledWith(mockWorkbook, 'data-export.xlsx')
    })
  })

  // ── downloadUrl ──────────────────────────────────

  describe('downloadUrl', () => {
    it('creates an anchor element and calls click', async () => {
      await exportTable(el(), {
        format: 'csv',
        cells: [[makeCell('test')]],
        filename: 'output',
      })
      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(mockAnchor.click).toHaveBeenCalledOnce()
    })

    it('sets href and download on the anchor tag', async () => {
      await exportTable(el(), {
        format: 'csv',
        cells: [[makeCell('data')]],
        filename: 'my-file',
      })
      expect(mockAnchor.href).toBe('blob:mock-url')
      expect(mockAnchor.download).toBe('my-file.csv')
    })

    it('creates a Blob for CSV export', async () => {
      const blobSpy = vi.spyOn(URL, 'createObjectURL')
      await exportTable(el(), {
        format: 'csv',
        cells: [[makeCell('hello')]],
      })
      expect(blobSpy).toHaveBeenCalledWith(expect.any(Blob))
    })
  })
})
