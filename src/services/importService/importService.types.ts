import type { CellData } from '../../types/table'

export interface ImportResult {
  cells: CellData[][]
  rows: number
  cols: number
}
