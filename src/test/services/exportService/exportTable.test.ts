import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { exportTable } from '../../../services/exportService'
import type { CellData } from '../../../types/table/cell.types'

const mockDownloadUrl = vi.hoisted(() => vi.fn())
vi.mock('../../../services/exportService/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../services/exportService/utils')>()
  return { ...actual, downloadUrl: mockDownloadUrl }
})

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

vi.mock('../../../context/TableContext', () => ({ isHeaderCell: vi.fn() }))

function makeCell(value: string, overrides: Partial<CellData> = {}): CellData {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

function el(): HTMLElement {
  return document.createElement('div')
}

describe('exportTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    mockCanvas.toDataURL.mockReturnValue('data:image/png;base64,fakedata')
    mockPdfInstance.internal.pageSize.getWidth.mockReturnValue(595.28)
    mockPdfInstance.internal.pageSize.getHeight.mockReturnValue(841.89)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is a function', () => {
    expect(typeof exportTable).toBe('function')
  })

  it('dispatches to PDF strategy', async () => {
    await exportTable(el(), { format: 'pdf' })
    expect(mockHtml2canvas).toHaveBeenCalledOnce()
  })

  it('passes scale option to html2canvas for PDF', async () => {
    await exportTable(el(), { format: 'pdf', scale: 1 })
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ scale: 1 }),
    )
  })

  it('dispatches to PNG strategy', async () => {
    await exportTable(el(), { format: 'png' })
    expect(mockHtml2canvas).toHaveBeenCalledOnce()
  })

  it('passes scale option to html2canvas for PNG', async () => {
    await exportTable(el(), { format: 'png', scale: 2 })
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ scale: 2 }),
    )
  })

  it('dispatches to JPEG strategy', async () => {
    await exportTable(el(), { format: 'jpeg', quality: 0.8 })
    expect(mockHtml2canvas).toHaveBeenCalledOnce()
  })

  it('passes quality to canvas.toDataURL for JPEG', async () => {
    await exportTable(el(), { format: 'jpeg', quality: 0.7 })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.7)
  })

  it('dispatches to CSV strategy', async () => {
    await exportTable(el(), { format: 'csv', cells: [[makeCell('a')]] })
    expect(mockUnparse).toHaveBeenCalledOnce()
  })

  it('dispatches to Excel strategy', async () => {
    await exportTable(el(), { format: 'excel', cells: [[makeCell('a')]] })
    expect(mockDownloadUrl).toHaveBeenCalledOnce()
  })
})
