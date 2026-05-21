import i18n from 'i18next'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
