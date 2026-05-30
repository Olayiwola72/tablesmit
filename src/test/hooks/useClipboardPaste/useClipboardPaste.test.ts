import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MAX_COLS, MAX_ROWS } from '../../../config/table/tableDefaults/tableDefaults'
import { useClipboardPaste } from '../../../hooks/useClipboardPaste/useClipboardPaste'
import { parseClipboardContent } from '../../../services/clipboardParser'
import { buildHtmlTable, buildExcelHtml } from '../../../services/tableHtmlBuilder'
import type { CellData } from '../../../types/table/cell.types'

describe('useClipboardPaste', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns pasting false initially', () => {
    const setCells = vi.fn()
    const { result } = renderHook(() => useClipboardPaste(setCells))
    expect(result.current.pasting).toBe(false)
  })

  it('adds and removes paste event listener', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const setCells = vi.fn()

    const { unmount } = renderHook(() => useClipboardPaste(setCells))
    expect(addSpy).toHaveBeenCalledWith('paste', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('paste', expect.any(Function))
  })

  it('ignores paste inside contenteditable when clipboard has no HTML', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    })
    editable.dispatchEvent(event)
    expect(setCells).not.toHaveBeenCalled()
    document.body.removeChild(editable)
  })

  it('processes HTML table paste inside contenteditable', async () => {
    const setCells = vi.fn()
    vi.useFakeTimers()
    renderHook(() => useClipboardPaste(setCells))

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const data = new DataTransfer()
    const html = '<table><tr><td style="color:#111827">A</td></tr></table>'
    data.setData('text/html', html)

    editable.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
      cancelable: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(1)
    expect(cells[0]).toHaveLength(1)
    expect(cells[0][0].value).toBe('A')
    document.body.removeChild(editable)
    vi.useRealTimers()
  })

  it('ignores paste inside textarea', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    })
    textarea.dispatchEvent(event)
    expect(setCells).not.toHaveBeenCalled()
    document.body.removeChild(textarea)
  })

  it('ignores paste inside input', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const input = document.createElement('input')
    document.body.appendChild(input)

    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    })
    input.dispatchEvent(event)
    expect(setCells).not.toHaveBeenCalled()
    document.body.removeChild(input)
  })

  it('parses LaTeX tabular from plain text clipboard', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const latex = `\\begin{tabular}{|l|l|}
\\hline
Name & Age \\\\
\\hline
Alice & 30 \\\\
\\hline
\\end{tabular}`

    const data = new DataTransfer()
    data.setData('text/plain', latex)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells[0][0].value).toBe('Name')
    expect(cells[0][1].value).toBe('Age')
    expect(cells[1][0].value).toBe('Alice')
    expect(cells[1][1].value).toBe('30')
  })

  it('parses LaTeX tabular with \\textbf headers', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const latex = `\\begin{tabular}{|l|l|}
\\hline
\\textbf{Product} & \\textbf{Price} \\\\
\\hline
Widget & 9.99 \\\\
\\hline
\\end{tabular}`

    const data = new DataTransfer()
    data.setData('text/plain', latex)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells[0][0].value).toBe('Product')
    expect(cells[0][1].value).toBe('Price')
  })

  it('intercepts LaTeX paste inside contenteditable cell', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    // Create an editable cell inside the DOM
    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const latex = `\\begin{table}[h]
\\centering
\\caption{My Caption}
\\begin{tabular}{ll}
Name & Score \\\\
Alice & 95 \\\\
\\end{tabular}
\\end{table}`

    const data = new DataTransfer()
    data.setData('text/plain', latex)

    editable.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
      cancelable: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(2)
    expect(cells[0][0].value).toBe('Name')
    expect(cells[0][1].value).toBe('Score')
    expect(cells[1][0].value).toBe('Alice')
    expect(cells[1][1].value).toBe('95')

    document.body.removeChild(editable)
  })

  it('parses a Markdown table from plain text clipboard', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const md = [
      '| Product | Price | Qty |',
      '|---------|-------|-----|',
      '| Widget  | 9.99  | 5   |',
      '| Gadget  | 14.99 | 3   |',
    ].join('\n')

    const data = new DataTransfer()
    data.setData('text/plain', md)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(3)
    expect(cells[0]).toHaveLength(3)
    expect(cells[0][0].value).toBe('Product')
    expect(cells[0][1].value).toBe('Price')
    expect(cells[0][2].value).toBe('Qty')
    expect(cells[1][0].value).toBe('Widget')
    expect(cells[1][1].value).toBe('9.99')
    expect(cells[1][2].value).toBe('5')
    expect(cells[2][0].value).toBe('Gadget')
    expect(cells[2][1].value).toBe('14.99')
    expect(cells[2][2].value).toBe('3')
  })

  it('parses Markdown table with alignment colons', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const md = [
      '| Left | Center | Right |',
      '|:-----|:------:|------:|',
      '| A    | B      | C     |',
    ].join('\n')

    const data = new DataTransfer()
    data.setData('text/plain', md)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(2)
    expect(cells[0][0].value).toBe('Left')
    expect(cells[0][1].value).toBe('Center')
    expect(cells[0][2].value).toBe('Right')
    expect(cells[1][0].value).toBe('A')
  })

  it('falls through to TSV/CSV when Markdown has no pipe-separator line', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    data.setData('text/plain', 'just some text without a table')

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    expect(setCells).not.toHaveBeenCalled()
  })

  it('falls through to TSV/CSV when LaTeX is not tabular', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    data.setData('text/plain', 'plain text without latex')

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    expect(setCells).not.toHaveBeenCalled()
  })

  describe('parseClipboardContent — HTML parsing', () => {
    it('reads cell background-color from inline style', async () => {
      const html = '<table><tr><td style="background-color: #FEF2F2">Error</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.cellColors).toBeDefined()
      const cellId = Object.keys(result!.styles!.cellColors!)[0]
      expect(result!.styles!.cellColors![cellId]).toBe('#fef2f2')
    })

    it('reads cell color and text-align from inline style', async () => {
      const html = '<table><tr><td style="color: #DC2626; text-align: center">Red</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      const cellId = Object.keys(result!.styles!.cellTextColors ?? {})[0]
      expect(result!.styles!.cellTextColors![cellId]).toBe('#dc2626')
      expect(result!.styles!.cellTextAlign![cellId]).toBe('center')
    })

    it('reads caption from <caption> element', async () => {
      const html = '<table><caption>My Table</caption><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('My Table')
    })

    it('reads caption text color from <caption> inline style', async () => {
      const html = '<table><caption style="color: #1E40AF">Blue Caption</caption><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Blue Caption')
      expect(result!.styles?.captionTextColor).toBe('#1e40af')
    })

    it('reads caption italic from <caption> inline style', async () => {
      const html = '<table><caption style="font-style: italic">Italic Caption</caption><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Italic Caption')
      expect(result!.styles?.captionItalic).toBe(true)
    })

    it('reads caption bg from <caption> inline style', async () => {
      const html = '<table><caption style="background: #EFF6FF">Bg Caption</caption><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Bg Caption')
      expect(result!.styles?.captionBgColor).toBe('#eff6ff')
    })

    it('reads caption alignment from <caption> inline style', async () => {
      const html = '<table><caption style="text-align: right">Right Caption</caption><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Right Caption')
      expect(result!.styles?.captionAlignment).toBe('right')
    })

    it('reads header-color from data-header-color attribute', async () => {
      const html = '<table data-header-color="#B45309"><tr><th>H</th></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.headerColor).toBe('#B45309')
    })

    it('reads header-style from data-header-style attribute', async () => {
      const html = '<table data-header-style="first-column"><tr><th>H</th><td>D</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.headerStyle).toBe('first-column')
    })

    it('reads border-style and border-color from data-* attributes', async () => {
      const html = '<table data-border-style="dashed" data-border-color="#DC2626"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.borderStyle).toBe('dashed')
      expect(result!.styles?.borderColor).toBe('#DC2626')
    })

    it('reads theme from data-theme attribute', async () => {
      const html = '<table data-theme="striped"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.theme).toBe('striped')
    })

    it('reads content-color from data-content-color attribute', async () => {
      const html = '<table data-content-color="#059669"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.contentColor).toBe('#059669')
    })

    it('reads content-bg-color from data-content-bg-color attribute', async () => {
      const html = '<table data-content-bg-color="#ECFDF5"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.contentBgColor).toBe('#ECFDF5')
    })

    it('reads data-caption as fallback when no <caption> element', async () => {
      const html = '<table data-caption="Fallback Caption"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Fallback Caption')
    })

    it('reads data-caption-* style attributes', async () => {
      const html = '<table data-caption-color="#1E40AF" data-caption-bg="#EFF6FF" data-caption-align="left" data-caption-italic="true"><tr><td>A</td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.captionTextColor).toBe('#1E40AF')
      expect(result!.styles?.captionBgColor).toBe('#EFF6FF')
      expect(result!.styles?.captionAlignment).toBe('left')
      expect(result!.styles?.captionItalic).toBe(true)
    })

    it('skips <tr> with data-caption-row="true" attribute', async () => {
      const html = '<table data-caption="Q1 Performance"><tr data-caption-row="true"><td colspan="4">Q1 Performance</td></tr><tr><td>Jan</td><td>Feb</td><td>Mar</td><td></td></tr></table>'
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Q1 Performance')
      expect(result!.rows).toHaveLength(1)
      expect(result!.rows[0][0]).toBe('Jan')
    })
  })

  describe('Round-trip: buildHtmlTable → parseClipboardContent', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Name', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R0C1', value: 'Age', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
      [
        { id: 'R1C0', value: 'Alice', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R1C1', value: '30', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
    ]

    it('preserves cell values', async () => {
      const html = buildHtmlTable(cells)
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.rows[0][0]).toBe('Name')
      expect(result!.rows[1][0]).toBe('Alice')
    })

    it('preserves cell background colors', async () => {
      const cellColors = { 'R1C0': '#FEF2F2', 'R1C1': '#ECFDF5' }
      const html = buildHtmlTable(cells, undefined, undefined, cellColors)
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.cellColors?.['R1C0']).toBe('#fef2f2')
      expect(result!.styles?.cellColors?.['R1C1']).toBe('#ecfdf5')
    })

    it('preserves header color and style', async () => {
      const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, '#B45309', 'first-row')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.headerColor).toBe('#B45309')
      expect(result!.styles?.headerStyle).toBe('first-row')
    })

    it('preserves border style and color', async () => {
      const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'dashed', '#DC2626')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.borderStyle).toBe('dashed')
      expect(result!.styles?.borderColor).toBe('#DC2626')
    })

    it('preserves content color and bg', async () => {
      const html = buildHtmlTable(cells, undefined, undefined, undefined, undefined, undefined, undefined, '#059669', '#ECFDF5')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.styles?.contentColor).toBe('#059669')
      expect(result!.styles?.contentBgColor).toBe('#ECFDF5')
    })

    it('preserves caption text', async () => {
      const html = buildHtmlTable(cells, 'My Table')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('My Table')
    })

    it('preserves caption styles', async () => {
      const html = buildHtmlTable(cells, 'Styled Caption', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '#1E40AF', '#EFF6FF', 'left', undefined, undefined, true)
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Styled Caption')
      expect(result!.styles?.captionTextColor).toBe('#1E40AF')
      expect(result!.styles?.captionBgColor).toBe('#EFF6FF')
      expect(result!.styles?.captionAlignment).toBe('left')
      expect(result!.styles?.captionItalic).toBe(true)
    })

    it('preserves all styles in a full round-trip', async () => {
      const cellColors = { 'R1C0': '#FEF2F2', 'R1C1': '#ECFDF5' }
      const cellTextAlign = { 'R0C0': 'center', 'R0C1': 'right' }
      const html = buildHtmlTable(
        cells, 'Full Test', undefined, cellColors, cellTextAlign,
        '#B45309', 'first-row', '#059669', '#ECFDF5',
        'dashed', '#DC2626', '#1E40AF', '#EFF6FF', 'left', undefined, undefined, true, 'striped',
      )
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Full Test')
      expect(result!.styles?.headerColor).toBe('#B45309')
      expect(result!.styles?.headerStyle).toBe('first-row')
      expect(result!.styles?.contentColor).toBe('#059669')
      expect(result!.styles?.contentBgColor).toBe('#ECFDF5')
      expect(result!.styles?.borderStyle).toBe('dashed')
      expect(result!.styles?.borderColor).toBe('#DC2626')
      expect(result!.styles?.theme).toBe('striped')
      expect(result!.styles?.captionTextColor).toBe('#1E40AF')
      expect(result!.styles?.captionBgColor).toBe('#EFF6FF')
      expect(result!.styles?.captionAlignment).toBe('left')
      expect(result!.styles?.captionItalic).toBe(true)
    })
  })

  describe('Round-trip: buildExcelHtml → parseClipboardContent (caption dedup)', () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: 'Name', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R0C1', value: 'Age', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
      [
        { id: 'R1C0', value: 'Alice', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R1C1', value: '30', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
    ]

    it('marks caption <tr> with data-caption-row in generated HTML', () => {
      const html = buildExcelHtml(cells, 'My Table')
      expect(html).toContain('data-caption-row="true"')
    })

    it('does not include caption <tr> data in pasted rows', async () => {
      const html = buildExcelHtml(cells, 'My Table')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('My Table')
      expect(result!.rows).toHaveLength(2)
      expect(result!.rows[0][0]).toBe('Name')
      expect(result!.rows[1][0]).toBe('Alice')
    })

    it('preserves caption and all data rows after round-trip', async () => {
      const html = buildExcelHtml(cells, 'Round Trip Caption', undefined, undefined, undefined, '#B45309', 'first-row', '#059669', '#ECFDF5')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      expect(result!.caption).toBe('Round Trip Caption')
      expect(result!.rows).toHaveLength(2)
      expect(result!.rows[0][0]).toBe('Name')
      expect(result!.rows[0][1]).toBe('Age')
      expect(result!.rows[1][0]).toBe('Alice')
      expect(result!.styles?.headerColor).toBe('#B45309')
      expect(result!.styles?.contentColor).toBe('#059669')
      expect(result!.styles?.contentBgColor).toBe('#ECFDF5')
    })

    it('does not leak caption text into the row data', async () => {
      const html = buildExcelHtml(cells, 'Caption')
      const result = await parseClipboardContent('', html)
      expect(result).not.toBeNull()
      for (let r = 0; r < result!.rows.length; r++) {
        for (let c = 0; c < result!.rows[r].length; c++) {
          expect(result!.rows[r][c]).not.toBe('Caption')
        }
      }
    })
  })

  it('handles CSV with quoted values containing commas', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const text = [
      'Q1 Performance,,,Target',
      'Jan,Feb,Mar,',
      '"$10,000","$12,000","$15,000","$50,000"',
      '"1,200","1,350","1,500","4,500"',
      '85%,90%,92%,90%',
    ].join('\n')

    const data = new DataTransfer()
    data.setData('text/plain', text)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0] as CellData[][]
    expect(cells).toHaveLength(5)
    expect(cells[0][0].value).toBe('Q1 Performance')
    expect(cells[0][3].value).toBe('Target')
    expect(cells[2][0].value).toBe('$10,000')
    expect(cells[2][1].value).toBe('$12,000')
    expect(cells[2][2].value).toBe('$15,000')
    expect(cells[2][3].value).toBe('$50,000')
    expect(cells[3][0].value).toBe('1,200')
    expect(cells[3][3].value).toBe('4,500')
  })

  it('clamps large clipboard tables before setting cells', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    const text = Array.from({ length: MAX_ROWS + 10 }, (_, row) =>
      Array.from({ length: MAX_COLS + 5 }, (_, col) => `${row}:${col}`).join('\t'),
    ).join('\n')
    data.setData('text/plain', text)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })
    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(MAX_ROWS)
    expect(cells[0]).toHaveLength(MAX_COLS)
  })
})
