import {
  ChevronDown,
  LayoutTemplate,
  Merge,
  Minus,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  Undo2,
  Ungroup,
} from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../../utils/toast/toast'
import { MAX_COLS, MAX_ROWS } from '../../../config/table/tableDefaults'
import { usePresets } from '../../../config/presets'
import { useSelectedRange, useTableContext, useTableData } from '../../../context/TableContext'
import { cn } from '../../../lib/utils'
import { isSingleCellRange } from '../../../utils/mergeUtils/mergeUtils'
import { useCopyTable } from '../../../hooks/useCopyTable/useCopyTable'
import { Button } from '../../ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip/Tooltip'
import { CopyDropdown } from './CopyDropdown/CopyDropdown'
import { ImportDropdown } from './ImportDropdown/ImportDropdown'
import { MobileExportDropdown } from './MobileExportDropdown/MobileExportDropdown'

import { TABLE_THEMES } from '../../../config/table/tableThemes'
import type { TableToolbarProps } from './TableToolbar.types'

export function TableToolbar({
  tableRef,
  isExporting = false,
  onExport = () => undefined,
}: TableToolbarProps): ReactNode {
  const table = useTableContext()
  const { cells } = useTableData()
  const selectedRange = useSelectedRange()
  const { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsImage } = useCopyTable(cells, tableRef)
  const { t } = useTranslation()
  const presets = usePresets()

  const themeLabelKey: Record<string, string> = {
    'default': 'themePicker.default',
    'minimal': 'themePicker.minimal',
    'dark-header': 'themePicker.darkHeader',
    'striped': 'themePicker.striped',
    'academic': 'themePicker.academic',
    'monochrome': 'themePicker.monochrome',
  }

  const canMerge = useMemo(
    () => selectedRange !== null && !isSingleCellRange(selectedRange),
    [selectedRange],
  )

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6" data-toolbar>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <LayoutTemplate size={14} aria-hidden="true" /> {t('toolbar.templates')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {presets.map((preset) => (
            <DropdownMenuItem key={preset.id} onClick={() => table.applyPreset(preset)}>
              {preset.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Palette size={14} aria-hidden="true" /> {t('toolbar.theme')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="grid grid-cols-3 gap-2 p-3" style={{ minWidth: '200px' }}>
          {TABLE_THEMES.map((th) => {
            const isSelected = table.theme === th.id
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => table.setTheme(th.id)}
                className={cn(
                  'cursor-pointer rounded-md border p-1.5 transition-colors duration-150 hover:border-primary',
                  isSelected ? 'ring-2 ring-primary' : 'border-border',
                )}
                aria-label={t('aria.themeSelect')}
                aria-pressed={isSelected}
              >
                <svg width="100%" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true" className="mb-1 rounded-sm" preserveAspectRatio="none">
                  <rect x="0" y="0" width="60" height="8" rx="1" fill={th.headerBg} />
                  <rect x="0" y="10" width="60" height="6" rx="0" fill={th.rowBg} />
                  <rect x="0" y="17" width="60" height="6" rx="0" fill={th.altRowBg} />
                </svg>
                <span className="block text-center text-[10px] text-text-secondary">{t(themeLabelKey[th.id] ?? 'themePicker.default', th.label)}</span>
              </button>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="sm" onClick={table.addRow} disabled={table.rows >= MAX_ROWS}>
          <Plus size={14} aria-hidden="true" /> {t('toolbar.addRow')}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.addColumn} disabled={table.cols >= MAX_COLS}>
          <Plus size={14} aria-hidden="true" /> {t('toolbar.addColumn')}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeRow} disabled={table.rows <= 1}>
          <Minus size={14} aria-hidden="true" /> {t('toolbar.removeRow')}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeColumn} disabled={table.cols <= 1}>
          <Minus size={14} aria-hidden="true" /> {t('toolbar.removeColumn')}
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={canMerge ? 'bg-surface text-text-primary' : ''}
              onClick={table.mergeSelection}
            >
              <Merge size={14} aria-hidden="true" /> {t('toolbar.merge')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('aria.mergeButton')}</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="sm" onClick={table.unmergeSelection}>
          <Ungroup size={14} aria-hidden="true" /> {t('toolbar.unmerge')}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={table.undo} disabled={!table.canUndo}>
              <Undo2 size={14} aria-hidden="true" /> {t('toolbar.undo')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {table.canUndo
              ? t('toolbar.undoActions', { count: table.historyDepth })
              : t('toolbar.nothingToUndo')}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="ghost" size="sm" title={t('aiFeatures.comingSoon')} onClick={() => toast.info(t('toast.aiWaitlist'))}>
        <Sparkles size={14} aria-hidden="true" /> {t('toolbar.ai')}
      </Button>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <CopyDropdown
        onCopyExcelData={copyAsExcelData}
        onCopyCsv={copyAsCsv}
        onCopyMarkdown={copyAsMarkdown}
        onCopyImage={copyAsImage}
      />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <ImportDropdown />

      <div className="mx-1 h-5 w-px shrink-0 bg-border lg:hidden" />
      <MobileExportDropdown isExporting={isExporting} onExport={onExport} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); toast.info(t('toast.tableCleared')) }}>
        <Trash2 size={14} aria-hidden="true" /> {t('toolbar.clearAll')}
      </Button>
    </div>
  )
}
