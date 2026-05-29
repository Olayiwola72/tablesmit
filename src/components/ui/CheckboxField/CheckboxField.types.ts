import type { InputHTMLAttributes } from 'react'

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  className?: string
}
