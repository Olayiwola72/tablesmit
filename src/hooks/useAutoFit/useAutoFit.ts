import { useCallback, type RefObject } from 'react'
import { AUTOFIT_PADDING, MAX_COLUMN_WIDTH, MAX_ROW_HEIGHT, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '@/config/table/tableDefaults/tableDefaults'

export function useAutoFit(
  gridRef: RefObject<HTMLTableElement | null>,
  setColumnWidth: (col: number, width: number) => void,
  setRowHeight: (row: number, height: number) => void,
) {
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
  }, [gridRef, setColumnWidth])

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
  }, [gridRef, setRowHeight])

  return { autoFitColumn, autoFitRow }
}