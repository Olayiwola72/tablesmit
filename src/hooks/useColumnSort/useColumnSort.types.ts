import type { CellData } from '../../context/table.types'

export interface UseColumnSortResult {
  sortCol: number | null
  sortDir: 'asc' | 'desc' | null
  activeSortCol: number | null
  activeSortDir: 'asc' | 'desc' | null
  toggleSort: (col: number) => void
  sortAsc: (col: number) => void
  sortDesc: (col: number) => void
  sortedRows: CellData[][]
  sortedToOriginal: number[]
  sortDisabled: boolean
}
