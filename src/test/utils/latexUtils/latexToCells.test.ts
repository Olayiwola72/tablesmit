import { describe, it, expect } from 'vitest'
import { parseLatexTabular } from '../../../utils/latexUtils'

describe('parseLatexTabular', () => {
  it('returns empty rows for empty string', () => {
    const result = parseLatexTabular('')
    expect(result.rows).toEqual([])
    expect(result.caption).toBeUndefined()
  })

  it('parses a basic tabular', () => {
    const latex = `\\begin{tabular}{|l|l|}
\\hline
Name & Age \\\\
\\hline
Alice & 30 \\\\
\\hline
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([
      ['Name', 'Age'],
      ['Alice', '30'],
    ])
    expect(result.caption).toBeUndefined()
  })

  it('strips \\textbf from header cells', () => {
    const latex = `\\begin{tabular}{|l|l|}
\\hline
\\textbf{Name} & \\textbf{Age} \\\\
\\hline
Alice & 30 \\\\
\\hline
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows[0]![0]).toBe('Name')
    expect(result.rows[0]![1]).toBe('Age')
  })

  it('handles tabular without hlines', () => {
    const latex = `\\begin{tabular}{ll}
A & B \\\\
C & D \\\\
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([
      ['A', 'B'],
      ['C', 'D'],
    ])
  })

  it('unescapes special characters', () => {
    const latex = `\\begin{tabular}{|l|}
\\hline
100\\% \\\\
\\hline
\\$10 \\\\
\\hline
a\\_b \\\\
\\hline
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([
      ['100%'],
      ['$10'],
      ['a_b'],
    ])
  })

  it('unescapes textbackslash', () => {
    const latex = `\\begin{tabular}{|l|}
\\hline
\\textbackslash{}section \\\\
\\hline
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows[0]![0]).toBe('\\section')
  })

  it('handles tabular* environment', () => {
    const latex = `\\begin{tabular*}{\\textwidth}{ll}
X & Y \\\\
\\end{tabular*}`

    expect(parseLatexTabular(latex).rows).toEqual([['X', 'Y']])
  })

  it('strips trailing whitespace from cells', () => {
    const latex = `\\begin{tabular}{l}
  spaced  \\\\
\\end{tabular}`

    expect(parseLatexTabular(latex).rows).toEqual([['spaced']])
  })

  it('handles multiple columns with varied data', () => {
    const latex = `\\begin{tabular}{|l|l|l|}
\\hline
Product & Qty & Price \\\\
\\hline
Widget & 5 & 9.99 \\\\
\\hline
Gadget & 3 & 14.99 \\\\
\\hline
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toHaveLength(3)
    expect(result.rows[0]).toEqual(['Product', 'Qty', 'Price'])
    expect(result.rows[1]).toEqual(['Widget', '5', '9.99'])
    expect(result.rows[2]).toEqual(['Gadget', '3', '14.99'])
  })

  it('handles double hlines', () => {
    const latex = `\\begin{tabular}{l}
\\hline\\hline
A \\\\
\\hline
\\end{tabular}`

    expect(parseLatexTabular(latex).rows).toEqual([['A']])
  })

  it('handles LaTeX with leading/trailing whitespace', () => {
    const latex = `  \\begin{tabular}{l}
A \\\\
\\end{tabular}  `

    expect(parseLatexTabular(latex).rows).toEqual([['A']])
  })

  // --- New tests for enhancements ---

  it('extracts caption from \\caption command', () => {
    const latex = `\\begin{table}[h]
\\centering
\\caption{My Results Table}
\\begin{tabular}{ll}
Name & Score \\\\
Alice & 95 \\\\
\\end{tabular}
\\end{table}`

    const result = parseLatexTabular(latex)
    expect(result.caption).toBe('My Results Table')
    expect(result.rows).toEqual([
      ['Name', 'Score'],
      ['Alice', '95'],
    ])
  })

  it('strips outer table environment and alignment commands', () => {
    const latex = `\\begin{table}[tbp]
\\centering
\\raggedright
\\begin{tabular}{l}
Cell A \\\\
\\end{tabular}
\\end{table}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([['Cell A']])
  })

  it('strips booktabs commands', () => {
    const latex = `\\begin{tabular}{ll}
\\toprule
Header1 & Header2 \\\\
\\midrule
Data1 & Data2 \\\\
\\bottomrule
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([
      ['Header1', 'Header2'],
      ['Data1', 'Data2'],
    ])
  })

  it('strips label and ref commands', () => {
    const latex = `\\begin{table}
\\caption{Data}
\\label{tab:data}
\\begin{tabular}{l}
\\hline
Value \\\\
\\hline
\\end{tabular}
\\ref{tab:data}
\\end{table}`

    const result = parseLatexTabular(latex)
    expect(result.caption).toBe('Data')
    expect(result.rows).toEqual([['Value']])
  })

  it('strips rowcolor, columncolor, cellcolor', () => {
    const latex = `\\begin{tabular}{l}
\\rowcolor{gray}
\\cellcolor{blue} Hi \\\\
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([['Hi']])
  })

  it('strips multirow and multicolumn', () => {
    const latex = `\\begin{tabular}{ll}
\\multirow{2}{*}{A} & B \\\\
\\multicolumn{2}{c}{C} \\\\
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([
      ['A', 'B'],
      ['C'],
    ])
  })

  it('handles table* environment (double column)', () => {
    const latex = `\\begin{table*}[t]
\\caption{Wide Table}
\\begin{tabular*}{\\textwidth}{ll}
X & Y \\\\
\\end{tabular*}
\\end{table*}`

    const result = parseLatexTabular(latex)
    expect(result.caption).toBe('Wide Table')
    expect(result.rows).toEqual([['X', 'Y']])
  })

  it('strips \\hline after caption stripping', () => {
    const latex = `\\begin{table}
\\caption{Test}
\\begin{tabular}{l}
\\hline
Data \\\\
\\hline
\\end{tabular}
\\end{table}`

    const result = parseLatexTabular(latex)
    expect(result.caption).toBe('Test')
    expect(result.rows).toEqual([['Data']])
  })

  it('returns caption undefined when no caption command', () => {
    const latex = `\\begin{tabular}{l}
A \\\\
\\end{tabular}`

    const result = parseLatexTabular(latex)
    expect(result.caption).toBeUndefined()
    expect(result.rows).toEqual([['A']])
  })

  it('returns empty rows for bare table environment with no tabular', () => {
    const latex = `\\begin{table}
\\centering
\\caption{Orphan caption}
\\end{table}`

    const result = parseLatexTabular(latex)
    expect(result.rows).toEqual([])
    expect(result.caption).toBe('Orphan caption')
  })
})
