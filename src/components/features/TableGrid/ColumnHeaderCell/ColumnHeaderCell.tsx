import { memo, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { columnFormats } from '@/config/columnFormats/columnFormatsConfig'
import type { ColumnFormat } from '@/config/columnFormats/columnFormats.types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip/Tooltip'
import { ResizeHandle } from '../ResizeHandle/ResizeHandle'
import type { ColumnHeaderCellProps } from './ColumnHeaderCell.types'

function ColumnHeaderCellRaw({
  index,
  width,
  format,
  sortDir,
  isSortDisabled,
  onSort,
  onFormatChange,
  onResizeStart,
  onAutoFit,
  onContextMenu,
}: ColumnHeaderCellProps): ReactNode {
  const disabled = isSortDisabled()
  const { t } = useTranslation(['common', 'table'])
  return (
    <div
      className="relative flex min-w-20 items-center justify-between border-r border-border bg-surface pl-2 pr-2 py-1"
      onContextMenu={(event) => onContextMenu(index, event)}
    >
      <label className="flex items-center gap-1 text-xs font-medium text-text-secondary">
        {disabled ? (
          <button
            type="button"
            aria-label={`C${index + 1}`}
            className="inline-flex items-center gap-0.5 rounded-sm px-1 py-2 transition-colors hover:bg-primary/10 hover:ring-1 hover:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onSort}
            disabled
            title={t('table.sortDisabledMsg')}
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
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`C${index + 1}`}
                className="inline-flex items-center gap-0.5 rounded-sm px-1 py-2 transition-colors hover:bg-primary/10 hover:ring-1 hover:ring-primary/20"
                onClick={onSort}
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
            </TooltipTrigger>
            <TooltipContent>{t('table.sortColumn')}</TooltipContent>
          </Tooltip>
        )}
        <select
          value={format}
          name={`col-type-${index}`}
          aria-label={`Column type ${index + 1}`}
          title={`Column type: ${format}`}
          className="h-8 rounded-sm border border-border bg-white px-2 text-xs text-text-primary"
          data-export-hide data-print-hide
          onChange={(event) => onFormatChange(event.target.value as ColumnFormat)}
        >
          {columnFormats.map((option) => (
            <option key={option.value} value={option.value}>
              {t(`table.${option.value}`, option.label)}
            </option>
          ))}
        </select>
      </label>
      <div data-print-hide className="contents">
        <ResizeHandle
          axis="column"
          label={t('grid.autoFitTip')}
          onMouseDown={(event) => onResizeStart(event, index, width)}
          onDoubleClick={() => onAutoFit(index)}
        />
      </div>
    </div>
  )
}

export const ColumnHeaderCell = memo(ColumnHeaderCellRaw, (prev, next) => {
  if (prev.index !== next.index) return false
  if (prev.width !== next.width) return false
  if (prev.format !== next.format) return false
  if (prev.sortDir !== next.sortDir) return false
  if (prev.isSortDisabled() !== next.isSortDisabled()) return false
  return true
})
