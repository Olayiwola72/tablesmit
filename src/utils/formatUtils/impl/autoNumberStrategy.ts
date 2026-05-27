import type { FormatUtilStrategy } from '../formatUtilStrategy.types'

export const autoNumberStrategy: FormatUtilStrategy = (_value, rowIndex) =>
  String((rowIndex ?? 0) + 1)
