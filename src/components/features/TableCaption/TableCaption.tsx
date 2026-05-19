import { memo, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'

export type CaptionAlignment = 'left' | 'center' | 'right'

interface CtxMenuState {
  x: number
  y: number
}

function TableCaptionRaw({
  value,
  onChange,
  alignment,
  onAlignmentChange,
}: {
  value: string
  onChange: (caption: string) => void
  alignment: CaptionAlignment
  onAlignmentChange: (align: CaptionAlignment) => void
}): ReactNode {
  const [editing, setEditing] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<CtxMenuState | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const alignClass =
    alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'

  const handleContextMenu = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    setCtxMenu({ x: e.clientX, y: e.clientY })
  }, [])

  const closeMenu = useCallback((): void => setCtxMenu(null), [])

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

  const renderAlignmentOption = (key: string, label: string, value: CaptionAlignment): ReactNode => (
    <button
      type="button"
      className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface ${
        alignment === value ? 'font-semibold text-primary' : 'text-text-primary'
      }`}
      onClick={() => setAlign(value)}
    >
      {alignment === value ? `✓ ${label}` : label}
      <span className="ml-4 text-xs text-text-muted">Ctrl+{key}</span>
    </button>
  )

  const inputOrDisplay = (): ReactNode => {
    if (!editing && !value) {
      return (
        <button
          type="button"
          data-print-hide
          className={`mb-2 w-full text-sm italic text-text-muted hover:text-text-secondary ${alignClass}`}
          onClick={() => setEditing(true)}
          onContextMenu={handleContextMenu}
        >
          {siteConfig.labels.tableCaptionPlaceholder}
        </button>
      )
    }
    if (editing) {
      return (
        <>
          <textarea
            value={value}
            name="table-caption"
            autoFocus
            placeholder={siteConfig.labels.tableCaptionPlaceholder}
            rows={2}
            className={`w-full resize-none border-0 bg-transparent p-0 text-sm font-medium text-text-primary outline-none focus:ring-0 ${alignClass}`}
            onChange={(event) => onChange(event.target.value)}
            onBlur={() => setEditing(false)}
            onContextMenu={handleContextMenu}
            onKeyDown={(event) => {
              if (event.key === 'Escape') { event.currentTarget.blur(); setEditing(false) }
            }}
          />
          <span className="mb-2 block text-xs text-text-muted" data-print-hide>Right click input for alignment</span>
        </>
      )
    }
    return (
      <p
        className={`mb-2 cursor-text text-sm font-medium text-text-primary ${alignClass}`}
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
    )
  }

  return (
    <div className="relative">
      {inputOrDisplay()}
      {ctxMenu ? (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            ref={menuRef}
            className="fixed z-50 w-44 rounded-md border border-border bg-white py-1 shadow-md"
            style={{ left: ctxMenu.x, top: ctxMenu.y }}
          >
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Caption alignment
            </div>
            {renderAlignmentOption('L', 'Left', 'left')}
            {renderAlignmentOption('E', 'Center', 'center')}
            {renderAlignmentOption('R', 'Right', 'right')}
          </div>
        </>
      ) : null}
    </div>
  )
}

export const TableCaption = memo(TableCaptionRaw)