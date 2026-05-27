import { locale } from '../../../config/locale/localesConfig'
import type { FormatUtilStrategy } from '../formatUtilStrategy.types'
import { tryParseNumber } from '../utils'

export const percentageStrategy: FormatUtilStrategy = (value) => {
  const num = tryParseNumber(value)
  if (num === null) return value
  return new Intl.NumberFormat(locale.percent, {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num > 1 ? num / 100 : num)
}
