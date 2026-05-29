import { describe, expect, it } from 'vitest'
import { buildHtmlTable, buildExcelHtml } from '../../../services/tableHtmlBuilder/tableHtmlBuilder'
import { createCell } from '../../../utils/tableUtils/tableUtils'
import type { CellData } from '../../../types/table/cell.types'
import type { MergeRange } from '../../../utils/mergeUtils/mergeUtils.types'

function makeCells(rows: number, cols: number, values?: string[][]): CellData[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      const cell = createCell(r, c)
      if (values?.[r]?.[c]) cell.value = values[r][c]
      return cell
    }),
  )
}

function stripWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ')
}

describe('buildHtmlTable', () => {
  it('produces a <table> string', () => {
    const cells = makeCells(2, 2)
    const html = buildHtmlTable(cells)
    expect(html).toContain('<table')
    expect(html).toContain('</table>')
  })

  it('renders every cell value', () => {
    const cells = makeCells(2, 2, [['a', 'b'], ['c', 'd']])
    const html = buildHtmlTable(cells)
    expect(stripWhitespace(html)).toContain('>a<')
    expect(stripWhitespace(html)).toContain('>b<')
    expect(stripWhitespace(html)).toContain('>c<')
    expect(stripWhitespace(html)).toContain('>d<')
  })

  it('includes <caption> when provided', () => {
    const cells = makeCells(1, 1)
    const html = buildHtmlTable(cells, 'My Table')
    expect(html).toContain('<caption')
    expect(html).toContain('My Table')
  })

  it('sets data-header-color attribute when headerColor is provided', () => {
    const cells = makeCells(1, 1)
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, '#ff0000')
    expect(html).toContain('data-header-color="#ff0000"')
  })

  it('sets data-header-style attribute when headerStyle is provided', () => {
    const cells = makeCells(1, 1)
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, 'first-row')
    expect(html).toContain('data-header-style="first-row"')
  })

  it('sets data-border-style and data-border-color', () => {
    const cells = makeCells(1, 1)
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'dashed', '#DC2626')
    expect(html).toContain('data-border-style="dashed"')
    expect(html).toContain('data-border-color="#DC2626"')
  })

  it('sets data-content-color and data-content-bg-color', () => {
    const cells = makeCells(1, 1)
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, '#059669', '#ECFDF5')
    expect(html).toContain('data-content-color="#059669"')
    expect(html).toContain('data-content-bg-color="#ECFDF5"')
  })

  it('handles merged cells via colspan and rowspan', () => {
    const cells = makeCells(2, 2)
    const mergedRanges: MergeRange[] = [{ key: 'R0C0:R1C1', startRow: 0, startCol: 0, endRow: 1, endCol: 1 }]
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, mergedRanges)
    expect(html).toContain('colspan="2"')
    expect(html).toContain('rowspan="2"')
  })

  it('escapes HTML special characters', () => {
    const cells = makeCells(1, 1, [['<script>alert("xss")</script>']])
    const html = buildHtmlTable(cells)
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('sets per-cell background color', () => {
    const cells = makeCells(1, 2)
    const cellColors = { R0C0: '#ff0000' }
    const html = buildHtmlTable(cells, undefined, undefined, cellColors)
    expect(html).toContain('background-color: #ff0000')
  })

  it('sets per-cell text color', () => {
    const cells = makeCells(1, 2)
    const cellTextColors = { R0C1: '#00ff00' }
    const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, cellTextColors)
    expect(html).toContain('color: #00ff00')
  })

  it('skips hidden cells', () => {
    const cells = makeCells(1, 2)
    cells[0][1].isHidden = true
    const html = buildHtmlTable(cells)
    const stripped = stripWhitespace(html)
    expect(stripped).not.toContain('>R0C1<')
  })

  it('sets column widths when provided', () => {
    const cells = makeCells(1, 2)
    const columnWidths = [150, 200]
    const html = buildHtmlTable(cells, undefined, columnWidths)
    expect(stripWhitespace(html)).toContain('width: 150px')
    expect(stripWhitespace(html)).toContain('width: 200px')
  })
})

describe('buildExcelHtml', () => {
  it('wraps body in Excel HTML head and tail', () => {
    const cells = makeCells(1, 1)
    const html = buildExcelHtml(cells)
    expect(html).toContain('<!--[if gte mso 9]>')
    expect(html).toContain('</html>')
  })

  it('includes caption as <tr data-caption-row="true">', () => {
    const cells = makeCells(1, 2, [['a', 'b']])
    const html = buildExcelHtml(cells, 'My Caption')
    expect(html).toContain('data-caption-row="true"')
    expect(html).toContain('My Caption')
  })

  it('sets data-caption as fallback attribute when caption is provided', () => {
    const cells = makeCells(1, 1)
    const html = buildExcelHtml(cells, 'Fallback Caption')
    expect(html).toContain('data-caption="Fallback Caption"')
  })

  it('applies mso-specific background styles for header cells', () => {
    const cells = makeCells(1, 1)
    const html = buildExcelHtml(cells, undefined, undefined, undefined, undefined, '#1E40AF', 'first-row')
    expect(html).toContain('mso-backgroundcolor')
    expect(html).toContain('mso-pattern: auto none')
  })

  it('applies mso-specific border styles when border color is provided', () => {
    const cells = makeCells(1, 1)
    const html = buildExcelHtml(cells, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'solid', '#000000')
    expect(html).toContain('mso-border-alt')
  })

  it('skips hidden cells', () => {
    const cells = makeCells(1, 2)
    cells[0][1].isHidden = true
    const html = buildExcelHtml(cells)
    expect(html).not.toContain('R0C1')
  })

  it('sets per-cell background color', () => {
    const cells = makeCells(1, 1)
    const cellColors = { R0C0: '#ff0000' }
    const html = buildExcelHtml(cells, undefined, undefined, cellColors)
    expect(html).toContain('background-color: #ff0000')
    expect(html).toContain('mso-backgroundcolor: #ff0000')
  })

  it('preserves data-* attributes through the round-trip', () => {
    const cells = makeCells(1, 1)
    const html = buildExcelHtml(cells, undefined, undefined, undefined, undefined, '#B45309', 'first-row', '#059669', '#ECFDF5')
    expect(html).toContain('data-header-color="#B45309"')
    expect(html).toContain('data-header-style="first-row"')
    expect(html).toContain('data-content-color="#059669"')
    expect(html).toContain('data-content-bg-color="#ECFDF5"')
  })
})
