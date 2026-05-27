import i18n from 'i18next'
import { dateFormatOptions } from '../../config/dateFormat/dateFormatConfig'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(i18n.language, dateFormatOptions).format(new Date(iso))
}
