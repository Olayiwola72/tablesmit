export interface CellData {
  id: string
  value: string
  colSpan: number
  rowSpan: number
  isMerged: boolean
  isHidden: boolean
  format?: ColumnFormat
}

export interface MergeRange {
  key: string
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export interface SelectionRange {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export type HeaderStyle = 'none' | 'first-row' | 'first-column' | 'both'
export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date'

export interface TableState {
  cells: CellData[][]
  columnWidths: number[]
  rowHeights: number[]
  mergedRanges: MergeRange[]
  headerStyle: HeaderStyle
  headerColor: string
  contentColor: string
  selectedRange: SelectionRange | null
  rows: number
  cols: number
}
