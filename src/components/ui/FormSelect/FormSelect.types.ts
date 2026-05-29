import type { SelectHTMLAttributes } from 'react'

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  options: Array<{ value: string; label: string }>
}
