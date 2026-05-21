import type { BorderStyle, CellData, HeaderStyle, MergeRange, SelectionRange } from '../../../../context/table.types'

export interface TableCellProps {
  cell: CellData
  row: number
  col: number
  freezeRow: boolean
  freezeCol: boolean
  headerStyle: HeaderStyle
  headerColor: string
  headerTextColor: string
  contentColor: string
  contentBgColor: string
  themeRowBg?: string
  borderStyle: BorderStyle
  borderColor: string
  rowColor: string
  columnColor: string
  cellColor: string
  textAlign: string
  rowHeight: number
  columnWidth: number
  merge?: MergeRange
  selectedRange: SelectionRange | null
  onSelect: (row: number, col: number, event: React.MouseEvent) => void
  onBlur: (cellId: string, value: string, col: number) => void
  onRowResizeStart: (event: React.MouseEvent, row: number, currentHeight: number) => void
  onAutoFitRow: (row: number) => void
  onColumnResizeStart: (event: React.MouseEvent, col: number, currentWidth: number) => void
  onAutoFitColumn: (col: number) => void
  onKeyDown: (row: number, col: number, event: React.KeyboardEvent) => void
  onContextMenu: (row: number, col: number, event: React.MouseEvent) => void
  isFindMatch?: boolean
  isCurrentMatch?: boolean
}
