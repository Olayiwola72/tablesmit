import {
  ClipboardCopy,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useMemo, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { toast, TOAST } from '../../../utils/toast/toast'
import { usePresets } from '../../../config/presets'
import { useTableContext, useTableData, useSelectedRange } from '../../../context/TableContext'
import { handlePasteData } from '../../../hooks/useClipboardPaste/useClipboardPaste'
import { isSingleCellRange } from '../../../utils/mergeUtils/mergeUtils'
import { useCopyTable } from '../../../hooks/useCopyTable/useCopyTable'
import { useExport } from '../../../hooks/useExport/useExport'
import { trackEvent } from '../../../utils/analytics/analytics'
import { Button } from '../../ui/Button/Button'
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
  const { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsLatex, copyAsImage, copyAsHtml } = useCopyTable(
    cells, tableRef, table.caption, table.columnWidths, table.cellColors, table.cellTextColors, table.cellTextAlign,
    table.mergedRanges, table.headerColor, table.headerStyle, table.contentColor, table.contentBgColor, table.theme,
    table.borderStyle, table.borderColor, table.captionTextColor, table.captionBgColor, table.captionAlignment, table.captionItalic,
  )
  const { exportAs, isExporting } = useExport()

  const { t } = useTranslation()

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
          toast.success(TOAST.PASTE_SUCCESS(result.rowCount, result.colCount))
          trackEvent('table_pasted', { rows: result.rowCount, cols: result.colCount })
        }
      } catch {
        toast.error(TOAST.PASTE_ERROR)
      }
    },
    [table],
  )

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6" data-toolbar>
      <TemplatesDropdown presets={presets} onApplyPreset={(p) => { table.applyPreset(p); trackEvent('preset_applied', { preset: p.id }) }} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <ThemeDropdown theme={table.theme} onSetTheme={table.setTheme} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <RowColumnActions
        rows={table.rows}
        cols={table.cols}
        onAddRow={table.addRow}
        onAddColumn={table.addColumn}
        onRemoveRow={table.removeRow}
        onRemoveColumn={table.removeColumn}
      />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <MergeUndoGroup
        canMerge={canMerge}
        canUndo={table.canUndo}
        historyDepth={table.historyDepth}
        onMerge={() => { table.mergeSelection(); trackEvent('table_merged', {}) }}
        onUnmerge={() => { table.unmergeSelection(); trackEvent('table_unmerged', {}) }}
        onUndo={() => { table.undo(); trackEvent('table_undone', {}) }}
      />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="ghost" size="sm" title={t('aiFeatures.comingSoon')} onClick={() => { trackEvent('ai_waitlist_clicked', {}); toast.info(t('toast.aiWaitlist')) }}>
        <Sparkles size={14} aria-hidden="true" /> {t('toolbar.ai')}
      </Button>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <CopyDropdown
        onCopyExcelData={copyAsExcelData}
        onCopyCsv={copyAsCsv}
        onCopyMarkdown={copyAsMarkdown}
        onCopyLatex={() => copyAsLatex(table.headerStyle)}
        onCopyImage={copyAsImage}
        onCopyHtml={copyAsHtml}
      />

      <Button variant="secondary" size="sm" onClick={handlePaste} aria-label={t('aria.pasteTable')}>
        <ClipboardCopy size={14} aria-hidden="true" /> {t('toolbar.paste')}
      </Button>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <ImportDropdown />

      <div className="mx-1 h-5 w-px shrink-0 bg-border lg:hidden" />

      <MobileExportDropdown isExporting={isExporting} onExport={(format, el) => exportAs(format, el ?? null)} tableRef={tableRef} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); trackEvent('table_cleared', {}); toast.info(t('toast.tableCleared')) }}>
        <Trash2 size={14} aria-hidden="true" /> {t('toolbar.clearAll')}
      </Button>
    </div>
  )
}
