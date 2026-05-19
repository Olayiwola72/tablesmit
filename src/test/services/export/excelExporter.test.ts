import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ExcelExporter } from '../../../services/export/excelExporter'
import type { CellData, MergeRange } from '../../../types/table.types'

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
vi.mock('../../../context/TableContext', () => ({ isHeaderCell: mockIsHeaderCell }))

function makeCell(value: string, overrides: Partial<CellData> = {}): CellData {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

function el(): HTMLElement {
  return document.createElement('div')
}

describe('ExcelExporter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.getOwnPropertyNames(mockWorksheet).forEach(k => delete (mockWorksheet as Record<string, unknown>)[k])
    Object.getOwnPropertyNames(mockWorkbook).forEach(k => delete (mockWorkbook as Record<string, unknown>)[k])
    mockUtils.aoa_to_sheet = vi.fn(() => mockWorksheet)
    mockUtils.encode_cell = vi.fn((addr: { r: number; c: number }) => `R${addr.r}C${addr.c}`)
    mockUtils.book_new = vi.fn(() => mockWorkbook)
    mockUtils.book_append_sheet = vi.fn()
    mockIsHeaderCell.mockReset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const sampleCells: CellData[][] = [
    [makeCell('Product'), makeCell('Price')],
    [makeCell('Widget'), makeCell('9.99')],
    [makeCell('Gadget'), makeCell('24.99')],
  ]

  it('creates worksheet from cell values', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: sampleCells })
    expect(mockUtils.aoa_to_sheet).toHaveBeenCalledWith([
      ['Product', 'Price'],
      ['Widget', '9.99'],
      ['Gadget', '24.99'],
    ])
  })

  it('handles undefined cells gracefully', async () => {
    await new ExcelExporter().export(el(), { format: 'excel' })
    expect(mockUtils.aoa_to_sheet).toHaveBeenCalledWith([])
  })

  it('applies merged ranges to worksheet !merges', async () => {
    const merges: MergeRange[] = [
      { key: 'R0C0:R1C1', startRow: 0, startCol: 0, endRow: 1, endCol: 1 },
      { key: 'R2C0:R2C1', startRow: 2, startCol: 0, endRow: 2, endCol: 1 },
    ]
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('A')]] })
    expect(mockWorksheet['!merges']).toBeUndefined()
  })

  it('does not set !merges when mergedRanges is empty', async () => {
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A')]],
      headerStyle: 'none',
    })
    expect(mockUtils.encode_cell).not.toHaveBeenCalled()
  })

  it('does not call encode_cell when headerStyle is undefined', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('A')]] })
    expect(mockUtils.encode_cell).not.toHaveBeenCalled()
  })

  it('ensures worksheet cell object exists for header cells', async () => {
    mockIsHeaderCell.mockReturnValue(true)
    const mockWorksheetLocal: Record<string, unknown> = {}
    const mockAoaToSheetLocal = vi.fn(() => mockWorksheetLocal)
    mockUtils.aoa_to_sheet = mockAoaToSheetLocal
    await new ExcelExporter().export(el(), {
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
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Header')]],
      headerStyle: 'first-row',
    })
    expect(mockWorksheetLocal['R0C0']).toEqual({ v: 'Existing' })
  })

  it('creates workbook and appends sheet with brand name', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('A')]] })
    expect(mockUtils.book_new).toHaveBeenCalledOnce()
    expect(mockUtils.book_append_sheet).toHaveBeenCalledWith(mockWorkbook, mockWorksheet, 'Tablesmit')
  })

  it('writes file with default filename', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('A')]] })
    expect(mockWriteFile).toHaveBeenCalledWith(mockWorkbook, 'tablesmit-table.xlsx')
  })

  it('writes file with custom filename', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A')]],
      filename: 'data-export',
    })
    expect(mockWriteFile).toHaveBeenCalledWith(mockWorkbook, 'data-export.xlsx')
  })
})
