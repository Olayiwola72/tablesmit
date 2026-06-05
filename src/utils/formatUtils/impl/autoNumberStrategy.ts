import type { FormatUtilStrategy } from '../formatUtilStrategy.types'

export const autoNumberStrategy: FormatUtilStrategy = (value, rowIndex) => {
  if (value !== '') return value
  return String((rowIndex ?? 0) + 1)
}
