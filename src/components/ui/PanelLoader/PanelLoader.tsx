import type { ReactNode } from 'react'

export function PanelLoader(): ReactNode {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  )
}
