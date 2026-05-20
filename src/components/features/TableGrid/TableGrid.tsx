import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MAX_ROW_HEIGHT, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '../../../config/tableDefaults'
import { isHeaderCell, useSelectedRange, useTableContext, useTableData } from '../../../context/TableContext'
import { KEY_ESCAPE } from '../../../constants/keys'
import { useColumnResize } from '../../../hooks/useColumnResize'
import { useRowResize } from '../../../hooks/useRowResize'
import { useTableSelection } from '../../../hooks/useTableSelection'
import { TABLE_THEMES } from '../../../config/tableThemes'
import { computeColumnSum, getContrastText } from '../../../utils/formatUtils'
import { isRangeAnchor } from '../../../utils/mergeUtils'
import { normalizeTableData, sortRows } from '../../../utils/tableUtils'
import { toast, TOAST } from '../../../utils/toast'
import { TableCell } from './TableCell'
import { TableCtxMenu } from './TableCtxMenu'
import type { CtxData } from './TableCtxMenu'
import { TableHeaderCell } from './TableHeaderCell'

interface TableGridProps {
  tableRef: RefObject<HTMLDivElement>
  findMatches?: Array<{ row: number; col: number }>
  currentFindMatch?: { row: number; col: number } | null
}

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

  const [sortCol, setSortCol] = useState<number | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [pasting, setPasting] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<CtxData>(null)
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const activeSortCol = sortCol !== null && sortCol < cols ? sortCol : null
  const activeSortDir = activeSortCol !== null ? sortDir : null

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        const target = event.target as HTMLElement
        if (target.closest('[contenteditable]')) return
        event.preventDefault()
        if (!canUndo) {
          toast.info(t('toast.undoEmpty'))
          return
        }
        undo()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [undo, canUndo, t])

  useEffect(() => {
    const onPaste = async (event: globalThis.ClipboardEvent): Promise<void> => {
      const target = event.target as HTMLElement
      if (target.closest('[contenteditable]')) return

      const items = event.clipboardData?.items
      if (!items) return
      event.preventDefault()

      setPasting(true)
      try {
        const html = items[0]?.type === 'text/html' ? event.clipboardData?.getData('text/html') : null
        const text = event.clipboardData?.getData('text/plain') ?? ''

        let pastedRows: string[][] = []

        if (html) {
          const doc = new DOMParser().parseFromString(html, 'text/html')
          const table = doc.querySelector('table')
          if (table) {
            pastedRows = Array.from(table.rows).map((tr) =>
              Array.from(tr.children).map((td) => (td.textContent ?? '').trim()),
            )
          }
        }

        if (pastedRows.length === 0 && text) {
          const lines = text.split(/\r?\n/).filter(Boolean)
          const delim = lines.some((line) => line.includes('\t')) ? '\t' : ','
          pastedRows = lines.map((line) => line.split(delim).map((v) => v.trim()))
          if (delim === ',' && pastedRows.every((r) => r.length === 1)) pastedRows = []
        }

        if (pastedRows.length > 1 && pastedRows[0]!.length > 1) {
          const r = pastedRows.length
          const c = Math.max(...pastedRows.map((row) => row.length))
          const cellData = normalizeTableData(pastedRows, r, c)
          setCells(cellData)
          toast.success(TOAST.PASTE_SUCCESS(r, c))
        }
      } catch {
        toast.error(TOAST.PASTE_ERROR)
      } finally {
        setPasting(false)
      }
    }
    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [setCells])

  const sortDisabled = mergedRanges.length > 0

  const toggleSort = useCallback((col: number): void => {
    if (sortDisabled) return
    if (sortCol !== col) {
      setSortCol(col)
      setSortDir('asc')
      return
    }
    if (sortDir === 'asc') {
      setSortDir('desc')
      return
    }
    if (sortDir === 'desc') {
      setSortCol(null)
      setSortDir(null)
    }
  }, [sortCol, sortDir, sortDisabled])

  const sortAsc = useCallback((col: number): void => {
    if (sortDisabled) return
    setSortCol(col)
    setSortDir('asc')
  }, [sortDisabled])

  const sortDesc = useCallback((col: number): void => {
    if (sortDisabled) return
    setSortCol(col)
    setSortDir('desc')
  }, [sortDisabled])

  const sortedRows = useMemo(() => {
    if (activeSortCol === null || activeSortDir === null) return cells
    return sortRows(cells, activeSortCol, activeSortDir)
  }, [cells, activeSortCol, activeSortDir])

  const sortedToOriginal = useMemo(() => {
    if (activeSortCol === null || activeSortDir === null) {
      return cells.map((_, index) => index)
    }
    return sortedRows.map((sortedRow) => cells.findIndex((row) => row === sortedRow))
  }, [cells, sortedRows, activeSortCol, activeSortDir])

  useEffect(() => {
    if (!ctxMenu) return
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === KEY_ESCAPE) { setCtxMenu(null); setActiveSub(null) }
    }
    const onClickOutside = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-ctx-menu]')) { setCtxMenu(null); setActiveSub(null) }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [ctxMenu])

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

  const navigateToCell = useCallback(
    (nextRow: number, nextCol: number): void => {
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) return
      if (hiddenSet.has(`R${nextRow}C${nextCol}`)) return
      const el = document.querySelector<HTMLElement>(`[data-cell-id="R${nextRow}C${nextCol}"] [contenteditable]`)
      el?.focus()
    },
    [cols, rows, hiddenSet],
  )

  const handleCellKeyDown = useCallback(
    (row: number, col: number, event: KeyboardEvent): void => {
      if (event.key === 'Tab') {
        event.preventDefault()
        const shift = event.shiftKey
        let nextRow = row
        let nextCol = shift ? col - 1 : col + 1
        if (nextCol < 0 && nextRow > 0) { nextRow--; nextCol = cols - 1 }
        else if (nextCol < 0) { nextRow = row; nextCol = cols - 1 }
        if (nextCol >= cols && nextRow < rows - 1) { nextRow++; nextCol = 0 }
        else if (nextCol >= cols) { nextRow = row; nextCol = 0 }
        navigateToCell(nextRow, nextCol)
        return
      }

      if (event.key.startsWith('Arrow')) {
        const sel = window.getSelection()
        const text = (event.currentTarget as HTMLElement).textContent ?? ''

        if (event.key === 'ArrowLeft' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset > 0) return
        if (event.key === 'ArrowRight' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset < text.length) return

        event.preventDefault()
        const delta: Record<string, [number, number]> = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
        }
        const [dr, dc] = delta[event.key] ?? [0, 0]
        navigateToCell(row + dr, col + dc)
      }
    },
    [cols, rows, navigateToCell],
  )

  return (
    <div className="relative h-full overflow-auto p-2 sm:p-4">
      <div
        data-print-hide data-export-hide
        className="mb-2 grid min-w-max border border-border bg-surface dark:border-slate-700 dark:bg-slate-800"
        style={{ gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' ') }}
        aria-label="Column formatting controls"
      >
        {Array.from({ length: cols }, (_, index) => (
          <TableHeaderCell
            key={index}
            index={index}
            width={columnWidths[index]}
            format={cells[0]?.[index]?.format ?? 'text'}
            sortDir={activeSortCol === index ? activeSortDir : null}
            sortDisabled={sortDisabled}
            onSort={() => toggleSort(index)}
            onFormatChange={(format) => setColumnFormat(index, format)}
            onResizeStart={onColumnResizeStart}
            onAutoFit={autoFitColumn}
            onContextMenu={handleColumnContextMenu}
          />
        ))}
      </div>
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
          {sumCols.length > 0 ? (
            <tfoot>
              <tr className="border-t-2 border-primary/30 bg-surface text-xs font-semibold text-text-primary">
                {cells[0]?.map((_cell, colIndex) => {
                  const total = columnTotals[colIndex]
                  const isSum = sumCols.includes(colIndex)
                  const isFirstSum = colIndex === sumCols[0]
                  return (
                    <td
                      key={colIndex}
                      className="px-2 py-1.5"
                      style={{
                        border: borderStyle === 'none' ? 'none' : `1px ${borderStyle} ${borderColor}`,
                        textAlign: (cellTextAlign[`R${cells.length}C${colIndex}`] || columnTextAlign[colIndex] || 'left') as React.CSSProperties['textAlign'],
                      }}
                    >
                      {isSum ? (
                        <span>
                          {isFirstSum ? <span className="mr-1 text-text-muted">Total:</span> : null}
                          {total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                        </span>
                      ) : ''}
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          ) : null}
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
      {pasting ? (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-white/60 dark:bg-slate-900/60">
          <Loader2 size={24} className="animate-spin text-primary" aria-label="Pasting table data" />
        </div>
      ) : null}
    </div>
  )
}
