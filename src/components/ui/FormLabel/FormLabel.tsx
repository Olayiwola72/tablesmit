import type { FC } from 'react'
import type { FormLabelProps } from './FormLabel.types'

export const FormLabel: FC<FormLabelProps> = ({ htmlFor, children, className }) => (
  <label
    htmlFor={htmlFor}
    className={`flex items-center justify-between gap-3 text-sm font-medium text-text-primary ${className ?? ''}`}
  >
    {children}
  </label>
)
