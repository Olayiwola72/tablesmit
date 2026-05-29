import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface CtxMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children: ReactNode
  className?: string
}
