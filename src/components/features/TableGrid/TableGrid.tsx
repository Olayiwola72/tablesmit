import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MAX_ROW_HEIGHT, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '../../../config/table/tableDefaults'
import { isHeaderCell, useSelectedRange, useTableContext, useTableData } from '../../../context/TableContext'
import { useColumnResize } from '../../../hooks/useColumnResize/useColumnResize'
import { useRowResize } from '../../../hooks/useRowResize/useRowResize'
import { useTableSelection } from '../../../hooks/useTableSelection/useTableSelection'
import { useTableGridKeyHandlers } from '../../../hooks/useTableGridKeyHandlers/useTableGridKeyHandlers'
import { TABLE_THEMES } from '../../../config/table/tableThemes'
import { computeColumnSum, getContrastText } from '../../../utils/formatUtils/formatUtils'
import { isRangeAnchor } from '../../../utils/mergeUtils/mergeUtils'
import { useClipboardPaste } from '../../../hooks/useClipboardPaste/useClipboardPaste'
import { useColumnSort } from '../../../hooks/useColumnSort/useColumnSort'
import { TableCell } from './TableCell/TableCell'
import { TableCtxMenu } from './TableCtxMenu/TableCtxMenu'
import type { CtxData } from './TableCtxMenu/TableCtxMenu.types'
import { TableHeaderRow } from './TableHeaderRow/TableHeaderRow'
import { SumRowFooter } from './SumRowFooter/SumRowFooter'
import { PastingOverlay } from './PastingOverlay/PastingOverlay'
import type { TableGridProps } from './TableGrid.types'

export function TableGrid({ tableRef, findMatches, currentFindMatch }: TableGridProps): ReactNode {
  const { t } = useTranslation()
  const { cells } = useTableData()
  const selectedRange = useSelectedRange()
  const {
    rows,
    cols,
    columnWidths,
    rowHeights,
    headerStyle,
    headerColor,
    contentColor,
    contentBgColor,
    mergedRanges,
    borderStyle,
    borderColor,
    rowColors,
    columnColors,
    columnTextAlign,
    cellColors,
    cellTextAlign,
    freezeRow,
    freezeCol,
    theme,
    updateCell,
    setColumnWidth,
    setRowHeight,
    setColumnFormat,
    setRowColor,
    setColumnColor,
    setCellColor,
    setColumnTextAlign,
    setCellTextAlign,
    insertRowAt,
    deleteRowAt,
    insertColAt,
    deleteColAt,
    setCells,
    undo,
    canUndo,
  } = useTableContext()
  const { selectCell } = useTableSelection()
  const gridRef = useRef<HTMLTableElement>(null)
  const headerTextColor = useMemo(() => getContrastText(headerColor), [headerColor])
  const themeConfig = useMemo(() => TABLE_THEMES.find((t) => t.id === theme) ?? TABLE_THEMES[0], [theme])

  const { ghostLineRef: columnGhostLineRef, onMouseDown: onColumnResizeStart } = useColumnResize(setColumnWidth)
  const { ghostLineRef: rowGhostLineRef, onMouseDown: onRowResizeStart } = useRowResize(setRowHeight)

  const { pasting } = useClipboardPaste(setCells)

  const {
    activeSortCol,
    activeSortDir,
    toggleSort,
    sortAsc,
    sortDesc,
    sortedRows,
    sortedToOriginal,
    sortDisabled,
  } = useColumnSort(cells, cols, mergedRanges)

  const autoFitColumn = useCallback((columnIndex: number): void => {
    const table = gridRef.current
    if (!table) return

    const visibleRows = Array.from(table.rows).filter((row) => getComputedStyle(row).display !== 'none')
    const widths = visibleRows.flatMap((row) => {
      const cell = row.cells.item(columnIndex)
      if (!cell || getComputedStyle(cell).display === 'none') return []
      const measure = cell.querySelector<HTMLElement>('.cell-measure')
      return measure ? [measure.scrollWidth] : [cell.scrollWidth]
    })
    const nextWidth = Math.min(
      Math.max(Math.max(MIN_COLUMN_WIDTH, ...widths) + AUTOFIT_PADDING, MIN_COLUMN_WIDTH),
      MAX_COLUMN_WIDTH,
    )
    setColumnWidth(columnIndex, nextWidth)
  }, [setColumnWidth])

  const autoFitRow = useCallback((rowIndex: number): void => {
    const table = gridRef.current
    if (!table) return

    const row = table.rows.item(rowIndex)
    if (!row || getComputedStyle(row).display === 'none') return

    const heights = Array.from(row.cells).flatMap((cell) => {
      if (getComputedStyle(cell).display === 'none') return []
      const content = cell.querySelector<HTMLElement>('.cell-measure')
      if (!content) return []

      const measure = content.cloneNode(true) as HTMLElement
      measure.style.position = 'absolute'
      measure.style.visibility = 'hidden'
      measure.style.whiteSpace = 'pre-wrap'
      measure.style.width = `${cell.getBoundingClientRect().width}px`
      measure.style.height = 'auto'
      document.body.appendChild(measure)
      const h = measure.scrollHeight
      document.body.removeChild(measure)
      return [h]
    })

    const nextHeight = Math.min(
      Math.max(Math.max(MIN_ROW_HEIGHT, ...heights) + AUTOFIT_PADDING, MIN_ROW_HEIGHT),
      MAX_ROW_HEIGHT,
    )
    setRowHeight(rowIndex, nextHeight)
  }, [setRowHeight])

  const handleCellBlur = useCallback((cellId: string, value: string, col: number, rowIdx: number): void => {
    if (!isHeaderCell(headerStyle, rowIdx, col) && cells[rowIdx]?.[col]?.format !== 'auto-number') {
      updateCell(cellId, value)
    }
  }, [headerStyle, cells, updateCell])

  const mergeAnchorMap = useMemo(() => {
    const map = new Map<string, (typeof mergedRanges)[number]>()
    for (const range of mergedRanges) {
      if (isRangeAnchor(`R${range.startRow}C${range.startCol}`, range)) {
        map.set(`R${range.startRow}C${range.startCol}`, range)
      }
    }
    return map
  }, [mergedRanges])

  const hiddenSet = useMemo(() => {
    const hidden = new Set<string>()
    for (const range of mergedRanges) {
      for (let r = range.startRow; r <= range.endRow; r++) {
        for (let c = range.startCol; c <= range.endCol; c++) {
          const id = `R${r}C${c}`
          if (!isRangeAnchor(id, range)) {
            hidden.add(id)
          }
        }
      }
    }
    return hidden
  }, [mergedRanges])

  const sumCols = useMemo(() => {
    const indices: number[] = []
    for (let c = 0; c < cols; c++) {
      if (cells[0]?.[c]?.format === 'sum') indices.push(c)
    }
    return indices
  }, [cells, cols])

  const columnTotals = useMemo(() => {
    const totals: Record<number, number> = {}
    for (const c of sumCols) {
      totals[c] = computeColumnSum(cells.map((row) => row[c]).filter(Boolean))
    }
    return totals
  }, [sumCols, cells])

  const [ctxMenu, setCtxMenu] = useState<CtxData>(null)
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const { handleCellKeyDown } = useTableGridKeyHandlers(
    canUndo, undo, ctxMenu, (v) => { setCtxMenu(v); setActiveSub(null) }, (v) => { setActiveSub(v) }, cols, rows, hiddenSet,
  )

  const closeCtx = useCallback((): void => { setCtxMenu(null); setActiveSub(null) }, [])

  const handleCellContextMenu = useCallback(
    (row: number, col: number, event: React.MouseEvent): void => {
      event.preventDefault()
      setCtxMenu({ type: 'cell', row, col, x: event.clientX, y: event.clientY })
      setActiveSub(null)
    },
    [],
  )

  const handleColumnContextMenu = useCallback(
    (col: number, event: React.MouseEvent): void => {
      event.preventDefault()
      setCtxMenu({ type: 'column', col, x: event.clientX, y: event.clientY })
      setActiveSub(null)
    },
    [],
  )

  const toggleSub = useCallback((key: string): void => {
    setActiveSub((prev) => (prev === key ? null : key))
  }, [])

  // navigateToCell and handleCellKeyDown provided by useTableGridKeyHandlers

  return (
    <div className="relative h-full overflow-auto p-2 sm:p-4">
      <TableHeaderRow
        cols={cols}
        columnWidths={columnWidths}
        cells={cells}
        activeSortCol={activeSortCol}
        activeSortDir={activeSortDir}
        sortDisabled={sortDisabled}
        onSort={toggleSort}
        onFormatChange={setColumnFormat}
        onResizeStart={onColumnResizeStart}
        onAutoFit={autoFitColumn}
        onContextMenu={handleColumnContextMenu}
      />
      <div ref={tableRef} className="inline-block bg-white dark:bg-slate-900" data-table-container>
        <table ref={gridRef} className="min-w-max border-collapse bg-white dark:bg-slate-900" role="grid" aria-label={t('grid.tableEditor')} aria-rowcount={rows} aria-colcount={cols}>
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
          <tbody>
            {sortedRows.map((row, rowIdx) => {
                  const origRowIdx = sortedToOriginal[rowIdx]
                  const themeRowBg = theme !== 'default'
                    ? (theme === 'striped' && origRowIdx % 2 === 1 ? themeConfig.altRowBg : themeConfig.rowBg)
                    : undefined
                  return (
                  <tr key={row[0]?.id ?? rowIdx} role="row" aria-rowindex={origRowIdx + 1} style={{ height: rowHeights[origRowIdx] }}>
                    {row.map((cell, colIndex) => {
                      if (hiddenSet.has(cell.id)) return null
                      const merge = mergeAnchorMap.get(cell.id)
                      const isFindMatch = findMatches?.some((m) => m.row === origRowIdx && m.col === colIndex) ?? false
                      const isCurrentFindMatch = currentFindMatch?.row === origRowIdx && currentFindMatch?.col === colIndex
                      return (
                        <TableCell
                          key={cell.id}
                          cell={cell}
                          row={origRowIdx}
                          col={colIndex}
                          isFindMatch={isFindMatch}
                          isCurrentMatch={isCurrentFindMatch}
                          freezeRow={freezeRow}
                          freezeCol={freezeCol}
                          headerStyle={headerStyle}
                          headerColor={headerColor}
                          headerTextColor={headerTextColor}
                          contentColor={contentColor}
                          contentBgColor={contentBgColor}
                          themeRowBg={themeRowBg}
                          rowHeight={rowHeights[origRowIdx]}
                          columnWidth={columnWidths[colIndex]}
                          merge={merge}
                          selectedRange={selectedRange}
                          onSelect={selectCell}
                          onBlur={(cellId, value, col) => handleCellBlur(cellId, value, col, origRowIdx)}
                          borderStyle={borderStyle}
                          borderColor={borderColor}
                          rowColor={rowColors[origRowIdx]}
                          columnColor={columnColors[colIndex] || ''}
                          cellColor={cellColors[cell.id] ?? ''}
                          textAlign={cellTextAlign[cell.id] || columnTextAlign[colIndex] || 'left'}
                          onRowResizeStart={onRowResizeStart}
                          onAutoFitRow={autoFitRow}
                          onColumnResizeStart={onColumnResizeStart}
                          onAutoFitColumn={autoFitColumn}
                          onKeyDown={handleCellKeyDown}
                          onContextMenu={handleCellContextMenu}
                        />
                      )
                    })}
                  </tr>
              )
            })}
          </tbody>
          <SumRowFooter cells={cells} sumCols={sumCols} columnTotals={columnTotals} borderStyle={borderStyle} borderColor={borderColor} columnTextAlign={columnTextAlign} cellTextAlign={cellTextAlign} />
        </table>
      </div>
      <div ref={columnGhostLineRef} className="fixed bottom-0 top-0 z-50 hidden w-px bg-primary pointer-events-none" aria-hidden="true" />
      <div ref={rowGhostLineRef} className="fixed left-0 right-0 z-50 hidden h-px bg-primary pointer-events-none" aria-hidden="true" />
      {ctxMenu ? (
        <TableCtxMenu
          ctxMenu={ctxMenu}
          activeSub={activeSub}
          columnColors={columnColors}
          cellColors={cellColors}
          rowColors={rowColors}
          columnTextAlign={columnTextAlign}
          cellTextAlign={cellTextAlign}
          cells={cells}
          onClose={closeCtx}
          onToggleSub={toggleSub}
          autoFitColumn={autoFitColumn}
          setColumnColor={setColumnColor}
          setCellColor={setCellColor}
          setRowColor={setRowColor}
          setColumnFormat={setColumnFormat}
          setCellTextAlign={setCellTextAlign}
          setColumnTextAlign={setColumnTextAlign}
          updateCell={updateCell}
          insertRowAbove={(index) => insertRowAt(index)}
          insertRowBelow={(index) => insertRowAt(index + 1)}
          deleteRowAt={(index) => deleteRowAt(index)}
          insertColLeft={(col) => insertColAt(col)}
          insertColRight={(col) => insertColAt(col + 1)}
          deleteColAt={(col) => deleteColAt(col)}
          sortAsc={sortAsc}
          sortDesc={sortDesc}
        />
      ) : null}
      <PastingOverlay pasting={pasting} />
    </div>
  )
}
