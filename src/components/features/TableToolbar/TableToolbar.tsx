import {
  ClipboardCopy,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useMemo, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '@/utils/toast/toast'
import { usePresets } from '@/config/table/presets'
import { useTableContext, useTableData, useSelectedRange } from '@/context/TableContext'
import { handlePasteData } from '@/services/clipboardParser'
import { isSingleCellRange } from '@/utils/mergeUtils/mergeUtils'
import { useCopyTable } from '@/hooks/useCopyTable/useCopyTable'
import { useExport } from '@/hooks/useExport/useExport'
import { TABLE_THEMES } from '@/config/table/tableThemes/tableThemes'
import { trackEvent } from '@/utils/analytics/analytics'
import { Button } from '../../ui/Button/Button'
import { ToolbarSeparator } from '../../ui/ToolbarSeparator/ToolbarSeparator'
import { TemplatesDropdown } from './TemplatesDropdown/TemplatesDropdown'
import { ThemeDropdown } from './ThemeDropdown/ThemeDropdown'
import { RowColumnActions } from './RowColumnActions/RowColumnActions'
import { MergeUndoGroup } from './MergeUndoGroup/MergeUndoGroup'
import { CopyDropdown } from './CopyDropdown/CopyDropdown'
import { ImportDropdown } from './ImportDropdown/ImportDropdown'
import { MobileExportDropdown } from './MobileExportDropdown/MobileExportDropdown'

export function TableToolbar({ tableRef }: { tableRef: RefObject<HTMLDivElement | null> }): ReactNode {
  const table = useTableContext()
  const { cells } = useTableData()
  const selectedRange = useSelectedRange()
  const presets = usePresets()
  const headerTextColor = TABLE_THEMES.find(t => t.id === table.theme)?.headerText ?? '#FFFFFF'

  const { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsLatex, copyAsImage, copyAsHtml, isCopying } = useCopyTable(
    cells, tableRef, table.caption, table.columnWidths, table.cellColors, table.cellTextColors, table.cellTextAlign,
    table.mergedRanges, table.headerColor, table.headerStyle, table.contentColor, table.contentBgColor, table.theme,
    table.borderStyle, table.borderColor, table.captionTextColor, table.captionBgColor, table.captionAlignment, table.captionItalic,
    table.rowColors, table.columnColors, headerTextColor, table.columnTextAlign,
  )
  const { exportAs, exportingFormat } = useExport()

  const { t } = useTranslation(['common', 'table'])

  const canMerge = useMemo(
    () => selectedRange !== null && !isSingleCellRange(selectedRange),
    [selectedRange],
  )

  const handlePaste = useMemo(
    () => async (): Promise<void> => {
      try {
        const items = await navigator.clipboard.read()
        let html = ''
        let text = ''
        for (const item of items) {
          if (item.types.includes('text/html')) {
            const blob = await item.getType('text/html')
            html = await blob.text()
          }
          if (item.types.includes('text/plain')) {
            const blob = await item.getType('text/plain')
            text = await blob.text()
          }
        }
        if (!text && !html) {
          text = await navigator.clipboard.readText()
        }
        const result = await handlePasteData(text, html || null, table.setCells)
        if (result) {
          toast.success(t('toast.pasteSuccess', { rows: result.rowCount, cols: result.colCount }))
          trackEvent('table_pasted', { rows: result.rowCount, cols: result.colCount })
        }
      } catch {
        toast.error(t('toast.pasteError'))
      }
    },
    [table, t],
  )

  return (
    <div className="flex h-12 items-center gap-1 overflow-x-auto border-b border-border bg-surface px-4" data-toolbar>
      <TemplatesDropdown presets={presets} onApplyPreset={(p) => { table.applyPreset(p); trackEvent('preset_applied', { preset: p.id }) }} />

      <ToolbarSeparator />

      <ThemeDropdown theme={table.theme} onSetTheme={table.setTheme} />

      <ToolbarSeparator />

      <RowColumnActions
        rows={table.rows}
        cols={table.cols}
        onAddRow={table.addRow}
        onAddColumn={table.addColumn}
        onRemoveRow={table.removeRow}
        onRemoveColumn={table.removeColumn}
      />

      <ToolbarSeparator />

      <MergeUndoGroup
        canMerge={canMerge}
        canUndo={table.canUndo}
        historyDepth={table.historyDepth}
        onMerge={() => { table.mergeSelection(); trackEvent('table_merged', {}) }}
        onUnmerge={() => { table.unmergeSelection(); trackEvent('table_unmerged', {}) }}
        onUndo={() => { table.undo(); trackEvent('table_undone', {}) }}
      />

      <ToolbarSeparator />

      <Button variant="ghost" size="sm" title={t('aiFeatures.comingSoon')} onClick={() => { trackEvent('ai_waitlist_clicked', {}); toast.info(t('toast.aiWaitlist')) }}>
        <Sparkles size={14} aria-hidden="true" /> {t('toolbar.ai')}
      </Button>

      <ToolbarSeparator />

      <CopyDropdown
        onCopyExcelData={copyAsExcelData}
        onCopyCsv={copyAsCsv}
        onCopyMarkdown={copyAsMarkdown}
        onCopyLatex={() => copyAsLatex(table.headerStyle)}
        onCopyImage={copyAsImage}
        onCopyHtml={copyAsHtml}
        isCopyingImage={isCopying}
      />

      <Button variant="secondary" size="sm" onClick={handlePaste} aria-label={t('aria.pasteTable')}>
        <ClipboardCopy size={14} aria-hidden="true" /> {t('toolbar.paste')}
      </Button>

      <ToolbarSeparator />

      <ImportDropdown />

      <ToolbarSeparator />

      <MobileExportDropdown isExporting={exportingFormat !== null} onExport={(format, el) => exportAs(format, el ?? null)} tableRef={tableRef} />

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); trackEvent('table_cleared', {}); toast.info(t('toast.tableCleared')) }}>
        <Trash2 size={14} aria-hidden="true" /> {t('toolbar.clearAll')}
      </Button>
    </div>
  )
}
