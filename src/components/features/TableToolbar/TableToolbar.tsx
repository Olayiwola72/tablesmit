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
import { siteConfig } from '../../../config/siteConfig'
import { toast, TOAST } from '../../../utils/toast'
import { MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { presets } from '../../../config/presets'
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

  const { labels } = siteConfig

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
      toast.success(TOAST.COPY_CSV)
    } catch {
      toast.error(TOAST.CLIPBOARD_ERROR)
    }
  }, [cells])

  const copyAsExcelData = useCallback(async (): Promise<void> => {
    try {
      const tsv = cells
        .map((row) => row.filter((c) => !c.isHidden).map((c) => c.value).join('\t'))
        .join('\n')
      await navigator.clipboard.writeText(tsv)
      toast.success(TOAST.COPY_DATA)
    } catch {
      toast.error(TOAST.CLIPBOARD_ERROR)
    }
  }, [cells])

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
      toast.success(TOAST.COPY_MARKDOWN)
    } catch {
      toast.error(TOAST.CLIPBOARD_ERROR)
    }
  }, [cells])

  const copyAsImage = useCallback(async (): Promise<void> => {
    try {
      const el = tableRef.current?.querySelector('table')
      if (!el) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true })
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      toast.success(TOAST.COPY_IMAGE)
    } catch {
      toast.error(TOAST.CLIPBOARD_ERROR)
    }
  }, [tableRef])

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6" data-toolbar>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <LayoutTemplate size={14} aria-hidden="true" /> {labels.templatesLabel} <ChevronDown size={14} aria-hidden="true" />
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
            <Palette size={14} aria-hidden="true" /> {labels.tableTheme} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="grid grid-cols-3 gap-2 p-3" style={{ minWidth: '200px' }}>
          {TABLE_THEMES.map((t) => {
            const isSelected = table.theme === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => table.setTheme(t.id)}
                className={'cursor-pointer rounded-md border p-1.5 transition-colors duration-150 hover:border-primary' + (isSelected ? ' ring-2 ring-primary' : ' border-border')}
                aria-label={t.label}
                aria-pressed={isSelected}
              >
                <svg width="100%" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true" className="mb-1 rounded-sm" preserveAspectRatio="none">
                  <rect x="0" y="0" width="60" height="8" rx="1" fill={t.headerBg} />
                  <rect x="0" y="10" width="60" height="6" rx="0" fill={t.rowBg} />
                  <rect x="0" y="17" width="60" height="6" rx="0" fill={t.altRowBg} />
                </svg>
                <span className="block text-center text-[10px] text-text-secondary">{t.label}</span>
              </button>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="sm" onClick={table.addRow} disabled={table.rows >= MAX_ROWS}>
          <Plus size={14} aria-hidden="true" /> {labels.addRow}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.addColumn} disabled={table.cols >= MAX_COLS}>
          <Plus size={14} aria-hidden="true" /> {labels.addColumn}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeRow} disabled={table.rows <= 1}>
          <Minus size={14} aria-hidden="true" /> {labels.removeRow}
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeColumn} disabled={table.cols <= 1}>
          <Minus size={14} aria-hidden="true" /> {labels.removeColumn}
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
              <Merge size={14} aria-hidden="true" /> {labels.merge}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{labels.tooltipMerge}</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="sm" onClick={table.unmergeSelection}>
          <Ungroup size={14} aria-hidden="true" /> {labels.unmerge}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={table.undo} disabled={!table.canUndo}>
              <Undo2 size={14} aria-hidden="true" /> {labels.undo}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {table.canUndo
              ? `Undo (${table.historyDepth} action${table.historyDepth === 1 ? '' : 's'})`
              : 'Nothing to undo'}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="ghost" size="sm" title={labels.comingSoon} onClick={() => toast.info(TOAST.AI_COMING_SOON)}>
        <Sparkles size={14} aria-hidden="true" /> {labels.aiToolbar}
      </Button>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Copy size={14} aria-hidden="true" /> {labels.copyTable} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={copyAsExcelData}>{labels.copyAsExcelData}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsCsv}>{labels.copyAsCsv}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsMarkdown}>{labels.copyAsMarkdown}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyAsImage}>{labels.copyAsImage}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Upload size={14} aria-hidden="true" /> {labels.importLabel} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => csvInputRef.current?.click()}>{labels.importCsv}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => excelInputRef.current?.click()}>{labels.importExcel}</DropdownMenuItem>
          <DropdownMenuItem disabled>{labels.importCleanData}</DropdownMenuItem>
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
              <Download size={14} aria-hidden="true" /> Export <ChevronDown size={14} aria-hidden="true" />
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

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); toast.info(TOAST.CELL_CLEARED) }}>
        <Trash2 size={14} aria-hidden="true" /> {labels.clearAll}
      </Button>

      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </div>
  )
}
