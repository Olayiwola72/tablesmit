import { lazy, Suspense, useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useTableContext, useTableData } from '../../../context/TableContext'
import { useExport } from '../../../hooks/useExport/useExport'
import { useFindReplace } from '../../../hooks/useFindReplace/useFindReplace'
import { usePrintTable } from '../../../hooks/usePrintTable/usePrintTable'
import { useTableCopyShortcut } from '../../../hooks/useTableCopyShortcut/useTableCopyShortcut'
import { PanelLoader } from '../../ui/PanelLoader/PanelLoader'
import { MobileSheet } from '../../layout/MobileSheet/MobileSheet'
import { HeroBanner } from '../HeroBanner/HeroBanner'
import { StatusBar } from '../StatusBar/StatusBar'
import { MobileFloatingActions } from '../MobileFloatingActions/MobileFloatingActions'
import { TableGrid } from '../TableGrid/TableGrid'
import { TableToolbar } from '../TableToolbar/TableToolbar'
import { FindReplace } from '../FindReplace/FindReplace'
import type { ExportFormat } from '../../../services/exportService/export.types'

const DimensionsPanel = lazy(() => import('../DimensionsPanel/DimensionsPanel'))
const HeaderOptionsPanel = lazy(() => import('../HeaderOptionsPanel/HeaderOptionsPanel'))
const ColorPanel = lazy(() => import('../ColorPanel/ColorPanel'))
const BorderPanel = lazy(() => import('../BorderPanel/BorderPanel'))
const MergeCellsPanel = lazy(() => import('../MergeCellsPanel/MergeCellsPanel'))
const AiFeaturesPanel = lazy(() => import('../AiFeaturesPanel/AiFeaturesPanel'))
const ExportPanel = lazy(() => import('../ExportPanel/ExportPanel'))

export function TableMakerContent(): ReactNode {
  const tableRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const { rows, cols, columnWidths, updateCell, caption, captionAlignment, captionTextColor, captionBgColor, setCaption, setCaptionAlignment, setCaptionTextColor, setCaptionBgColor } = useTableContext()
  const { cells } = useTableData()
  const { exportAs, isExporting } = useExport()
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const tableWidth = useMemo(() => columnWidths.reduce((sum, w) => sum + w, 0), [columnWidths])

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
    void exportAs(format, exportRef.current, caption, captionTextColor, captionBgColor, captionAlignment)
  }, [exportAs, exportRef, caption, captionTextColor, captionBgColor, captionAlignment])

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
      <HeroBanner />
      <TableToolbar tableRef={tableRef} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex" data-sidebar-left>
          <Suspense fallback={<PanelLoader />}>
            <DimensionsPanel />
            <HeaderOptionsPanel />
            <ColorPanel />
          </Suspense>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <StatusBar rows={rows} cols={cols} />
          <div ref={exportRef} className="flex flex-col min-w-0 w-fit">
            <TableGrid tableRef={tableRef} findMatches={matches} currentFindMatch={currentMatch} caption={{ value: caption, onChange: setCaption, alignment: captionAlignment, onAlignmentChange: setCaptionAlignment, tableWidth, textColor: captionTextColor, bgColor: captionBgColor, onTextColorChange: setCaptionTextColor, onBgColorChange: setCaptionBgColor }} />
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
            <BorderPanel />
            <MergeCellsPanel />
            <AiFeaturesPanel />
          </Suspense>
        </aside>
      </div>

      <MobileFloatingActions onOpenSettings={() => setActiveSheet('settings')} onOpenPresets={() => setActiveSheet('presets')} />

      <MobileSheet title={activeSheet === 'settings' ? 'Settings' : 'Presets'} open={activeSheet !== null} onClose={() => setActiveSheet(null)}>
        {activeSheet === 'settings' ? (
          <Suspense fallback={<PanelLoader />}>
            <div className="space-y-8">
              <DimensionsPanel />
              <HeaderOptionsPanel />
              <ColorPanel />
            </div>
          </Suspense>
        ) : (
          <Suspense fallback={<PanelLoader />}>
            <div className="space-y-8">
              <ExportPanel onExport={handleExport} isExporting={isExporting} />
              <BorderPanel />
              <MergeCellsPanel />
              <AiFeaturesPanel />
            </div>
          </Suspense>
        )}
      </MobileSheet>
    </main>
  )
}
