import type { CellData } from '@/types/table/cell.types'
import type { BorderStyle, HeaderStyle } from '@/context/TableState/TableState.types'
import type { MergeRange, SelectionRange } from '@/utils/mergeUtils/mergeUtils.types'

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
  cellTextColor?: string
  rowTextColor?: string
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
  isTableFocused?: boolean
}
