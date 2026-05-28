import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import type { PastingOverlayProps } from './PastingOverlay.types'

export function PastingOverlay({ pasting }: PastingOverlayProps): ReactNode {
  if (!pasting) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-white/60">
      <Loader2 size={24} className="animate-spin text-primary" aria-label="Pasting table data" />
    </div>
  )
}
