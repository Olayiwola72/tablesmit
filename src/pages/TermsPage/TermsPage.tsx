import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'

export function TermsPage(): ReactNode {
  const { t } = useTranslation()
  const name = siteConfig.brand.name
  return (
    <>
      <Helmet>
        <title>{t('meta.termsTitle')}</title>
        <meta name="description" content={t('meta.termsDescription')} />
        <meta property="og:title" content={t('meta.termsTitle')} />
        <meta property="og:description" content={t('meta.termsDescription')} />
        <meta property="og:url" content={`${siteConfig.brand.url}${siteConfig.routes.terms}`} />
        <link rel="canonical" href={`${siteConfig.brand.url}${siteConfig.routes.terms}`} />
      </Helmet>
      <main className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.termsOfUse')}</h1>
      <p className="mt-2 text-sm text-text-muted">{t('terms.lastUpdated')}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>{t('terms.intro', { name })}</p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.service')}</h2>
          <p className="mt-3">{t('terms.serviceBody', { name })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.yourContent')}</h2>
          <p className="mt-3">{t('terms.yourContentBody', { name })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.openSource')}</h2>
          <p className="mt-3">{t('terms.openSourceBody', { name })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.contact')}</h2>
          <p className="mt-3">
            <a href={`mailto:${siteConfig.brand.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.brand.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          to={siteConfig.routes.home}
          className="text-sm font-semibold text-primary hover:underline"
        >
          &larr; Back to Tablesmit
        </Link>
        <span className="mx-3 text-text-muted">·</span>
        <Link
          to={siteConfig.routes.privacy}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
    </>
  )
}

export default TermsPage
