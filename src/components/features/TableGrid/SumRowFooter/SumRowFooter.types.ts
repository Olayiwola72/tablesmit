import type { CellData } from '@/types/table/cell.types'
import type { BorderStyle } from '@/context/TableState/TableState.types'

export interface SumRowFooterProps {
  cells: CellData[][]
  sumCols: number[]
  columnTotals: Record<number, number>
  borderStyle: BorderStyle
  borderColor: string
  columnTextAlign: Record<number, string>
  cellTextAlign: Record<string, string>
}
