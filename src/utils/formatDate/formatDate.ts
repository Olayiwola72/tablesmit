import i18n from 'i18next'
import { dateOptions } from '../../config/date/dateConfig'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(i18n.language, dateOptions).format(new Date(iso))
}
