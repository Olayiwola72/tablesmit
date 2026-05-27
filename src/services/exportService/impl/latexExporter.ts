import type { ExportOptions, ExportStrategy, ExportStyleOptions } from '../export.types'
import { exportFileBaseName } from '../../../config/export/exportConfig'
import { downloadUrl, filenameWithExtension } from '../utils'
import { getEffectiveColSpan } from '../../../utils/mergeUtils/mergeUtils'

function escapeLatex(value: string): string {
  return value
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/&/g, '\\&')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/%/g, '\\%')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\|/g, '\\textbar{}')
    .replace(/</g, '\\textless{}')
    .replace(/>/g, '\\textgreater{}')
}

function colAlignment(
  colIndex: number,
  columnTextAlign: ExportStyleOptions['columnTextAlign'] | undefined,
): string {
  return columnTextAlign?.[colIndex] === 'center'
    ? 'c'
    : columnTextAlign?.[colIndex] === 'right'
      ? 'r'
      : 'l'
}

export class LatexExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const cells = options.cells ?? []
    const caption = options.caption?.trim()
    const borderStyle = options.styles?.borderStyle
    const hasBorders = borderStyle !== 'none'
    const headerStyle = options.headerStyle ?? 'none'
    const columnTextAlign = options.styles?.columnTextAlign

    if (cells.length === 0 || cells[0].length === 0) {
      const blob = new Blob(['% Empty table'], { type: 'text/plain;charset=utf-8' })
    downloadUrl(URL.createObjectURL(blob), filenameWithExtension(options.filename, exportFileBaseName, 'tex'))
      return
    }

    const colCount = cells[0].length

    // Column alignment string
    const sep = hasBorders ? '|' : ''
    const alignStr = Array.from({ length: colCount }, (_, i) => `${sep}${colAlignment(i, columnTextAlign)}`).join('') + (hasBorders ? '|' : '')

    const lines: string[] = []

    if (caption) {
      lines.push('\\begin{table}[htbp]')
      lines.push('\\centering')
      let captionBody = escapeLatex(caption)
      if (options.captionBgColor && options.captionTextColor) {
        captionBody = `\\colorbox[HTML]{${options.captionBgColor.slice(1)}}{\\textcolor[HTML]{${options.captionTextColor.slice(1)}}{${captionBody}}}`
      } else if (options.captionBgColor) {
        captionBody = `\\colorbox[HTML]{${options.captionBgColor.slice(1)}}{${captionBody}}`
      } else if (options.captionTextColor) {
        captionBody = `\\textcolor[HTML]{${options.captionTextColor.slice(1)}}{${captionBody}}`
      }
      lines.push(`\\caption{${captionBody}}`)
    }

    lines.push(`\\begin{tabular}{${alignStr}}`)

    const isHeader = (row: number, col: number, colSpan = 1): boolean => {
      if (headerStyle === 'both') return row === 0 || (col === 0 && colSpan === 1)
      if (headerStyle === 'first-row') return row === 0
      if (headerStyle === 'first-column') return col === 0 && colSpan === 1
      return false
    }

    for (let r = 0; r < cells.length; r++) {
      const row = cells[r]
      if (hasBorders) lines.push('\\hline')

      const rowParts: string[] = []
      let skipCols = 0

      for (let c = 0; c < row.length; c++) {
        const cell = row[c]

        // Cells covered by a \multicolumn from earlier in this row are skipped entirely
        if (skipCols > 0) {
          skipCols--
          continue
        }

        // Hidden cells NOT covered by a \multicolumn are rowspan carry-overs —
        // emit empty placeholder to keep column count aligned
        if (cell.isHidden) {
          rowParts.push('')
          continue
        }

        let value = escapeLatex(cell.value)

        const cs = getEffectiveColSpan(r, c, options.mergedRanges ?? [], cell.colSpan)
        if (isHeader(r, c, cs)) {
          value = `\\textbf{${value}}`
        }

        // Handle colspan — use \multicolumn when cell spans multiple columns
        if (cell.colSpan > 1) {
          const align = colAlignment(c, columnTextAlign)
          value = `\\multicolumn{${cell.colSpan}}{${hasBorders ? `|${align}|` : align}}{${value}}`
          skipCols = cell.colSpan - 1
        }

        // Handle rowspan — basic approximation with \multirow if available
        if (cell.rowSpan > 1) {
          value = `\\multirow{${cell.rowSpan}}{*}{${value}}`
        }

        rowParts.push(value)
      }

      lines.push(rowParts.join(' & ') + ' \\\\')
    }

    if (hasBorders) lines.push('\\hline')
    lines.push('\\end{tabular}')

    if (caption) {
      lines.push('\\end{table}')
    }

    const content = lines.join('\n')
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    downloadUrl(URL.createObjectURL(blob), filenameWithExtension(options.filename, exportFileBaseName, 'tex'))
  }
}
