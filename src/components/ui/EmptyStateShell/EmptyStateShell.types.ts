import type { ReactNode } from 'react'

export interface EmptyStateShellProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
  secondary?: ReactNode
  className?: string
}
