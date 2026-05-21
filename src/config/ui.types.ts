import type { HeaderStyle } from '../context/table.types'

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
  mergedRanges?: Array<{ startRow: number; startCol: number; endRow: number; endCol: number }>
}
