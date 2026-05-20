import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, Clipboard, Eraser, PaintBucket, Plus, Ruler, TextSelect, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../../../config/siteConfig'
import type { CellData, ColumnFormat, TextAlign } from '../../../../types/table.types'

export type CtxData =
  | { type: 'cell'; row: number; col: number; x: number; y: number }
  | { type: 'column'; col: number; x: number; y: number }
  | null

export interface TableCtxMenuProps {
  ctxMenu: NonNullable<CtxData>
  activeSub: string | null
  columnColors: Record<number, string>
  cellColors: Record<string, string>
  rowColors: Record<number, string>
  columnTextAlign: Record<number, string>
  cellTextAlign: Record<string, string>
  cells: CellData[][]
  onClose: () => void
  onToggleSub: (key: string) => void
  autoFitColumn: (col: number) => void
  setColumnColor: (col: number, color: string) => void
  setCellColor: (cellId: string, color: string) => void
  setRowColor: (row: number, color: string) => void
  setColumnFormat: (col: number, format: ColumnFormat) => void
  setCellTextAlign: (cellId: string, align: TextAlign) => void
  setColumnTextAlign: (col: number, align: TextAlign) => void
  updateCell: (cellId: string, value: string) => void
  insertRowAbove: (index: number) => void
  insertRowBelow: (index: number) => void
  deleteRowAt: (index: number) => void
  insertColLeft: (col: number) => void
  insertColRight: (col: number) => void
  deleteColAt: (col: number) => void
  sortAsc: (col: number) => void
  sortDesc: (col: number) => void
}

const colorPresets = [
  '#FFE4E1', '#FFF0D9', '#FFFACD', '#E8F5E9', '#E3F2FD', '#F3E5F5',
  '#FFCDD2', '#FFE0B2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7',
  '#FF5722', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0',
]

const alignIcons: Record<string, ReactNode> = {
  left: <AlignLeft size={14} />,
  center: <AlignCenter size={14} />,
  right: <AlignRight size={14} />,
}

function renderColorPicker(current: string, onChange: (color: string) => void, closeCtx: () => void, customLabel: string, removeColorLabel: string): ReactNode {
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1">
        {colorPresets.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={c}
            className={`h-6 w-6 rounded-sm border border-border cursor-pointer transition-transform hover:scale-110 ${current === c ? 'ring-2 ring-primary ring-offset-1' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => { onChange(c); closeCtx() }}
          />
        ))}
      </div>
      <label className="flex items-center justify-between gap-2 text-xs text-text-secondary">
        <span>{customLabel}</span>
        <input
          type="color"
          name="ctx-custom-color"
          value={current || '#ffffff'}
          className="h-7 w-10 cursor-pointer rounded-sm border border-border"
          onChange={(event) => { onChange(event.target.value); closeCtx() }}
        />
      </label>
      {current ? (
        <button
          type="button"
          className="mt-1 w-full rounded-sm px-2 py-1 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
          onClick={() => { onChange(''); closeCtx() }}
        >
          {removeColorLabel}
        </button>
      ) : null}
    </div>
  )
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

export function TableCtxMenu({ ctxMenu, activeSub, columnColors, cellColors, rowColors, columnTextAlign, cells, onClose, onToggleSub, autoFitColumn, setColumnColor, setCellColor, setRowColor, setColumnFormat, setColumnTextAlign, updateCell, insertRowAbove, insertRowBelow, deleteRowAt, insertColLeft, insertColRight, deleteColAt, sortAsc, sortDesc }: TableCtxMenuProps): ReactNode {
  const { t } = useTranslation()
  const alignLabelMap: Record<string, string> = {
    left: t('contextMenu.alignLeft'),
    center: t('contextMenu.alignCenter'),
    right: t('contextMenu.alignRight'),
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
      data-ctx-menu
      className="fixed z-50 w-64 rounded-md border border-border bg-white py-1 shadow-sm text-sm"
      style={{ left: ctxMenu.x, top: ctxMenu.y }}
    >
      <div className="px-3 py-1.5 text-xs font-semibold text-text-muted tracking-widest border-b border-border">
        {ctxMenu.type === 'cell'
          ? `R${ctxMenu.row + 1} \u00B7 C${ctxMenu.col + 1}`
          : `Column ${ctxMenu.col + 1}`}
      </div>

      {/* Shared: auto-fit + sort (column) */}
      {ctxMenu.type === 'column' ? (
        <>
          <CtxButton icon={<Ruler size={14} className="text-text-muted" />} label={t('contextMenu.autoFitColumn')} onClick={() => { autoFitColumn(ctxMenu.col); onClose() }} />
          <CtxButton icon={<ArrowUp size={14} className="text-text-muted" />} label={t('contextMenu.sortAscending')} onClick={() => { sortAsc(ctxMenu.col); onClose() }} />
          <CtxButton icon={<ArrowDown size={14} className="text-text-muted" />} label={t('contextMenu.sortDescending')} onClick={() => { sortDesc(ctxMenu.col); onClose() }} />
        </>
      ) : (
        <>
          <CtxButton icon={<Ruler size={14} className="text-text-muted" />} label={t('contextMenu.autoFitColumn')} onClick={() => { autoFitColumn(ctxMenu.col); onClose() }} />

          <CtxSeparator />

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('bg')}
            >
              <PaintBucket size={14} className="text-text-muted" />
              <span className="flex-1">{t('contextMenu.changeBackground')}</span>
              <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'bg' ? (
              <div className="border-t border-border px-3 py-2">
                <p className="mb-1.5 text-xs font-medium text-text-secondary">{t('contextMenu.changeBackground')}</p>
                {renderColorPicker(columnColors[ctxMenu.col] || '', (c) => setColumnColor(ctxMenu.col, c), onClose, t('colorPanel.customColor'), t('colorPanel.noColor'))}
                <hr className="my-2 border-border" />
                <p className="mb-1.5 text-xs font-medium text-text-secondary">{t('contextMenu.changeBackground')}</p>
                {renderColorPicker(cellColors[`R${ctxMenu.row}C${ctxMenu.col}`] ?? '', (c) => setCellColor(`R${ctxMenu.row}C${ctxMenu.col}`, c), onClose, t('colorPanel.customColor'), t('colorPanel.noColor'))}
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('type')}
            >
              <TextSelect size={14} className="text-text-muted" />
              <span className="flex-1">{t('contextMenu.changeColumnType')}</span>
              <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
            </button>
            {activeSub === 'type' ? (
              <div className="border-t border-border px-3 py-2">
                {siteConfig.columnFormats.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`block w-full rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${cells[0]?.[ctxMenu.col]?.format === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                    onClick={() => { setColumnFormat(ctxMenu.col, opt.value as ColumnFormat); onClose() }}
                  >
                    {t(`table.${opt.value}`, opt.label)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <CtxSeparator />

          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertRowAbove')} onClick={() => { insertRowAbove(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertRowBelow')} onClick={() => { insertRowBelow(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertColumnLeft')} onClick={() => { insertColLeft(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertColumnRight')} onClick={() => { insertColRight(ctxMenu.col); onClose() }} />

          <CtxSeparator />

          <CtxButton icon={<Clipboard size={14} className="text-text-muted" />} label={t('contextMenu.paste')} onClick={handlePaste} />

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('rowColor')}
            >
              <PaintBucket size={14} className="text-text-muted" />
              <span className="flex-1">{t('contextMenu.changeBackground')}</span>
              <span className="text-text-muted">{activeSub === 'rowColor' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'rowColor' ? (
              <div className="border-t border-border px-3 py-2">
                {renderColorPicker(rowColors[ctxMenu.row] || '', (c) => setRowColor(ctxMenu.row, c), onClose, t('colorPanel.customColor'), t('colorPanel.noColor'))}
              </div>
            ) : null}
          </div>

          <CtxSeparator />

          <CtxButton icon={<Eraser size={14} className="text-text-muted" />} label={t('contextMenu.clearCell')} onClick={() => { updateCell(`R${ctxMenu.row}C${ctxMenu.col}`, ''); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-text-muted" />} label={t('contextMenu.deleteRow')} onClick={() => { deleteRowAt(ctxMenu.row); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-text-muted" />} label={t('contextMenu.deleteColumn')} onClick={() => { deleteColAt(ctxMenu.col); onClose() }} />
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
              <PaintBucket size={14} className="text-text-muted" />
              <span className="flex-1">{t('contextMenu.changeBackground')}</span>
              <span className="text-text-muted">{activeSub === 'bg' ? '\u25B2' : '\u25BC'}</span>
            </button>
            {activeSub === 'bg' ? (
              <div className="border-t border-border px-3 py-2">
                {renderColorPicker(columnColors[ctxMenu.col] || '', (c) => setColumnColor(ctxMenu.col, c), onClose, t('colorPanel.customColor'), t('colorPanel.noColor'))}
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface"
              onClick={() => onToggleSub('type')}
            >
              <TextSelect size={14} className="text-text-muted" />
              <span className="flex-1">{t('contextMenu.changeColumnType')}</span>
              <span className="text-xs text-text-muted">{cells[0]?.[ctxMenu.col]?.format ?? 'text'}</span>
            </button>
            {activeSub === 'type' ? (
              <div className="border-t border-border px-3 py-2">
                {siteConfig.columnFormats.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`block w-full rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${cells[0]?.[ctxMenu.col]?.format === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                    onClick={() => { setColumnFormat(ctxMenu.col, opt.value as ColumnFormat); onClose() }}
                  >
                    {t(`table.${opt.value}`, opt.label)}
                  </button>
                ))}
              </div>
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
              <div className="border-t border-border px-3 py-2">
                {siteConfig.labels.textAlignOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${(columnTextAlign[ctxMenu.col] || 'left') === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
                    onClick={() => { setColumnTextAlign(ctxMenu.col, opt.value as TextAlign); onClose() }}
                  >
                    {alignIcons[opt.value]}
                    {alignLabelMap[opt.value]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <CtxSeparator />

          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertColumnLeft')} onClick={() => { insertColLeft(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Plus size={14} className="text-text-muted" />} label={t('contextMenu.insertColumnRight')} onClick={() => { insertColRight(ctxMenu.col); onClose() }} />
          <CtxButton icon={<Trash2 size={14} className="text-text-muted" />} label={t('contextMenu.deleteColumn')} onClick={() => { deleteColAt(ctxMenu.col); onClose() }} />
        </>
      ) : null}
    </div>
  )
}
