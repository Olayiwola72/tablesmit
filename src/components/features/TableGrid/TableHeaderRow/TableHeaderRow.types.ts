import type { CellData, ColumnFormat } from '../../../../types/table'

export interface TableHeaderRowProps {
  cols: number
  columnWidths: number[]
  cells: CellData[][]
  activeSortCol: number | null
  activeSortDir: 'asc' | 'desc' | null
  sortDisabled: boolean
  onSort: (col: number) => void
  onFormatChange: (col: number, format: ColumnFormat) => void
  onResizeStart: (e: React.MouseEvent, col: number, currentWidth: number) => void
  onAutoFit: (col: number) => void
  onContextMenu: (col: number, e: React.MouseEvent) => void
}
