import { useCallback, useMemo, useState } from 'react'
import type { CellData, MergeRange } from '../../types/table'
import { sortRows } from '../../utils/tableUtils/tableUtils'
import type { UseColumnSortResult } from './useColumnSort.types'

export function useColumnSort(
  cells: CellData[][],
  cols: number,
  mergedRanges: MergeRange[],
): UseColumnSortResult {
  const [sortCol, setSortCol] = useState<number | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)

  const activeSortCol = sortCol !== null && sortCol < cols ? sortCol : null
  const activeSortDir = activeSortCol !== null ? sortDir : null
  const sortDisabled = mergedRanges.length > 0

  const toggleSort = useCallback((col: number): void => {
    if (sortDisabled) return
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
  }, [sortCol, sortDir, sortDisabled])

  const sortAsc = useCallback((col: number): void => {
    if (sortDisabled) return
    setSortCol(col)
    setSortDir('asc')
  }, [sortDisabled])

  const sortDesc = useCallback((col: number): void => {
    if (sortDisabled) return
    setSortCol(col)
    setSortDir('desc')
  }, [sortDisabled])

  const sortedRows = useMemo(() => {
    if (activeSortCol === null || activeSortDir === null) return cells
    return sortRows(cells, activeSortCol, activeSortDir)
  }, [cells, activeSortCol, activeSortDir])

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
    sortDisabled,
  }
}
