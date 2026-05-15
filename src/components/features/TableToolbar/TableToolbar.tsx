import { ChevronDown, FileDown, FileSpreadsheet, Merge, Minus, Plus, RotateCcw, Trash2, Upload } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { useImport } from '../../../hooks/useImport'
import { useTableContext } from '../../../context/TableContext'
import type { ExportFormat } from '../../../types/export.types'
import { Button } from '../../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip'

export function TableToolbar({
  onExport,
  isExporting,
}: {
  onExport: (format: ExportFormat) => void
  isExporting: boolean
}): ReactNode {
  const table = useTableContext()
  const csvInputRef = useRef<HTMLInputElement>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)
  const { error, importFile } = useImport()

  const importFromInput = (kind: 'csv' | 'excel', files: FileList | null): void => {
    const file = files?.[0]
    if (!file) return
    void importFile(file, kind)
  }

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-4">
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="sm" onClick={table.addRow} disabled={table.rows >= MAX_ROWS}>
          <Plus size={14} aria-hidden="true" /> Add Row
        </Button>
        <Button variant="ghost" size="sm" onClick={table.addColumn} disabled={table.cols >= MAX_COLS}>
          <Plus size={14} aria-hidden="true" /> Add Column
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeRow} disabled={table.rows <= 1}>
          <Minus size={14} aria-hidden="true" /> Remove Row
        </Button>
        <Button variant="ghost" size="sm" onClick={table.removeColumn} disabled={table.cols <= 1}>
          <Minus size={14} aria-hidden="true" /> Remove Column
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" onClick={table.mergeSelection}>
              <Merge size={14} aria-hidden="true" /> Merge
            </Button>
          </TooltipTrigger>
          <TooltipContent>Merge selected cells</TooltipContent>
        </Tooltip>
        <Button variant="ghost" size="sm" onClick={table.unmergeSelection}>
          Unmerge
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <Upload size={14} aria-hidden="true" /> Import <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => csvInputRef.current?.click()}>Import from CSV</DropdownMenuItem>
          <DropdownMenuItem onClick={() => excelInputRef.current?.click()}>Import from Excel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => importFromInput('csv', event.target.files)} />
      <input ref={excelInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => importFromInput('excel', event.target.files)} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="danger" size="sm" onClick={table.clearAll}>
          <Trash2 size={14} aria-hidden="true" /> Clear All
        </Button>
        <Button variant="ghost" size="sm" onClick={() => table.generateTable(table.rows, table.cols)}>
          <RotateCcw size={14} aria-hidden="true" /> Reset
        </Button>
      </div>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              Export <ChevronDown size={14} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {siteConfig.exports.map((item) => (
              <DropdownMenuItem key={item.format} onClick={() => onExport(item.format)}>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden shrink-0 items-center gap-1 lg:flex">
        {siteConfig.exports.map((item) => (
          <Button
            key={item.format}
            variant="secondary"
            size="sm"
            isLoading={isExporting}
            onClick={() => onExport(item.format)}
          >
            {item.format === 'excel' ? <FileSpreadsheet size={14} aria-hidden="true" /> : <FileDown size={14} aria-hidden="true" />}
            {item.label}
          </Button>
        ))}
      </div>
      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </div>
  )
}
