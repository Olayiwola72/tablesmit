import type { HeaderStyle } from './table-state.types'

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
