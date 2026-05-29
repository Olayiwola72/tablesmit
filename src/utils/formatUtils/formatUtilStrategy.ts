import type { ColumnFormat } from '../../config/columnFormats/columnFormats.types'
import type { FormatUtilStrategy } from './formatUtilStrategy.types'
import { autoNumberStrategy } from './impl/autoNumberStrategy'
import { textStrategy } from './impl/textStrategy'
import { sumStrategy } from './impl/sumStrategy'
import { dateStrategy } from './impl/dateStrategy'
import { numberStrategy } from './impl/numberStrategy'
import { currencyStrategy } from './impl/currencyStrategy'
import { percentageStrategy } from './impl/percentageStrategy'

export const formatUtilStrategy: Record<ColumnFormat, FormatUtilStrategy> = {
  'auto-number': autoNumberStrategy,
  text: textStrategy,
  sum: sumStrategy,
  date: dateStrategy,
  number: numberStrategy,
  currency: currencyStrategy,
  percentage: percentageStrategy,
}
