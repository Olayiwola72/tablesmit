import type { CellData, HeaderStyle, MergeRange } from '../../types/table'

export interface ImportResult {
  cells: CellData[][]
  rows: number
  cols: number
  mergedRanges?: MergeRange[]
  caption?: string
  captionTextColor?: string
  captionBgColor?: string
  captionItalic?: boolean
  captionAlignment?: string
  headerColor?: string
  contentColor?: string
  borderColor?: string
  cellColors?: Record<string, string>
  headerStyle?: HeaderStyle
}
