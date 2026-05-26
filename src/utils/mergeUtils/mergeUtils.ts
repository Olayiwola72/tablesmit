import type { MergeRange, SelectionRange } from '../../types/table'
import { parseCellId } from '../cell/cellUtils'

export function normalizeSelection(range: SelectionRange): SelectionRange {
  return {
    startRow: Math.min(range.startRow, range.endRow),
    startCol: Math.min(range.startCol, range.endCol),
    endRow: Math.max(range.startRow, range.endRow),
    endCol: Math.max(range.startCol, range.endCol),
  }
}

export function buildMergeKey(startRow: number, startCol: number, endRow: number, endCol: number): string {
  return `R${startRow}C${startCol}:R${endRow}C${endCol}`
}

export function rangeFromSelection(selection: SelectionRange): MergeRange {
  const normalized = normalizeSelection(selection)
  return {
    ...normalized,
    key: buildMergeKey(
      normalized.startRow,
      normalized.startCol,
      normalized.endRow,
      normalized.endCol,
    ),
  }
}

export function isSingleCellRange(range: SelectionRange): boolean {
  const normalized = normalizeSelection(range)
  return normalized.startRow === normalized.endRow && normalized.startCol === normalized.endCol
}

export function isCellInMergeRange(cellId: string, range: Omit<MergeRange, 'key'>): boolean {
  const { row, col } = parseCellId(cellId)
  return row >= range.startRow && row <= range.endRow && col >= range.startCol && col <= range.endCol
}

export function isRangeAnchor(cellId: string, range: MergeRange): boolean {
  const { row, col } = parseCellId(cellId)
  return row === range.startRow && col === range.startCol
}

export function getMergeAtCoord(row: number, col: number, ranges: MergeRange[]): MergeRange | undefined {
  return ranges.find((r) => row >= r.startRow && row <= r.endRow && col >= r.startCol && col <= r.endCol)
}

export function getEffectiveColSpan(row: number, col: number, ranges: MergeRange[], defaultColSpan = 1): number {
  const merge = getMergeAtCoord(row, col, ranges)
  if (!merge) return defaultColSpan
  if (row !== merge.startRow || col !== merge.startCol) return 1
  return merge.endCol - merge.startCol + 1
}
