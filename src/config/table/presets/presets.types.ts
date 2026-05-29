import type { HeaderStyle } from '../../context/TableState/TableState.types'

export interface PresetDefinition {
  id: string
  label: string
  caption?: string
  rows: number
  cols: number
  headerStyle: HeaderStyle
  headers: string[]
  data?: string[][]
  mergedRanges?: Array<{ startRow: number; startCol: number; endRow: number; endCol: number }>
}
