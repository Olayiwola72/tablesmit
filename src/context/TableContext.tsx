/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_STYLE,
  DEFAULT_COLS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROWS,
  MAX_COLS,
  MAX_ROWS,
} from '../config/tableDefaults'
import { siteConfig } from '../config/siteConfig'
import type { BorderStyle, CellData, ColumnFormat, HeaderStyle, MergeRange, SelectionRange, TableState, TextAlign } from '../types/table.types'
import type { PresetDefinition } from '../types/ui.types'
import { useTableHistory } from '../hooks/useTableHistory'
import { formatCellValue } from '../utils/formatUtils'
import { rangeFromSelection, isSingleCellRange, normalizeSelection } from '../utils/mergeUtils'
import {
  addColumn as addColumnToCells,
  addRow as addRowToCells,
  generateEmptyTable,
  normalizeTableData,
  removeColumn as removeColumnFromCells,
  removeRow as removeRowFromCells,
  updateCellValue,
  updateColumnFormat,
} from '../utils/tableUtils'

type TableAction =
  | { type: 'generate'; rows: number; cols: number }
  | { type: 'setCells'; cells: CellData[][] }
  | { type: 'updateCell'; cellId: string; value: string }
  | { type: 'addRow' }
  | { type: 'removeRow' }
  | { type: 'addColumn' }
  | { type: 'removeColumn' }
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
  | { type: 'setColumnTextAlign'; col: number; align: TextAlign }
  | { type: 'setCellTextAlign'; cellId: string; align: TextAlign }
  | { type: 'applyPreset'; preset: PresetDefinition }
  | { type: 'UNDO'; state: TableState }

interface TableActions {
  generateTable: (rows: number, cols: number) => void
  setCells: (cells: CellData[][]) => void
  updateCell: (cellId: string, value: string) => void
  addRow: () => void
  removeRow: () => void
  addColumn: () => void
  removeColumn: () => void
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
  undo: () => void
  canUndo: boolean
}

interface TableStateFields {
  rows: number
  cols: number
  columnWidths: number[]
  rowHeights: number[]
  mergedRanges: MergeRange[]
  headerStyle: HeaderStyle
  headerColor: string
  contentColor: string
  borderStyle: BorderStyle
  borderColor: string
  contentBgColor: string
  rowColors: string[]
  columnColors: string[]
  columnTextAlign: TextAlign[]
  cellColors: Record<string, string>
  cellTextAlign: Record<string, string>
  selectedRange: SelectionRange | null
}

interface TableCellsValue {
  cells: CellData[][]
}

type TableContextValue = TableStateFields & TableActions

const TableContext = createContext<TableContextValue | null>(null)
const TableCellsContext = createContext<TableCellsValue | null>(null)

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(Math.trunc(Number.isFinite(value) ? value : min), min), max)

const initialState: TableState = {
  cells: generateEmptyTable(DEFAULT_ROWS, DEFAULT_COLS),
  columnWidths: Array.from({ length: DEFAULT_COLS }, () => DEFAULT_COLUMN_WIDTH),
  rowHeights: Array.from({ length: DEFAULT_ROWS }, () => DEFAULT_ROW_HEIGHT),
  mergedRanges: [],
  headerStyle: 'none',
  headerColor: siteConfig.colors.defaultHeader,
  contentColor: siteConfig.colors.defaultContent,
  borderStyle: DEFAULT_BORDER_STYLE,
  borderColor: DEFAULT_BORDER_COLOR,
  contentBgColor: '',
  rowColors: Array.from({ length: DEFAULT_ROWS }, () => ''),
  columnColors: Array.from({ length: DEFAULT_COLS }, () => ''),
  columnTextAlign: Array.from({ length: DEFAULT_COLS }, () => 'left' as TextAlign),
  cellColors: {},
  cellTextAlign: {},
  selectedRange: null,
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
}

function removeInvalidMerges(ranges: MergeRange[], rows: number, cols: number): MergeRange[] {
  return ranges.filter((range) => range.endRow < rows && range.endCol < cols)
}

function reducer(state: TableState, action: TableAction): TableState {
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
    case 'setColumnTextAlign':
      return {
        ...state,
        columnTextAlign: state.columnTextAlign.map((align, i) => (i === action.col ? action.align : align)),
      }
    case 'setCellTextAlign':
      return {
        ...state,
        cellTextAlign: { ...state.cellTextAlign, [action.cellId]: action.align },
      }
    case 'setColumnFormat':
      return {
        ...state,
        cells: updateColumnFormat(
          state.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (colIndex !== action.col || isHeaderCell(state.headerStyle, rowIndex, colIndex)) return cell
              const nextValue = action.format === 'auto-number'
                ? String(rowIndex + 1)
                : formatCellValue(cell.value, action.format)
              return { ...cell, value: nextValue }
            }),
          ),
          action.col,
          action.format,
        ),
      }
    case 'applyPreset': {
      const cells = normalizeTableData(action.preset.data ?? [], action.preset.rows, action.preset.cols)
      return {
        ...state,
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
        mergedRanges: [],
        selectedRange: null,
      }
    }
    case 'UNDO':
      return action.state
    default:
      return state
  }
}

export function isHeaderCell(headerStyle: HeaderStyle, row: number, col: number): boolean {
  if (headerStyle === 'both') return row === 0 || col === 0
  if (headerStyle === 'first-row') return row === 0
  if (headerStyle === 'first-column') return col === 0
  return false
}

export function TableProvider({ children }: { children: ReactNode }): ReactNode {
  const [state, dispatch] = useReducer(reducer, initialState)
  const stateRef = useRef(state)
  const { recordSnapshot, undo: popHistory, canUndo } = useTableHistory()

  useEffect(() => { stateRef.current = state }, [state])

  const undo = useMemo(
    () => (): void => {
      const prev = popHistory()
      if (prev) dispatch({ type: 'UNDO', state: prev })
    },
    [popHistory],
  )

  const dispatchWithHistory = useMemo(
    () =>
      (action: TableAction): void => {
        if (action.type !== 'selectRange' && action.type !== 'UNDO') {
          recordSnapshot(stateRef.current)
        }
        dispatch(action)
      },
    [recordSnapshot],
  )

  const actions = useMemo<TableActions>(
    () => ({
      generateTable: (rows, cols) => dispatchWithHistory({ type: 'generate', rows, cols }),
      setCells: (cells) => dispatchWithHistory({ type: 'setCells', cells }),
      updateCell: (cellId, value) => dispatchWithHistory({ type: 'updateCell', cellId, value }),
      addRow: () => dispatchWithHistory({ type: 'addRow' }),
      removeRow: () => dispatchWithHistory({ type: 'removeRow' }),
      addColumn: () => dispatchWithHistory({ type: 'addColumn' }),
      removeColumn: () => dispatchWithHistory({ type: 'removeColumn' }),
      clearAll: () => dispatchWithHistory({ type: 'clearAll' }),
      setHeaderStyle: (headerStyle) => dispatchWithHistory({ type: 'setHeaderStyle', headerStyle }),
      setHeaderColor: (color) => dispatchWithHistory({ type: 'setHeaderColor', color }),
      setContentColor: (color) => dispatchWithHistory({ type: 'setContentColor', color }),
      setContentBgColor: (color) => dispatchWithHistory({ type: 'setContentBgColor', color }),
      selectRange: (range) => dispatch({ type: 'selectRange', range }),
      mergeSelection: () => dispatchWithHistory({ type: 'mergeSelection' }),
      unmergeSelection: () => dispatchWithHistory({ type: 'unmergeSelection' }),
      setColumnWidth: (col, width) => dispatchWithHistory({ type: 'setColumnWidth', col, width }),
      setRowHeight: (row, height) => dispatchWithHistory({ type: 'setRowHeight', row, height }),
      setColumnFormat: (col, format) => dispatchWithHistory({ type: 'setColumnFormat', col, format }),
      setBorderStyle: (borderStyle) => dispatchWithHistory({ type: 'setBorderStyle', borderStyle }),
      setBorderColor: (color) => dispatchWithHistory({ type: 'setBorderColor', color }),
      setRowColor: (row, color) => dispatchWithHistory({ type: 'setRowColor', row, color }),
      setColumnColor: (col, color) => dispatchWithHistory({ type: 'setColumnColor', col, color }),
      setCellColor: (cellId, color) => dispatchWithHistory({ type: 'setCellColor', cellId, color }),
      setColumnTextAlign: (col, align) => dispatchWithHistory({ type: 'setColumnTextAlign', col, align }),
      setCellTextAlign: (cellId, align) => dispatchWithHistory({ type: 'setCellTextAlign', cellId, align }),
      applyPreset: (preset) => dispatchWithHistory({ type: 'applyPreset', preset }),
      undo,
      canUndo,
    }),
    [dispatchWithHistory, undo, canUndo],
  )

  const cellsValue = useMemo<TableCellsValue>(
    () => ({ cells: state.cells }),
    [state.cells],
  )

  const mainValue = useMemo<TableContextValue>(
    () => ({
      rows: state.rows,
      cols: state.cols,
      columnWidths: state.columnWidths,
      rowHeights: state.rowHeights,
      mergedRanges: state.mergedRanges,
      headerStyle: state.headerStyle,
      headerColor: state.headerColor,
      contentColor: state.contentColor,
      borderStyle: state.borderStyle,
      borderColor: state.borderColor,
      contentBgColor: state.contentBgColor,
      rowColors: state.rowColors,
      columnColors: state.columnColors,
      columnTextAlign: state.columnTextAlign,
      cellColors: state.cellColors,
      cellTextAlign: state.cellTextAlign,
      selectedRange: state.selectedRange,
      ...actions,
    }),
    [
      state.rows,
      state.cols,
      state.columnWidths,
      state.rowHeights,
      state.mergedRanges,
      state.headerStyle,
      state.headerColor,
      state.contentColor,
      state.borderStyle,
      state.borderColor,
      state.contentBgColor,
      state.rowColors,
      state.columnColors,
      state.columnTextAlign,
      state.cellColors,
      state.cellTextAlign,
      state.selectedRange,
      actions,
    ],
  )

  return (
    <TableCellsContext.Provider value={cellsValue}>
      <TableContext.Provider value={mainValue}>
        {children}
      </TableContext.Provider>
    </TableCellsContext.Provider>
  )
}

export function useTableContext(): TableContextValue {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used inside TableProvider')
  }
  return context
}

export function useTableData(): TableCellsValue {
  const context = useContext(TableCellsContext)
  if (!context) {
    throw new Error('useTableData must be used inside TableProvider')
  }
  return context
}
