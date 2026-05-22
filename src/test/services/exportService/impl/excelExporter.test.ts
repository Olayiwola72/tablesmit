import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ExcelExporter } from '../../../../services/exportService/impl/excelExporter'
import { downloadUrl } from '../../../../services/exportService/utils'

vi.mock('../../../../services/exportService/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../services/exportService/utils')>()
  return { ...actual, downloadUrl: vi.fn() }
})

const mockIsHeaderCell = vi.hoisted(() => vi.fn())
vi.mock('../../../../context/TableContext', () => ({ isHeaderCell: mockIsHeaderCell }))

function el(): HTMLElement {
  return document.createElement('div')
}

function makeCell(value: string, overrides: Partial<Record<string, unknown>> = {}): { id: string; value: string; colSpan: number; rowSpan: number; isMerged: boolean; isHidden: boolean } {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

describe('ExcelExporter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsHeaderCell.mockReset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls downloadUrl with an xlsx filename', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('A')]] })
    expect(downloadUrl).toHaveBeenCalledOnce()
    const url = (downloadUrl as ReturnType<typeof vi.fn>).mock.calls[0][0]
    const filename = (downloadUrl as ReturnType<typeof vi.fn>).mock.calls[0][1]
    expect(filename).toBe('tablesmit-table.xlsx')
    expect(url).toContain('blob:')
  })

  it('uses custom filename when provided', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A')]],
      filename: 'my-export',
    })
    expect((downloadUrl as ReturnType<typeof vi.fn>).mock.calls[0][1]).toBe('my-export.xlsx')
  })

  it('applies caption alignment from options', async () => {
    mockIsHeaderCell.mockReturnValue(false)
    const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL')
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
      captionAlignment: 'right',
    })
    const blob = createObjectUrlSpy.mock.calls[0][0] as Blob
    const buffer = await blob.arrayBuffer()
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet(1)!
    const captionCell = worksheet.getCell(1, 1)
    expect(captionCell.alignment?.horizontal).toBe('right')
  })

  it('defaults caption alignment to center when not provided', async () => {
    mockIsHeaderCell.mockReturnValue(false)
    const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL')
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
    })
    const blob = createObjectUrlSpy.mock.calls[0][0] as Blob
    const buffer = await blob.arrayBuffer()
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet(1)!
    const captionCell = worksheet.getCell(1, 1)
    expect(captionCell.alignment?.horizontal).toBe('center')
  })

  it('produces a valid xlsx blob with content', async () => {
    await new ExcelExporter().export(el(), { format: 'excel', cells: [[makeCell('Hello')]] })
    const url = (downloadUrl as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(url).toContain('blob:')
    const blobUrl = url as string
    const response = await fetch(blobUrl)
    const buffer = await response.arrayBuffer()
    expect(buffer.byteLength).toBeGreaterThan(0)
  })

  it('handles undefined cells gracefully', async () => {
    await new ExcelExporter().export(el(), { format: 'excel' })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('writes caption into the xlsx', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('styles caption cell with text color', async () => {
    mockIsHeaderCell.mockReturnValue(false)
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
      captionTextColor: '#FF0000',
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('styles caption cell with background color', async () => {
    mockIsHeaderCell.mockReturnValue(false)
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
      captionBgColor: '#FFFF00',
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('styles caption cell with both text and background colors', async () => {
    mockIsHeaderCell.mockReturnValue(false)
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Data')]],
      caption: 'My Caption',
      captionTextColor: '#FF0000',
      captionBgColor: '#FFFF00',
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('applies styles from the styles option to produce a styled xlsx', async () => {
    mockIsHeaderCell.mockReturnValue(true)
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('Header')]],
      headerStyle: 'first-row',
      styles: {
        headerColor: '#1E40AF',
        headerTextColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        columnWidths: [140],
        altRowBg: '#F9FAFB',
        contentBgColor: '#FFFFFF',
        rowColors: [],
        columnColors: [],
        cellColors: {},
        columnTextAlign: ['left'],
        cellTextAlign: {},
        borderStyle: 'solid',
      },
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('applies merged ranges', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A'), makeCell('B')]],
      mergedRanges: [
        { key: 'R0C0:R0C1', startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      ],
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('applies cellColors background to individual cells', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A')], [makeCell('B')]],
      styles: {
        headerColor: '#1E40AF',
        headerTextColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        columnWidths: [],
        altRowBg: '#F9FAFB',
        contentBgColor: '#FFFFFF',
        rowColors: [],
        columnColors: [],
        cellColors: { R1C0: '#FF0000' },
        columnTextAlign: ['left'],
        cellTextAlign: {},
        borderStyle: 'solid',
      },
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('applies rowColors to all cells in a row', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A'), makeCell('B')]],
      styles: {
        headerColor: '#1E40AF',
        headerTextColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        columnWidths: [],
        altRowBg: '#F9FAFB',
        contentBgColor: '#FFFFFF',
        rowColors: ['#00FF00'],
        columnColors: [],
        cellColors: {},
        columnTextAlign: ['left', 'left'],
        cellTextAlign: {},
        borderStyle: 'solid',
      },
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })

  it('omits borders when borderStyle is none', async () => {
    await new ExcelExporter().export(el(), {
      format: 'excel',
      cells: [[makeCell('A')]],
      styles: {
        headerColor: '#1E40AF',
        headerTextColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        columnWidths: [],
        altRowBg: '#F9FAFB',
        contentBgColor: '#FFFFFF',
        rowColors: [],
        columnColors: [],
        cellColors: {},
        columnTextAlign: ['left'],
        cellTextAlign: {},
        borderStyle: 'none',
      },
    })
    expect(downloadUrl).toHaveBeenCalledOnce()
  })
})
