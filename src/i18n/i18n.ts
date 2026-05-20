import i18n from 'i18next'
import { initReactI18next, setDefaults } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import { LOCALES } from './config'

setDefaults({ useSuspense: false })

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: LOCALES.map(l => l.code),
      ns: ['common'],
      defaultNS: 'common',
      resources: {
        en: { common: en as Record<string, unknown> },
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'tablesmit-locale',
      },
    })
}

i18n.on('languageChanged', (lng) => {
  const locale = LOCALES.find(l => l.code === lng)
  if (locale) {
    document.documentElement.dir = locale.dir
    document.documentElement.lang = lng
  }
})

export default i18n
