import 'react-i18next'
import type enCommon from './locales/en/common.json'
import type enHome from './locales/en/home.json'
import type enAbout from './locales/en/about.json'
import type enOpenSource from './locales/en/openSource.json'
import type enBlog from './locales/en/blog.json'
import type enContact from './locales/en/contact.json'
import type enLegal from './locales/en/legal.json'
import type enTable from './locales/en/table.json'
import type enFeatures from './locales/en/features.json'
import type enTestimonials from './locales/en/testimonials.json'
import type enChanglog from './locales/en/changelog.json'
import type enNotFound from './locales/en/notFound.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enCommon
      home: typeof enHome
      about: typeof enAbout
      openSource: typeof enOpenSource
      blog: typeof enBlog
      contact: typeof enContact
      legal: typeof enLegal
      table: typeof enTable
      features: typeof enFeatures
      testimonials: typeof enTestimonials
      changelog: typeof enChanglog
      notFound: typeof enNotFound
    }
  }
}
