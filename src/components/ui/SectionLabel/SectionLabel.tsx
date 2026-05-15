import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }): ReactNode {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
      {children}
    </h2>
  )
}
