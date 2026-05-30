import { LATEX_UNESCAPE_MAP } from '../../config/latex/latexConfig'

export interface LatexParseResult {
  rows: string[][]
  caption?: string
}

export function parseLatexTabular(latex: string): LatexParseResult {
  let text = latex

  // Strip Markdown code fence markers (```, ```latex, ```tex, etc.)
  text = text.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '')

  // Extract caption FIRST before any stripping
  let caption: string | undefined
  const captionMatch = text.match(/\\caption\s*\{([^}]*)\}/)
  if (captionMatch) {
    caption = captionMatch[1]!.trim()
  }

  // Strip outer table environment and common wrapper commands
  text = text
    // Strip \begin{table}, \begin{table*} and all options like [h], [tbp], etc.
    .replace(/\\begin\s*\{table\*?\}\s*(?:\[[^\]]*\]\s*)?/g, '')
    // Strip \end{table}, \end{table*}
    .replace(/\\end\s*\{table\*?\}\s*/g, '')
    // Strip \caption{...}
    .replace(/\\caption\s*\{[^}]*\}\s*/g, '')
    // Strip \label{...}, \ref{...}
    .replace(/\\label\s*\{[^}]*\}\s*/g, '')
    .replace(/\\ref\s*\{[^}]*\}\s*/g, '')
    // Strip alignment commands
    .replace(/\\centering\s*/g, '')
    .replace(/\\raggedleft\s*/g, '')
    .replace(/\\raggedright\s*/g, '')
    // Strip booktabs rules
    .replace(/\\toprule\s*/g, '')
    .replace(/\\midrule\s*/g, '')
    .replace(/\\bottomrule\s*/g, '')
    // Strip \hline (including doubled)
    .replace(/\\hline\s*/g, '')
    // Strip tabular begin/end
    .replace(/\\begin\s*\{tabular\*?\}\s*(?:\{[^}]*\}\s*)*/g, '')
    .replace(/\\end\s*\{tabular\*?\}\s*/g, '')
    // Strip \rowcolor, \columncolor, \cellcolor commands
    .replace(/\\rowcolor\s*\{[^}]*\}\s*/g, '')
    .replace(/\\columncolor\s*\{[^}]*\}\s*/g, '')
    .replace(/\\cellcolor\s*\{[^}]*\}\s*/g, '')
    // Strip \multirow and \multicolumn
    .replace(/\\multirow\s*\{[^}]*\}\s*\{[^}]*\}\s*\{([^}]*)\}\s*/g, '$1')
    .replace(/\\multicolumn\s*\{[^}]*\}\s*\{[^}]*\}\s*\{([^}]*)\}\s*/g, '$1')
    .trim()

  if (!text) return { rows: [], caption }

  text = unescapeLatex(text)
  text = text.replace(/\\textbf\{([^}]*)\}/g, '$1')

  const rows = text
    .split(/\\\\/)
    .map((r) => r.replace(/^\s*|\s*$/g, ''))
    .filter((r) => r.length > 0)

  const parsedRows = rows.map((row) => row.split('&').map((cell) => cell.trim()))

  return { rows: parsedRows, caption }
}

function unescapeLatex(text: string): string {
  let result = text
  for (const [escaped, char] of Object.entries(LATEX_UNESCAPE_MAP)) {
    result = result.replaceAll(escaped, char)
  }
  return result
}
