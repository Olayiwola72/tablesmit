import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { LOCALES } from './config'

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
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: true,
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
