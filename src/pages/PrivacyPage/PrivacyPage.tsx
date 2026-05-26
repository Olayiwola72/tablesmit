import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { siteConfig } from '../../config/siteConfig'

export function PrivacyPage(): ReactNode {
  const { t } = useTranslation()
  const name = siteConfig.brand.name
  
  return (
    <>
      <Helmet>
        <title>{t('meta.privacyTitle')}</title>
        <meta name="description" content={t('meta.privacyDescription')} />
        <meta property="og:title" content={t('meta.privacyTitle')} />
        <meta property="og:description" content={t('meta.privacyDescription')} />
        <meta property="og:url" content={`${siteConfig.brand.url}${siteConfig.routes.privacy}`} />
        <link rel="canonical" href={`${siteConfig.brand.url}${siteConfig.routes.privacy}`} />
      </Helmet>
      <main className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: siteConfig.routes.home },
          { label: t('footer.privacyPolicy') },
        ]} />
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.privacyPolicy')}</h1>
      <p className="mt-2 text-sm text-text-muted">{t('privacy.lastUpdated')}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>{t('privacy.intro', { name })}</p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('privacy.whatWeCollect')}</h2>
          <p className="mt-3">{t('privacy.whatWeCollectBody', { name })}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('privacy.whatWeDontCollect')}</h2>
          <p className="mt-3">{t('privacy.whatWeDontCollectBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('privacy.fileImports')}</h2>
          <p className="mt-3">{t('privacy.fileImportsBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('privacy.contact')}</h2>
          <p className="mt-3">
            {t('privacy.contactBody')}{' '}
            <a href={`mailto:${siteConfig.brand.contactEmail}`} className="text-primary hover:underline">
              {siteConfig.brand.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-10 text-center text-sm text-text-muted">
        <span>Related:</span>{' '}
        <Link
          to={siteConfig.routes.terms}
          className="font-medium text-primary hover:underline"
        >
          Terms of Use
        </Link>
      </div>
    </main>
    </>
  )
}

export default PrivacyPage
