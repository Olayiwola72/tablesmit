import type { ColumnFormat } from '../../types/table'
import { formatUtilStrategy } from './formatUtilStrategy'

export function formatUtils(value: string, format: ColumnFormat, rowIndex?: number): string {
  return formatUtilStrategy[format](value, rowIndex)
}
