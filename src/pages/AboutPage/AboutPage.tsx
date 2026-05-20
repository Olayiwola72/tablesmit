import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

export function AboutPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="max-w-narrow">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">{t('about.heading')}</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>{t('about.body')}</p>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
