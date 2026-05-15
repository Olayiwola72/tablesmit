import { ChevronDown, Copy, Download, LayoutTemplate, Merge, Minus, Plus, Trash2, Undo2, Ungroup, Upload } from 'lucide-react'
import { useCallback, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { exportFormats } from '../../../config/exportConfig'
import { MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { presets } from '../../../config/presets'
import { useImport } from '../../../hooks/useImport'
import { useTableContext, useTableData } from '../../../context/TableContext'
import { isSingleCellRange } from '../../../utils/mergeUtils'
import { Button } from '../../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip'

import type { ExportFormat } from '../../../types/export.types'

export function TableToolbar({ tableRef, onExport }: { tableRef: RefObject<HTMLDivElement>; onExport?: (format: ExportFormat) => void }): ReactNode {
  const table = useTableContext()
  const { cells } = useTableData()
  const csvInputRef = useRef<HTMLInputElement>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)
  const { error, importFile } = useImport()

  const importFromInput = (kind: 'csv' | 'excel', files: FileList | null): void => {
    const file = files?.[0]
    if (!file) return
    void importFile(file, kind)
  }

  const { labels } = siteConfig

  const canMerge = useMemo(
    () => table.selectedRange !== null && !isSingleCellRange(table.selectedRange),
    [table.selectedRange],
  )

  const copyAsCsv = useCallback(async (): Promise<void> => {
    const lines = cells.map((row) =>
      row.map((cell) => {
        let value = cell.value
        if (/[,"\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`
        return value
      }).join('\t'),
    )
    await navigator.clipboard.writeText(lines.join('\n'))
  }, [cells])

  const copyAsMarkdown = useCallback(async (): Promise<void> => {
    if (cells.length === 0) return
    const colCount = cells[0]!.length
    const header = `| ${cells[0]!.map((_c, i) => ` C${i + 1} `).join('|')} |`
    const separator = `| ${Array.from({ length: colCount }, () => ' --- ').join('|')} |`
    const body = cells.map((row) =>
      `| ${row.map((cell) => ` ${cell.value || ' '} `).join('|')} |`,
    ).join('\n')
    await navigator.clipboard.writeText(`${header}\n${separator}\n${body}`)
  }, [cells])

  const copyAsImage = useCallback(async (): Promise<void> => {
    const el = tableRef.current?.querySelector('table')
    if (!el) return
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true })
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
  }, [tableRef])

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6">
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
        <Button variant="ghost" size="sm" onClick={table.undo} disabled={!table.canUndo}>
          <Undo2 size={14} aria-hidden="true" /> {labels.undo}
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Copy size={14} aria-hidden="true" /> {labels.copyTable} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
        </DropdownMenuContent>
      </DropdownMenu>
      <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => importFromInput('csv', event.target.files)} />
      <input ref={excelInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => importFromInput('excel', event.target.files)} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="danger" size="sm" onClick={table.clearAll}>
        <Trash2 size={14} aria-hidden="true" /> {labels.clearAll}
      </Button>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {onExport ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                <Download size={14} aria-hidden="true" /> {labels.exportOptions} <ChevronDown size={14} aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {exportFormats.map((item) => (
                <DropdownMenuItem key={item.format} onClick={() => onExport(item.format)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </div>
  )
}
