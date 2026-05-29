import type { ColumnFormat } from '../../config/columnFormats/columnFormats.types'

export interface CellData {
  id: string
  value: string
  colSpan: number
  rowSpan: number
  isMerged: boolean
  isHidden: boolean
  format?: ColumnFormat
}
