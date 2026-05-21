import type { CellData, HeaderStyle, MergeRange, TextAlign, BorderStyle } from '../../context/table.types'

export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel' | 'csv' | 'latex'

export interface ExportStyleOptions {
  headerColor: string
  headerTextColor: string
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
  quality?: number
  caption?: string
  cells?: CellData[][]
  headerStyle?: HeaderStyle
  mergedRanges?: MergeRange[]
  styles?: ExportStyleOptions
}

export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>
}
