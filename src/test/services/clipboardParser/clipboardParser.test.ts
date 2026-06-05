import { describe, expect, it, vi } from 'vitest'
import { parseClipboardContent, handlePasteData, setCopyBuffer, clearCopyBuffer, getCopyBuffer } from '../../../services/clipboardParser/clipboardParser'

describe('parseClipboardContent', () => {
  it('returns null for empty input', async () => {
    const result = await parseClipboardContent('', null)
    expect(result).toBeNull()
  })

  it('parses TSV from plain text', async () => {
    const result = await parseClipboardContent('a\tb\nc\td', null)
    expect(result?.rows).toEqual([['a', 'b'], ['c', 'd']])
    expect(result?.rowCount).toBe(2)
    expect(result?.colCount).toBe(2)
  })

  it('parses CSV from plain text', async () => {
    const result = await parseClipboardContent('a,b\nc,d', null)
    expect(result?.rows).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('parses CSV with quoted values containing commas', async () => {
    const result = await parseClipboardContent('"$10,000","$5,000"\n"$1,000","$500"', null)
    expect(result?.rows).toEqual([['$10,000', '$5,000'], ['$1,000', '$500']])
  })

  it('does not treat leading single-cell as caption — first row is data', async () => {
    const result = await parseClipboardContent('My Table\n\na\tb\nc\td', null)
    expect(result?.caption).toBeUndefined()
    expect(result?.rows).toEqual([['My Table'], ['a', 'b'], ['c', 'd']])
  })

  it('returns null for single-row single-column text', async () => {
    const result = await parseClipboardContent('hello', null)
    expect(result).toBeNull()
  })

  it('parses HTML table', async () => {
    const html = '<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.rows).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('reads caption from <caption> element', async () => {
    const html = '<table><caption>My Table</caption><tr><td>a</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.caption).toBe('My Table')
  })

  it('reads caption from data-caption attribute when no <caption>', async () => {
    const html = '<table data-caption="Fallback"><tr><td>a</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.caption).toBe('Fallback')
  })

  it('skips <tr data-caption-row="true">', async () => {
    const html = '<table><tr data-caption-row="true"><td>Caption</td></tr><tr><td>data</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.caption).toBeUndefined()
    expect(result?.rows).toEqual([['data']])
  })

  it('reads per-cell background colors from inline styles', async () => {
    const html = '<table><tr><td style="background-color: rgb(255, 0, 0)">red</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.styles?.cellColors).toEqual({ R0C0: '#ff0000' })
  })

  it('reads per-cell text color from inline styles', async () => {
    const html = '<table><tr><td style="color: rgb(0, 255, 0)">green</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.styles?.cellTextColors).toEqual({ R0C0: '#00ff00' })
  })

  it('reads per-cell text alignment', async () => {
    const html = '<table><tr><td style="text-align: center">center</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.styles?.cellTextAlign).toEqual({ R0C0: 'center' })
  })

  it('reads data-header-color from table attribute', async () => {
    const html = '<table data-header-color="#B45309"><tr><td>a</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result?.styles?.headerColor).toBe('#B45309')
  })

  it('returns null for text with only one row', async () => {
    const result = await parseClipboardContent('single row text', null)
    expect(result).toBeNull()
  })

  it('clamps rows to MAX_ROWS', async () => {
    const lines = Array.from({ length: 60 }, (_, i) => `row${i}\tval`)
    const result = await parseClipboardContent(lines.join('\n'), null)
    expect(result?.rowCount).toBeLessThanOrEqual(50)
  })

  it('clamps columns to MAX_COLS', async () => {
    const row = Array.from({ length: 30 }, (_, i) => `col${i}`).join('\t')
    const result = await parseClipboardContent(`${row}\n${row}`, null)
    expect(result?.colCount).toBeLessThanOrEqual(20)
  })

  it('parses LaTeX tabular from plain text', async () => {
    const latex = '\\begin{tabular}{ll}\\hline\\textbf{Name} & \\textbf{Age} \\\\ \\hline Alice & 30 \\\\ \\hline \\end{tabular}'
    const result = await parseClipboardContent(latex, null)
    expect(result).not.toBeNull()
    expect(result!.rows).toEqual([['Name', 'Age'], ['Alice', '30']])
    expect(result!.caption).toBeUndefined()
  })

  it('parses LaTeX with caption from plain text', async () => {
    const latex = '\\begin{table}[h]\\centering\\caption{Team Scores}\\begin{tabular}{ll}\\hline Player & Score \\\\ \\hline Alice & 95 \\\\ \\hline \\end{tabular}\\end{table}'
    const result = await parseClipboardContent(latex, null)
    expect(result).not.toBeNull()
    expect(result!.caption).toBe('Team Scores')
    expect(result!.rows).toEqual([['Player', 'Score'], ['Alice', '95']])
  })

  it('parses LaTeX with booktabs', async () => {
    const latex = '\\begin{tabular}{ll}\\toprule X & Y \\\\ \\midrule A & 1 \\\\ B & 2 \\\\ \\bottomrule \\end{tabular}'
    const result = await parseClipboardContent(latex, null)
    expect(result).not.toBeNull()
    expect(result!.rows).toEqual([['X', 'Y'], ['A', '1'], ['B', '2']])
  })

  it('returns null for plain text without LaTeX/CSV/TSV structure', async () => {
    const result = await parseClipboardContent('just some random text', null)
    expect(result).toBeNull()
  })

  it('strips Markdown code fence markers (```) from LaTeX before parsing', async () => {
    const latex = '```\n\\begin{tabular}{ll}\\hline a & b \\\\ \\hline c & d \\\\ \\hline \\end{tabular}\n```'
    const result = await parseClipboardContent(latex, null)
    expect(result?.rows).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('strips language-tagged code fence (```latex) from LaTeX before parsing', async () => {
    const latex = '```latex\n\\begin{tabular}{ll}\\hline Method & Accuracy \\\\ \\hline Test & 95\\% \\\\ \\hline \\end{tabular}\n```'
    const result = await parseClipboardContent(latex, null)
    expect(result?.rows).toEqual([['Method', 'Accuracy'], ['Test', '95%']])
  })

  it('still parses LaTeX without code fences after fence-stripping change', async () => {
    const latex = '\\begin{tabular}{ll}\\hline X & Y \\\\ \\hline 1 & 2 \\\\ \\hline \\end{tabular}'
    const result = await parseClipboardContent(latex, null)
    expect(result?.rows).toEqual([['X', 'Y'], ['1', '2']])
  })

  it('prefers LaTeX parser over HTML when both contain table data', async () => {
    const latex = '\\begin{tabular}{ll}\\hline Name & Age \\\\ \\hline Alice & 30 \\\\ \\hline \\end{tabular}'
    const html = '<table><tr><td>wrong</td><td>data</td></tr></table>'
    const result = await parseClipboardContent(latex, html)
    expect(result).not.toBeNull()
    expect(result!.rows).toEqual([['Name', 'Age'], ['Alice', '30']])
    expect(result!.caption).toBeUndefined()
  })

  it('preserves LaTeX caption when both LaTeX text and HTML table are present', async () => {
    const latex = '\\begin{table}[h]\\centering\\caption{My Caption}\\begin{tabular}{l}\\hline Data \\\\ \\hline \\end{tabular}\\end{table}'
    const html = '<table><caption>HTML Cap</caption><tr><td>wrong</td></tr></table>'
    const result = await parseClipboardContent(latex, html)
    expect(result).not.toBeNull()
    expect(result!.caption).toBe('My Caption')
    expect(result!.rows).toEqual([['Data']])
  })

  it('still parses HTML table when clipboard text has no LaTeX structure', async () => {
    const html = '<table><tr><td>a</td><td>b</td></tr></table>'
    const result = await parseClipboardContent('', html)
    expect(result).not.toBeNull()
    expect(result!.rows).toEqual([['a', 'b']])
  })
})

describe('handlePasteData', () => {
  it('calls setCells with normalized data', async () => {
    const setCells = vi.fn()
    const text = 'a\tb\nc\td'
    const result = await handlePasteData(text, null, setCells)
    expect(setCells).toHaveBeenCalledOnce()
    expect(setCells.mock.calls[0][0]).toHaveLength(2)
    expect(setCells.mock.calls[0][0][0]).toHaveLength(2)
    expect(result?.rowCount).toBe(2)
    expect(result?.colCount).toBe(2)
  })

  it('returns null when paste content is empty', async () => {
    const setCells = vi.fn()
    const result = await handlePasteData('', null, setCells)
    expect(result).toBeNull()
    expect(setCells).not.toHaveBeenCalled()
  })

  it('merges styles from copy buffer when TSV matches', async () => {
    const setCells = vi.fn()
    setCopyBuffer({ tsv: 'a\tb\nc\td', styles: { headerColor: '#ff0000' } })
    const result = await handlePasteData('a\tb\nc\td', null, setCells)
    expect(result?.styles?.headerColor).toBe('#ff0000')
  })

  it('clears copy buffer after paste', async () => {
    const setCells = vi.fn()
    setCopyBuffer({ tsv: 'a\tb', styles: {} })
    await handlePasteData('a\tb', null, setCells)
    expect(getCopyBuffer()).toBeNull()
  })
})

describe('setCopyBuffer / getCopyBuffer / clearCopyBuffer', () => {
  it('round-trips data through the buffer', () => {
    const data = { tsv: 'a\tb', styles: { headerColor: '#000' } }
    setCopyBuffer(data)
    expect(getCopyBuffer()).toEqual(data)
  })

  it('clears the buffer', () => {
    setCopyBuffer({ tsv: 'a', styles: {} })
    clearCopyBuffer()
    expect(getCopyBuffer()).toBeNull()
  })
})
