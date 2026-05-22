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
  return text
    .replace(/\\textbackslash\{\}/g, '\\')
    .replace(/\\textasciitilde\{\}/g, '~')
    .replace(/\\textasciicircum\{\}/g, '^')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    .replace(/\\_/g, '_')
    .replace(/\\%/g, '%')
    .replace(/\\&/g, '&')
    .replace(/\\#/g, '#')
    .replace(/\\\$/g, '$')
}
