import { memo, type ClipboardEvent as ReactClipboardEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { isHeaderCell } from '../../../../context/TableContext'
import { cn } from '../../../../lib/utils'
import { formatUtils } from '../../../../utils/formatUtils/formatUtils'
import { isCellInMergeRange, normalizeSelection } from '../../../../utils/mergeUtils/mergeUtils'
import { ResizeHandle } from '../ResizeHandle/ResizeHandle'
import type { TableCellProps } from './TableCell.types'

function insertPlainTextAtSelection(text: string): void {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  range.deleteContents()

  const textNode = document.createTextNode(text)
  range.insertNode(textNode)
  range.setStartAfter(textNode)
  range.collapse(true)

  selection.removeAllRanges()
  selection.addRange(range)
}

function TableCellRaw({
  cell,
  row,
  col,
  freezeRow,
  freezeCol,
  headerStyle,
  headerColor,
  headerTextColor,
  contentColor,
  contentBgColor,
  themeRowBg,
  borderStyle,
  borderColor,
  rowColor,
  columnColor,
  cellColor,
  cellTextColor,
  rowTextColor,
  textAlign,
  rowHeight,
  merge,
  selectedRange,
  onSelect,
  onBlur,
  onRowResizeStart,
  onAutoFitRow,
  onColumnResizeStart,
  onAutoFitColumn,
  columnWidth,
  onKeyDown,
  onContextMenu,
  isFindMatch,
  isCurrentMatch,
  isTableFocused = true,
}: TableCellProps): ReactNode {
  const { t } = useTranslation()
  const effectiveColSpan = merge ? (merge.endCol - merge.startCol + 1) : cell.colSpan
  const CellTag = isHeaderCell(headerStyle, row, col, effectiveColSpan) ? 'th' : 'td'
  const selected = selectedRange ? isCellInMergeRange(cell.id, { ...normalizeSelection(selectedRange) }) : false
  const displayValue = formatUtils(cell.value, cell.format ?? 'text', row)
  const isFormula = (cell.format ?? 'text') === 'auto-number' || (cell.format ?? 'text') === 'sum'

  const stickyClasses = cn(
    freezeRow && row === 0 && 'sticky top-0 z-10',
    freezeCol && col === 0 && 'sticky left-0 z-10',
    freezeRow && freezeCol && row === 0 && col === 0 && 'z-20',
  )

  const effectiveBg = CellTag === 'th'
    ? headerColor
    : (cellColor || columnColor || rowColor || themeRowBg || contentBgColor || (stickyClasses ? '#ffffff' : undefined))

  const handlePaste = (event: ReactClipboardEvent<HTMLDivElement>): void => {
    if (isFormula) return
    // If clipboard has HTML content, the document-level handler will process the full table
    for (const item of event.clipboardData.items) {
      if (item.type === 'text/html') return
    }
    const text = event.clipboardData.getData('text/plain')
    if (!text) return
    event.preventDefault()
    insertPlainTextAtSelection(text)
  }

  return (
      <CellTag
        role={CellTag === 'td' ? 'gridcell' : 'columnheader'}
        colSpan={merge ? merge.endCol - merge.startCol + 1 : undefined}
        rowSpan={merge ? merge.endRow - merge.startRow + 1 : undefined}
        aria-label={t('grid.selectCell', { id: `R${row + 1}C${col + 1}` })}
        aria-colindex={col + 1}
        aria-selected={selected}
      className={cn(
        'relative min-w-20 p-0 align-top text-xs sm:text-sm',
        CellTag === 'th' ? 'font-semibold text-text-inverse' : 'font-normal text-text-primary',
        selected && isTableFocused && 'ring-2 ring-inset ring-primary',
        isFindMatch && !isCurrentMatch && 'bg-accent-light',
        isCurrentMatch && 'ring-2 ring-accent',
        stickyClasses,
      )}
      style={{
        height: rowHeight,
        border: borderStyle === 'none' ? 'none' : `1px ${borderStyle} ${borderColor}`,
        backgroundColor: effectiveBg,
        color: cellTextColor || rowTextColor || (CellTag === 'th' ? headerTextColor : contentColor),
        textAlign: textAlign as React.CSSProperties['textAlign'],
      }}
      data-cell-id={cell.id}
      onClick={(event) => onSelect(row, col, event)}
      onContextMenu={(event) => onContextMenu(row, col, event)}
    >
      <div
        contentEditable={!isFormula}
        suppressContentEditableWarning
        className={cn(
          'min-h-11 whitespace-pre-wrap break-words p-1.5 outline-none sm:p-2',
          isFormula && 'cursor-default text-text-muted select-none',
        )}
        onBlur={(event) => onBlur(cell.id, event.currentTarget.textContent ?? '', col)}
        onKeyDown={(event) => onKeyDown(row, col, event)}
        onPaste={handlePaste}
      >
        {displayValue}
      </div>
      <span className="cell-measure invisible absolute left-0 top-0 whitespace-pre px-2 text-sm" aria-hidden="true">
        {displayValue || ' '}
      </span>
      <ResizeHandle
        axis="column"
        label={t('aria.resizeColumn', { index: col + 1 })}
        onMouseDown={(event) => onColumnResizeStart(event, col, columnWidth)}
        onDoubleClick={() => onAutoFitColumn(col)}
      />
      <ResizeHandle
        axis="row"
        label={t('aria.resizeRow', { index: row + 1 })}
        onMouseDown={(event) => onRowResizeStart(event, row, rowHeight)}
        onDoubleClick={() => onAutoFitRow(row)}
      />
    </CellTag>
  )
}

export const TableCell = memo(TableCellRaw, (prev, next) => {
  if (prev.cell.id !== next.cell.id) return false
  if (prev.cell.value !== next.cell.value) return false
  if (prev.cell.colSpan !== next.cell.colSpan) return false
  if (prev.cell.rowSpan !== next.cell.rowSpan) return false
  if (prev.cell.isMerged !== next.cell.isMerged) return false
  if (prev.cell.format !== next.cell.format) return false
  if (prev.row !== next.row) return false
  if (prev.col !== next.col) return false
  if (prev.headerStyle !== next.headerStyle) return false
  if (prev.headerColor !== next.headerColor) return false
  if (prev.headerTextColor !== next.headerTextColor) return false
  if (prev.contentColor !== next.contentColor) return false
  if (prev.contentBgColor !== next.contentBgColor) return false
  if (prev.themeRowBg !== next.themeRowBg) return false
  if (prev.borderStyle !== next.borderStyle) return false
  if (prev.borderColor !== next.borderColor) return false
  if (prev.rowColor !== next.rowColor) return false
  if (prev.columnColor !== next.columnColor) return false
  if (prev.cellColor !== next.cellColor) return false
  if (prev.cellTextColor !== next.cellTextColor) return false
  if (prev.rowTextColor !== next.rowTextColor) return false
  if (prev.textAlign !== next.textAlign) return false
  if (prev.rowHeight !== next.rowHeight) return false
  if (prev.columnWidth !== next.columnWidth) return false
  if (prev.freezeRow !== next.freezeRow) return false
  if (prev.freezeCol !== next.freezeCol) return false
  if (prev.selectedRange !== next.selectedRange) return false
  if (prev.merge !== next.merge) {
    if (prev.merge?.key !== next.merge?.key) return false
  }
  if (prev.isFindMatch !== next.isFindMatch) return false
  if (prev.isCurrentMatch !== next.isCurrentMatch) return false
  if (prev.isTableFocused !== next.isTableFocused) return false
  return true
})
