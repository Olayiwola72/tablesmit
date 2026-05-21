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
export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'sum' | 'auto-number'
export type BorderStyle = 'none' | 'solid' | 'dotted' | 'dashed' | 'double'
export type TextAlign = 'left' | 'center' | 'right'
export type TableTheme = 'default' | 'minimal' | 'dark-header' | 'striped' | 'academic' | 'monochrome'

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
