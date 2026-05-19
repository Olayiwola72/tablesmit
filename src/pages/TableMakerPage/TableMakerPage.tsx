import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUp, Settings, Sparkles } from 'lucide-react'
import { exportFormats } from '../../config/exportConfig'
import { siteConfig } from '../../config/siteConfig'
import { TableProvider, useTableContext, useTableData } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport'
import { useFindReplace } from '../../hooks/useFindReplace'
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
import { TableCaption, type CaptionAlignment } from '../../components/features/TableCaption'
import { FindReplace } from '../../components/features/FindReplace'
import type { ExportFormat } from '../../types/export.types'

const ExportPanel = lazy(() => import('../../components/features/ExportPanel'))

export function TableMakerPage(): ReactNode {
  return (
    <TableProvider>
      <TableMakerContent />
    </TableProvider>
  )
}

function TableMakerContent(): ReactNode {
  const tableRef = useRef<HTMLDivElement>(null)
  const { rows, cols, updateCell } = useTableContext()
  const { cells } = useTableData()
  const { exportAs, isExporting } = useExport()
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const [caption, setCaption] = useState('')
  const [captionAlignment, setCaptionAlignment] = useState<CaptionAlignment>('left')

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl && e.key === 'p') {
        e.preventDefault()
        const iframe = document.createElement('iframe')
        iframe.style.position = 'fixed'
        iframe.style.right = '-9999px'
        iframe.style.bottom = '-9999px'
        iframe.style.width = '0'
        iframe.style.height = '0'
        document.body.appendChild(iframe)

        const win = iframe.contentWindow
        if (!win) { document.body.removeChild(iframe); return }

        /* Build print content: clone caption + table, strip print-hide elements */
        const caption = document.querySelector<HTMLElement>('[data-table-caption]')
        const container = tableRef.current
        let bodyHTML = ''
        if (caption) {
          const clone = caption.cloneNode(true) as HTMLElement
          clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
          bodyHTML += clone.outerHTML
        }
        if (container) {
          const clone = container.cloneNode(true) as HTMLElement
          clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
          bodyHTML += clone.outerHTML
        }

        /* Collect screen CSS only — skip @media print rules so the table
           renders with the same styling seen on screen */
        const cssRules: string[] = []
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule instanceof CSSMediaRule && /print/i.test(rule.media.mediaText)) continue
              cssRules.push(rule.cssText)
            }
          } catch { /* cross-origin sheet — skip */ }
        }

        const printCSS = `@media print {
  body { margin:2cm; }
  @page { margin:2cm; size:A4 landscape; }
  td, th { print-color-adjust:exact; -webkit-print-color-adjust:exact; }
  [data-print-hide] { display:none !important; }
}`

        const doc = win.document
        doc.open()
        doc.write(`<!DOCTYPE html>
<html>
<head>
  <style>${cssRules.join('\n')}</style>
  <style>${printCSS}</style>
</head>
<body>${bodyHTML}</body>
</html>`)
        doc.close()

        win.addEventListener('load', () => {
          setTimeout(() => { win.print(); document.body.removeChild(iframe) }, 300)
        })
        return
      }

      if (isCtrl && (e.key === 'e' || e.key === 'l' || e.key === 'r')) {
        e.preventDefault()
        if (e.key === 'e') setCaptionAlignment('center')
        else if (e.key === 'l') setCaptionAlignment('left')
        else if (e.key === 'r') setCaptionAlignment('right')
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [caption, captionAlignment, tableRef])

  const {
    query, setQuery, replaceText, setReplaceText,
    matches, currentMatch, matchIndex,
    next, prev, replace, replaceAll,
    isOpen: findOpen, setIsOpen: setFindOpen,
    replaceMode,
  } = useFindReplace(cells)

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = (): void => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    void exportAs(format, tableRef.current, caption)
  }, [exportAs, tableRef, caption])

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-slate-900">
      <section className="border-b border-border bg-white px-6 py-5 text-center sm:py-7 dark:border-slate-700 dark:bg-slate-900" data-print-hide>
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
      <TableToolbar tableRef={tableRef} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-sidebar-left flex-none flex-col gap-8 overflow-y-auto border-r border-border bg-surface p-6 md:flex" data-sidebar-left>
          <DimensionsPanel />
          <HeaderOptionsPanel />
          <ColorPanel />
          <BorderPanel />
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace">
          <div className="flex items-center justify-between border-b border-border bg-white px-4 py-2 text-xs text-text-muted dark:border-slate-700 dark:bg-slate-900" data-print-hide>
            <span>{rows} rows x {cols} columns</span>
            <span>{siteConfig.labels.autoFitColumn}</span>
          </div>
          <div className="px-4 pt-2" data-table-caption>
            <TableCaption value={caption} onChange={setCaption} alignment={captionAlignment} onAlignmentChange={setCaptionAlignment} />
          </div>
          <TableGrid tableRef={tableRef} findMatches={matches} currentFindMatch={currentMatch} />
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

      {showBackToTop ? (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-opacity hover:bg-surface dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      ) : null}

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
            <AiFeaturesPanel />
          </div>
        )}
      </MobileSheet>
    </main>
  )
}

export default TableMakerPage
