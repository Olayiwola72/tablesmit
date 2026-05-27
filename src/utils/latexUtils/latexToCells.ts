import { LATEX_UNESCAPE_MAP } from '../../config/latex/latexConfig'

export function parseLatexTabular(latex: string): string[][] {
  let text = latex
    .replace(/\\begin\s*\{tabular\*?\}\s*(?:\{[^}]*\}\s*)*/g, '')
    .replace(/\\end\s*\{tabular\*?\}\s*/g, '')
    .replace(/\\hline\s*/g, '')
    .trim()

  if (!text) return []

  text = unescapeLatex(text)
  text = text.replace(/\\textbf\{([^}]*)\}/g, '$1')

  const rows = text
    .split(/\\\\/)
    .map((r) => r.replace(/^\s*|\s*$/g, ''))
    .filter((r) => r.length > 0)

  return rows.map((row) => row.split('&').map((cell) => cell.trim()))
}

function unescapeLatex(text: string): string {
  let result = text
  for (const [escaped, char] of Object.entries(LATEX_UNESCAPE_MAP)) {
    result = result.replaceAll(escaped, char)
  }
  return result
}
