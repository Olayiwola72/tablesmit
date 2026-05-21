import type { ButtonHTMLAttributes } from 'react'

export interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  value: string
  selected?: boolean
}
