import type { CellData } from '../../types/table/cell.types'
import type { HeaderStyle } from '../../context/TableState/TableState.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'

export type ImportFormat = 'csv' | 'excel' | 'latex'

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
  rowColors?: Record<number, string>
  columnColors?: Record<number, string>
  headerStyle?: HeaderStyle
}

export interface ImportStrategy {
  importFile(file: File): Promise<ImportResult>
}
