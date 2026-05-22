import type { CellData, BorderStyle } from '@/types/table'

export interface SumRowFooterProps {
  cells: CellData[][]
  sumCols: number[]
  columnTotals: Record<number, number>
  borderStyle: BorderStyle
  borderColor: string
  columnTextAlign: Record<number, string>
  cellTextAlign: Record<string, string>
}
