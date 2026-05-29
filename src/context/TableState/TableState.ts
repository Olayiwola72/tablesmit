import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_STYLE,
  DEFAULT_COLS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROWS,
} from '../../config/table/tableDefaults/tableDefaults'
import { colors } from '../../config/colors/colorsConfig'
import type { TextAlign } from './TableState.types'
import type { CaptionAlignment, TableState } from './TableState.types'
import { generateEmptyTable } from '../../utils/tableUtils/tableUtils'

export const STORAGE_KEY = 'tablesmit-state'
export const SESSION_KEY = 'tablesmit-session'

export const initialState: TableState = {
  cells: generateEmptyTable(DEFAULT_ROWS, DEFAULT_COLS),
  columnWidths: Array.from({ length: DEFAULT_COLS }, () => DEFAULT_COLUMN_WIDTH),
  rowHeights: Array.from({ length: DEFAULT_ROWS }, () => DEFAULT_ROW_HEIGHT),
  mergedRanges: [],
  headerStyle: 'first-row',
  headerColor: colors.defaultHeader,
  contentColor: colors.defaultContent,
  borderStyle: DEFAULT_BORDER_STYLE,
  borderColor: DEFAULT_BORDER_COLOR,
  contentBgColor: '',
  theme: 'default',
  rowColors: Array.from({ length: DEFAULT_ROWS }, () => ''),
  columnColors: Array.from({ length: DEFAULT_COLS }, () => ''),
  columnTextAlign: Array.from({ length: DEFAULT_COLS }, () => 'left' as TextAlign),
  cellColors: {},
  cellTextColors: {},
  rowTextColors: {},
  cellTextAlign: {},
  selectedRange: null,
  freezeRow: false,
  freezeCol: false,
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
  caption: '',
  captionAlignment: 'center' as CaptionAlignment,
  captionTextColor: '',
  captionBgColor: '',
  captionItalic: false,
}
