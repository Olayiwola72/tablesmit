import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { ColorSwatchProps } from './ColorSwatch.types'

export function ColorSwatch({ label, value, selected = false, className, ...props }: ColorSwatchProps): ReactNode {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        'grid h-8 w-8 place-items-center rounded-sm border border-border text-xs text-text-primary ring-offset-2 transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary',
        selected && 'ring-2 ring-primary',
        className,
      )}
      style={{ backgroundColor: value }}
      {...props}
    >
      {selected ? <Check size={14} aria-hidden="true" /> : null}
    </button>
  )
}
