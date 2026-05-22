export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'sum' | 'auto-number'

export interface CellData {
  id: string
  value: string
  colSpan: number
  rowSpan: number
  isMerged: boolean
  isHidden: boolean
  format?: ColumnFormat
}
