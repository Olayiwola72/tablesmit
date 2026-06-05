import type { CellData } from '@/types/table/cell.types'
import type { ColumnFormat } from '@/config/columnFormats/columnFormats.types'

export interface TableHeaderRowProps {
  cols: number
  columnWidths: number[]
  cells: CellData[][]
  activeSortCol: number | null
  activeSortDir: 'asc' | 'desc' | null
  isSortDisabled: (col: number) => boolean
  onSort: (col: number) => void
  onFormatChange: (col: number, format: ColumnFormat) => void
  onResizeStart: (e: React.MouseEvent, col: number, currentWidth: number) => void
  onAutoFit: (col: number) => void
  onContextMenu: (col: number, e: React.MouseEvent) => void
}
