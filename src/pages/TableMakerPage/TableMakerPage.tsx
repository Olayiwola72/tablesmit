import { lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import { Settings, Sparkles, X } from 'lucide-react'
import { TableProvider, useTableContext } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport'
import { Button } from '../../components/ui/Button'
import { IconButton } from '../../components/ui/IconButton'
import { PanelLoader } from '../../components/ui/PanelLoader'
import { TableGrid } from '../../components/features/TableGrid'
import { TableToolbar } from '../../components/features/TableToolbar'
import { DimensionsPanel } from '../../components/features/DimensionsPanel'
import { HeaderOptionsPanel } from '../../components/features/HeaderOptionsPanel'
import { ColorPanel } from '../../components/features/ColorPanel'
import { MergeCellsPanel } from '../../components/features/MergeCellsPanel'
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

  const handleExport = (format: ExportFormat): void => {
    void exportAs(format, tableRef.current)
  }

  return (
    <main className="flex h-[calc(100vh-56px)] flex-col overflow-hidden bg-white md:h-[calc(100vh-60px)]">
      <TableToolbar onExport={handleExport} isExporting={isExporting} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex">
          <DimensionsPanel />
          <HeaderOptionsPanel />
          <ColorPanel />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <div className="flex items-center justify-between border-b border-border bg-white px-4 py-2 text-xs text-text-muted">
            <span>{rows} rows x {cols} columns</span>
            <span>Double-click a column border to AutoFit width</span>
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
            <MergeCellsPanel />
            <Suspense fallback={<PanelLoader />}>
              <ColumnFormattingPanel />
            </Suspense>
            <Suspense fallback={<PanelLoader />}>
              <QuickPresetsPanel />
            </Suspense>
          </div>
        )}
      </MobileSheet>
    </main>
  )
}

function MobileSheet({
  title,
  open,
  onClose,
  children,
}: {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}): ReactNode {
  if (!open) return null

  return (
    <>
      <button type="button" aria-label="Close panel overlay" className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />
      <aside className="fixed inset-x-0 bottom-0 z-40 max-h-[80vh] overflow-y-auto rounded-t-md bg-white p-6 shadow-sm md:hidden">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} aria-hidden="true" /> Close
          </Button>
        </div>
        {children}
      </aside>
    </>
  )
}

export default TableMakerPage
