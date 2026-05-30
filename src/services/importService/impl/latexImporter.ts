import type { ImportResult, ImportStrategy } from '../import.types'
import {
  assertFileSize,
  applyMergesToCells,
  normaliseRows,
  notLatexFormat,
  readError,
} from '../utils'
import { parseLatexTabularWithMerges } from '../../../utils/latexUtils'

export class LatexImporter implements ImportStrategy {
  async importFile(file: File): Promise<ImportResult> {
    assertFileSize(file)

    const text = await file.text()

    const hasLatex = /\\begin\s*\{tabular\}/.test(text) || /\\begin\s*\{table\}/.test(text)
    if (!hasLatex) {
      throw new Error(notLatexFormat())
    }

    const hasBoldHeaders = /\\textbf\{/.test(
      text.replace(/\\hline\s*/g, '').replace(/\\toprule\s*/g, ''),
    )

    const {
      rows,
      caption,
      mergedRanges,
      cellColors,
      captionTextColor,
      captionBgColor,
      headerColor,
      rowColors,
      columnColors,
    } = parseLatexTabularWithMerges(text)

    if (rows.length === 0) {
      throw new Error(readError())
    }

    const stringRows = rows.map((row) => row.map((v) => v ?? ''))

    const result = normaliseRows(stringRows)
    if (caption) result.caption = caption
    if (cellColors) result.cellColors = cellColors
    if (captionTextColor) result.captionTextColor = captionTextColor
    if (captionBgColor) result.captionBgColor = captionBgColor
    if (headerColor) {
      result.headerColor = headerColor
      result.headerStyle = 'first-row'
    }
    if (rowColors) result.rowColors = rowColors
    if (columnColors) result.columnColors = columnColors
    if (!headerColor && hasBoldHeaders) result.headerStyle = 'first-row'

    if (mergedRanges.length > 0 && result.rows > 0 && result.cols > 0) {
      const clamped = mergedRanges
        .filter(
          (r) =>
            r.startRow < result.rows &&
            r.startCol < result.cols &&
            r.endRow < result.rows &&
            r.endCol < result.cols,
        )
        .map((r) => ({
          ...r,
          endRow: Math.min(r.endRow, result.rows - 1),
          endCol: Math.min(r.endCol, result.cols - 1),
        }))

      if (clamped.length > 0) {
        result.mergedRanges = clamped
        applyMergesToCells(result.cells, clamped)
      }
    }

    return result
  }
}
