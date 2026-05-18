import { lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import { Settings, Sparkles } from 'lucide-react'
import { exportFormats } from '../../config/exportConfig'
import { siteConfig } from '../../config/siteConfig'
import { TableProvider, useTableContext } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport'
import { IconButton } from '../../components/ui/IconButton'
import { PanelLoader } from '../../components/ui/PanelLoader'
import { MobileSheet } from '../../components/layout/MobileSheet'
import { TableGrid } from '../../components/features/TableGrid'
import { TableToolbar } from '../../components/features/TableToolbar'
import { DimensionsPanel } from '../../components/features/DimensionsPanel'
import { HeaderOptionsPanel } from '../../components/features/HeaderOptionsPanel'
import { ColorPanel } from '../../components/features/ColorPanel'
import { BorderPanel } from '../../components/features/BorderPanel'
import { MergeCellsPanel } from '../../components/features/MergeCellsPanel'
import { AiFeaturesPanel } from '../../components/features/AiFeaturesPanel'
import { TableCaption } from '../../components/features/TableCaption'
import type { ExportFormat } from '../../types/export.types'

const ExportPanel = lazy(() => import('../../components/features/ExportPanel'))
const ColumnFormattingPanel = lazy(() => import('../../components/features/ColumnFormattingPanel'))
const QuickPresetsPanel = lazy(() => import('../../components/features/QuickPresetsPanel'))

export function TableMakerPage(): ReactNode {
  return (
    <TableProvider>
      <TableMakerContent />
    </TableProvider>
  )
}

function TableMakerContent(): ReactNode {
  const tableRef = useRef<HTMLDivElement>(null)
  const { rows, cols } = useTableContext()
  const { exportAs, isExporting } = useExport()
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const [caption, setCaption] = useState('')

  const handleExport = (format: ExportFormat): void => {
    void exportAs(format, tableRef.current)
  }

  return (
    <main className="flex h-[calc(100vh-56px)] flex-col overflow-hidden bg-white md:h-[calc(100vh-60px)]">
      <section className="border-b border-border bg-white px-6 py-5 text-center sm:py-7">
        <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
          {siteConfig.copy.tableMakerHeadline}
        </h1>
        <p className="mx-auto mt-1 max-w-lg text-sm text-text-secondary">
          {siteConfig.copy.tableMakerSubtext}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-text-muted sm:text-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            Custom headers
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            Column types
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            Merge cells
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            {exportFormats.map((f) => f.label).join(', ')}
          </span>
        </div>
      </section>
      <TableToolbar tableRef={tableRef} onExport={handleExport} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex">
          <DimensionsPanel />
          <HeaderOptionsPanel />
          <ColorPanel />
          <BorderPanel />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <div className="flex items-center justify-between border-b border-border bg-white px-4 py-2 text-xs text-text-muted dark:bg-slate-900">
            <span>{rows} rows x {cols} columns</span>
            <span>{siteConfig.labels.autoFitColumn}</span>
          </div>
          <div className="px-4 pt-2" data-table-caption>
            <TableCaption value={caption} onChange={setCaption} />
          </div>
          <TableGrid tableRef={tableRef} />
        </section>

        <aside aria-label="Table editing controls" className="hidden w-sidebar-right flex-none flex-col gap-8 overflow-y-auto border-l border-border bg-surface p-6 lg:flex">
          <Suspense fallback={<PanelLoader />}>
            <ExportPanel onExport={handleExport} isExporting={isExporting} />
          </Suspense>
          <MergeCellsPanel />
          <Suspense fallback={<PanelLoader />}>
            <ColumnFormattingPanel />
          </Suspense>
          <Suspense fallback={<PanelLoader />}>
            <QuickPresetsPanel />
          </Suspense>
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
            <BorderPanel />
          </div>
        ) : (
          <div className="space-y-8">
            <Suspense fallback={<PanelLoader />}>
              <ExportPanel onExport={handleExport} isExporting={isExporting} />
            </Suspense>
            <MergeCellsPanel />
            <Suspense fallback={<PanelLoader />}>
              <ColumnFormattingPanel />
            </Suspense>
            <Suspense fallback={<PanelLoader />}>
              <QuickPresetsPanel />
            </Suspense>
            <AiFeaturesPanel />
          </div>
        )}
      </MobileSheet>
    </main>
  )
}

export default TableMakerPage
