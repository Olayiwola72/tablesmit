import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>): ReactNode {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium text-text-secondary',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
