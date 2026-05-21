import type { CellData } from '../../context/table.types'

export interface ImportResult {
  cells: CellData[][]
  rows: number
  cols: number
}
