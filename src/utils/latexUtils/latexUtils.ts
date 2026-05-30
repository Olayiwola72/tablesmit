import type { CellData } from '../../types/table/cell.types'
import { LATEX_ESCAPE_MAP, LATEX_COLUMN_ALIGN } from '../../config/latex/latexConfig'

export interface LatexOptions {
  columnColors?: string[]
  rowColors?: string[]
  headerColor?: string
  headerTextColor?: string
  columnTextAlign?: string[]
}

function escapeLatex(value: string): string {
  return value.replace(
    /[\\{}~^_%&#$]/g,
    (match) => LATEX_ESCAPE_MAP[match] ?? match,
  )
}

function colAlignment(colIndex: number, columnTextAlign?: string[]): string {
  const ta = columnTextAlign?.[colIndex]
  if (ta === 'center') return 'c'
  if (ta === 'right') return 'r'
  return LATEX_COLUMN_ALIGN
}

function getRowColor(rowIndex: number, isHeader: boolean, options?: LatexOptions): string | undefined {
  if (!options) return undefined
  if (isHeader && options.headerColor?.trim()) return options.headerColor
  if (!isHeader && options.rowColors?.[rowIndex]?.trim()) return options.rowColors[rowIndex]
  return undefined
}

export function cellsToLatex(cells: CellData[][], headerStyle?: string, caption?: string, options?: LatexOptions): string {
  if (!cells.length || !cells[0]!.length) return ''

  const cols = cells[0]!.length

  const colSpec = '|' + Array.from({ length: cols }, (_, i) => {
    const align = colAlignment(i, options?.columnTextAlign)
    const cc = options?.columnColors?.[i]?.trim()
    const prefix = cc ? `>{\\columncolor[HTML]{${cc.slice(1)}}}` : ''
    return `${prefix}${align}|`
  }).join('')

  const parts: string[] = []

  for (let r = 0; r < cells.length; r++) {
    const row = cells[r]
    const isHeader = headerStyle === 'first-row' && r === 0

    parts.push('\\hline')

    const rowColor = getRowColor(r, isHeader, options)
    if (rowColor && rowColor !== '#FFFFFF' && rowColor !== '#ffffff') {
      parts.push(`\\rowcolor[HTML]{${rowColor.slice(1)}}`)
    }

    const cellsStr = row
      .filter((c) => !c.isHidden)
      .map((c) => {
        const val = c.value || ' '
        let escaped = escapeLatex(val)
        if (isHeader) {
          if (options?.headerTextColor?.trim()) {
            escaped = `\\textcolor[HTML]{${options.headerTextColor.slice(1)}}{${escaped}}`
          }
          escaped = `\\textbf{${escaped}}`
        }
        return escaped
      })
      .join(' & ')

    parts.push(`${cellsStr} \\\\`)
  }

  parts.push('\\hline')

  const body = parts.join('\n')
  const tableCore = [
    `\\begin{tabular}{${colSpec}}`,
    body,
    `\\end{tabular}`,
  ].join('\n')

  if (caption) {
    return [
      `\\begin{table}[h]`,
      `\\centering`,
      `\\caption{${escapeLatex(caption)}}`,
      tableCore,
      `\\end{table}`,
    ].join('\n')
  }

  return tableCore
}
