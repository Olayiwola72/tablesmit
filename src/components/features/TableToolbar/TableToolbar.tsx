import {
  ChevronDown,
  Copy,
  Download,
  LayoutTemplate,
  Merge,
  Minus,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  Undo2,
  Ungroup,
  Upload,
} from 'lucide-react'
import { useCallback, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../../utils/toast'
import { MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { usePresets } from '../../../config/presets'
import { useImport } from '../../../hooks/useImport'
import { useExport } from '../../../hooks/useExport'
import { useSelectedRange, useTableContext, useTableData } from '../../../context/TableContext'
import { isSingleCellRange } from '../../../utils/mergeUtils'
import type { ExportFormat } from '../../../types/export.types'
import { exportFormats } from '../../../config/exportConfig'
import { Button } from '../../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip'

import { TABLE_THEMES } from '../../../config/tableThemes'

export function TableToolbar({ tableRef }: { tableRef: RefObject<HTMLDivElement> }): ReactNode {
  const table = useTableContext()
  const { cells } = useTableData()
  const selectedRange = useSelectedRange()
  const csvInputRef = useRef<HTMLInputElement>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)
  const { error, importFile } = useImport()
  const { exportAs, isExporting } = useExport()

  const importFromInput = useCallback((kind: 'csv' | 'excel', files: FileList | null): void => {
    const file = files?.[0]
    if (!file) return
    void importFile(file, kind)
  }, [importFile])

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

  const copyAsCsv = useCallback(async (): Promise<void> => {
    try {
      const lines = cells.map((row) =>
        row.map((cell) => {
          let value = cell.value
          if (/[,"\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`
          return value
        }).join(','),
      )
      await navigator.clipboard.writeText(lines.join('\n'))
      toast.success(t('toast.copyCsv', 'Table data copied as CSV.'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsExcelData = useCallback(async (): Promise<void> => {
    try {
      const tsv = cells
        .map((row) => row.filter((c) => !c.isHidden).map((c) => c.value).join('\t'))
        .join('\n')
      await navigator.clipboard.writeText(tsv)
      toast.success(t('toast.copyData'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsMarkdown = useCallback(async (): Promise<void> => {
    try {
      if (cells.length === 0) return
      const colCount = cells[0]!.length
      const header = `| ${cells[0]!.map((_c, i) => ` C${i + 1} `).join('|')} |`
      const separator = `| ${Array.from({ length: colCount }, () => ' --- ').join('|')} |`
      const body = cells.map((row) =>
        `| ${row.map((cell) => ` ${cell.value || ' '} `).join('|')} |`,
      ).join('\n')
      await navigator.clipboard.writeText(`${header}\n${separator}\n${body}`)
      toast.success(t('toast.copyMarkdown', 'Table copied as Markdown.'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsImage = useCallback(async (): Promise<void> => {
    try {
      const el = tableRef.current?.querySelector('table')
      if (!el) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true })
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      toast.success(t('toast.copyImage'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [tableRef, t])

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
                className={'cursor-pointer rounded-md border p-1.5 transition-colors duration-150 hover:border-primary' + (isSelected ? ' ring-2 ring-primary' : ' border-border')}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Copy size={14} aria-hidden="true" /> {t('toolbar.copy')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={copyAsExcelData}>{t('toolbar.copyExcel')}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsCsv}>{t('toolbar.copyCsv', 'Copy as CSV')}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsMarkdown}>{t('toolbar.copyMarkdown', 'Copy as Markdown')}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsImage}>{t('toolbar.copyImage')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Upload size={14} aria-hidden="true" /> {t('toolbar.import')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => csvInputRef.current?.click()}>{t('toolbar.importCsv')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => excelInputRef.current?.click()}>{t('toolbar.importExcel')}</DropdownMenuItem>
          <DropdownMenuItem disabled>{t('aiFeatures.cleanData')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => importFromInput('csv', event.target.files)} />
      <input ref={excelInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => importFromInput('excel', event.target.files)} />

      {/* Export dropdown — visible only on mobile (< lg), exports live in sidebar on desktop */}
      <div className="mx-1 h-5 w-px shrink-0 bg-border lg:hidden" />
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" isLoading={isExporting}>
              <Download size={14} aria-hidden="true" /> {t('export.exportButton')} <ChevronDown size={14} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {exportFormats.map((fmt) => (
              <DropdownMenuItem key={fmt.format} onClick={() => exportAs(fmt.format as ExportFormat, tableRef.current)}>
                {fmt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); toast.info(t('toast.tableCleared')) }}>
        <Trash2 size={14} aria-hidden="true" /> {t('toolbar.clearAll')}
      </Button>

      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </div>
  )
}
