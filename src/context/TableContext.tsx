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
  DEFAULT_COLS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROWS,
  MAX_COLS,
  MAX_ROWS,
} from '../config/tableDefaults'
import { siteConfig } from '../config/siteConfig'
import type { CellData, ColumnFormat, HeaderStyle, MergeRange, SelectionRange, TableState } from '../types/table.types'
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
  | { type: 'selectRange'; range: SelectionRange }
  | { type: 'mergeSelection' }
  | { type: 'unmergeSelection' }
  | { type: 'setColumnWidth'; col: number; width: number }
  | { type: 'setRowHeight'; row: number; height: number }
  | { type: 'setColumnFormat'; col: number; format: ColumnFormat }
  | { type: 'applyPreset'; preset: PresetDefinition }
  | { type: 'UNDO'; state: TableState }

interface TableContextValue extends TableState {
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
  selectRange: (range: SelectionRange) => void
  mergeSelection: () => void
  unmergeSelection: () => void
  setColumnWidth: (col: number, width: number) => void
  setRowHeight: (row: number, height: number) => void
  setColumnFormat: (col: number, format: ColumnFormat) => void
  applyPreset: (preset: PresetDefinition) => void
  undo: () => void
  canUndo: boolean
}

const TableContext = createContext<TableContextValue | null>(null)

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
        mergedRanges: [],
        selectedRange: null,
      }
    }
    case 'updateCell':
      return { ...state, cells: updateCellValue(state.cells, action.cellId, action.value) }
    case 'addRow': {
      if (state.rows >= MAX_ROWS) return state
      return {
        ...state,
        rows: state.rows + 1,
        cells: addRowToCells(state.cells),
        rowHeights: [...state.rowHeights, DEFAULT_ROW_HEIGHT],
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
        mergedRanges: removeInvalidMerges(state.mergedRanges, state.rows, cols),
      }
    }
    case 'clearAll':
      return {
        ...state,
        cells: state.cells.map((row) => row.map((cell) => ({ ...cell, value: '' }))),
      }
    case 'setHeaderStyle':
      return { ...state, headerStyle: action.headerStyle }
    case 'setHeaderColor':
      return { ...state, headerColor: action.color }
    case 'setContentColor':
      return { ...state, contentColor: action.color }
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
    case 'setColumnFormat':
      return {
        ...state,
        cells: updateColumnFormat(
          state.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              colIndex === action.col && !isHeaderCell(state.headerStyle, rowIndex, colIndex)
                ? { ...cell, value: formatCellValue(cell.value, action.format) }
                : cell,
            ),
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

  const value = useMemo<TableContextValue>(
    () => ({
      ...state,
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
      selectRange: (range) => dispatch({ type: 'selectRange', range }),
      mergeSelection: () => dispatchWithHistory({ type: 'mergeSelection' }),
      unmergeSelection: () => dispatchWithHistory({ type: 'unmergeSelection' }),
      setColumnWidth: (col, width) => dispatchWithHistory({ type: 'setColumnWidth', col, width }),
      setRowHeight: (row, height) => dispatchWithHistory({ type: 'setRowHeight', row, height }),
      setColumnFormat: (col, format) => dispatchWithHistory({ type: 'setColumnFormat', col, format }),
      applyPreset: (preset) => dispatchWithHistory({ type: 'applyPreset', preset }),
      undo,
      canUndo,
    }),
    [state, undo, canUndo, dispatchWithHistory],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export function useTableContext(): TableContextValue {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used inside TableProvider')
  }
  return context
}

export function useStableTableActions(): Pick<
  TableContextValue,
  'addRow' | 'addColumn' | 'removeRow' | 'removeColumn' | 'clearAll'
> {
  const table = useTableContext()
  return useMemo(
    () => ({
      addRow: table.addRow,
      addColumn: table.addColumn,
      removeRow: table.removeRow,
      removeColumn: table.removeColumn,
      clearAll: table.clearAll,
    }),
    [table.addColumn, table.addRow, table.clearAll, table.removeColumn, table.removeRow],
  )
}
