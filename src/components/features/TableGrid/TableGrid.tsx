import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectedRange, useTableContext, useTableData } from '@/context/TableContext'
import { useColumnResize } from '@/hooks/useColumnResize/useColumnResize'
import { useRowResize } from '@/hooks/useRowResize/useRowResize'
import { useTableSelection } from '@/hooks/useTableSelection/useTableSelection'
import { useTableGridKeyHandlers } from '@/hooks/useTableGridKeyHandlers/useTableGridKeyHandlers'
import { useAutoFit } from '@/hooks/useAutoFit/useAutoFit'
import { useTableFocus } from '@/hooks/useTableFocus/useTableFocus'
import { TABLE_THEMES } from '@/config/table/tableThemes/tableThemes'
import { computeColumnSum, getSumColumnIndices } from '@/utils/tableUtils/tableUtils'
import { getContrastText } from '@/utils/colorUtils/colorUtils'
import { buildHiddenSet, buildMergeAnchorMap } from '@/utils/mergeUtils/mergeUtils'
import { useClipboardPaste } from '@/hooks/useClipboardPaste/useClipboardPaste'
import { TableCaption } from '../TableCaption/TableCaption'
import { TableCell } from './TableCell/TableCell'
import { TableCtxMenu } from './TableCtxMenu/TableCtxMenu'
import type { CtxData } from './TableCtxMenu/TableCtxMenu.types'
import { TableHeaderRow } from './TableHeaderRow/TableHeaderRow'
import { SumRowFooter } from './SumRowFooter/SumRowFooter'
import { PastingOverlay } from './PastingOverlay/PastingOverlay'
import { TableSkeleton } from '../../ui/TableSkeleton/TableSkeleton'
import type { TableGridProps } from './TableGrid.types'

export function TableGrid({ tableRef, findMatches, currentFindMatch, caption, blurTableRef, sortedRows, sortedToOriginal, toggleSort, sortAsc, sortDesc, activeSortCol, activeSortDir, isSortDisabled }: TableGridProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])
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
    cellTextColors,
    rowTextColors,
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
    setCellTextColor,
    setRowTextColor,
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
  const effectiveHeaderColor = headerColor
  const headerTextColor = useMemo(() => getContrastText(effectiveHeaderColor), [effectiveHeaderColor])
  const themeConfig = useMemo(() => TABLE_THEMES.find((t) => t.id === theme) ?? TABLE_THEMES[0], [theme])

  const { ghostLineRef: columnGhostLineRef, onMouseDown: onColumnResizeStart } = useColumnResize(setColumnWidth)
  const { ghostLineRef: rowGhostLineRef, onMouseDown: onRowResizeStart } = useRowResize(setRowHeight)

  const { pasting } = useClipboardPaste(setCells)

  const { autoFitColumn, autoFitRow } = useAutoFit(gridRef as React.RefObject<HTMLTableElement | null>, setColumnWidth, setRowHeight)

  const containerRef = useRef<HTMLDivElement>(null)
  const { isTableFocused, setIsTableFocused } = useTableFocus(containerRef)

  const [actualTableWidth, setActualTableWidth] = useState(() => columnWidths.reduce((sum, w) => sum + w, 0))

  useEffect(() => {
    const table = gridRef.current
    if (!table) return
    const observer = new ResizeObserver(([entry]) => {
      setActualTableWidth(entry.contentRect.width)
    })
    observer.observe(table)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!blurTableRef) return
    blurTableRef.current = () => setIsTableFocused(false)
    return () => { blurTableRef.current = null }
  }, [blurTableRef, setIsTableFocused])

  const handleCellBlur = useCallback((cellId: string, value: string, col: number, rowIdx: number): void => {
    if (cells[rowIdx]?.[col]?.format !== 'auto-number') {
      updateCell(cellId, value)
    }
  }, [cells, updateCell])

  const mergeAnchorMap = useMemo(() => buildMergeAnchorMap(mergedRanges), [mergedRanges])
  const hiddenSet = useMemo(() => buildHiddenSet(mergedRanges), [mergedRanges])
  const sumCols = useMemo(() => getSumColumnIndices(cells, cols), [cells, cols])

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
    canUndo, undo, ctxMenu, (v) => { setCtxMenu(v); setActiveSub(null) }, (v) => { setActiveSub(v) }, cols, rows, hiddenSet, selectCell,
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

  const [skeletonVisible, setSkeletonVisible] = useState(true)

  useEffect(() => {
    const timeoutRef = { current: undefined as ReturnType<typeof setTimeout> | undefined }
    const raf = requestAnimationFrame(() => {
      timeoutRef.current = setTimeout(() => setSkeletonVisible(false), 350)
    })
    return () => {
      cancelAnimationFrame(raf)
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-auto p-2 sm:p-4">
      <TableSkeleton rows={rows} cols={cols} visible={skeletonVisible} />
      <TableHeaderRow
        cols={cols}
        columnWidths={columnWidths}
        cells={cells}
        activeSortCol={activeSortCol}
        activeSortDir={activeSortDir}
        isSortDisabled={isSortDisabled}
        onSort={toggleSort}
        onFormatChange={setColumnFormat}
        onResizeStart={onColumnResizeStart}
        onAutoFit={autoFitColumn}
        onContextMenu={handleColumnContextMenu}
      />
      {caption && (
        <div data-table-caption {...(caption.value ? {} : { 'data-export-hide': true, 'data-print-hide': true })}>
          <TableCaption {...caption} tableWidth={actualTableWidth} hasBorder={borderStyle !== 'none'} />
        </div>
      )}
      <div ref={tableRef} className="inline-block align-top" style={{ backgroundColor: '#FFFFFF' }} data-table-container>
        <table ref={gridRef} className="min-w-max border-collapse" style={{ backgroundColor: '#FFFFFF' }} role="grid" aria-label={t('grid.tableEditor')} aria-rowcount={rows} aria-colcount={cols}>
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={`col-${index}`} style={{ width }} />
            ))}
          </colgroup>
          <tbody>
            {sortedRows.map((row, rowIdx) => {
                  const origRowIdx = sortedToOriginal[rowIdx]
                  const themeRowBg = theme !== 'default'
                    ? (theme === 'striped' && origRowIdx % 2 === 1 ? themeConfig.altRowBg : themeConfig.rowBg)
                    : undefined
                  return (
                  <tr key={row[0]?.id ?? rowIdx} role="row" aria-rowindex={origRowIdx + 1} style={{ height: rowHeights[origRowIdx], backgroundColor: '#FFFFFF' }}>
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
                          headerColor={effectiveHeaderColor}
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
                          cellTextColor={cellTextColors[cell.id] ?? ''}
                          rowTextColor={rowTextColors[origRowIdx] ?? ''}
                          textAlign={cellTextAlign[cell.id] || columnTextAlign[colIndex] || 'left'}
                          onRowResizeStart={onRowResizeStart}
                          onAutoFitRow={autoFitRow}
                          onColumnResizeStart={onColumnResizeStart}
                          onAutoFitColumn={autoFitColumn}
                          isTableFocused={isTableFocused}
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
          headerStyle={headerStyle}
          columnColors={columnColors}
          cellColors={cellColors}
          cellTextColors={cellTextColors}
          rowTextColors={rowTextColors}
          rowColors={rowColors}
          columnTextAlign={columnTextAlign}
          cellTextAlign={cellTextAlign}
          cells={cells}
          onClose={closeCtx}
          onToggleSub={toggleSub}
          autoFitColumn={autoFitColumn}
          setColumnColor={setColumnColor}
          setCellColor={setCellColor}
          setCellTextColor={setCellTextColor}
          setRowTextColor={setRowTextColor}
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
          isSortDisabled={isSortDisabled}
          sortAsc={sortAsc}
          sortDesc={sortDesc}
        />
      ) : null}
      <PastingOverlay pasting={pasting} />
    </div>
  )
}
