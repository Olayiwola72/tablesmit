import { lazy, Suspense, useCallback, useRef, useState, type ReactNode } from 'react'
import { HeroBanner } from '../../components/features/HeroBanner/HeroBanner'
import { TableProvider, useTableContext, useTableData } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport/useExport'
import { useFindReplace } from '../../hooks/useFindReplace/useFindReplace'
import { usePrintTable } from '../../hooks/usePrintTable/usePrintTable'
import { useTableCopyShortcut } from '../../hooks/useTableCopyShortcut/useTableCopyShortcut'
import { PanelLoader } from '../../components/ui/PanelLoader/PanelLoader'
import { MobileSheet } from '../../components/layout/MobileSheet/MobileSheet'
import { StatusBar } from '../../components/features/StatusBar/StatusBar'
import { MobileFloatingActions } from '../../components/features/MobileFloatingActions/MobileFloatingActions'
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
  const tableRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const { rows, cols, updateCell } = useTableContext()
  const { cells } = useTableData()
  const { exportAs, isExporting } = useExport()
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const [caption, setCaption] = useState('')
  const [captionAlignment, setCaptionAlignment] = useState<CaptionAlignment>('center')

  usePrintTable(tableRef)
  useTableCopyShortcut(cells, tableRef, setCaptionAlignment)

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
      <HeroBanner />
      <TableToolbar tableRef={tableRef} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex" data-sidebar-left>
          <DimensionsPanel />
          <HeaderOptionsPanel />
          <ColorPanel />
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <StatusBar rows={rows} cols={cols} />
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

      <MobileFloatingActions onOpenSettings={() => setActiveSheet('settings')} onOpenPresets={() => setActiveSheet('presets')} />

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
