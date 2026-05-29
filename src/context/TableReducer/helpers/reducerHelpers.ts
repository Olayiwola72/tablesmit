import { DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT } from '../../../config/table/tableDefaults/tableDefaults'

export function makeColumnArrays(cols: number) {
  return {
    columnWidths: Array.from({ length: cols }, () => DEFAULT_COLUMN_WIDTH),
    columnColors: Array.from({ length: cols }, () => ''),
    columnTextAlign: Array.from({ length: cols }, () => 'left' as const),
  }
}

export function makeRowArrays(rows: number) {
  return {
    rowHeights: Array.from({ length: rows }, () => DEFAULT_ROW_HEIGHT),
    rowColors: Array.from({ length: rows }, () => ''),
  }
}

export function makeEmptyCellStyleState() {
  return {
    cellColors: {} as Record<string, string>,
    cellTextColors: {} as Record<string, string>,
    rowTextColors: {} as Record<number, string>,
    cellTextAlign: {} as Record<string, string>,
  }
}

export function padArray<T>(arr: T[], targetLength: number, fillValue: T): T[] {
  return arr.slice(0, targetLength).concat(
    Array.from({ length: Math.max(0, targetLength - arr.length) }, () => fillValue),
  )
}
