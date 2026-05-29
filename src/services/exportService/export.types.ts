import type { CellData } from '../../types/table/cell.types'
import type { HeaderStyle, TextAlign, BorderStyle } from '../../context/TableState/TableState.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'

export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel' | 'csv' | 'latex'

export interface ExportStyleOptions {
  headerColor: string
  headerTextColor: string
  contentColor: string
  borderColor: string
  columnWidths: number[]
  altRowBg: string
  contentBgColor: string
  rowColors: string[]
  columnColors: string[]
  cellColors: Record<string, string>
  columnTextAlign: TextAlign[]
  cellTextAlign: Record<string, string>
  borderStyle: BorderStyle
}

export interface ExportOptions {
  format: ExportFormat
  filename?: string
  scale?: number
  quality?: number
  caption?: string
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: 'left' | 'center' | 'right'
  captionItalic?: boolean
  cells?: CellData[][]
  headerStyle?: HeaderStyle
  mergedRanges?: MergeRange[]
  styles?: ExportStyleOptions
}

export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>
}
