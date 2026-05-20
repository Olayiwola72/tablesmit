import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../config/siteConfig'

export function TermsPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.termsOfUse')}</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: May 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>By using {siteConfig.brand.name} you agree to these terms.</p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">The service</h2>
          <p className="mt-3">
            {siteConfig.brand.name} is provided free of charge, as-is, with no guarantees of uptime,
            accuracy, or fitness for any particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Your content</h2>
          <p className="mt-3">
            You retain full ownership of any content you create with {siteConfig.brand.name}. We claim
            no rights over your tables, data, or exports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Open source</h2>
          <p className="mt-3">
            {siteConfig.brand.name} source code is available under the MIT license. You may fork, modify,
            and distribute it under those terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Contact</h2>
          <p className="mt-3">
            <a href={`mailto:${siteConfig.brand.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.brand.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default TermsPage
