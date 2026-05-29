import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { FormInputProps } from './FormInput.types'

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-20 rounded-md border border-border bg-white px-2 py-1 text-xs text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
        className,
      )}
      {...props}
    />
  ),
)

FormInput.displayName = 'FormInput'
