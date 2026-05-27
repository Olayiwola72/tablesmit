import { locale } from '../../../config/locale/localeConfig'
import type { FormatUtilStrategy } from '../formatUtilStrategy.types'
import { tryParseNumber } from '../utils'

export const currencyStrategy: FormatUtilStrategy = (value) => {
  const num = tryParseNumber(value)
  if (num === null) return value
  return new Intl.NumberFormat(locale.currency, {
    style: 'currency',
    currency: locale.currencyCode,
  }).format(num)
}
