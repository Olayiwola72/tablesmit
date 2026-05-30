import type { ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'

export function TermsPage(): ReactNode {
  const { t } = usePageTranslation('legal')
  const pageTitle = t('meta.termsTitle')
  const pageDescription = t('meta.termsDescription')
  const pageUrl = `${brand.url}${routes.terms.path}`

  return (
    <ContentPageLayout
      metaKey="terms"
      routeKey="terms"
      metaChildren={
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: pageUrl,
        })}</script>
      }
      className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('footer.termsOfUse') },
        ]} />
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.termsOfUse')}</h1>
      <p className="mt-2 text-sm text-text-muted">{t('terms.lastUpdated')}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>{t('terms.intro')}</p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.service')}</h2>
          <p className="mt-3">{t('terms.serviceBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.yourContent')}</h2>
          <p className="mt-3">{t('terms.yourContentBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.openSource')}</h2>
          <p className="mt-3">{t('terms.openSourceBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('terms.contact')}</h2>
          <p className="mt-3">
            <a href={`mailto:${brand.contactEmail}`} className="text-primary hover:underline">
              {brand.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-10 text-center text-sm text-text-muted">
        <span>Related:</span>{' '}
        <Link
          to={routes.privacy.path}
          className="font-medium text-primary hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </ContentPageLayout>
  )
}

export default TermsPage
