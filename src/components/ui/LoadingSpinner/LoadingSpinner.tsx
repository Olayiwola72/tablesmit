import type { FC } from 'react'
import type { LoadingSpinnerProps } from './LoadingSpinner.types'

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className, size = 20 }) => (
  <div
    className={`inline-block animate-spin rounded-full border-2 border-border border-t-primary ${className ?? ''}`}
    style={{ width: size, height: size }}
    role="status"
    aria-live="polite"
  />
)
