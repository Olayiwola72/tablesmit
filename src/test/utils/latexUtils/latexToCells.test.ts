import { describe, it, expect } from 'vitest'
import { parseLatexTabular } from '../../../utils/latexUtils'

describe('parseLatexTabular', () => {
  it('returns empty array for empty string', () => {
    expect(parseLatexTabular('')).toEqual([])
  })

  it('parses a basic tabular', () => {
    const latex = `\\begin{tabular}{|l|l|}
\\hline
Name & Age \\\\
\\hline
Alice & 30 \\\\
\\hline
\\end{tabular}`

    expect(parseLatexTabular(latex)).toEqual([
      ['Name', 'Age'],
      ['Alice', '30'],
    ])
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
    expect(result[0]![0]).toBe('Name')
    expect(result[0]![1]).toBe('Age')
  })

  it('handles tabular without hlines', () => {
    const latex = `\\begin{tabular}{ll}
A & B \\\\
C & D \\\\
\\end{tabular}`

    expect(parseLatexTabular(latex)).toEqual([
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
    expect(result).toEqual([
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
    expect(result[0]![0]).toBe('\\section')
  })

  it('handles tabular* environment', () => {
    const latex = `\\begin{tabular*}{\\textwidth}{ll}
X & Y \\\\
\\end{tabular*}`

    expect(parseLatexTabular(latex)).toEqual([['X', 'Y']])
  })

  it('strips trailing whitespace from cells', () => {
    const latex = `\\begin{tabular}{l}
  spaced  \\\\
\\end{tabular}`

    expect(parseLatexTabular(latex)).toEqual([['spaced']])
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
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(['Product', 'Qty', 'Price'])
    expect(result[1]).toEqual(['Widget', '5', '9.99'])
    expect(result[2]).toEqual(['Gadget', '3', '14.99'])
  })

  it('handles double hlines', () => {
    const latex = `\\begin{tabular}{l}
\\hline\\hline
A \\\\
\\hline
\\end{tabular}`

    expect(parseLatexTabular(latex)).toEqual([['A']])
  })

  it('handles LaTeX with leading/trailing whitespace', () => {
    const latex = `  \\begin{tabular}{l}
A \\\\
\\end{tabular}  `

    expect(parseLatexTabular(latex)).toEqual([['A']])
  })
})
