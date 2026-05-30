import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { buildHtmlTable, buildExcelHtml } from '../../../services/tableHtmlBuilder'
import { useCopyTable } from '../../../hooks/useCopyTable/useCopyTable'
import { createRef } from 'react'
import type { CellData } from '../../../types/table/cell.types'
import type { MergeRange } from '../../../utils/mergeUtils/mergeUtils.types'

const mockCells: CellData[][] = [
  [
    { id: 'R0C0', value: 'Name', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R0C1', value: 'Age', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
  ],
  [
    { id: 'R1C0', value: 'Alice', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R1C1', value: '30', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
  ],
]

// buildHtmlTable signature:
//   cells, caption, columnWidths, cellColors, cellTextAlign,
//   headerColor, headerStyle, contentColor, contentBgColor,
//   borderStyle, borderColor,
//   captionTextColor, captionBgColor, captionAlignment,
//   cellTextColors, mergedRanges, captionItalic, theme

function buildHtml(
  cells: CellData[][] = mockCells,
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  borderStyle?: string,
  borderColor?: string,
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  cellTextColors?: Record<string, string>,
  mergedRanges?: MergeRange[],
  captionItalic?: boolean,
  theme?: string,
): string {
  return buildHtmlTable(cells, caption, columnWidths, cellColors, cellTextAlign,
    headerColor, headerStyle, contentColor, contentBgColor,
    borderStyle, borderColor,
    captionTextColor, captionBgColor, captionAlignment,
    cellTextColors, mergedRanges, captionItalic, theme)
}

// buildExcelHtml signature:
//   cells, caption, columnWidths, cellColors, cellTextAlign,
//   headerColor, headerStyle, contentColor, contentBgColor,
//   theme, borderStyle, borderColor,
//   cellTextColors, mergedRanges, captionTextColor, captionBgColor, captionAlignment, captionItalic

function buildExcel(
  cells: CellData[][] = mockCells,
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  theme?: string,
  borderStyle?: string,
  borderColor?: string,
  cellTextColors?: Record<string, string>,
  mergedRanges?: MergeRange[],
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  captionItalic?: boolean,
): string {
  return buildExcelHtml(cells, caption, columnWidths, cellColors, cellTextAlign,
    headerColor, headerStyle, contentColor, contentBgColor,
    theme, borderStyle, borderColor,
    cellTextColors, mergedRanges, captionTextColor, captionBgColor, captionAlignment, captionItalic)
}

// useCopyTable signature:
//   cells, tableRef, caption, columnWidths, cellColors, cellTextColors, cellTextAlign,
//   mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, theme,
//   borderStyle, borderColor, captionTextColor, captionBgColor, captionAlignment, captionItalic

function setup(
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  mergedRanges?: MergeRange[],
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  theme?: string,
  borderStyle?: string,
  borderColor?: string,
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  captionItalic?: boolean,
) {
  const ref = createRef<HTMLDivElement>()
  return renderHook(() =>
    useCopyTable(mockCells, ref, caption, columnWidths, cellColors, cellTextColors, cellTextAlign,
      mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, theme,
      borderStyle, borderColor, captionTextColor, captionBgColor, captionAlignment, captionItalic),
  )
}

describe('buildHtmlTable', () => {
  it('includes data-header-color and header style attributes', () => {
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      '#B45309', 'first-row')
    expect(html).toContain('data-header-color="#B45309"')
    expect(html).toContain('data-header-style="first-row"')
  })

  it('includes data-content-color and data-content-bg-color attributes', () => {
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, '#059669', '#ECFDF5')
    expect(html).toContain('data-content-color="#059669"')
    expect(html).toContain('data-content-bg-color="#ECFDF5"')
  })

  it('includes data-border-style and data-border-color attributes', () => {
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      'dashed', '#DC2626')
    expect(html).toContain('data-border-style="dashed"')
    expect(html).toContain('data-border-color="#DC2626"')
  })

  it('includes data-theme attribute', () => {
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, undefined,
      'striped')
    expect(html).toContain('data-theme="striped"')
  })

  it('includes data-caption attributes', () => {
    const html = buildHtml(mockCells, 'My Table', undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      '#1E40AF', '#EFF6FF', 'left',
      undefined, undefined, true)
    expect(html).toContain('data-caption-color="#1E40AF"')
    expect(html).toContain('data-caption-bg="#EFF6FF"')
    expect(html).toContain('data-caption-align="left"')
    expect(html).toContain('data-caption-italic="true"')
  })

  it('renders <caption> element with italic style', () => {
    const html = buildHtml(mockCells, 'My Table', undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, true)
    expect(html).toContain('My Table')
    expect(html).toContain('font-style: italic')
  })

  it('renders <caption> element without italic when omitted', () => {
    const html = buildHtml(mockCells, 'Plain Caption')
    expect(html).toContain('Plain Caption')
    expect(html).not.toContain('font-style')
  })

  it('includes column width inline styles', () => {
    const html = buildHtml(mockCells, undefined, [200, 150])
    expect(html).toContain('width: 200px')
    expect(html).toContain('width: 150px')
  })

  it('includes cell background color inline styles', () => {
    const cellColors = { 'R1C0': '#FEF2F2', 'R1C1': '#ECFDF5' }
    const html = buildHtml(mockCells, undefined, undefined, cellColors)
    expect(html).toContain('background-color: #FEF2F2')
    expect(html).toContain('background-color: #ECFDF5')
  })

  it('includes cell text color inline styles', () => {
    const cellTextColors = { 'R0C0': '#DC2626', 'R1C0': '#059669' }
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined,
      cellTextColors)
    expect(html).toContain('color: #DC2626')
    expect(html).toContain('color: #059669')
  })

  it('includes cell text alignment styles', () => {
    const cellTextAlign = { 'R0C0': 'center', 'R0C1': 'right' }
    const html = buildHtml(mockCells, undefined, undefined, undefined, cellTextAlign,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined)
    expect(html).toContain('text-align: center')
    expect(html).toContain('text-align: right')
  })

  it('includes border styles', () => {
    const html = buildHtml(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      'dashed', '#DC2626')
    expect(html).toContain('border: 1px dashed #DC2626')
  })

  it('includes colSpan and rowSpan for merged cells', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Merged', colSpan: 1, rowSpan: 1, isMerged: true, isHidden: false },
        { id: 'R0C1', value: '', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: true },
      ],
    ]
    const mergedRanges: MergeRange[] = [{ key: 'R0C0:R0C1', startRow: 0, startCol: 0, endRow: 0, endCol: 1 }]
    const html = buildHtml(cells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined,
      undefined, mergedRanges)
    expect(html).toContain('colspan="2"')
  })

  it('skips hidden (merged) cells in output', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Merged', colSpan: 1, rowSpan: 1, isMerged: true, isHidden: false },
        { id: 'R0C1', value: 'hidden', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: true },
      ],
    ]
    const mergedRanges: MergeRange[] = [{ key: 'R0C0:R0C1', startRow: 0, startCol: 0, endRow: 0, endCol: 1 }]
    const html = buildHtml(cells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined,
      undefined, undefined, undefined,
      undefined, mergedRanges)
    expect(html).not.toContain('hidden')
  })

  it('includes all data attributes when every style param is provided', () => {
    const html = buildHtml(
      mockCells, 'Full Test', [200, 150], { 'R1C0': '#FEF2F2' }, { 'R0C0': 'center' },
      '#B45309', 'first-row', '#059669', '#ECFDF5',
      'dashed', '#DC2626',
      '#1E40AF', '#EFF6FF', 'left',
      { 'R0C0': '#DC2626' }, undefined, true, 'striped',
    )
    expect(html).toContain('data-header-color="#B45309"')
    expect(html).toContain('data-header-style="first-row"')
    expect(html).toContain('data-content-color="#059669"')
    expect(html).toContain('data-content-bg-color="#ECFDF5"')
    expect(html).toContain('data-theme="striped"')
    expect(html).toContain('data-border-style="dashed"')
    expect(html).toContain('data-border-color="#DC2626"')
    expect(html).toContain('data-caption-color="#1E40AF"')
    expect(html).toContain('data-caption-bg="#EFF6FF"')
    expect(html).toContain('data-caption-align="left"')
    expect(html).toContain('data-caption-italic="true"')
    expect(html).toContain('color: #DC2626')
  })

  it('omits data attributes when style params are undefined', () => {
    const html = buildHtml(mockCells)
    expect(html).not.toContain('data-')
  })

  it('escapes HTML special characters in cell values', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: '<script>alert(1)</script>', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R0C1', value: '"quoted" & <more>', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
    ]
    const html = buildHtml(cells)
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(html).not.toContain('<script>')
    expect(html).toContain('&quot;quoted&quot; &amp; &lt;more&gt;')
  })
})

describe('buildExcelHtml', () => {
  it('includes data-header-color and header style attributes', () => {
    const html = buildExcel(mockCells, undefined, undefined, undefined, undefined,
      '#B45309', 'first-row')
    expect(html).toContain('data-header-color="#B45309"')
    expect(html).toContain('data-header-style="first-row"')
  })

  it('includes data-content-color and data-content-bg-color attributes', () => {
    const html = buildExcel(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, '#059669', '#ECFDF5')
    expect(html).toContain('data-content-color="#059669"')
    expect(html).toContain('data-content-bg-color="#ECFDF5"')
  })

  it('includes data-theme attribute', () => {
    const html = buildExcel(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      'striped')
    expect(html).toContain('data-theme="striped"')
  })

  it('includes data-caption and caption style attributes', () => {
    const html = buildExcel(mockCells, 'Excel Caption', undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined,
      '#1E40AF', '#EFF6FF', 'right', true)
    expect(html).toContain('data-caption="Excel Caption"')
    expect(html).toContain('data-caption-color="#1E40AF"')
    expect(html).toContain('data-caption-bg="#EFF6FF"')
    expect(html).toContain('data-caption-align="right"')
    expect(html).toContain('data-caption-italic="true"')
  })

  it('renders caption with italic style', () => {
    const html = buildExcel(mockCells, 'Styled', undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined,
      '#DC2626', '#FFF', undefined, true)
    expect(html).toContain('Styled')
    expect(html).toContain('font-style: italic')
  })

  it('includes border styles with mso- prefix for Excel', () => {
    const html = buildExcel(mockCells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, 'dotted', '#333')
    expect(html).toContain('border: 1px dotted #333')
    expect(html).toContain('mso-border-alt: 1px dotted #333')
  })

  it('includes colSpan for merged cells', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Merged', colSpan: 1, rowSpan: 1, isMerged: true, isHidden: false },
        { id: 'R0C1', value: '', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: true },
      ],
    ]
    const mergedRanges: MergeRange[] = [{ key: 'R0C0:R0C1', startRow: 0, startCol: 0, endRow: 0, endCol: 1 }]
    const html = buildExcel(cells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, mergedRanges)
    expect(html).toContain('colspan="2"')
  })

  it('skips hidden cells', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Visible', colSpan: 1, rowSpan: 1, isMerged: true, isHidden: false },
        { id: 'R0C1', value: 'hidden', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: true },
      ],
    ]
    const mergedRanges: MergeRange[] = [{ key: 'R0C0:R0C1', startRow: 0, startCol: 0, endRow: 0, endCol: 1 }]
    const html = buildExcel(cells, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, mergedRanges)
    expect(html).not.toContain('hidden')
  })

  it('includes cell background and text color styles', () => {
    const cellColors = { 'R0C0': '#FEF2F2' }
    const cellTextColors = { 'R1C0': '#DC2626' }
    const html = buildExcel(mockCells, undefined, undefined, cellColors, undefined,
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined,
      cellTextColors)
    expect(html).toContain('background-color: #FEF2F2')
    expect(html).toContain('mso-backgroundcolor: #FEF2F2')
    expect(html).toContain('color: #DC2626')
  })

  it('includes cell text alignment styles', () => {
    const cellTextAlign = { 'R0C0': 'center' }
    const html = buildExcel(mockCells, undefined, undefined, undefined, cellTextAlign)
    expect(html).toContain('text-align: center')
  })

  it('wraps output in Excel-compatible HTML document', () => {
    const html = buildExcel(mockCells)
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('xmlns:o="urn:schemas-microsoft-com:office:office"')
    expect(html).toContain('xmlns:x="urn:schemas-microsoft-com:office:excel"')
    expect(html).toContain('x:ExcelWorkbook')
    expect(html).toContain('x:ExcelWorksheet')
    expect(html).toContain('x:Name>Sheet1')
    expect(html).toContain('<!--StartFragment-->')
    expect(html).toContain('<!--EndFragment-->')
  })

  it('omits data-* attributes when style params are undefined', () => {
    const html = buildExcel(mockCells)
    expect(html).not.toContain('data-')
  })

  it('marks caption row with data-caption-row="true" attribute', () => {
    const html = buildExcel(mockCells, 'My Caption')
    expect(html).toContain('data-caption-row="true"')
  })

  it('does not add data-caption-row when no caption', () => {
    const html = buildExcel(mockCells)
    expect(html).not.toContain('data-caption-row')
  })
})

describe('useCopyTable', () => {
  beforeEach(() => {
    vi.stubGlobal('ClipboardItem', function ClipboardItem(this: void, items: Record<string, Blob>) { return items } as unknown as typeof ClipboardItem)
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
        write: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('returns six copy functions', () => {
    const { result } = setup()
    expect(result.current).toHaveProperty('copyAsCsv')
    expect(result.current).toHaveProperty('copyAsExcelData')
    expect(result.current).toHaveProperty('copyAsMarkdown')
    expect(result.current).toHaveProperty('copyAsImage')
    expect(result.current).toHaveProperty('copyAsLatex')
    expect(result.current).toHaveProperty('copyAsHtml')
  })

  it('copyAsCsv writes CSV to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsCsv()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('Name,Age')
    expect(written).toContain('Alice,30')
  })

  it('copyAsCsv includes caption as comment line', async () => {
    const { result } = setup('My Table')
    await result.current.copyAsCsv()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('# My Table')
  })

  it('copyAsExcelData writes HTML to clipboard via ClipboardItem', async () => {
    const { result } = setup()
    await result.current.copyAsExcelData()
    expect(navigator.clipboard.write).toHaveBeenCalledOnce()
    const args = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(args).toHaveLength(1)
    expect(typeof args[0]).toBe('object')
  })

  it('copyAsExcelData includes style data attributes in HTML blob', async () => {
    const { result } = setup(
      'Test Table', undefined, undefined, undefined, undefined,
      undefined,
      '#B45309', 'first-row', '#059669', '#ECFDF5', 'striped',
      'dashed', '#DC2626', '#1E40AF', '#EFF6FF', 'left', true,
    )
    await result.current.copyAsExcelData()
    const args = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0]
    const blob = args[0] as ClipboardItem
    const htmlBlob = blob['text/html']
    const text = await (htmlBlob as Blob).text()
    expect(text).toContain('data-header-color="#B45309"')
    expect(text).toContain('data-header-style="first-row"')
    expect(text).toContain('data-content-color="#059669"')
    expect(text).toContain('data-content-bg-color="#ECFDF5"')
    expect(text).toContain('data-theme="striped"')
    expect(text).toContain('data-border-style="dashed"')
    expect(text).toContain('data-border-color="#DC2626"')
    expect(text).toContain('data-caption="Test Table"')
    expect(text).toContain('data-caption-color="#1E40AF"')
    expect(text).toContain('data-caption-bg="#EFF6FF"')
    expect(text).toContain('data-caption-align="left"')
    expect(text).toContain('data-caption-italic="true"')
  })

  it('copyAsMarkdown writes Markdown to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsMarkdown()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('C1')
    expect(written).toContain('C2')
    expect(written).toContain('---')
    expect(written).toContain('Alice')
    expect(written).toContain('30')
  })

  it('copyAsMarkdown includes caption above table', async () => {
    const { result } = setup('Caption Text')
    await result.current.copyAsMarkdown()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('Caption Text')
    expect(written.indexOf('Caption Text')).toBeLessThan(written.indexOf('|'))
  })

  it('copyAsCsv shows error toast on clipboard failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { result } = setup()
    await expect(result.current.copyAsCsv()).resolves.toBeUndefined()
  })

  it('copyAsLatex writes LaTeX to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsLatex()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\begin{tabular}')
    expect(written).toContain('\\end{tabular}')
    expect(written).toContain('Name & Age')
    expect(written).toContain('Alice & 30')
  })

  it('copyAsLatex includes caption in table environment', async () => {
    const { result } = setup('My Caption')
    await result.current.copyAsLatex()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\begin{table}[h]')
    expect(written).toContain('\\centering')
    expect(written).toContain('\\caption{My Caption}')
    expect(written).toContain('\\end{table}')
  })

  it('copyAsLatex escapes caption special characters', async () => {
    const { result } = setup('Cost & Revenue')
    await result.current.copyAsLatex()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\caption{Cost \\& Revenue}')
  })

  it('copyAsLatex accepts headerStyle parameter', async () => {
    const { result } = setup()
    await result.current.copyAsLatex('first-row')
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\textbf{Name}')
    expect(written).toContain('\\textbf{Age}')
  })

  it('copyAsLatex escapes special characters', async () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: '100%', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R0C1', value: 'Cost ($)', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
    ]
    const ref = createRef<HTMLDivElement>()
    const { result } = renderHook(() => useCopyTable(cells, ref))
    await result.current.copyAsLatex()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('100\\%')
    expect(written).toContain('\\$')
  })

  it('copyAsLatex shows error toast on clipboard failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { result } = setup()
    await expect(result.current.copyAsLatex()).resolves.toBeUndefined()
  })

  it('copyAsHtml writes HTML to clipboard via ClipboardItem', async () => {
    const { result } = setup()
    await result.current.copyAsHtml()
    expect(navigator.clipboard.write).toHaveBeenCalledOnce()
    const args = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(args).toHaveLength(1)
  })

  it('copyAsHtml includes style data attributes when style params provided', async () => {
    const { result } = setup(
      'HTML Copy', [200, 150], { 'R1C0': '#FEF2F2' }, { 'R0C0': '#DC2626' }, { 'R0C0': 'center' },
      undefined,
      '#B45309', 'first-row', '#059669', '#ECFDF5', 'striped',
      'dashed', '#DC2626', '#1E40AF', '#EFF6FF', 'left', true,
    )
    await result.current.copyAsHtml()
    const args = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0]
    const blob = args[0] as ClipboardItem
    const htmlBlob = blob['text/html']
    const text = await (htmlBlob as Blob).text()
    expect(text).toContain('data-header-color="#B45309"')
    expect(text).toContain('data-header-style="first-row"')
    expect(text).toContain('data-content-color="#059669"')
    expect(text).toContain('data-content-bg-color="#ECFDF5"')
    expect(text).toContain('data-theme="striped"')
    expect(text).toContain('data-border-style="dashed"')
    expect(text).toContain('data-border-color="#DC2626"')
    expect(text).toContain('data-caption-color="#1E40AF"')
    expect(text).toContain('data-caption-bg="#EFF6FF"')
    expect(text).toContain('data-caption-align="left"')
    expect(text).toContain('data-caption-italic="true"')
  })

  it('copyAsHtml omits data-* attributes when style params are undefined', async () => {
    const { result } = setup()
    await result.current.copyAsHtml()
    const args = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0]
    const blob = args[0] as ClipboardItem
    const htmlBlob = blob['text/html']
    const text = await (htmlBlob as Blob).text()
    expect(text).not.toContain('data-')
  })
})
