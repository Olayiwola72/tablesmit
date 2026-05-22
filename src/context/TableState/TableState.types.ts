import type { CellData } from '../../types/table/cell.types'
import type { MergeRange, SelectionRange } from '../../types/table/merge.types'
import type { HeaderStyle, BorderStyle, TextAlign, TableTheme } from '../../types/table/table-state.types'

export interface TableState {
  cells: CellData[][]
  columnWidths: number[]
  rowHeights: number[]
  mergedRanges: MergeRange[]
  headerStyle: HeaderStyle
  headerColor: string
  contentColor: string
  theme: TableTheme
  borderStyle: BorderStyle
  borderColor: string
  contentBgColor: string
  rowColors: string[]
  columnColors: string[]
  columnTextAlign: TextAlign[]
  cellColors: Record<string, string>
  cellTextAlign: Record<string, string>
  selectedRange: SelectionRange | null
  rows: number
  cols: number
  freezeRow: boolean
  freezeCol: boolean
}
