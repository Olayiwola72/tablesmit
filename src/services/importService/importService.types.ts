import type { CellData, HeaderStyle } from '../../types/table'

export interface ImportResult {
  cells: CellData[][]
  rows: number
  cols: number
  caption?: string
  headerColor?: string
  contentColor?: string
  borderColor?: string
  cellColors?: Record<string, string>
  headerStyle?: HeaderStyle
}
