import type { MergeRange } from '@/utils/mergeUtils/mergeUtils.types'

export interface BuildHtmlTableParams {
  cells: import('@/types/table').CellData[][]
  caption?: string
  columnWidths?: number[]
  cellColors?: Record<string, string>
  cellTextAlign?: Record<string, string>
  headerColor?: string
  headerStyle?: string
  contentColor?: string
  contentBgColor?: string
  borderStyle?: string
  borderColor?: string
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: string
  cellTextColors?: Record<string, string>
  mergedRanges?: MergeRange[]
  captionItalic?: boolean
  theme?: string
}

export interface BuildExcelHtmlParams {
  cells: import('@/types/table').CellData[][]
  caption?: string
  columnWidths?: number[]
  cellColors?: Record<string, string>
  cellTextAlign?: Record<string, string>
  headerColor?: string
  headerStyle?: string
  contentColor?: string
  contentBgColor?: string
  theme?: string
  borderStyle?: string
  borderColor?: string
  cellTextColors?: Record<string, string>
  mergedRanges?: MergeRange[]
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: string
  captionItalic?: boolean
}
