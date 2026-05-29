import type { FC } from 'react'
import type { ShortcutKeyProps } from './ShortcutKey.types'

export const ShortcutKey: FC<ShortcutKeyProps> = ({ children, className }) => (
  <kbd className={`rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-xs font-medium text-text-secondary shadow-sm ${className ?? ''}`}>
    {children}
  </kbd>
)
