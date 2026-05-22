import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Keyboard, Settings, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { exportFormats } from '../../config/export/exportConfig'
import { TableProvider, useTableContext, useTableData } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport/useExport'
import { useFindReplace } from '../../hooks/useFindReplace/useFindReplace'
import { usePrintTable } from '../../hooks/usePrintTable/usePrintTable'
import { IconButton } from '../../components/ui/IconButton/IconButton'
import { PanelLoader } from '../../components/ui/PanelLoader/PanelLoader'
import { MobileSheet } from '../../components/layout/MobileSheet/MobileSheet'
import { TableGrid } from '../../components/features/TableGrid/TableGrid'
import { TableToolbar } from '../../components/features/TableToolbar/TableToolbar'
import { DimensionsPanel } from '../../components/features/DimensionsPanel/DimensionsPanel'
import { HeaderOptionsPanel } from '../../components/features/HeaderOptionsPanel/HeaderOptionsPanel'
import { ColorPanel } from '../../components/features/ColorPanel/ColorPanel'
import { BorderPanel } from '../../components/features/BorderPanel/BorderPanel'
import { MergeCellsPanel } from '../../components/features/MergeCellsPanel/MergeCellsPanel'
import { AiFeaturesPanel } from '../../components/features/AiFeaturesPanel/AiFeaturesPanel'
import { TableCaption } from '../../components/features/TableCaption/TableCaption'
import type { CaptionAlignment } from '../../components/features/TableCaption/TableCaption.types'
import { FindReplace } from '../../components/features/FindReplace/FindReplace'
import { isTableEmpty } from '../../utils/tableUtils/tableUtils'
import { toast } from '../../utils/toast/toast'
import type { ExportFormat } from '../../services/exportService/export.types'

const ExportPanel = lazy(() => import('../../components/features/ExportPanel/ExportPanel'))

export function TableMakerPage(): ReactNode {
  return (
    <TableProvider>
      <TableMakerContent />
    </TableProvider>
  )
}

function TableMakerContent(): ReactNode {
  const { t } = useTranslation()
  const tableRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const { rows, cols, updateCell } = useTableContext()
  const { cells } = useTableData()
  const { exportAs, isExporting } = useExport()
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const [caption, setCaption] = useState('')
  const [captionAlignment, setCaptionAlignment] = useState<CaptionAlignment>('center')

  usePrintTable(tableRef)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl && (e.key === 'e' || e.key === 'l' || e.key === 'r')) {
        e.preventDefault()
        if (e.key === 'e') setCaptionAlignment('center')
        else if (e.key === 'l') setCaptionAlignment('left')
        else if (e.key === 'r') setCaptionAlignment('right')
      }

      if (isCtrl && e.key === 'c') {
        const target = e.target as HTMLElement
        const tag = target.tagName.toLowerCase()
        if (target.closest('[contenteditable]') || tag === 'input' || tag === 'textarea' || tag === 'select') return
        e.preventDefault()

        if (isTableEmpty(cells)) return

        const el = tableRef.current?.querySelector('table')
        if (!el) return

        import('html2canvas').then(({ default: html2canvas }) => {
          html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true }).then(
            (canvas) => {
              canvas.toBlob((blob) => {
                if (!blob) return
                navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(
                  () => { toast.success(t('toast.copyImage')) },
                  () => { toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.')) },
                )
              }, 'image/png')
            },
            () => { toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.')) },
          )
        })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [cells, t])

  const {
    query, setQuery, replaceText, setReplaceText,
    matches, currentMatch, matchIndex,
    next, prev, replace, replaceAll,
    isOpen: findOpen, setIsOpen: setFindOpen,
    replaceMode,
  } = useFindReplace(cells)

  const handleFindClose = useCallback((): void => {
    setFindOpen(false)
  }, [setFindOpen])

  const handleFindReplace = useCallback((): void => {
    replace(updateCell)
  }, [replace, updateCell])

  const handleFindReplaceAll = useCallback((): void => {
    replaceAll(updateCell)
  }, [replaceAll, updateCell])

  const handleExport = useCallback((format: ExportFormat): void => {
    void exportAs(format, exportRef.current, caption)
  }, [exportAs, exportRef, caption])

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
      <section className="border-b border-border bg-white px-6 py-5 text-center sm:py-7 dark:border-slate-700 dark:bg-slate-900" data-print-hide>
        <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
          {t('hero.headline')}
        </h1>
        <p className="mx-auto mt-1 max-w-lg text-sm text-text-secondary">
          {t('hero.subtext')}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-text-muted sm:text-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {t('hero.customHeaders')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {t('hero.columnTypes')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {t('hero.mergeCells')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {exportFormats.map((f) => f.label).join(', ')}
          </span>
        </div>
      </section>
      <TableToolbar tableRef={tableRef} isExporting={isExporting} onExport={handleExport} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex" data-sidebar-left>
          <DimensionsPanel />
          <HeaderOptionsPanel />
          <ColorPanel />
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <div className="flex items-center justify-between border-b border-border bg-white px-4 py-2 text-xs text-text-muted dark:border-slate-700 dark:bg-slate-900" data-print-hide>
            <span>{t('grid.totalCells', { rows, cols })}</span>
            <span>{t('grid.autoFitTip')}</span>
            <span className="flex items-center gap-1.5">
              <Keyboard size={12} />
              {t('grid.keyboardHint')}
            </span>
          </div>
          <div ref={exportRef} className="flex flex-col min-w-0 w-fit">
            <div className="px-4 pt-2" data-table-caption>
              <TableCaption value={caption} onChange={setCaption} alignment={captionAlignment} onAlignmentChange={setCaptionAlignment} />
            </div>
            <TableGrid tableRef={tableRef} findMatches={matches} currentFindMatch={currentMatch} />
          </div>
          {findOpen && (
            <div className="absolute right-2 top-2 z-40">
              <FindReplace
                query={query}
                setQuery={setQuery}
                replaceText={replaceText}
                setReplaceText={setReplaceText}
                matchIndex={matchIndex}
                totalMatches={matches.length}
                onNext={next}
                onPrev={prev}
                onReplace={handleFindReplace}
                onReplaceAll={handleFindReplaceAll}
                onClose={handleFindClose}
                replaceMode={replaceMode}
              />
            </div>
          )}
        </section>

        <aside aria-label="Table editing controls" className="hidden w-sidebar-right flex-none flex-col gap-8 overflow-y-auto border-l border-border bg-surface p-6 lg:flex" data-sidebar-right>
          <Suspense fallback={<PanelLoader />}>
            <ExportPanel onExport={handleExport} isExporting={isExporting} />
          </Suspense>
          <BorderPanel />
          <MergeCellsPanel />
          <AiFeaturesPanel />
        </aside>
      </div>

      <div className="fixed bottom-4 left-4 z-20 md:hidden">
        <IconButton
          aria-label="Open settings"
          className="rounded-full border border-border bg-white shadow-sm"
          icon={<Settings size={18} aria-hidden="true" />}
          onClick={() => setActiveSheet('settings')}
        />
      </div>
      <div className="fixed bottom-4 right-4 z-20 md:hidden">
        <IconButton
          aria-label="Open presets"
          className="rounded-full border border-border bg-white shadow-sm"
          icon={<Sparkles size={18} aria-hidden="true" />}
          onClick={() => setActiveSheet('presets')}
        />
      </div>

      <MobileSheet title={activeSheet === 'settings' ? 'Settings' : 'Presets'} open={activeSheet !== null} onClose={() => setActiveSheet(null)}>
        {activeSheet === 'settings' ? (
          <div className="space-y-8">
            <DimensionsPanel />
            <HeaderOptionsPanel />
            <ColorPanel />
          </div>
        ) : (
          <div className="space-y-8">
            <Suspense fallback={<PanelLoader />}>
              <ExportPanel onExport={handleExport} isExporting={isExporting} />
            </Suspense>
            <BorderPanel />
            <MergeCellsPanel />
            <AiFeaturesPanel />
          </div>
        )}
      </MobileSheet>
    </main>
  )
}

export default TableMakerPage
