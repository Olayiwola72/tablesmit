import { memo, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../../../config/siteConfig'
import type { ColumnFormat } from '../../../../types/table'
import { ResizeHandle } from '../ResizeHandle/ResizeHandle'
import type { TableHeaderCellProps } from './TableHeaderCell.types'

function TableHeaderCellRaw({
  index,
  width,
  format,
  sortDir,
  sortDisabled = false,
  onSort,
  onFormatChange,
  onResizeStart,
  onAutoFit,
  onContextMenu,
}: TableHeaderCellProps): ReactNode {
  const { t } = useTranslation()
  return (
    <div
      className="relative flex min-w-20 items-center justify-between border-r border-border bg-surface pl-2 pr-3 py-1 md:pr-2"
      onContextMenu={(event) => onContextMenu(index, event)}
    >
      <label className="flex items-center gap-1 text-xs font-medium text-text-secondary">
        <button
          type="button"
          aria-label={`C${index + 1}`}
          className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5 transition-colors hover:bg-border disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onSort}
          disabled={sortDisabled}
          title={sortDisabled ? t('table.sortDisabledMsg') : t('table.sortColumn')}
        >
          <span className="text-xs font-medium">{`C${index + 1}`}</span>
          <span data-print-hide>
            {sortDir === 'asc' ? (
              <ArrowUp size={12} className="text-primary" />
            ) : sortDir === 'desc' ? (
              <ArrowDown size={12} className="text-primary" />
            ) : (
              <ArrowUpDown size={12} className="text-text-muted" />
            )}
          </span>
        </button>
        <select
          value={format}
          name={`col-type-${index}`}
          aria-label={`Column type ${index + 1}`}
          title={`Column type: ${format}`}
          className="h-8 rounded-sm border border-border bg-white px-2 text-xs text-text-primary"
          data-export-hide data-print-hide
          onChange={(event) => onFormatChange(event.target.value as ColumnFormat)}
        >
          {siteConfig.columnFormats.map((option) => (
            <option key={option.value} value={option.value}>
              {t(`table.${option.value}`, option.label)}
            </option>
          ))}
        </select>
      </label>
      <ChevronDown size={13} aria-hidden="true" className="text-text-muted" data-export-hide data-print-hide />
      <div data-print-hide className="contents">
        <ResizeHandle
          axis="column"
          label={siteConfig.labels.autoFitColumn}
          onMouseDown={(event) => onResizeStart(event, index, width)}
          onDoubleClick={() => onAutoFit(index)}
        />
      </div>
    </div>
  )
}

export const TableHeaderCell = memo(TableHeaderCellRaw, (prev, next) => {
  if (prev.index !== next.index) return false
  if (prev.width !== next.width) return false
  if (prev.format !== next.format) return false
  if (prev.sortDir !== next.sortDir) return false
  if (prev.sortDisabled !== next.sortDisabled) return false
  return true
})
