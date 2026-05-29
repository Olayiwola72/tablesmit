import type { ReactNode } from 'react'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

export function PanelLoader(): ReactNode {
  return (
    <div className="flex items-center justify-center p-6">
      <LoadingSpinner size="sm" />
    </div>
  )
}
