import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'

export interface PasteStyleMeta {
  cellColors?: Record<string, string>
  cellTextColors?: Record<string, string>
  cellTextAlign?: Record<string, string>
  mergedRanges?: MergeRange[]
  columnWidths?: number[]
  headerColor?: string
  headerStyle?: string
  contentColor?: string
  contentBgColor?: string
  theme?: string
  borderStyle?: string
  borderColor?: string
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: string
  captionItalic?: boolean
}

export interface PasteResult {
  rows: string[][]
  rowCount: number
  colCount: number
  styles?: PasteStyleMeta
  caption?: string
}
