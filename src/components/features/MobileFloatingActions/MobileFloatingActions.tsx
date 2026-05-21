import { Settings, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import type { MobileFloatingActionsProps } from './MobileFloatingActions.types'
import { IconButton } from '../../ui/IconButton/IconButton'

export function MobileFloatingActions({ onOpenSettings, onOpenPresets }: MobileFloatingActionsProps): ReactNode {
  return (
    <>
      <div className="fixed bottom-4 left-4 z-20 md:hidden">
        <IconButton
          aria-label="Open settings"
          className="rounded-full border border-border bg-white shadow-sm"
          icon={<Settings size={18} aria-hidden="true" />}
          onClick={onOpenSettings}
        />
      </div>
      <div className="fixed bottom-4 right-4 z-20 md:hidden">
        <IconButton
          aria-label="Open presets"
          className="rounded-full border border-border bg-white shadow-sm"
          icon={<Sparkles size={18} aria-hidden="true" />}
          onClick={onOpenPresets}
        />
      </div>
    </>
  )
}
