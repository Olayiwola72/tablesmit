import { useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from '../../../config/tableDefaults'
import { isHeaderCell, useTableContext } from '../../../context/TableContext'
import { useColumnResize } from '../../../hooks/useColumnResize'
import { useRowResize } from '../../../hooks/useRowResize'
import { useTableSelection } from '../../../hooks/useTableSelection'
import { getContrastText } from '../../../utils/formatUtils'
import { isCellInMergeRange, isRangeAnchor } from '../../../utils/mergeUtils'
import { TableCell } from './TableCell'
import { TableHeaderCell } from './TableHeaderCell'

export function TableGrid({ tableRef }: { tableRef: RefObject<HTMLDivElement> }): ReactNode {
  const {
    cells,
    cols,
    columnWidths,
    rowHeights,
    headerStyle,
    headerColor,
    contentColor,
    selectedRange,
    mergedRanges,
    updateCell,
    setColumnWidth,
    setRowHeight,
    setColumnFormat,
  } = useTableContext()
  const { selectCell } = useTableSelection()
  const gridRef = useRef<HTMLTableElement>(null)
  const headerTextColor = useMemo(() => getContrastText(headerColor), [headerColor])

  const { ghostLineRef: columnGhostLineRef, onMouseDown: onColumnResizeStart } = useColumnResize(setColumnWidth)
  const { ghostLineRef: rowGhostLineRef, onMouseDown: onRowResizeStart } = useRowResize(setRowHeight)

  const autoFitColumn = (columnIndex: number): void => {
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
  }

  const getMergeForCell = (cellId: string) =>
    mergedRanges.find((range) => isRangeAnchor(cellId, range))

  const isHiddenByMerge = (cellId: string): boolean =>
    mergedRanges.some((range) => isCellInMergeRange(cellId, range) && !isRangeAnchor(cellId, range))

  return (
    <div className="h-full overflow-auto p-2 sm:p-4">
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
            onFormatChange={(format) => setColumnFormat(index, format)}
            onResizeStart={onColumnResizeStart}
            onAutoFit={autoFitColumn}
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
            {cells.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ height: rowHeights[rowIndex] }}>
                {row.map((cell, colIndex) => {
                  if (isHiddenByMerge(cell.id)) return null
                  return (
                    <TableCell
                      key={cell.id}
                      cell={cell}
                      row={rowIndex}
                      col={colIndex}
                      headerStyle={headerStyle}
                      headerColor={headerColor}
                      headerTextColor={headerTextColor}
                      contentColor={contentColor}
                      rowHeight={rowHeights[rowIndex]}
                      merge={getMergeForCell(cell.id)}
                      selectedRange={selectedRange}
                      onSelect={selectCell}
                      onChange={updateCell}
                      onBlur={(cellId, value, col) => {
                        const format = cells[rowIndex]?.[col]?.format ?? 'text'
                        if (!isHeaderCell(headerStyle, rowIndex, col)) {
                          updateCell(cellId, value)
                          setColumnFormat(col, format)
                        }
                      }}
                      onRowResizeStart={onRowResizeStart}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={columnGhostLineRef} className="fixed bottom-0 top-0 z-50 hidden w-px bg-primary pointer-events-none" aria-hidden="true" />
      <div ref={rowGhostLineRef} className="fixed left-0 right-0 z-50 hidden h-px bg-primary pointer-events-none" aria-hidden="true" />
    </div>
  )
}
