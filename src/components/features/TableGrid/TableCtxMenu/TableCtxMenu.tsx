import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, Clipboard, Copy, Eraser, PaintBucket, Plus, Ruler, TextSelect, Trash2, Type } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnFormat } from '@/config/columnFormats/columnFormats.types'
import type { TextAlign } from '@/context/TableState/TableState.types'
import type { TableCtxMenuProps } from './TableCtxMenu.types'
import { CtxColorSubmenu } from './CtxColorSubmenu/CtxColorSubmenu'
import { CtxColumnTypeSubmenu } from './CtxColumnTypeSubmenu/CtxColumnTypeSubmenu'
import { CtxAlignSubmenu } from './CtxAlignSubmenu/CtxAlignSubmenu'

const alignIcons: Record<string, ReactNode> = {
  left: <AlignLeft size={14} />,
  center: <AlignCenter size={14} />,
  right: <AlignRight size={14} />,
}

function CtxButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }): ReactNode {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  )
}

function CtxSeparator(): ReactNode {
  return <div className="border-t border-border my-1" />
}

export function TableCtxMenu({ ctxMenu, activeSub, headerStyle, columnColors, cellColors, cellTextColors, rowTextColors, rowColors, columnTextAlign, cells, onClose, onToggleSub, autoFitColumn, setColumnColor, setCellColor, setCellTextColor, setRowTextColor, setRowColor, setColumnFormat, setColumnTextAlign, updateCell, insertRowAbove, insertRowBelow, deleteRowAt, insertColLeft, insertColRight, deleteColAt, isSortDisabled, sortAsc, sortDesc }: TableCtxMenuProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const menuRef = useRef<HTMLDivElement>(null)
  const isHeaderRow = ctxMenu.type === 'cell' && (headerStyle === 'first-row' || headerStyle === 'both') && ctxMenu.row === 0

  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const GAP = 8
    let { left, top } = rect
    if (rect.right > window.innerWidth) left = window.innerWidth - rect.width - GAP
    if (rect.bottom > window.innerHeight) top = window.innerHeight - rect.height - GAP
    if (left < GAP) left = GAP
    if (top < GAP) top = GAP
    if (left !== rect.left || top !== rect.top) {
      el.style.left = `${left}px`
      el.style.top = `${top}px`
    }
  })

  const handleCopy = async (): Promise<void> => {
    if (ctxMenu.type !== 'cell') return
    try {
      const value = cells[ctxMenu.row]?.[ctxMenu.col]?.value ?? ''
      await navigator.clipboard.writeText(value)
    } catch { /* Clipboard write not available */ }
    onClose()
  }

  const handlePaste = async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText()
      if (text && ctxMenu.type === 'cell') {
        updateCell(`R${ctxMenu.row}C${ctxMenu.col}`, text)
      }
    } catch { /* Clipboard read not available */ }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      data-ctx-menu
      className="fixed z-50 w-64 rounded-md border border-border bg-white py-1 shadow-sm text-sm"
      style={{ left: ctxMenu.x, top: ctxMenu.y }}
    >
      <div className="px-3 py-1.5 text-xs font-semibold text-text-muted tracking-widest border-b border-border">
        {ctxMenu.type === 'cell'
          ? `R${ctxMenu.row + 1} \u00B7 C${ctxMenu.col + 1}`
          : `Column ${ctxMenu.col + 1}`}
      </div>

      {/* Shared: auto-fit */}
      {ctxMenu.type === 'column' ? (
        <>
          <CtxButton icon={<Ruler size={14} className="text-primary" />} label={t('contextMenu.autoFitColumn')} onClick={() => { autoFitColumn(ctxMenu.col); onClose() }} />
          {!isSortDisabled(ctxMenu.col) ? (
            <>
              <CtxButton icon={<ArrowUp size={14} className="text-info" />} label={t('contextMenu.sortAscending')} onClick={() => { sortAsc(ctxMenu.col); onClose() }} />
              <CtxButton icon={<ArrowDown size={14} className="text-info" />} label={t('contextMenu.sortDescending')} onClick={() => { sortDesc(ctxMenu.col); onClose() }} />
            </>
          ) : null}
        </>
      ) : (
        <>
          <CtxButton icon={<Ruler size={14} className="text-primary" />} label={t('contextMenu.autoFitColumn')} onClick={() => { autoFitColumn(ctxMenu.col); onClose() }} />

          <CtxSeparator />

          {!isHeaderRow ? (
            <div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => onToggleSub('bg')}
              >
                <PaintBucket size={14} className="text-success" />
                <span className="flex-1">{t('contextMenu.changeBackground')}</span>
                <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {activeSub === 'bg' ? (
                <div className="border-t border-border px-3 py-2">
                  <p className="mb-1.5 text-xs font-medium text-text-secondary">{t('contextMenu.changeColumnBackground')}</p>
                  <CtxColorSubmenu current={columnColors[ctxMenu.col] || ''} onChange={(c) => setColumnColor(ctxMenu.col, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
                  <hr className="my-2 border-border" />
                  <p className="mb-1.5 text-xs font-medium text-text-secondary">{t('contextMenu.changeBackground')}</p>
                  <CtxColorSubmenu current={cellColors[`R${ctxMenu.row}C${ctxMenu.col}`] ?? ''} onChange={(c) => setCellColor(`R${ctxMenu.row}C${ctxMenu.col}`, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Change row background — grouped with other color items */}
          {!isHeaderRow ? (
            <div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => onToggleSub('rowColor')}
              >
                <PaintBucket size={14} className="text-info" />
                <span className="flex-1">{t('contextMenu.changeRowBackground')}</span>
                <span className="text-text-muted">{activeSub === 'rowColor' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {activeSub === 'rowColor' ? (
                <div className="border-t border-border px-3 py-2">
                  <CtxColorSubmenu current={rowColors[ctxMenu.row] || ''} onChange={(c) => setRowColor(ctxMenu.row, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Cell text color — individual cell override */}
          <div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => onToggleSub('cellTextColor')}
              >
                <Type size={14} className="text-info" />
                <span className="flex-1">{t('contextMenu.changeCellTextColor')}</span>
                <span className="text-text-muted">{activeSub === 'cellTextColor' ? '\u25B2' : '\u25BC'}</span>
              </button>
              {activeSub === 'cellTextColor' ? (
                <div className="border-t border-border px-3 py-2">
                  <CtxColorSubmenu current={cellTextColors[`R${ctxMenu.row}C${ctxMenu.col}`] ?? ''} onChange={(c) => setCellTextColor(`R${ctxMenu.row}C${ctxMenu.col}`, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
                </div>
              ) : null}
            </div>

          {/* Row text color — header row or regular row */}
          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('rowTextColor')}
            >
              <Type size={14} className="text-info" />
              <span className="flex-1">{isHeaderRow ? t('contextMenu.changeHeaderTextColor') : t('contextMenu.changeRowTextColor')}</span>
              <span className="text-text-muted">{activeSub === 'rowTextColor' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'rowTextColor' ? (
              <div className="border-t border-border px-3 py-2">
                <CtxColorSubmenu current={rowTextColors[ctxMenu.row] ?? ''} onChange={(c) => setRowTextColor(ctxMenu.row, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
                </div>
              ) : null}
            </div>

            <div>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
                onClick={() => onToggleSub('type')}
              >
                <TextSelect size={14} className="text-primary" />
              <span className="flex-1">{t('contextMenu.changeColumnType')}</span>
              <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
            </button>
            {activeSub === 'type' ? (
              <CtxColumnTypeSubmenu currentFormat={cells[0]?.[ctxMenu.col]?.format} onChange={(f) => { setColumnFormat(ctxMenu.col, f as ColumnFormat); onClose() }} onClose={onClose} />
            ) : null}
          </div>

          <CtxSeparator />

          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertRowAbove')} onClick={() => { insertRowAbove(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertRowBelow')} onClick={() => { insertRowBelow(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertColumnLeft')} onClick={() => { insertColLeft(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertColumnRight')} onClick={() => { insertColRight(ctxMenu.col); onClose() }} />

          <CtxSeparator />

          <CtxButton icon={<Copy size={14} className="text-primary" />} label={t('contextMenu.copy')} onClick={handleCopy} />
          <CtxButton icon={<Clipboard size={14} className="text-primary" />} label={t('contextMenu.paste')} onClick={handlePaste} />

          <CtxSeparator />

          <CtxButton icon={<Eraser size={14} className="text-accent" />} label={t('contextMenu.clearCell')} onClick={() => { updateCell(`R${ctxMenu.row}C${ctxMenu.col}`, ''); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-danger" />} label={t('contextMenu.deleteRow')} onClick={() => { deleteRowAt(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-danger" />} label={t('contextMenu.deleteColumn')} onClick={() => { deleteColAt(ctxMenu.col); onClose() }} />
        </>
      )}

      {/* Column context: shared items + column-specific */}
      {ctxMenu.type === 'column' ? (
        <>
          <CtxSeparator />

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('bg')}
            >
              <PaintBucket size={14} className="text-success" />
              <span className="flex-1">{t('contextMenu.changeColumnBackground')}</span>
              <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'bg' ? (
              <div className="border-t border-border px-3 py-2">
                <CtxColorSubmenu current={columnColors[ctxMenu.col] || ''} onChange={(c) => setColumnColor(ctxMenu.col, c)} onClose={onClose} customLabel={t('colorPanel.customColor')} removeColorLabel={t('colorPanel.clear')} />
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('type')}
            >
              <TextSelect size={14} className="text-primary" />
              <span className="flex-1">{t('contextMenu.changeColumnType')}</span>
              <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
            </button>
            {activeSub === 'type' ? (
              <CtxColumnTypeSubmenu currentFormat={cells[0]?.[ctxMenu.col]?.format} onChange={(f) => { setColumnFormat(ctxMenu.col, f as ColumnFormat); onClose() }} onClose={onClose} />
            ) : null}
          </div>

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('align')}
            >
              {alignIcons[columnTextAlign[ctxMenu.col] || 'left']}
              <span className="flex-1">{t('contextMenu.changeTextColor')}</span>
              <span className="text-text-muted">{activeSub === 'align' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'align' ? (
              <CtxAlignSubmenu currentAlign={columnTextAlign[ctxMenu.col] || 'left'} onChange={(a) => { setColumnTextAlign(ctxMenu.col, a as TextAlign); onClose() }} onClose={onClose} />
            ) : null}
          </div>

          <CtxSeparator />

          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertColumnLeft')} onClick={() => { insertColLeft(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-success" />} label={t('contextMenu.insertColumnRight')} onClick={() => { insertColRight(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-danger" />} label={t('contextMenu.deleteColumn')} onClick={() => { deleteColAt(ctxMenu.col); onClose() }} />
        </>
      ) : null}
    </div>
  )
}
