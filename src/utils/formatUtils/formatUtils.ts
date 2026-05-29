import type { ColumnFormat } from '../../config/columnFormats/columnFormats.types'
import { formatUtilStrategy } from './formatUtilStrategy'

export function formatUtils(value: string, format: ColumnFormat, rowIndex?: number): string {
  return formatUtilStrategy[format](value, rowIndex)
}
