import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/utils'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  'aria-label': string
}

export function IconButton({ icon, className, ...props }: IconButtonProps): ReactNode {
  return (
    <button
      type="button"
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-sm bg-transparent text-text-secondary transition-all duration-150 hover:bg-surface hover:text-text-primary active:scale-90 active:bg-border motion-reduce:transition-none md:h-8 md:w-8',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  )
}
