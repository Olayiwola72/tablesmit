import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_STYLE,
  DEFAULT_COLS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROWS,
  MAX_COLS,
  MAX_ROWS,
} from '../../config/table/tableDefaults'
import { TABLE_THEMES } from '../../config/table/tableThemes'
import { siteConfig } from '../../config/siteConfig'
import type {
  CellData,
  HeaderStyle,
  MergeRange,
  TextAlign,
} from '../../types/table'
import type { TableState } from '../TableState/TableState.types'
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
    case 'generate': {
      const rows = clamp(action.rows, 1, MAX_ROWS)
      const cols = clamp(action.cols, 1, MAX_COLS)
      return {
        ...state,
        rows,
        cols,
        cells: generateEmptyTable(rows, cols),
        columnWidths: Array.from({ length: cols }, () => DEFAULT_COLUMN_WIDTH),
        rowHeights: Array.from({ length: rows }, () => DEFAULT_ROW_HEIGHT),
        headerStyle: 'none' as HeaderStyle,
        headerColor: siteConfig.colors.defaultHeader,
        contentColor: siteConfig.colors.defaultContent,
        contentBgColor: '',
        borderStyle: DEFAULT_BORDER_STYLE,
        borderColor: DEFAULT_BORDER_COLOR,
        rowColors: Array.from({ length: rows }, () => ''),
        columnColors: Array.from({ length: cols }, () => ''),
        columnTextAlign: Array.from({ length: cols }, () => 'left'),
        cellColors: {},
        cellTextAlign: {},
        mergedRanges: [],
        selectedRange: null,
      }
    }
    case 'setCells': {
      const rows = clamp(action.cells.length, 1, MAX_ROWS)
      const cols = clamp(action.cells[0]?.length ?? 1, 1, MAX_COLS)
      return {
        ...state,
        rows,
        cols,
        cells: action.cells.slice(0, rows).map((row) => row.slice(0, cols)),
        columnWidths: Array.from({ length: cols }, (_, col) => state.columnWidths[col] ?? DEFAULT_COLUMN_WIDTH),
        rowHeights: Array.from({ length: rows }, (_, row) => state.rowHeights[row] ?? DEFAULT_ROW_HEIGHT),
        columnColors: Array.from({ length: cols }, (_, col) => state.columnColors[col] ?? ''),
        columnTextAlign: Array.from({ length: cols }, (_, col) => state.columnTextAlign[col] ?? 'left'),
        cellColors: {},
        cellTextAlign: {},
        mergedRanges: [],
        selectedRange: null,
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
        columnWidths: Array.from({ length: DEFAULT_COLS }, () => DEFAULT_COLUMN_WIDTH),
        rowHeights: Array.from({ length: DEFAULT_ROWS }, () => DEFAULT_ROW_HEIGHT),
        rowColors: Array.from({ length: DEFAULT_ROWS }, () => ''),
        columnColors: Array.from({ length: DEFAULT_COLS }, () => ''),
        columnTextAlign: Array.from({ length: DEFAULT_COLS }, () => 'left' as TextAlign),
        cellColors: {},
        cellTextAlign: {},
        mergedRanges: [],
        selectedRange: null,
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
        columnWidths: Array.from({ length: action.preset.cols }, () => DEFAULT_COLUMN_WIDTH),
        rowHeights: Array.from({ length: action.preset.rows }, () => DEFAULT_ROW_HEIGHT),
        rowColors: Array.from({ length: action.preset.rows }, () => ''),
        columnColors: Array.from({ length: action.preset.cols }, () => ''),
        columnTextAlign: Array.from({ length: action.preset.cols }, () => 'left' as TextAlign),
        cellColors: {},
        cellTextAlign: {},
        mergedRanges: (action.preset.mergedRanges ?? []).map((r) => ({
          ...r,
          key: buildMergeKey(r.startRow, r.startCol, r.endRow, r.endCol),
        })),
        selectedRange: null,
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
    default:
      return state
  }
}


