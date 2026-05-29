import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_STYLE,
  DEFAULT_COLS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROWS,
  MAX_COLS,
  MAX_ROWS,
} from '../../config/table/tableDefaults/tableDefaults'
import { makeColumnArrays, makeRowArrays, makeEmptyCellStyleState, padArray } from './helpers/reducerHelpers'
import { TABLE_THEMES } from '../../config/table/tableThemes/tableThemes'
import { colors } from '../../config/colors/colorsConfig'
import type {
  CaptionAlignment,
  TableState,
} from '../TableState/TableState.types'
import type { CellData } from '../../types/table/cell.types'
import type { HeaderStyle, TableTheme, TextAlign } from '../TableState/TableState.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'
import { buildMergeKey, rangeFromSelection, isSingleCellRange, normalizeSelection } from '../../utils/mergeUtils/mergeUtils'
import {
  addColumn as addColumnToCells,
  addRow as addRowToCells,
  deleteColAt as deleteColFromCells,
  deleteRowAt as deleteRowFromCells,
  generateEmptyTable,
  insertColAt as insertColToCells,
  insertRowAt as insertRowToCells,
  normalizeTableData,
  removeColumn as removeColumnFromCells,
  removeRow as removeRowFromCells,
  updateCellValue,
} from '../../utils/tableUtils/tableUtils'
import type { TableAction } from './TableReducer.types'
import { initialState } from '../TableState/TableState'

export type { TableAction }

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(Math.trunc(Number.isFinite(value) ? value : min), min), max)

function removeInvalidMerges(ranges: MergeRange[], rows: number, cols: number): MergeRange[] {
  return ranges.filter((range) => range.endRow < rows && range.endCol < cols)
}

export function reducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'setCells': {
      const newCells = action.cells
      const rows = newCells.length
      const cols = newCells[0]?.length ?? 0
      const s = action.styles
      return {
        ...state,
        cells: newCells,
        rows,
        cols,
        headerStyle: (s?.headerStyle as HeaderStyle) ?? ('first-row' as HeaderStyle),
        headerColor: s?.headerColor ?? colors.defaultHeader,
        contentColor: s?.contentColor ?? colors.defaultContent,
        contentBgColor: s?.contentBgColor ?? '',
        borderStyle: (s?.borderStyle as TableState['borderStyle']) ?? DEFAULT_BORDER_STYLE,
        borderColor: s?.borderColor ?? DEFAULT_BORDER_COLOR,
        theme: (s?.theme as TableTheme) ?? ('default' as TableTheme),
        freezeRow: false,
        freezeCol: false,
        caption: s?.caption ?? '',
        captionAlignment: (s?.captionAlignment as CaptionAlignment) ?? ('center' as CaptionAlignment),
        captionTextColor: s?.captionTextColor ?? '',
        captionBgColor: s?.captionBgColor ?? '',
        captionItalic: s?.captionItalic ?? false,
        columnWidths: s?.columnWidths
          ? Array.from({ length: cols }, (_, i) => s.columnWidths![i] ?? DEFAULT_COLUMN_WIDTH)
          : padArray(state.columnWidths, cols, DEFAULT_COLUMN_WIDTH),
        rowHeights: padArray(state.rowHeights, rows, DEFAULT_ROW_HEIGHT),
        rowColors: padArray(state.rowColors, rows, ''),
        columnColors: padArray(state.columnColors, cols, ''),
        columnTextAlign: padArray(state.columnTextAlign, cols, 'left' as TextAlign),
        cellColors: s?.cellColors ?? {},
        cellTextColors: s?.cellTextColors ?? {},
        rowTextColors: {},
        cellTextAlign: s?.cellTextAlign ?? {},
        mergedRanges: action.mergedRanges ?? [],
        selectedRange: null,
      }
    }
    case 'generate': {
      const rows = clamp(action.rows, 1, MAX_ROWS)
      const cols = clamp(action.cols, 1, MAX_COLS)
      return {
        ...state,
        rows,
        cols,
        cells: generateEmptyTable(rows, cols),
        ...makeColumnArrays(cols),
        ...makeRowArrays(rows),
        ...makeEmptyCellStyleState(),
        headerStyle: 'first-row' as HeaderStyle,
        headerColor: colors.defaultHeader,
        contentColor: colors.defaultContent,
        contentBgColor: '',
        borderStyle: DEFAULT_BORDER_STYLE,
        borderColor: DEFAULT_BORDER_COLOR,
        caption: '',
        captionAlignment: 'center',
        captionTextColor: '',
        captionBgColor: '',
        captionItalic: false,
      }
    }
    case 'updateCell':
      return { ...state, cells: updateCellValue(state.cells, action.cellId, action.value) }
    case 'addRow': {
      if (state.rows >= MAX_ROWS) return state
      const newRowIndex = state.rows
      const autoCols: Record<number, string> = {}
      if (state.cells[0]) {
        for (let c = 0; c < state.cells[0].length; c++) {
          const fmt = state.cells[0][c].format
          if (fmt === 'auto-number' || fmt === 'sum') autoCols[c] = fmt
        }
      }
      const newCells: CellData[][] = addRowToCells(state.cells).map((row, ri) =>
        ri === newRowIndex
          ? row.map((cell, ci) => ({
              ...cell,
              format: (autoCols[ci] ?? cell.format) as CellData['format'],
              value: autoCols[ci] === 'auto-number' ? String(ri + 1) : cell.value,
            }))
          : row,
      )
      return {
        ...state,
        rows: state.rows + 1,
        cells: newCells,
        rowHeights: [...state.rowHeights, DEFAULT_ROW_HEIGHT],
        rowColors: [...state.rowColors, ''],
      }
    }
    case 'removeRow': {
      if (state.rows <= 1) return state
      const rows = state.rows - 1
      return {
        ...state,
        rows,
        cells: removeRowFromCells(state.cells),
        rowHeights: state.rowHeights.slice(0, -1),
        rowColors: state.rowColors.slice(0, -1),
        mergedRanges: removeInvalidMerges(state.mergedRanges, rows, state.cols),
      }
    }
    case 'insertRowAt': {
      if (state.rows >= MAX_ROWS) return state
      const ir = Math.min(action.index, state.rows)
      return {
        ...state,
        rows: state.rows + 1,
        cells: insertRowToCells(state.cells, ir),
        rowHeights: [...state.rowHeights.slice(0, ir), DEFAULT_ROW_HEIGHT, ...state.rowHeights.slice(ir)],
        rowColors: [...state.rowColors.slice(0, ir), '', ...state.rowColors.slice(ir)],
      }
    }
    case 'deleteRowAt': {
      if (state.rows <= 1) return state
      const dr = Math.min(action.index, state.rows - 1)
      const newRows = state.rows - 1
      return {
        ...state,
        rows: newRows,
        cells: deleteRowFromCells(state.cells, dr),
        rowHeights: state.rowHeights.filter((_, i) => i !== dr),
        rowColors: state.rowColors.filter((_, i) => i !== dr),
        mergedRanges: removeInvalidMerges(state.mergedRanges, newRows, state.cols),
      }
    }
    case 'addColumn': {
      if (state.cols >= MAX_COLS) return state
      return {
        ...state,
        cols: state.cols + 1,
        cells: addColumnToCells(state.cells),
        columnWidths: [...state.columnWidths, DEFAULT_COLUMN_WIDTH],
        columnColors: [...state.columnColors, ''],
        columnTextAlign: [...state.columnTextAlign, 'left' as TextAlign],
      }
    }
    case 'removeColumn': {
      if (state.cols <= 1) return state
      const cols = state.cols - 1
      return {
        ...state,
        cols,
        cells: removeColumnFromCells(state.cells),
        columnWidths: state.columnWidths.slice(0, -1),
        columnColors: state.columnColors.slice(0, -1),
        columnTextAlign: state.columnTextAlign.slice(0, -1),
        mergedRanges: removeInvalidMerges(state.mergedRanges, state.rows, cols),
      }
    }
    case 'insertColAt': {
      if (state.cols >= MAX_COLS) return state
      const ic = Math.min(action.index, state.cols)
      return {
        ...state,
        cols: state.cols + 1,
        cells: insertColToCells(state.cells, ic),
        columnWidths: [...state.columnWidths.slice(0, ic), DEFAULT_COLUMN_WIDTH, ...state.columnWidths.slice(ic)],
        columnColors: [...state.columnColors.slice(0, ic), '', ...state.columnColors.slice(ic)],
        columnTextAlign: [...state.columnTextAlign.slice(0, ic), 'left' as TextAlign, ...state.columnTextAlign.slice(ic)],
      }
    }
    case 'deleteColAt': {
      if (state.cols <= 1) return state
      const dc = Math.min(action.index, state.cols - 1)
      const newCols = state.cols - 1
      return {
        ...state,
        cols: newCols,
        cells: deleteColFromCells(state.cells, dc),
        columnWidths: state.columnWidths.filter((_, i) => i !== dc),
        columnColors: state.columnColors.filter((_, i) => i !== dc),
        columnTextAlign: state.columnTextAlign.filter((_, i) => i !== dc),
        mergedRanges: removeInvalidMerges(state.mergedRanges, state.rows, newCols),
      }
    }
    case 'clearAll':
      return {
        ...initialState,
        cells: generateEmptyTable(DEFAULT_ROWS, DEFAULT_COLS),
        ...makeColumnArrays(DEFAULT_COLS),
        ...makeRowArrays(DEFAULT_ROWS),
        ...makeEmptyCellStyleState(),
        captionItalic: false,
      }
    case 'setHeaderStyle':
      return { ...state, headerStyle: action.headerStyle }
    case 'setHeaderColor':
      return { ...state, headerColor: action.color }
    case 'setContentColor':
      return { ...state, contentColor: action.color }
    case 'setContentBgColor':
      return { ...state, contentBgColor: action.color }
    case 'selectRange':
      return { ...state, selectedRange: normalizeSelection(action.range) }
    case 'mergeSelection': {
      if (!state.selectedRange || isSingleCellRange(state.selectedRange)) return state
      const range = rangeFromSelection(state.selectedRange)
      return {
        ...state,
        mergedRanges: [...state.mergedRanges.filter((item) => item.key !== range.key), range],
      }
    }
    case 'unmergeSelection': {
      if (!state.selectedRange) return state
      const selection = normalizeSelection(state.selectedRange)
      return {
        ...state,
        mergedRanges: state.mergedRanges.filter(
          (range) =>
            selection.startRow < range.startRow ||
            selection.startRow > range.endRow ||
            selection.startCol < range.startCol ||
            selection.startCol > range.endCol,
        ),
      }
    }
    case 'setColumnWidth':
      return {
        ...state,
        columnWidths: state.columnWidths.map((width, index) => (index === action.col ? action.width : width)),
      }
    case 'setRowHeight':
      return {
        ...state,
        rowHeights: state.rowHeights.map((height, index) => (index === action.row ? action.height : height)),
      }
    case 'setBorderStyle':
      return { ...state, borderStyle: action.borderStyle }
    case 'setBorderColor':
      return { ...state, borderColor: action.color }
    case 'setRowColor':
      return {
        ...state,
        rowColors: state.rowColors.map((color, i) => (i === action.row ? action.color : color)),
      }
    case 'setColumnColor':
      return {
        ...state,
        columnColors: state.columnColors.map((color, i) => (i === action.col ? action.color : color)),
      }
    case 'setCellColor':
      return {
        ...state,
        cellColors: { ...state.cellColors, [action.cellId]: action.color },
      }
    case 'setCellTextColor':
      return {
        ...state,
        cellTextColors: { ...state.cellTextColors, [action.cellId]: action.color },
      }
    case 'setRowTextColor':
      return {
        ...state,
        rowTextColors: { ...state.rowTextColors, [action.row]: action.color },
      }
    case 'setColumnFormat':
      return {
        ...state,
        cells: state.cells.map((row) =>
          row.map((cell, ci) => (ci === action.col ? { ...cell, format: action.format } : cell)),
        ),
      }
    case 'setColumnTextAlign':
      return {
        ...state,
        columnTextAlign: state.columnTextAlign.map((align, i) => (i === action.col ? action.align : align)),
      }
    case 'setCellTextAlign':
      return { ...state, cellTextAlign: { ...state.cellTextAlign, [action.cellId]: action.align } }
    case 'setFreezeRow':
      return { ...state, freezeRow: action.freeze }
    case 'setFreezeCol':
      return { ...state, freezeCol: action.freeze }
    case 'setTheme': {
      const themeConfig = TABLE_THEMES.find((t) => t.id === action.theme)
      if (!themeConfig) return state
      return {
        ...state,
        theme: action.theme,
        headerColor: themeConfig.headerBg,
        borderColor: themeConfig.borderColor,
        headerStyle: state.headerStyle === 'none' ? 'first-row' : state.headerStyle,
      }
    }
    case 'applyPreset': {
      const cells = normalizeTableData(action.preset.data ?? [], action.preset.rows, action.preset.cols)
      return {
        ...state,
        caption: action.preset.caption ?? action.preset.label,
        rows: action.preset.rows,
        cols: action.preset.cols,
        cells,
        headerStyle: action.preset.headerStyle,
        ...makeColumnArrays(action.preset.cols),
        ...makeRowArrays(action.preset.rows),
        ...makeEmptyCellStyleState(),
        mergedRanges: (action.preset.mergedRanges ?? []).map((r) => ({
          ...r,
          key: buildMergeKey(r.startRow, r.startCol, r.endRow, r.endCol),
        })),
        captionItalic: false,
      }
    }
    case 'UNDO':
      return action.state
    case 'setCaption':
      return { ...state, caption: action.caption }
    case 'setCaptionAlignment':
      return { ...state, captionAlignment: action.alignment }
    case 'setCaptionTextColor':
      return { ...state, captionTextColor: action.color }
    case 'setCaptionBgColor':
      return { ...state, captionBgColor: action.color }
    case 'setCaptionItalic':
      return { ...state, captionItalic: action.italic }
    default:
      return state
  }
}


