import type { HeaderStyle } from './table.types'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ColorSwatch {
  label: string
  value: string
}

export interface PresetDefinition {
  id: string
  label: string
  rows: number
  cols: number
  headerStyle: HeaderStyle
  headers: string[]
  data?: string[][]
}
