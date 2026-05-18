import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { AlignCenter, AlignLeft, AlignRight, Clipboard, Loader2, PaintBucket, Ruler, TextSelect } from 'lucide-react'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MAX_ROW_HEIGHT, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '../../../config/tableDefaults'
import { isHeaderCell, useTableContext, useTableData } from '../../../context/TableContext'
import { siteConfig } from '../../../config/siteConfig'
import { KEY_ESCAPE } from '../../../constants/keys'
import type { ColumnFormat, TextAlign } from '../../../types/table.types'
import { useColumnResize } from '../../../hooks/useColumnResize'
import { useRowResize } from '../../../hooks/useRowResize'
import { useTableSelection } from '../../../hooks/useTableSelection'
import { computeColumnSum, getContrastText } from '../../../utils/formatUtils'
import { isRangeAnchor } from '../../../utils/mergeUtils'
import { normalizeTableData, sortRows } from '../../../utils/tableUtils'
import { TableCell } from './TableCell'
import { TableHeaderCell } from './TableHeaderCell'

export function TableGrid({ tableRef }: { tableRef: RefObject<HTMLDivElement> }): ReactNode {
  const { cells } = useTableData()
  const {
    rows,
    cols,
    columnWidths,
    rowHeights,
    headerStyle,
    headerColor,
    contentColor,
    contentBgColor,
    selectedRange,
    mergedRanges,
    borderStyle,
    borderColor,
    rowColors,
    columnColors,
    columnTextAlign,
    cellColors,
    cellTextAlign,
    updateCell,
    setColumnWidth,
    setRowHeight,
    setColumnFormat,
    setRowColor,
    setColumnColor,
    setCellColor,
    setColumnTextAlign,
    setCellTextAlign,
    setCells,
    undo,
  } = useTableContext()
  const { selectCell } = useTableSelection()
  const gridRef = useRef<HTMLTableElement>(null)
  const headerTextColor = useMemo(() => getContrastText(headerColor), [headerColor])

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

  type CtxData =
    | { type: 'cell'; row: number; col: number; x: number; y: number }
    | { type: 'column'; col: number; x: number; y: number }
    | null

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
        undo()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [undo])

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
        }
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

  const colorPresets = [
    '#FFE4E1', '#FFF0D9', '#FFFACD', '#E8F5E9', '#E3F2FD', '#F3E5F5',
    '#FFCDD2', '#FFE0B2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7',
    '#FF5722', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0',
  ]

  const handlePaste = useCallback(async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText()
      if (text && ctxMenu?.type === 'cell') {
        updateCell(`R${ctxMenu.row}C${ctxMenu.col}`, text)
      }
    } catch { /* Clipboard read not available */ }
    closeCtx()
  }, [ctxMenu, updateCell, closeCtx])

  const toggleSub = useCallback((key: string): void => {
    setActiveSub((prev) => (prev === key ? null : key))
  }, [])

  function renderColorPicker(current: string, onChange: (color: string) => void): ReactNode {
    return (
      <div>
        <div className="mb-2 flex flex-wrap gap-1">
          {colorPresets.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={c}
              className={`h-6 w-6 rounded-sm border border-border cursor-pointer transition-transform hover:scale-110 ${current === c ? 'ring-2 ring-primary ring-offset-1' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => { onChange(c); closeCtx() }}
            />
          ))}
        </div>
        <label className="flex items-center justify-between gap-2 text-xs text-text-secondary">
          <span>Custom</span>
          <input
            type="color"
            value={current || '#ffffff'}
            className="h-7 w-10 cursor-pointer rounded-sm border border-border"
            onChange={(event) => { onChange(event.target.value); closeCtx() }}
          />
        </label>
        {current ? (
          <button
            type="button"
            className="mt-1 w-full rounded-sm px-2 py-1 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
            onClick={() => { onChange(''); closeCtx() }}
          >
            {siteConfig.labels.contextRemoveColor}
          </button>
        ) : null}
      </div>
    )
  }

  const alignIcons: Record<string, ReactNode> = {
    left: <AlignLeft size={14} />,
    center: <AlignCenter size={14} />,
    right: <AlignRight size={14} />,
  }

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
        if (nextCol < 0) { nextRow--; nextCol = cols - 1 }
        if (nextCol >= cols) { nextRow++; nextCol = 0 }
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
    [cols, navigateToCell],
  )

  return (
    <div className="relative h-full overflow-auto p-2 sm:p-4">
      <div
        className="mb-2 grid min-w-max border border-border bg-surface"
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
      <div ref={tableRef} className="inline-block bg-white">
        <table ref={gridRef} className="min-w-max border-collapse bg-white">
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
          <tbody>
            {sortedRows.map((row, rowIdx) => {
              const origRowIdx = sortedToOriginal[rowIdx]
              return (
              <tr key={row[0]?.id ?? rowIdx} style={{ height: rowHeights[origRowIdx] }}>
                {row.map((cell, colIndex) => {
                  if (hiddenSet.has(cell.id)) return null
                  const merge = mergeAnchorMap.get(cell.id)
                  return (
                    <TableCell
                      key={cell.id}
                      cell={cell}
                      row={origRowIdx}
                      col={colIndex}
                      headerStyle={headerStyle}
                      headerColor={headerColor}
                      headerTextColor={headerTextColor}
                      contentColor={contentColor}
                      contentBgColor={contentBgColor}
                      rowHeight={rowHeights[origRowIdx]}
                      columnWidth={columnWidths[colIndex]}
                      merge={merge}
                      selectedRange={selectedRange}
                      onSelect={selectCell}
                      onBlur={(cellId, value, col) => {
                        if (!isHeaderCell(headerStyle, origRowIdx, col) && cells[origRowIdx]?.[col]?.format !== 'auto-number') {
                          updateCell(cellId, value)
                        }
                      }}
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
        <div
          data-ctx-menu
          className="fixed z-50 w-64 rounded-md border border-border bg-white py-1 shadow-sm text-sm"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
        >
          {/* Header */}
          <div className="px-3 py-1.5 text-xs font-semibold text-text-muted tracking-widest border-b border-border">
            {ctxMenu.type === 'cell'
              ? `R${ctxMenu.row + 1} \u00B7 C${ctxMenu.col + 1}`
              : `Column ${ctxMenu.col + 1}`}
          </div>

          {ctxMenu.type === 'cell' ? (
            <>
              {/* Auto-fit */}
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => { autoFitColumn(ctxMenu.col); closeCtx() }}
              >
                <Ruler size={14} className="text-text-muted" />
                {siteConfig.labels.contextAutoFit}
              </button>

              {/* Background color submenu */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('bg')}
                >
                  <PaintBucket size={14} className="text-text-muted" />
                  <span className="flex-1">Background</span>
                  <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
                </button>
                {activeSub === 'bg' ? (
                  <div className="border-t border-border px-3 py-2">
                    <p className="mb-1.5 text-xs font-medium text-text-secondary">{siteConfig.labels.contextColumnBackground}</p>
                    {renderColorPicker(columnColors[ctxMenu.col] || '', (c) => setColumnColor(ctxMenu.col, c))}
                    <hr className="my-2 border-border" />
                    <p className="mb-1.5 text-xs font-medium text-text-secondary">{siteConfig.labels.contextCellBackground}</p>
                    {renderColorPicker(cellColors[`R${ctxMenu.row}C${ctxMenu.col}`] ?? '', (c) => setCellColor(`R${ctxMenu.row}C${ctxMenu.col}`, c))}
                  </div>
                ) : null}
              </div>

              {/* Column type submenu */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('type')}
                >
                  <TextSelect size={14} className="text-text-muted" />
                  <span className="flex-1">{siteConfig.labels.contextColumnType}</span>
                  <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
                </button>
                {activeSub === 'type' ? (
                  <div className="border-t border-border px-3 py-2">
                    {siteConfig.columnFormats.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`block w-full rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${cells[0]?.[ctxMenu.col]?.format === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                        onClick={() => { setColumnFormat(ctxMenu.col, opt.value as ColumnFormat); closeCtx() }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Text alignment submenu */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('align')}
                >
                  {alignIcons[cellTextAlign[`R${ctxMenu.row}C${ctxMenu.col}`] || columnTextAlign[ctxMenu.col] || 'left']}
                  <span className="flex-1">{siteConfig.labels.contextTextAlign}</span>
                  <span className="text-text-muted">{activeSub === 'align' ? '\u25B2' : '\u25BC'}</span>
                </button>
                {activeSub === 'align' ? (
                  <div className="border-t border-border px-3 py-2">
                    {(siteConfig.labels.textAlignOptions as readonly { value: string; label: string }[]).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${(cellTextAlign[`R${ctxMenu.row}C${ctxMenu.col}`] || columnTextAlign[ctxMenu.col] || 'left') === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                        onClick={() => { setCellTextAlign(`R${ctxMenu.row}C${ctxMenu.col}`, opt.value as TextAlign); closeCtx() }}
                      >
                        {alignIcons[opt.value]}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-1" />

              {/* Paste */}
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={handlePaste}
              >
                <Clipboard size={14} className="text-text-muted" />
                {siteConfig.labels.contextPaste}
              </button>

              {/* Row color */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('rowColor')}
                >
                  <PaintBucket size={14} className="text-text-muted" />
                  <span className="flex-1">{siteConfig.labels.rowColor}</span>
                  <span className="text-text-muted">{activeSub === 'rowColor' ? '\u25B2' : '\u25BC'}</span>
                </button>
                {activeSub === 'rowColor' ? (
                  <div className="border-t border-border px-3 py-2">
                    {renderColorPicker(rowColors[ctxMenu.row] || '', (c) => setRowColor(ctxMenu.row, c))}
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {/* Column: Auto-fit */}
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => { autoFitColumn(ctxMenu.col); closeCtx() }}
              >
                <Ruler size={14} className="text-text-muted" />
                {siteConfig.labels.contextAutoFit}
              </button>

              {/* Column: Background color */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('bg')}
                >
                  <PaintBucket size={14} className="text-text-muted" />
                  <span className="flex-1">{siteConfig.labels.contextColumnBackground}</span>
                  <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
                </button>
                {activeSub === 'bg' ? (
                  <div className="border-t border-border px-3 py-2">
                    {renderColorPicker(columnColors[ctxMenu.col] || '', (c) => setColumnColor(ctxMenu.col, c))}
                  </div>
                ) : null}
              </div>

              {/* Column: Column type */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('type')}
                >
                  <TextSelect size={14} className="text-text-muted" />
                  <span className="flex-1">{siteConfig.labels.contextColumnType}</span>
                  <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
                </button>
                {activeSub === 'type' ? (
                  <div className="border-t border-border px-3 py-2">
                    {siteConfig.columnFormats.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`block w-full rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${cells[0]?.[ctxMenu.col]?.format === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                        onClick={() => { setColumnFormat(ctxMenu.col, opt.value as ColumnFormat); closeCtx() }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Column: Text alignment */}
              <div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => toggleSub('align')}
                >
                  {alignIcons[columnTextAlign[ctxMenu.col] || 'left']}
                  <span className="flex-1">{siteConfig.labels.contextTextAlign}</span>
                  <span className="text-text-muted">{activeSub === 'align' ? '\u25B2' : '\u25BC'}</span>
                </button>
                {activeSub === 'align' ? (
                  <div className="border-t border-border px-3 py-2">
                    {(siteConfig.labels.textAlignOptions as readonly { value: string; label: string }[]).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${(columnTextAlign[ctxMenu.col] || 'left') === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                        onClick={() => { setColumnTextAlign(ctxMenu.col, opt.value as TextAlign); closeCtx() }}
                      >
                        {alignIcons[opt.value]}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : null}
      {pasting ? (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-white/60">
          <Loader2 size={24} className="animate-spin text-primary" aria-label="Pasting table data" />
        </div>
      ) : null}
    </div>
  )
}
