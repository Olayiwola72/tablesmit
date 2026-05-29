import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { FormSelectProps } from './FormSelect.types'

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, options, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'rounded-md border border-border bg-white px-2 py-1 text-xs text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
        className,
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
)

FormSelect.displayName = 'FormSelect'
