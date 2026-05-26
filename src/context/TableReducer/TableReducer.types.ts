import type { CellData, ColumnFormat, HeaderStyle, MergeRange, SelectionRange, TableTheme, TextAlign, BorderStyle } from '../../types/table'
import type { CaptionAlignment, TableState } from '../TableState/TableState.types'
import type { PresetDefinition } from '../../types/table'

export interface CellsStyleMeta {
  caption?: string
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: string
  captionItalic?: boolean
  cellColors?: Record<string, string>
  cellTextColors?: Record<string, string>
  cellTextAlign?: Record<string, string>
  columnWidths?: number[]
  headerColor?: string
  headerStyle?: string
  contentColor?: string
  contentBgColor?: string
  theme?: string
  borderStyle?: string
  borderColor?: string
}

export type TableAction =
  | { type: 'generate'; rows: number; cols: number }
  | { type: 'setCells'; cells: CellData[][]; mergedRanges?: MergeRange[]; styles?: CellsStyleMeta }
  | { type: 'updateCell'; cellId: string; value: string }
  | { type: 'addRow' }
  | { type: 'insertRowAt'; index: number }
  | { type: 'removeRow' }
  | { type: 'deleteRowAt'; index: number }
  | { type: 'addColumn' }
  | { type: 'insertColAt'; index: number }
  | { type: 'removeColumn' }
  | { type: 'deleteColAt'; index: number }
  | { type: 'clearAll' }
  | { type: 'setHeaderStyle'; headerStyle: HeaderStyle }
  | { type: 'setHeaderColor'; color: string }
  | { type: 'setContentColor'; color: string }
  | { type: 'setContentBgColor'; color: string }
  | { type: 'selectRange'; range: SelectionRange }
  | { type: 'mergeSelection' }
  | { type: 'unmergeSelection' }
  | { type: 'setColumnWidth'; col: number; width: number }
  | { type: 'setRowHeight'; row: number; height: number }
  | { type: 'setColumnFormat'; col: number; format: ColumnFormat }
  | { type: 'setBorderStyle'; borderStyle: BorderStyle }
  | { type: 'setBorderColor'; color: string }
  | { type: 'setRowColor'; row: number; color: string }
  | { type: 'setColumnColor'; col: number; color: string }
  | { type: 'setCellColor'; cellId: string; color: string }
  | { type: 'setCellTextColor'; cellId: string; color: string }
  | { type: 'setRowTextColor'; row: number; color: string }
  | { type: 'setColumnTextAlign'; col: number; align: TextAlign }
  | { type: 'setCellTextAlign'; cellId: string; align: TextAlign }
  | { type: 'setFreezeRow'; freeze: boolean }
  | { type: 'setFreezeCol'; freeze: boolean }
  | { type: 'setTheme'; theme: TableTheme }
  | { type: 'applyPreset'; preset: PresetDefinition }
  | { type: 'UNDO'; state: TableState }
  | { type: 'setCaption'; caption: string }
  | { type: 'setCaptionAlignment'; alignment: CaptionAlignment }
  | { type: 'setCaptionTextColor'; color: string }
  | { type: 'setCaptionBgColor'; color: string }
  | { type: 'setCaptionItalic'; italic: boolean }
