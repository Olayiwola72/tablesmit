import type { CellData } from '../../types/table/cell.types'
import type { MergeRange, SelectionRange } from '../../utils/mergeUtils/mergeUtils.types'

export type HeaderStyle = 'none' | 'first-row' | 'first-column' | 'both'

export type BorderStyle = 'none' | 'solid' | 'dotted' | 'dashed' | 'double'

export type TextAlign = 'left' | 'center' | 'right'

export type TableTheme = 'default' | 'minimal' | 'dark-header' | 'striped' | 'academic' | 'monochrome'

export type CaptionAlignment = 'left' | 'center' | 'right'

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
  cellTextColors: Record<string, string>
  rowTextColors: Record<number, string>
  cellTextAlign: Record<string, string>
  selectedRange: SelectionRange | null
  rows: number
  cols: number
  freezeRow: boolean
  freezeCol: boolean
  caption: string
  captionAlignment: CaptionAlignment
  captionTextColor: string
  captionBgColor: string
  captionItalic: boolean
}
