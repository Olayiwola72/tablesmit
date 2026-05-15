import { Check } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/utils'

export interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  value: string
  selected?: boolean
}

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
