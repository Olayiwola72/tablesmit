import type { ReactNode } from 'react'
import { isHeaderCell } from '../../../../context/TableContext'
import { cn } from '../../../../lib/utils'
import type { CellData, HeaderStyle, MergeRange, SelectionRange } from '../../../../types/table.types'
import { formatCellValue } from '../../../../utils/formatUtils'
import { isCellInMergeRange, normalizeSelection } from '../../../../utils/mergeUtils'
import { ResizeHandle } from '../ResizeHandle'

export interface TableCellProps {
  cell: CellData
  row: number
  col: number
  headerStyle: HeaderStyle
  headerColor: string
  headerTextColor: string
  contentColor: string
  rowHeight: number
  merge?: MergeRange
  selectedRange: SelectionRange | null
  onSelect: (row: number, col: number, event: React.MouseEvent) => void
  onChange: (cellId: string, value: string) => void
  onBlur: (cellId: string, value: string, col: number) => void
  onRowResizeStart: (event: React.MouseEvent, row: number, currentHeight: number) => void
  onAutoFitRow: (row: number) => void
}

export function TableCell({
  cell,
  row,
  col,
  headerStyle,
  headerColor,
  headerTextColor,
  contentColor,
  rowHeight,
  merge,
  selectedRange,
  onSelect,
  onChange,
  onBlur,
  onRowResizeStart,
  onAutoFitRow,
}: TableCellProps): ReactNode {
  const CellTag = isHeaderCell(headerStyle, row, col) ? 'th' : 'td'
  const selected = selectedRange ? isCellInMergeRange(cell.id, { ...normalizeSelection(selectedRange) }) : false
  const displayValue = formatCellValue(cell.value, cell.format ?? 'text')

  return (
    <CellTag
      role={CellTag === 'td' ? 'cell' : 'columnheader'}
      colSpan={merge ? merge.endCol - merge.startCol + 1 : undefined}
      rowSpan={merge ? merge.endRow - merge.startRow + 1 : undefined}
      className={cn(
        'relative min-w-20 border border-border p-0 align-top text-xs sm:text-sm',
        CellTag === 'th' ? 'font-semibold text-text-inverse' : 'font-normal text-text-primary',
        selected && 'ring-2 ring-inset ring-primary',
        merge && 'bg-primary-light',
      )}
      style={{
        height: rowHeight,
        backgroundColor: CellTag === 'th' ? headerColor : undefined,
        color: CellTag === 'th' ? headerTextColor : contentColor,
      }}
      onClick={(event) => onSelect(row, col, event)}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        aria-label={`Cell ${row + 1}, ${col + 1}`}
        className="min-h-11 whitespace-pre-wrap break-words p-1.5 outline-none sm:p-2"
        onInput={(event) => onChange(cell.id, event.currentTarget.textContent ?? '')}
        onBlur={(event) => onBlur(cell.id, event.currentTarget.textContent ?? '', col)}
      >
        {displayValue}
      </div>
      <span className="cell-measure invisible absolute left-0 top-0 whitespace-pre px-2 text-sm" aria-hidden="true">
        {displayValue || ' '}
      </span>
      <ResizeHandle
        axis="row"
        label="Double-click to AutoFit row height"
        onMouseDown={(event) => onRowResizeStart(event, row, rowHeight)}
        onDoubleClick={() => onAutoFitRow(row)}
      />
    </CellTag>
  )
}
