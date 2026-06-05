import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ChevronRight, Clipboard, Code, Copy, FileText, Image, Loader2, Table, Trash2, X } from 'lucide-react'
import { useTableContext, useTableData } from '@/context/TableContext'
import { DEFAULT_ROWS, DEFAULT_COLS } from '@/config/table/tableDefaults/tableDefaults'

import { useColumnSort } from '@/hooks/useColumnSort/useColumnSort'
import { useCopyTable } from '@/hooks/useCopyTable/useCopyTable'
import { useExport } from '@/hooks/useExport/useExport'
import { useFindReplace } from '@/hooks/useFindReplace/useFindReplace'
import { usePrintTable } from '@/hooks/usePrintTable/usePrintTable'
import { useTableCopyShortcut } from '@/hooks/useTableCopyShortcut/useTableCopyShortcut'
import { handlePasteData } from '@/services/clipboardParser'
import { trackEvent } from '@/utils/analytics/analytics'
import { toast } from '@/utils/toast/toast'
import { PanelLoader } from '../../ui/PanelLoader/PanelLoader'
import { MobileSheet } from '../../layout/MobileSheet/MobileSheet'
import { HeroBanner } from '../HeroBanner/HeroBanner'
import { StatusBar } from '../StatusBar/StatusBar'
import { MobileFloatingActions } from '../MobileFloatingActions/MobileFloatingActions'
import { TableGrid } from '../TableGrid/TableGrid'
import { TableToolbar } from '../TableToolbar/TableToolbar'
import { FindReplace } from '../FindReplace/FindReplace'
import type { ExportFormat } from '@/services/exportService/export.types'

const DimensionsPanel = lazy(() => import('../DimensionsPanel/DimensionsPanel'))
const HeaderOptionsPanel = lazy(() => import('../HeaderOptionsPanel/HeaderOptionsPanel'))
const ColorPanel = lazy(() => import('../ColorPanel/ColorPanel'))
const BorderPanel = lazy(() => import('../BorderPanel/BorderPanel'))
const MergeCellsPanel = lazy(() => import('../MergeCellsPanel/MergeCellsPanel'))
const AiFeaturesPanel = lazy(() => import('../AiFeaturesPanel/AiFeaturesPanel'))
const ExportPanel = lazy(() => import('../ExportPanel/ExportPanel'))

export function TableMakerContent(): ReactNode {
  const location = useLocation()
  const tableRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const { rows, cols, columnWidths, updateCell, setCells, clearAll, generateTable, caption, captionAlignment, captionTextColor, captionBgColor, captionItalic, cellColors, cellTextColors, cellTextAlign, mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, theme, borderStyle, borderColor, setCaption, setCaptionAlignment, setCaptionTextColor, setCaptionBgColor, setCaptionItalic } = useTableContext()
  const { cells } = useTableData()
  const freshTable = (location.state as Record<string, unknown> | null)?.freshTable

  useEffect(() => {
    if (freshTable) {
      generateTable(DEFAULT_ROWS, DEFAULT_COLS)
      window.history.replaceState({}, document.title)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    sortedRows, sortedToOriginal,
    toggleSort, sortAsc, sortDesc,
    activeSortCol, activeSortDir,
    isSortDisabled,
  } = useColumnSort(cells, cols, mergedRanges, headerStyle)

  const { exportAs, exportingFormat, exportQuality, setExportQuality } = useExport(tableRef)
  const { t } = useTranslation(['common', 'table'])
  const [activeSheet, setActiveSheet] = useState<'settings' | 'presets' | null>(null)
  const tableWidth = useMemo(() => columnWidths.reduce((sum, w) => sum + w, 0), [columnWidths])
  const { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsLatex, copyAsImage, isCopying } = useCopyTable(
    sortedRows, tableRef, caption, columnWidths, cellColors, cellTextColors, cellTextAlign,
    mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, theme,
    borderStyle, borderColor, captionTextColor, captionBgColor, captionAlignment, captionItalic,
  )

  const [wsCtxMenu, setWsCtxMenu] = useState<{ x: number; y: number } | null>(null)
  const [wsCtxCopyOpen, setWsCtxCopyOpen] = useState(false)
  const [wsCtxConfirmClear, setWsCtxConfirmClear] = useState(false)

  const closeWsCtx = useCallback((): void => {
    setWsCtxMenu(null)
    setWsCtxCopyOpen(false)
    setWsCtxConfirmClear(false)
  }, [])

  const handleWsClearAll = useCallback((): void => {
    clearAll()
    trackEvent('table_cleared', {})
    toast.info(t('toast.tableCleared'))
    closeWsCtx()
  }, [clearAll, closeWsCtx, t])

  const handleWsContext = useCallback((e: React.MouseEvent): void => {
    if (exportRef.current?.contains(e.target as Node)) return
    e.preventDefault()
    setWsCtxMenu({ x: e.clientX, y: e.clientY })
  }, [])

  const handleWsPaste = useCallback(async (): Promise<void> => {
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
      const result = await handlePasteData(text, html, setCells)
      if (result) {
        toast.success(t('toast.importSuccess', { rows: result.rowCount, cols: result.colCount }))
      } else {
        toast.error(t('toast.pasteError'))
      }
    } catch {
      toast.error(t('toast.pasteError'))
    }
    closeWsCtx()
  }, [setCells, closeWsCtx, t])

  useEffect(() => {
    if (!wsCtxMenu) return
    const onDown = (): void => closeWsCtx()
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [wsCtxMenu, closeWsCtx])

  const blurTableRef = useRef<(() => void) | null>(null)
  usePrintTable(tableRef, () => blurTableRef.current?.())
  useTableCopyShortcut(sortedRows, tableRef, setCaptionAlignment)

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
    void exportAs(format, exportRef.current, caption, captionTextColor, captionBgColor, captionAlignment, captionItalic, sortedRows)
  }, [exportAs, exportRef, caption, captionTextColor, captionBgColor, captionAlignment, captionItalic, sortedRows])

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

        <section className="relative flex min-w-0 flex-1 flex-col" aria-label="Editable table workspace" onContextMenu={handleWsContext}>
          <StatusBar rows={rows} cols={cols} />
          <div ref={exportRef} className="flex flex-col min-w-0 w-fit" data-export-ref>
            <TableGrid tableRef={tableRef} findMatches={matches} currentFindMatch={currentMatch} caption={{ value: caption, onChange: setCaption, alignment: captionAlignment, onAlignmentChange: setCaptionAlignment, tableWidth, textColor: captionTextColor, bgColor: captionBgColor, onTextColorChange: setCaptionTextColor, onBgColorChange: setCaptionBgColor, italic: captionItalic, onItalicChange: setCaptionItalic }} blurTableRef={blurTableRef} sortedRows={sortedRows} sortedToOriginal={sortedToOriginal} toggleSort={toggleSort} sortAsc={sortAsc} sortDesc={sortDesc} activeSortCol={activeSortCol} activeSortDir={activeSortDir} isSortDisabled={isSortDisabled} />
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
          {wsCtxMenu ? (
            <>
              <div className="fixed inset-0 z-50" onClick={closeWsCtx} data-export-hide />
              <div
                className="fixed z-50 w-56 rounded-md border border-border bg-white py-1 shadow-sm" data-export-hide
                onMouseDown={(e) => e.stopPropagation()}
                style={{ left: wsCtxMenu.x, top: wsCtxMenu.y }}
              >
                <div className="border-b border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {caption ? `${t('contextMenu.table')} - ${caption}` : t('contextMenu.table')}
                </div>

                {/* Copy with submenu */}
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                    onClick={() => setWsCtxCopyOpen(v => !v)}
                  >
                    <Copy size={14} className="text-primary" />
                    <span className="flex-1">{t('contextMenu.copy')}</span>
                    <ChevronRight size={12} className={`text-text-muted transition-transform duration-100 ${wsCtxCopyOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {wsCtxCopyOpen ? (
                    <div className="border-t border-border">
                      <button type="button" className="flex w-full items-center gap-2 pl-8 pr-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface" onClick={() => { closeWsCtx(); void copyAsExcelData() }}>
                        <Table size={14} className="text-emerald-600" />
                        {t('toolbar.copyExcel')}
                      </button>
                      <button type="button" className="flex w-full items-center gap-2 pl-8 pr-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface" onClick={() => { closeWsCtx(); void copyAsCsv() }}>
                        <FileText size={14} className="text-cyan-600" />
                        {t('toolbar.copyCsv', 'Copy as CSV')}
                      </button>
                      <button type="button" className="flex w-full items-center gap-2 pl-8 pr-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface" onClick={() => { closeWsCtx(); void copyAsMarkdown() }}>
                        <Code size={14} className="text-info" />
                        {t('toolbar.copyMarkdown', 'Copy as Markdown')}
                      </button>
                      <button type="button" className="flex w-full items-center gap-2 pl-8 pr-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface" onClick={() => { closeWsCtx(); void copyAsLatex() }}>
                        <Code size={14} className="text-primary" />
                        {t('toolbar.copyLatex', 'Copy as LaTeX')}
                      </button>
                      <button type="button" className="flex w-full items-center gap-2 pl-8 pr-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface" disabled={isCopying} onClick={() => { closeWsCtx(); void copyAsImage() }}>
                        {isCopying ? <Loader2 size={14} className="animate-spin text-rose-600" /> : <Image size={14} className="text-rose-600" />}
                        {t('toolbar.copyImage')}
                      </button>
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={() => { void handleWsPaste() }}
                >
                  <Clipboard size={14} className="text-primary" />
                  {t('contextMenu.paste')}
                </button>

                {/* Clear All with inline confirmation */}
                {wsCtxConfirmClear ? (
                  <div className="border-t border-border px-3 py-2 text-xs text-text-secondary space-y-2">
                    <p>{t('toast.confirmClear', 'Clear all table data?')}</p>
                    <div className="flex gap-2">
                      <button type="button" className="flex-1 rounded-sm bg-danger px-2 py-1 text-xs font-semibold text-white hover:bg-red-700" onClick={handleWsClearAll}>
                        {t('toolbar.clearAll')}
                      </button>
                      <button type="button" className="flex-1 rounded-sm border border-border px-2 py-1 text-xs text-text-primary hover:bg-surface" onClick={() => setWsCtxConfirmClear(false)}>
                        {t('common.cancel', 'Cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                    onClick={() => setWsCtxConfirmClear(true)}
                  >
                    <Trash2 size={14} className="text-danger" />
                    {t('toolbar.clearAll')}
                  </button>
                )}

                <div className="border-t border-border my-1" />

                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                  onClick={closeWsCtx}
                >
                  <X size={14} className="text-text-muted" />
                  {t('contextMenu.close')}
                </button>
              </div>
            </>
          ) : null}
        </section>

        <aside aria-label="Table editing controls" className="hidden w-sidebar-right flex-none flex-col gap-8 overflow-y-auto border-l border-border bg-surface p-6 lg:flex" data-sidebar-right>
          <Suspense fallback={<PanelLoader />}>
            <ExportPanel onExport={handleExport} exportingFormat={exportingFormat} exportQuality={exportQuality} onExportQualityChange={setExportQuality} />
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
              <ExportPanel onExport={handleExport} exportingFormat={exportingFormat} exportQuality={exportQuality} onExportQualityChange={setExportQuality} />
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
