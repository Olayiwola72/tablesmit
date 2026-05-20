import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../config/siteConfig'

export function PrivacyPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.privacyPolicy')}</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: May 2026</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>
          {siteConfig.brand.name} is a browser-based tool. We do not require an account, and we do not
          store your table data on any server.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">What we collect</h2>
          <p className="mt-3">
            We may use analytics to understand how people use {siteConfig.brand.name}. Analytics collect
            anonymised usage data such as pages visited, time on page, and general geographic region at
            country level. We do not collect names, email addresses, or personally identifiable information
            through the app itself.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">What we do not collect</h2>
          <p className="mt-3">
            Your table content never leaves your browser. We do not transmit, store, or process your table
            data on our servers. We do not sell data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">File imports</h2>
          <p className="mt-3">
            When you import a CSV or Excel file, it is read locally in your browser. The file is never
            uploaded to any server.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Contact</h2>
          <p className="mt-3">
            Questions about privacy:{' '}
            <a href={`mailto:${siteConfig.brand.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.brand.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPage
