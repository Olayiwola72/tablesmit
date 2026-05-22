import {
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useMemo, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../../utils/toast/toast'
import { usePresets } from '../../../config/presets'
import { useTableContext, useTableData, useSelectedRange } from '../../../context/TableContext'
import { isSingleCellRange } from '../../../utils/mergeUtils/mergeUtils'
import { useCopyTable } from '../../../hooks/useCopyTable/useCopyTable'
import { useExport } from '../../../hooks/useExport/useExport'
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
  const { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsLatex, copyAsImage } = useCopyTable(cells, tableRef)
  const { exportAs, isExporting } = useExport()

  const { t } = useTranslation()

  const canMerge = useMemo(
    () => selectedRange !== null && !isSingleCellRange(selectedRange),
    [selectedRange],
  )

  return (
    <div className="flex h-12 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-6" data-toolbar>
      <TemplatesDropdown presets={presets} onApplyPreset={table.applyPreset} />

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
        onMerge={table.mergeSelection}
        onUnmerge={table.unmergeSelection}
        onUndo={table.undo}
      />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="ghost" size="sm" title={t('aiFeatures.comingSoon')} onClick={() => toast.info(t('toast.aiWaitlist'))}>
        <Sparkles size={14} aria-hidden="true" /> {t('toolbar.ai')}
      </Button>

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <CopyDropdown
        onCopyExcelData={copyAsExcelData}
        onCopyCsv={copyAsCsv}
        onCopyMarkdown={copyAsMarkdown}
        onCopyLatex={() => copyAsLatex(table.headerStyle)}
        onCopyImage={copyAsImage}
      />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <ImportDropdown />

      <div className="mx-1 h-5 w-px shrink-0 bg-border lg:hidden" />

      <MobileExportDropdown isExporting={isExporting} onExport={(format, el) => exportAs(format, el ?? null)} tableRef={tableRef} />

      <div className="mx-1 h-5 w-px shrink-0 bg-border" />

      <Button variant="danger" size="sm" onClick={() => { table.clearAll(); toast.info(t('toast.tableCleared')) }}>
        <Trash2 size={14} aria-hidden="true" /> {t('toolbar.clearAll')}
      </Button>
    </div>
  )
}
