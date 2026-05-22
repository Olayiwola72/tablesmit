import type { CellData } from '../../types/table'

const LATEX_CHAR_MAP: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '_': '\\_',
  '%': '\\%',
  '&': '\\&',
  '#': '\\#',
  '$': '\\$',
}

function escapeLatex(value: string): string {
  return value.replace(/[\\{}~^_%&#$]/g, (match) => LATEX_CHAR_MAP[match])
}

export function cellsToLatex(cells: CellData[][], headerStyle?: string): string {
  if (!cells.length || !cells[0]!.length) return ''

  const cols = cells[0]!.length
  const colSpec = `|${'l|'.repeat(cols)}`

  const body = cells
    .map((row, rowIndex) => {
      const isHeader = headerStyle === 'first-row' && rowIndex === 0
      const cellsStr = row
        .filter((c) => !c.isHidden)
        .map((c) => {
          const val = c.value || ' '
          return isHeader ? `\\textbf{${escapeLatex(val)}}` : escapeLatex(val)
        })
        .join(' & ')

      return `${cellsStr} \\\\ \\hline`
    })
    .join('\n')

  return [
    `\\begin{tabular}{${colSpec}}`,
    `\\hline`,
    body,
    `\\end{tabular}`,
  ].join('\n')
}
