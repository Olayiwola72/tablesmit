import type { ReactNode } from 'react'
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell'
import type { TableHeaderRowProps } from './TableHeaderRow.types'

export function TableHeaderRow({
  cols,
  columnWidths,
  cells,
  activeSortCol,
  activeSortDir,
  sortDisabled,
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
        <TableHeaderCell
          key={index}
          index={index}
          width={columnWidths[index]}
          format={cells[0]?.[index]?.format ?? 'text'}
          sortDir={activeSortCol === index ? activeSortDir : null}
          sortDisabled={sortDisabled}
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
