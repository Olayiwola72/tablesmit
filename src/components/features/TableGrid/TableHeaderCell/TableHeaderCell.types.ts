import type { ColumnFormat } from '../../../../types/table'

export interface TableHeaderCellProps {
  index: number
  width: number
  format: ColumnFormat
  sortDir: 'asc' | 'desc' | null
  sortDisabled?: boolean
  onSort: () => void
  onFormatChange: (format: ColumnFormat) => void
  onResizeStart: (event: React.MouseEvent, index: number, width: number) => void
  onAutoFit: (index: number) => void
  onContextMenu: (col: number, event: React.MouseEvent) => void
}
