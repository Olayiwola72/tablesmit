import type { CellData } from './table.types'

export interface ImportResult {
  cells: CellData[][]
  rows: number
  cols: number
}
