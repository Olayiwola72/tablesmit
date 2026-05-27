import { locale } from '../../../config/locale/localeConfig'
import type { FormatUtilStrategy } from '../formatUtilStrategy.types'

export const dateStrategy: FormatUtilStrategy = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return value
  const timestamp = Date.parse(trimmed)
  if (Number.isNaN(timestamp)) return value
  return new Intl.DateTimeFormat(locale.date, {
    month: locale.dateMonth,
    day: locale.dateDay,
    year: locale.dateYear,
  }).format(timestamp)
}
