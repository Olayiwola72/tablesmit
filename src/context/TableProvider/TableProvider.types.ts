import type { CellData, HeaderStyle, MergeRange, SelectionRange, TableTheme, TextAlign, BorderStyle, ColumnFormat } from '../../types/table'
import type { CaptionAlignment } from '../TableState/TableState.types'
import type { PresetDefinition } from '../../types/table'

export interface TableStateFields {
  rows: number
  cols: number
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
  freezeRow: boolean
  freezeCol: boolean
  caption: string
  captionAlignment: CaptionAlignment
  captionTextColor: string
  captionBgColor: string
}

export interface TableActions {
  generateTable: (rows: number, cols: number) => void
  setCells: (cells: CellData[][]) => void
  updateCell: (cellId: string, value: string) => void
  addRow: () => void
  insertRowAt: (index: number) => void
  removeRow: () => void
  deleteRowAt: (index: number) => void
  addColumn: () => void
  insertColAt: (index: number) => void
  removeColumn: () => void
  deleteColAt: (index: number) => void
  clearAll: () => void
  setHeaderStyle: (headerStyle: HeaderStyle) => void
  setHeaderColor: (color: string) => void
  setContentColor: (color: string) => void
  setContentBgColor: (color: string) => void
  selectRange: (range: SelectionRange) => void
  mergeSelection: () => void
  unmergeSelection: () => void
  setColumnWidth: (col: number, width: number) => void
  setRowHeight: (row: number, height: number) => void
  setColumnFormat: (col: number, format: ColumnFormat) => void
  setBorderStyle: (borderStyle: BorderStyle) => void
  setBorderColor: (color: string) => void
  setRowColor: (row: number, color: string) => void
  setColumnColor: (col: number, color: string) => void
  setCellColor: (cellId: string, color: string) => void
  setColumnTextAlign: (col: number, align: TextAlign) => void
  setCellTextAlign: (cellId: string, align: TextAlign) => void
  applyPreset: (preset: PresetDefinition) => void
  setFreezeRow: (freeze: boolean) => void
  setFreezeCol: (freeze: boolean) => void
  setTheme: (theme: TableTheme) => void
  undo: () => void
  canUndo: boolean
  historyDepth: number
  setCaption: (caption: string) => void
  setCaptionAlignment: (alignment: CaptionAlignment) => void
  setCaptionTextColor: (color: string) => void
  setCaptionBgColor: (color: string) => void
}

export type TableContextValue = TableStateFields & TableActions
