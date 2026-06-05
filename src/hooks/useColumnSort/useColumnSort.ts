import { useCallback, useMemo, useState } from 'react'
import type { CellData } from '../../types/table/cell.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'
import { sortRows } from '../../utils/tableUtils/tableUtils'
import type { UseColumnSortResult } from './useColumnSort.types'
import type { HeaderStyle } from '../../context/TableState/TableState.types'

function shouldSkipFirstRow(headerStyle: HeaderStyle): boolean {
  return headerStyle === 'first-row' || headerStyle === 'both'
}

export function useColumnSort(
  cells: CellData[][],
  cols: number,
  mergedRanges: MergeRange[],
  headerStyle: HeaderStyle = 'first-row',
): UseColumnSortResult {
  const [sortCol, setSortCol] = useState<number | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)

  const activeSortCol = sortCol !== null && sortCol < cols ? sortCol : null
  const activeSortDir = activeSortCol !== null ? sortDir : null
  const sortDisabledCols = useMemo(() => {
    const cols = new Set<number>()
    for (const r of mergedRanges) {
      for (let c = r.startCol; c <= r.endCol; c++) cols.add(c)
    }
    return cols
  }, [mergedRanges])

  const isSortDisabled = useCallback((col: number): boolean => sortDisabledCols.has(col), [sortDisabledCols])

  const toggleSort = useCallback((col: number): void => {
    if (sortDisabledCols.has(col)) return
    if (sortCol !== col) {
      setSortCol(col)
      setSortDir('asc')
      return
    }
    if (sortDir === 'asc') {
      setSortDir('desc')
      return
    }
    if (sortDir === 'desc') {
      setSortCol(null)
      setSortDir(null)
    }
  }, [sortCol, sortDir, sortDisabledCols])

  const sortAsc = useCallback((col: number): void => {
    if (sortDisabledCols.has(col)) return
    setSortCol(col)
    setSortDir('asc')
  }, [sortDisabledCols])

  const sortDesc = useCallback((col: number): void => {
    if (sortDisabledCols.has(col)) return
    setSortCol(col)
    setSortDir('desc')
  }, [sortDisabledCols])

  const skipFirstRow = shouldSkipFirstRow(headerStyle)

  const sortedRows = useMemo(() => {
    if (activeSortCol === null || activeSortDir === null) return cells
    return sortRows(cells, activeSortCol, activeSortDir, skipFirstRow)
  }, [cells, activeSortCol, activeSortDir, skipFirstRow])

  const sortedToOriginal = useMemo(() => {
    if (activeSortCol === null || activeSortDir === null) {
      return cells.map((_, index) => index)
    }
    return sortedRows.map((sortedRow) => cells.findIndex((row) => row === sortedRow))
  }, [cells, sortedRows, activeSortCol, activeSortDir])

  return {
    sortCol,
    sortDir,
    activeSortCol,
    activeSortDir,
    toggleSort,
    sortAsc,
    sortDesc,
    sortedRows,
    sortedToOriginal,
    isSortDisabled,
  }
}
