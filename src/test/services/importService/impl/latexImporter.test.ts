import { describe, expect, it, vi } from 'vitest'

vi.mock('../../../../i18n/i18n', () => ({
  default: {
    t: (key: string, opts?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'errors.fileTooLarge': 'File too large. Maximum size is {{maxSize}}{{unitLabel}}.',
        'errors.importParseError': 'Could not read file. Check the format and try again.',
        'errors.notLatexFormat': 'This file doesn\'t appear to be a valid LaTeX file. The content should contain a \\begin{tabular} or \\begin{table} block.',
      }
      let msg = translations[key] ?? key
      if (opts) {
        for (const [k, v] of Object.entries(opts)) {
          msg = msg.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
        }
      }
      return msg
    },
    language: 'en',
    isInitialized: true,
    on: () => vi.fn(),
    changeLanguage: () => Promise.resolve(),
  },
}))

import { importLatex } from '../../../../services/importService'

const createFile = (content: string, name = 'table.tex', mime = 'text/plain'): File =>
  new File([content], name, { type: mime })

describe('importLatex', () => {
  it('parses a basic LaTeX tabular and returns cells with values', async () => {
    const tex = `\\begin{tabular}{ccc}
Name & Age & City \\\\
Alice & 30 & London \\\\
Bob & 25 & Paris \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(3)
    expect(result.cells[0][0].value).toBe('Name')
    expect(result.cells[1][0].value).toBe('Alice')
    expect(result.cells[2][2].value).toBe('Paris')
  })

  it('rejects files larger than 5MB', async () => {
    const large = new ArrayBuffer(6 * 1024 * 1024)
    const file = new File([large], 'large.tex', { type: 'text/plain' })
    await expect(importLatex(file)).rejects.toThrow('File too large')
  })

  it('rejects content without LaTeX table signature', async () => {
    const file = createFile('Hello, World', 'notes.tex')
    await expect(importLatex(file)).rejects.toThrow('doesn\'t appear to be a valid LaTeX file')
  })

  it('returns empty caption when no \\caption is present', async () => {
    const tex = `\\begin{tabular}{c}
Item \\\\
A \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.caption).toBeUndefined()
  })

  it('extracts caption from \\caption{}', async () => {
    const tex = `\\begin{table}[h]
\\centering
\\caption{Sample Data}
\\begin{tabular}{c}
Item \\\\
A \\\\
\\end{tabular}
\\end{table}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.caption).toBe('Sample Data')
  })

  it('detects \\textbf headers and sets headerStyle first-row', async () => {
    const tex = `\\begin{tabular}{ccc}
\\textbf{Name} & \\textbf{Age} & \\textbf{City} \\\\
Alice & 30 & London \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerStyle).toBe('first-row')
    expect(result.cells[0][0].value).toBe('Name')
    expect(result.cells[1][0].value).toBe('Alice')
  })

  it('sets headerStyle undefined when no \\textbf in first row', async () => {
    const tex = `\\begin{tabular}{c}
Item \\\\
A \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerStyle).toBeUndefined()
  })

  it('handles \\multicolumn merge detection', async () => {
    const tex = `\\begin{tabular}{ccc}
Span & B & C \\\\
\\multicolumn{2}{c}{Wide} & D \\\\
E & F & G \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(3)
    expect(result.cells[1][0].value).toBe('Wide')
    expect(result.cells[1][0].colSpan).toBe(2)
    expect(result.cells[1][0].isMerged).toBe(true)
    expect(result.cells[1][1].isHidden).toBe(true)
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBeGreaterThanOrEqual(1)
  })

  it('handles \\multirow merge detection', async () => {
    const tex = `\\begin{tabular}{cc}
\\multirow{2}{1em}{Two} & A \\\\
& B \\\\
C & D \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Two')
    expect(result.cells[0][0].rowSpan).toBeGreaterThanOrEqual(2)
    expect(result.cells[0][0].isMerged).toBe(true)
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBeGreaterThanOrEqual(1)
  })

  it('clamps rows to MAX_ROWS and cols to MAX_COLS', async () => {
    const rows = Array.from({ length: 60 }, (_, i) =>
      Array.from({ length: 25 }, (_, j) => `R${i}C${j}`).join(' & ')
    ).join(' \\\\\n')
    const tex = `\\begin{tabular}{${'c'.repeat(25)}}
${rows}
\\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.rows).toBeLessThanOrEqual(50)
    expect(result.cols).toBeLessThanOrEqual(20)
  })

  it('handles empty input gracefully', async () => {
    const tex = `\\begin{tabular}{c}
\\\\
\\end{tabular}`
    const file = createFile(tex)
    await expect(importLatex(file)).rejects.toThrow('Could not read file')
  })

  it('extracts captionBgColor from \\colorbox inside \\caption', async () => {
    const tex = `\\begin{table}[h]
\\centering
\\caption{\\colorbox[HTML]{be123c}{\\textcolor[HTML]{ffffff}{Data Table}}}
\\begin{tabular}{c}
Item \\\\
A \\\\
\\end{tabular}
\\end{table}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.caption).toBe('Data Table')
    expect(result.captionBgColor).toBe('#be123c')
    expect(result.captionTextColor).toBe('#ffffff')
  })

  it('sets headerColor from \\rowcolor[HTML] on first row', async () => {
    const tex = `\\begin{tabular}{ccc}
\\rowcolor[HTML]{1E40AF} \\textbf{Name} & \\textbf{Age} & \\textbf{City} \\\\
Alice & 30 & London \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerColor).toBe('#1E40AF')
    expect(result.cells[0][0].value).toBe('Name')
  })

  it('captures \\rowcolor[HTML] on non-header rows as rowColors', async () => {
    const tex = `\\begin{tabular}{ccc}
\\textbf{Name} & \\textbf{Age} & \\textbf{City} \\\\
\\rowcolor[HTML]{F3F4F6} Alice & 30 & London \\\\
Bob & 25 & Paris \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerColor).toBeUndefined()
    expect(result.rowColors).toBeDefined()
    expect(result.rowColors![1]).toBe('#F3F4F6')
    expect(result.rowColors![2]).toBeUndefined()
    expect(result.cells[1][0].value).toBe('Alice')
  })

  it('sets cell color from \\cellcolor[HTML] on a data cell', async () => {
    const tex = `\\begin{tabular}{ccc}
Name & Score & Rank \\\\
Alice & \\cellcolor[HTML]{FEF3C7} 78.4\\% & 1 \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.cellColors).toBeDefined()
    expect(result.cellColors!['R1C1']).toBe('#FEF3C7')
    expect(result.cells[1][1].value).toBe('78.4%')
  })

  it('sets cell color from \\colorbox[HTML] wrapping cell content', async () => {
    const tex = `\\begin{tabular}{cc}
Name & Role \\\\
\\colorbox[HTML]{DBEAFE}{Alice} & Admin \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.cellColors).toBeDefined()
    expect(result.cellColors!['R1C0']).toBe('#DBEAFE')
    expect(result.cells[1][0].value).toBe('Alice')
  })

  it('strips \\textcolor[HTML] from cell without setting a color', async () => {
    const tex = `\\begin{tabular}{c}
Status \\\\
\\textcolor[HTML]{DC2626}{Error} \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.cellColors).toBeUndefined()
    expect(result.cells[1][0].value).toBe('Error')
  })

  it('extracts caption style from nested \\colorbox in \\caption with three levels of nesting', async () => {
    const tex = `\\begin{table}[h]
\\caption{\\colorbox[HTML]{1E40AF}{\\textcolor[HTML]{FFFFFF}{Performance Results}}}
\\begin{tabular}{c}
Metric \\\\
Accuracy \\\\
\\end{tabular}
\\end{table}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.caption).toBe('Performance Results')
    expect(result.captionBgColor).toBe('#1E40AF')
    expect(result.captionTextColor).toBe('#FFFFFF')
    expect(result.cells[0][0].value).toBe('Metric')
  })

  it('extracts rowColors from \\rowcolor[HTML] on data rows (row 0 excluded)', async () => {
    const tex = `\\begin{tabular}{cc}
\\rowcolor[HTML]{1E40AF} \\textbf{Name} & \\textbf{Age} \\\\
\\rowcolor[HTML]{F3F4F6} Alice & 30 \\\\
\\rowcolor[HTML]{E5E7EB} Bob & 25 \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerColor).toBe('#1E40AF')
    expect(result.rowColors).toBeDefined()
    expect(result.rowColors![0]).toBeUndefined()
    expect(result.rowColors![1]).toBe('#F3F4F6')
    expect(result.rowColors![2]).toBe('#E5E7EB')
  })

  it('sets headerStyle first-row from \\rowcolor[HTML] on first row even without \\textbf', async () => {
    const tex = `\\begin{tabular}{cc}
\\rowcolor[HTML]{1E40AF} Name & Age \\\\
Alice & 30 \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerStyle).toBe('first-row')
    expect(result.headerColor).toBe('#1E40AF')
    expect(result.rowColors).toBeUndefined()
  })

  it('extracts columnColors from \\columncolor[HTML] in preamble', async () => {
    const tex = `\\begin{tabular}{>{\\columncolor[HTML]{F3F4F6}}c>{\\columncolor[HTML]{E5E7EB}}c}
\\textbf{Name} & \\textbf{Age} \\\\
Alice & 30 \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.columnColors).toBeDefined()
    expect(result.columnColors![0]).toBe('#F3F4F6')
    expect(result.columnColors![1]).toBe('#E5E7EB')
  })

  it('ignores named \\rowcolor without [HTML] specifier', async () => {
    const tex = `\\begin{tabular}{c}
\\rowcolor{gray} \\textbf{Title} \\\\
Data \\\\
\\end{tabular}`
    const file = createFile(tex)
    const result = await importLatex(file)
    expect(result.headerColor).toBeUndefined()
    expect(result.rowColors).toBeUndefined()
  })
})
