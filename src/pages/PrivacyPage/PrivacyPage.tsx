import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../config/siteConfig'

export function PrivacyPage(): ReactNode {
  const { t } = useTranslation()
  const name = siteConfig.brand.name
  
  return (
    <main className="mx-auto max-w-narrow px-4 py-16 sm:px-6 lg:px-8">
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
    </main>
  )
}

export default PrivacyPage
