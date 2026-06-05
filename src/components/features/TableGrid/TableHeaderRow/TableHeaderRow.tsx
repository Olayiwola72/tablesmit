import type { ReactNode } from 'react'
import { ColumnHeaderCell } from '../ColumnHeaderCell/ColumnHeaderCell'
import type { TableHeaderRowProps } from './TableHeaderRow.types'

export function TableHeaderRow({
  cols,
  columnWidths,
  cells,
  activeSortCol,
  activeSortDir,
  isSortDisabled,
  onSort,
  onFormatChange,
  onResizeStart,
  onAutoFit,
  onContextMenu,
}: TableHeaderRowProps): ReactNode {
  return (
      <div
        data-print-hide data-export-hide
        className="mb-2 grid min-w-max"
      style={{ gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '), backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
      aria-label="Column formatting controls"
    >
      {Array.from({ length: cols }, (_, index) => (
        <ColumnHeaderCell
          key={cells[0]?.[index]?.id ?? `col-${index}`}
          index={index}
          width={columnWidths[index]}
          format={cells[0]?.[index]?.format ?? 'text'}
          sortDir={activeSortCol === index ? activeSortDir : null}
          isSortDisabled={() => isSortDisabled(index)}
          onSort={() => onSort(index)}
          onFormatChange={(format) => onFormatChange(index, format)}
          onResizeStart={onResizeStart}
          onAutoFit={onAutoFit}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  )
}
