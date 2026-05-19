import { useEffect, useState, type ReactNode } from 'react'
import { KEY_ESCAPE } from '../../../constants/keys'
import { X } from 'lucide-react'

interface Shortcut {
  keys: string
  label: string
}

const SHORTCUTS: Shortcut[] = [
  { keys: 'Ctrl+Z', label: 'Undo last action' },
  { keys: 'Ctrl+F', label: 'Find in table' },
  { keys: 'Ctrl+H', label: 'Find and replace' },
  { keys: 'Ctrl+P', label: 'Print table' },
  { keys: 'Ctrl+E', label: 'Align cell center' },
  { keys: 'Ctrl+L', label: 'Align cell left' },
  { keys: 'Ctrl+R', label: 'Align cell right' },
  { keys: 'Tab / Shift+Tab', label: 'Navigate between cells' },
  { keys: 'Arrow keys', label: 'Move cell focus' },
  { keys: 'Enter', label: 'Edit focused cell' },
  { keys: 'Escape', label: 'Close panel or exit edit mode' },
  { keys: 'Delete / Backspace', label: 'Clear selected cell' },
  { keys: 'Ctrl+?', label: 'Show this shortcut list' },
]

export function ShortcutsModal(): ReactNode {
  const [open, setOpen] = useState(false)

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
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-white p-6 shadow-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Keyboard Shortcuts</h2>
          <button
            type="button"
            aria-label="Close shortcuts"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
            onClick={() => setOpen(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="flex items-center justify-between py-2">
              <span className="text-sm text-text-secondary">{s.label}</span>
              <kbd className="rounded-sm border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-primary">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          Press <kbd className="rounded-sm border border-border bg-surface px-1 text-xs text-text-primary">?</kbd> or{' '}
          <kbd className="rounded-sm border border-border bg-surface px-1 text-xs text-text-primary">Ctrl+/</kbd> to toggle this list.
        </p>
      </div>
    </>
  )
}
