import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'

export function Sidebar({
  side,
  children,
  className,
}: {
  side: 'left' | 'right'
  children: ReactNode
  className?: string
}): ReactNode {
  return (
    <aside
      className={cn(
        'hidden flex-col overflow-y-auto bg-surface p-6 md:flex [content-visibility:auto]',
        side === 'left' ? 'w-sidebar-left border-r border-border' : 'w-sidebar-right border-l border-border lg:flex md:hidden',
        className,
      )}
    >
      {children}
    </aside>
  )
}
