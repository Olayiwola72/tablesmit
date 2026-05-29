import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { KEY_ESCAPE } from '@/constants/keys'
import { X } from 'lucide-react'
import { SHORTCUTS } from '@/config/shortcuts/shortcutsConfig'
import type { ShortcutDef } from '@/config/shortcuts/shortcutsConfig.types'
import { ShortcutKey } from '../../ui/ShortcutKey/ShortcutKey'

const SHORTCUT_KEYS = new Set<string>()
for (const s of SHORTCUTS) {
  if (!s.keys.startsWith('Ctrl+')) continue
  let keySpec = s.keys.slice(5)
  const hasShift = keySpec.startsWith('Shift+')
  if (hasShift) keySpec = keySpec.slice(6)
  SHORTCUT_KEYS.add(`${hasShift ? 's:' : ''}${keySpec.toLowerCase()}`)
}

export function ShortcutsModal(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const [open, setOpen] = useState(false)
  const openRef = useRef(open)

  useEffect(() => {
    openRef.current = open
  }, [open])

  const shortcuts: ShortcutDef[] = SHORTCUTS

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (e.key === '?' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (openRef.current && (e.ctrlKey || e.metaKey)) {
        const eventKey = `${e.shiftKey ? 's:' : ''}${e.key.toLowerCase()}`
        if (SHORTCUT_KEYS.has(eventKey)) {
          setOpen(false)
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent): void => {
      if (e.key === KEY_ESCAPE) setOpen(false)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)} />
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-white p-6 shadow-sm dark:bg-slate-900 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-label={t('shortcuts.title')}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">{t('shortcuts.title')}</h2>
          <button
            type="button"
            aria-label={t('aria.closeMenu')}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            onClick={() => setOpen(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {shortcuts.map((s) => (
            <div key={s.keys} className="flex items-center justify-between py-2">
              <span className="text-sm text-text-secondary">{t(s.labelKey)}</span>
              <ShortcutKey>{s.keys}</ShortcutKey>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          <ShortcutKey>{t('shortcutKeys.ctrlSlash')}</ShortcutKey>
          {' '}{t('shortcuts.toggleList')}
        </p>
      </div>
    </>
  )
}
