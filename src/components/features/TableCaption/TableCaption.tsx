import { Clipboard, Copy } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { ColorSwatch } from '../../ui/ColorSwatch/ColorSwatch'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip/Tooltip'
import { contentColorSwatches } from '@/config/colorPalette/colorPalette'
import { MIN_ROW_HEIGHT, MAX_ROW_HEIGHT } from '@/config/table/tableDefaults/tableDefaults'
import { SHORTCUTS } from '@/config/shortcuts/shortcutsConfig'
import type { ShortcutDef } from '@/config/shortcuts/shortcutsConfig.types'
import type { CaptionAlignment, CtxMenuState, TableCaptionProps } from './TableCaption.types'

function TableCaptionRaw({
  value,
  onChange,
  alignment,
  onAlignmentChange,
  tableWidth,
  hasBorder = true,
  textColor,
  bgColor,
  onTextColorChange,
  onBgColorChange,
  italic,
  onItalicChange,
}: TableCaptionProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const [editing, setEditing] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<CtxMenuState | null>(null)
  const [activePicker, setActivePicker] = useState<'text' | 'bg' | null>(null)
  const [captionH, setCaptionH] = useState(MIN_ROW_HEIGHT)
  const dragRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const rafRef = useRef<number>()

  const onResizeStart = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    const startY = e.clientY
    const startH = captionH

    const onMove = (ev: MouseEvent): void => {
      cancelAnimationFrame(rafRef.current!)
      rafRef.current = requestAnimationFrame(() => {
        const h = Math.min(MAX_ROW_HEIGHT, Math.max(MIN_ROW_HEIGHT, startH + ev.clientY - startY))
        setCaptionH(h)
      })
    }

    const onUp = (): void => {
      cancelAnimationFrame(rafRef.current!)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [captionH])

  const shortcutMap: Record<string, ShortcutDef> = useMemo(() => {
    const map: Record<string, ShortcutDef> = {}
    for (const s of SHORTCUTS) {
      if (s.id) map[s.id] = s
    }
    return map
  }, [])

  const alignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'

  const textColorStyle = textColor ? { color: textColor } : undefined
  const bgColorStyle = bgColor ? { backgroundColor: bgColor } : undefined
  const italicStyle = italic !== undefined ? { fontStyle: (italic ? 'italic' : 'normal') as 'italic' | 'normal' } : undefined
  const combinedStyle = { ...textColorStyle, ...bgColorStyle, ...italicStyle }

  const handleContextMenu = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    setActivePicker(null)
    setCtxMenu({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (editing && textareaRef.current) {
      const len = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(len, len)
    }
  }, [editing])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(captionH, ta.scrollHeight)}px`
  }, [value, captionH, editing])

  const closeMenu = useCallback((): void => { setCtxMenu(null); setActivePicker(null) }, [])

  const handleCopy = useCallback(async (): Promise<void> => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value)
      } catch { /* Clipboard write not available */ }
    }
    closeMenu()
  }, [value, closeMenu])

  const handlePaste = useCallback(async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) { onChange(text); setEditing(true) }
    } catch { /* Clipboard read not available */ }
    closeMenu()
  }, [onChange, closeMenu])

  const setAlign = useCallback((a: CaptionAlignment): void => {
    onAlignmentChange(a)
    closeMenu()
  }, [onAlignmentChange, closeMenu])

  useEffect(() => {
    if (!ctxMenu) return
    const onClick = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [ctxMenu, closeMenu])

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

  const togglePicker = useCallback((which: 'text' | 'bg'): void => {
    setActivePicker(prev => (prev === which ? null : which))
  }, [])

  const handleTextColor = useCallback((color: string): void => {
    onTextColorChange?.(color)
    closeMenu()
  }, [onTextColorChange, closeMenu])

  const handleBgColor = useCallback((color: string): void => {
    onBgColorChange?.(color)
    closeMenu()
  }, [onBgColorChange, closeMenu])

  const handleCustomTextColor = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onTextColorChange?.(e.target.value)
  }, [onTextColorChange])

  const handleCustomBgColor = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onBgColorChange?.(e.target.value)
  }, [onBgColorChange])

  const renderAlignmentOption = (shortcutId: string, label: string, value: CaptionAlignment): ReactNode => (
    <button
      type="button"
      className={cn(
        'w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface',
        alignment === value ? 'font-semibold text-primary' : 'text-text-primary',
      )}
      onClick={() => setAlign(value)}
    >
      {alignment === value ? `✓ ${label}` : label}
      <span className="ml-4 text-xs text-text-muted">{shortcutMap[shortcutId]?.keys ?? ''}</span>
    </button>
  )

  const renderColorPicker = (which: 'text' | 'bg'): ReactNode => {
    const currentColor = which === 'text' ? textColor : bgColor
    const onChange = which === 'text' ? handleTextColor : handleBgColor
    const onCustomChange = which === 'text' ? handleCustomTextColor : handleCustomBgColor

    return (
      <>
        <button
          type="button"
          className="w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface text-text-primary"
          onClick={() => togglePicker(which)}
        >
          {activePicker === which ? '▾' : '▸'}{' '}
          {which === 'text' ? t('contextMenu.captionTextColor') : t('contextMenu.captionBackground')}
        </button>
        {activePicker === which ? (
          <div className="px-3 pb-2">
            <div className="flex flex-wrap gap-1 mb-1.5">
              {contentColorSwatches.map((swatch) => (
                <ColorSwatch
                  key={swatch.value}
                  {...swatch}
                  selected={currentColor === swatch.value}
                  onClick={() => onChange(swatch.value)}
                />
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs text-text-muted">
              <input
                type="color"
                value={currentColor || '#111827'}
                onChange={onCustomChange}
                className="h-7 w-7 cursor-pointer rounded-sm border-0 p-0"
              />
              {t('contextMenu.customColor')}
            </label>
          </div>
        ) : null}
      </>
    )
  }

  const inputOrDisplay = (): ReactNode => {
    if (!editing && !value) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              data-print-hide data-export-hide
              className={cn('w-full text-sm italic text-text-muted hover:text-text-secondary', alignClass)}
              onClick={() => setEditing(true)}
              onContextMenu={handleContextMenu}
            >
              {t('table.addCaption')}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">{t('contextMenu.clickToAddCaption')}</TooltipContent>
        </Tooltip>
      )
    }
    if (editing) {
      return (
        <>
          <textarea
            ref={textareaRef}
            value={value}
            name="table-caption"
            autoFocus
            placeholder={t('table.addCaption')}
            rows={1}
            className={cn('w-full resize-none border-0 bg-transparent p-0 text-sm font-medium outline-none focus:ring-0', alignClass)}
            style={combinedStyle}
            onChange={(event) => onChange(event.target.value)}
            onBlur={() => setEditing(false)}
            onContextMenu={handleContextMenu}
            onKeyDown={(event) => {
              if (event.key === 'Escape') { event.currentTarget.blur(); setEditing(false) }
            }}
          />
        </>
      )
    }
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            className={cn('cursor-text text-sm font-medium', alignClass)}
            style={combinedStyle}
            onClick={() => setEditing(true)}
            onContextMenu={handleContextMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') setEditing(true)
            }}
          >
            {value}
          </p>
        </TooltipTrigger>
        <TooltipContent side="top">{t('contextMenu.clickToEditCaption')}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="relative py-3 px-4" style={{ minHeight: captionH, ...combinedStyle, ...(tableWidth ? { width: tableWidth + (hasBorder !== false ? 1 : 0) } : {}) }}>
      {inputOrDisplay()}
      <div
        ref={dragRef}
        onMouseDown={onResizeStart}
        className="absolute bottom-0 left-0 right-0 h-2 cursor-row-resize opacity-0 hover:opacity-100 transition-opacity duration-100 bg-primary/20"
        role="separator"
        aria-label="Resize caption height"
      />
      {ctxMenu ? (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} data-export-hide />
          <div
            ref={menuRef}
            className="fixed z-50 w-52 rounded-md py-1 shadow-sm bg-white border border-border" data-export-hide
            style={{ left: ctxMenu.x, top: ctxMenu.y }}
          >
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
              {t('contextMenu.editCaption')}
            </div>
            {renderAlignmentOption('captionAlignLeft', t('contextMenu.alignLeft'), 'left')}
            {renderAlignmentOption('captionAlignCenter', t('contextMenu.alignCenter'), 'center')}
            {renderAlignmentOption('captionAlignRight', t('contextMenu.alignRight'), 'right')}
            <div className="border-t border-border my-1" />
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface"
              onClick={handleCopy}
            >
              <Copy size={14} className="text-text-muted" />
              {t('contextMenu.copy')}
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface"
              onClick={handlePaste}
            >
              <Clipboard size={14} className="text-text-muted" />
              {t('contextMenu.paste')}
            </button>
            <div className="border-t border-border my-1" />
            {renderColorPicker('text')}
            {renderColorPicker('bg')}
            <div className="border-t border-border my-1" />
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface"
              onClick={() => { onItalicChange?.(!italic); closeMenu() }}
            >
              <span className="w-4">{italic ? '✓' : ''}</span>
              {t('contextMenu.captionItalic')}
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export const TableCaption = memo(TableCaptionRaw)
