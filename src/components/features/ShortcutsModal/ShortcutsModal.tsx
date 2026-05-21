import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { KEY_ESCAPE } from '../../../constants/keys'
import { X } from 'lucide-react'
import type { Shortcut } from './ShortcutsModal.types'

export function ShortcutsModal(): ReactNode {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const shortcuts: Shortcut[] = [
    { keys: t('shortcutKeys.ctrlZ'), labelKey: 'shortcuts.undo' },
    { keys: t('shortcutKeys.ctrlF'), labelKey: 'shortcuts.find' },
    { keys: t('shortcutKeys.ctrlH'), labelKey: 'shortcuts.findAndReplace_short' },
    { keys: t('shortcutKeys.ctrlP'), labelKey: 'shortcuts.exportPdf' },
    { keys: t('shortcutKeys.ctrlE'), labelKey: 'shortcuts.exportExcel' },
    { keys: t('shortcutKeys.ctrlL'), labelKey: 'shortcuts.addRow' },
    { keys: t('shortcutKeys.ctrlR'), labelKey: 'shortcuts.addColumn' },
    { keys: `${t('shortcutKeys.tab')} / ${t('shortcutKeys.shiftTab')}`, labelKey: 'shortcuts.moveBetweenCells' },
    { keys: t('shortcutKeys.arrowKeys'), labelKey: 'shortcuts.moveBetweenCells' },
    { keys: t('shortcutKeys.enter'), labelKey: 'shortcuts.editCell' },
    { keys: t('shortcutKeys.escape'), labelKey: 'shortcuts.cancelEdit' },
    { keys: t('shortcutKeys.delete'), labelKey: 'shortcuts.deleteContent' },
    { keys: t('shortcutKeys.ctrlSlash'), labelKey: 'shortcuts.shortcutsModal' },
  ]

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
              <kbd className="rounded-sm border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-primary">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          <kbd className="rounded-sm border border-border bg-surface px-1 text-xs text-text-primary">{t('shortcutKeys.ctrlSlash')}</kbd>
          {' '}{t('shortcuts.toggleList')}
        </p>
      </div>
    </>
  )
}
