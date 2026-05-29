import i18n from '../../i18n/i18n'
import { importConfig } from '../../config/import/importConfig'
import { MAX_COLS, MAX_IMPORT_FILE_SIZE, MAX_ROWS } from '../../config/table/tableDefaults/tableDefaults'
import type { ImportResult } from './import.types'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'
import type { CellData } from '../../types/table/cell.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'
import { buildMergeKey } from '../../utils/mergeUtils/mergeUtils'

const fileTooLarge = (): string =>
  i18n.t('errors.fileTooLarge', { maxSize: importConfig.maxSize, unitLabel: importConfig.unitLabel })

export const readError = (): string =>
  i18n.t('errors.importParseError')

export const notExcelFormat = (): string =>
  i18n.t('errors.notExcelFormat')

export const notCsvFormat = (): string =>
  i18n.t('errors.notCsvFormat')

export function argbToHex(argb: string): string {
  const hex = argb.replace('#', '')
  return hex.length === 8 ? `#${hex.slice(2)}` : `#${hex}`
}

export function getFillColor(fill: unknown): string | undefined {
  if (!fill || typeof fill !== 'object') return undefined
  const f = fill as Record<string, unknown>
  if (f.type === 'pattern') {
    const fgColor = f.fgColor as Record<string, unknown> | undefined
    const argb = fgColor?.argb
    if (typeof argb === 'string' && argb) {
      return argbToHex(argb)
    }
  }
  if (f.type === 'gradient') {
    const stops = f.stops as Array<Record<string, unknown>> | undefined
    if (stops && stops.length > 0) {
      const color = stops[0].color as Record<string, unknown> | undefined
      const argb = color?.argb
      if (typeof argb === 'string' && argb) {
        return argbToHex(argb)
      }
    }
  }
  return undefined
}

export function assertFileSize(file: File): void {
  if (file.size > MAX_IMPORT_FILE_SIZE) {
    throw new Error(fileTooLarge())
  }
}

export function normaliseRows(rows: unknown[][], minRows = 1, minCols = 1): ImportResult {
  const stringRows = rows
    .map((row) => row.map((value) => String(value ?? '')))
    .filter((row) => row.some((value) => value.trim()))
  const rawRowCount = Math.max(stringRows.length, minRows)
  const rawColCount = Math.max(...stringRows.map((row) => row.length), minCols)

  const rowCount = Math.min(rawRowCount, MAX_ROWS)
  const colCount = Math.min(rawColCount, MAX_COLS)

  return {
    rows: rowCount,
    cols: colCount,
    cells: normalizeTableData(stringRows, rowCount, colCount),
  }
}

export function detectCsvMerges(
  rows: string[][],
  rowCount: number,
  colCount: number,
): MergeRange[] {
  const mergedRanges: MergeRange[] = []

  for (let c = 0; c < colCount; c++) {
    let anchorRow = -1
    for (let r = 1; r < rowCount; r++) {
      const val = (rows[r]?.[c] ?? '').trim()
      if (val !== '') {
        if (anchorRow >= 0 && r - 1 > anchorRow) {
          mergedRanges.push({
            key: buildMergeKey(anchorRow, c, r - 1, c),
            startRow: anchorRow,
            startCol: c,
            endRow: r - 1,
            endCol: c,
          })
        }
        anchorRow = r
      }
    }
    if (anchorRow >= 0 && rowCount - 1 > anchorRow) {
      mergedRanges.push({
        key: buildMergeKey(anchorRow, c, rowCount - 1, c),
        startRow: anchorRow,
        startCol: c,
        endRow: rowCount - 1,
        endCol: c,
      })
    }
  }

  for (let r = 0; r < rowCount; r++) {
    let mergeStart = 0
    for (let c = 1; c < colCount; c++) {
      const prevVal = (rows[r]?.[mergeStart] ?? '').trim()
      const curVal = (rows[r]?.[c] ?? '').trim()
      if (curVal === '' || curVal !== prevVal) {
        if (c - 1 > mergeStart) {
          mergedRanges.push({
            key: buildMergeKey(r, mergeStart, r, c - 1),
            startRow: r,
            startCol: mergeStart,
            endRow: r,
            endCol: c - 1,
          })
        }
        mergeStart = c
      }
    }
    if (colCount - 1 > mergeStart) {
      mergedRanges.push({
        key: buildMergeKey(r, mergeStart, r, colCount - 1),
        startRow: r,
        startCol: mergeStart,
        endRow: r,
        endCol: colCount - 1,
      })
    }
  }

  return mergedRanges
}

export function applyMergesToCells(
  cells: CellData[][],
  mergedRanges: MergeRange[],
): void {
  for (const range of mergedRanges) {
    const anchor = cells[range.startRow]?.[range.startCol]
    if (!anchor) continue
    anchor.isMerged = true
    anchor.rowSpan = range.endRow - range.startRow + 1
    anchor.colSpan = range.endCol - range.startCol + 1
    for (let r = range.startRow; r <= range.endRow; r++) {
      for (let c = range.startCol; c <= range.endCol; c++) {
        if (r === range.startRow && c === range.startCol) continue
        const cell = cells[r]?.[c]
        if (cell) {
          cell.isHidden = true
          cell.value = ''
        }
      }
    }
  }
}
