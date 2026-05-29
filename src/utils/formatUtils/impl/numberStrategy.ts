import { locale } from '@/config/locale/localesConfig'
import type { FormatUtilStrategy } from '../formatUtilStrategy.types'
import { tryParseNumber } from '../utils'

export const numberStrategy: FormatUtilStrategy = (value) => {
  const num = tryParseNumber(value)
  if (num === null) return value
  return new Intl.NumberFormat(locale.number, {
    maximumFractionDigits: 6,
  }).format(num)
}
