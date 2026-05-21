/* eslint-disable react-refresh/only-export-components */
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { forwardRef, memo, type ReactNode } from 'react'
import { cn } from '../../../lib/utils'
import type { ButtonProps } from './Button.types'

export const buttonVariants = cva(
  'inline-flex select-none items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-150 ease-in-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-wait aria-busy:opacity-70',
  {
    variants: {
      variant: {
        primary: 'bg-primary px-5 py-2.5 text-text-inverse hover:bg-primary-hover hover:shadow-md active:scale-[0.97] active:bg-[#1a3080] active:shadow-none',
        accent: 'bg-accent px-5 py-2.5 text-white hover:bg-accent-hover hover:shadow-md active:scale-[0.97] active:bg-[#b45309] active:shadow-none',
        secondary: 'border border-border bg-transparent px-5 py-2.5 text-text-primary hover:border-primary hover:bg-surface hover:text-primary active:scale-[0.97] active:bg-gray-100',
        ghost: 'rounded-sm bg-transparent px-3 py-1.5 text-text-secondary hover:bg-surface hover:text-text-primary active:scale-[0.97] active:bg-border',
        danger: 'bg-danger px-5 py-2.5 text-white hover:bg-red-700 hover:shadow-md active:scale-[0.97] active:bg-red-800 active:shadow-none',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

const ButtonInner = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  asChild = false,
  className,
  variant,
  size,
  isLoading = false,
  isDisabled = false,
  disabled,
  children,
  ...props
}, ref): ReactNode {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={!asChild ? disabled || isDisabled || isLoading : undefined}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {children}
    </Comp>
  )
})

export const Button = memo(ButtonInner)
