import 'react-i18next'
import type en from './locales/en.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof en
    }
  }
}
