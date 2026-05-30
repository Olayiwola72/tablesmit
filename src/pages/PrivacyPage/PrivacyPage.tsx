import type { ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'

export function PrivacyPage(): ReactNode {
  const { t } = usePageTranslation('legal')
  const pageTitle = t('meta.privacyTitle')
  const pageDescription = t('meta.privacyDescription')
  const pageUrl = `${brand.url}${routes.privacy.path}`

  return (
    <ContentPageLayout
      metaKey="privacy"
      routeKey="privacy"
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
          { label: t('footer.privacyPolicy') },
        ]} />
      <h1 className="text-3xl font-bold text-text-primary">{t('footer.privacyPolicy')}</h1>
      <p className="mt-2 text-sm text-text-muted">{t('privacy.lastUpdated')}</p>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>{t('privacy.intro')}</p>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">{t('privacy.whatWeCollect')}</h2>
          <p className="mt-3">{t('privacy.whatWeCollectBody')}</p>
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
            <a href={`mailto:${brand.contactEmail}`} className="text-primary hover:underline">
              {brand.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-10 text-center text-sm text-text-muted">
        <span>Related:</span>{' '}
        <Link
          to={routes.terms.path}
          className="font-medium text-primary hover:underline"
        >
          Terms of Use
        </Link>
      </div>
    </ContentPageLayout>
  )
}

export default PrivacyPage
