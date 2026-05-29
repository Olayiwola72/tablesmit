import type { FC } from 'react'
import type { CheckboxFieldProps } from './CheckboxField.types'

export const CheckboxField: FC<CheckboxFieldProps> = ({ label, id, className, ...props }) => (
  <label className={`flex items-center gap-2 text-sm text-text-primary ${className ?? ''}`}>
    <input
      type="checkbox"
      id={id}
      className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-1"
      {...props}
    />
    {label}
  </label>
)
