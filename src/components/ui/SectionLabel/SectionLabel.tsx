import { memo, type ReactNode } from 'react'
import type { SectionLabelProps } from './SectionLabel.types'

function SectionLabelRaw({ children }: SectionLabelProps): ReactNode {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
      {children}
    </h2>
  )
}

export const SectionLabel = memo(SectionLabelRaw)
