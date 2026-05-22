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
import { TableCellsContext, useTableData, type TableCellsValue } from '../TableDataContext/TableDataContext'
import { TableSelectionCtx, useSelectedRange } from '../TableSelectionContext/TableSelectionContext'
import { useTableHistory } from '../../hooks/useTableHistory/useTableHistory'
import { reducer, type TableAction } from '../TableReducer/TableReducer'
import { initialState, STORAGE_KEY, SESSION_KEY } from '../TableState/TableState'
import type { TableActions, TableContextValue } from './TableProvider.types'

export { useTableData, useSelectedRange }

const TableContext = createContext<TableContextValue | null>(null)

export function TableProvider({ children }: { children: ReactNode }): ReactNode {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
        sessionStorage.setItem(SESSION_KEY, '1')
        return initialState
      }
    } catch {
      return initialState
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as typeof initialState
        if (parsed.cells?.length) return parsed
      }
    } catch { /* corrupt data — start fresh */ }
    return initialState
  })
  const stateRef = useRef(state)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const { recordSnapshot, undo: popHistory, canUndo, historyDepth } = useTableHistory()

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
      catch { /* quota exceeded or private browsing */ }
    }, 400)
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current) }
  }, [state])

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
      insertRowAt: (index) => dispatchWithHistory({ type: 'insertRowAt', index }),
      removeRow: () => dispatchWithHistory({ type: 'removeRow' }),
      deleteRowAt: (index) => dispatchWithHistory({ type: 'deleteRowAt', index }),
      addColumn: () => dispatchWithHistory({ type: 'addColumn' }),
      insertColAt: (index) => dispatchWithHistory({ type: 'insertColAt', index }),
      removeColumn: () => dispatchWithHistory({ type: 'removeColumn' }),
      deleteColAt: (index) => dispatchWithHistory({ type: 'deleteColAt', index }),
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
      setFreezeRow: (freeze) => dispatchWithHistory({ type: 'setFreezeRow', freeze }),
      setFreezeCol: (freeze) => dispatchWithHistory({ type: 'setFreezeCol', freeze }),
      setTheme: (theme) => dispatchWithHistory({ type: 'setTheme', theme }),
      setCaption: (caption) => dispatch({ type: 'setCaption', caption }),
      setCaptionAlignment: (alignment) => dispatch({ type: 'setCaptionAlignment', alignment }),
      setCaptionTextColor: (color) => dispatch({ type: 'setCaptionTextColor', color }),
      setCaptionBgColor: (color) => dispatch({ type: 'setCaptionBgColor', color }),
      undo,
      canUndo,
      historyDepth,
    }),
    [dispatchWithHistory, undo, canUndo, historyDepth],
  )

  const cellsValue = useMemo<TableCellsValue>(
    () => ({ cells: state.cells }),
    [state.cells],
  )

  const selectionValue = useMemo(() => state.selectedRange, [state.selectedRange])

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
      theme: state.theme,
      rowColors: state.rowColors,
      columnColors: state.columnColors,
      columnTextAlign: state.columnTextAlign,
      cellColors: state.cellColors,
      cellTextAlign: state.cellTextAlign,
      freezeRow: state.freezeRow,
      freezeCol: state.freezeCol,
      caption: state.caption,
      captionAlignment: state.captionAlignment,
      captionTextColor: state.captionTextColor,
      captionBgColor: state.captionBgColor,
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
      state.theme,
      state.rowColors,
      state.columnColors,
      state.columnTextAlign,
      state.cellColors,
      state.cellTextAlign,
      state.freezeRow,
      state.freezeCol,
      state.caption,
      state.captionAlignment,
      state.captionTextColor,
      state.captionBgColor,
      actions,
    ],
  )

  return (
    <TableCellsContext.Provider value={cellsValue}>
      <TableSelectionCtx.Provider value={selectionValue}>
        <TableContext.Provider value={mainValue}>
          {children}
        </TableContext.Provider>
      </TableSelectionCtx.Provider>
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
