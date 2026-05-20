import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { allFeatures } from '../../services/featureService'
import { siteConfig } from '../../config/siteConfig'

export default function FeaturesListPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {t('features.heading')}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t('features.subtext')}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {allFeatures.map(feature => (
            <Link
              key={feature.slug}
              to={`${siteConfig.routes.features}/${feature.slug}`}
              className="block rounded-md border border-border p-6 transition-all duration-150 hover:border-primary hover:shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-text-primary">
                {feature.heroHeadline}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {feature.heroSubtext}
              </p>
              <span className="text-sm font-medium text-primary">
                {t('features.learnMore')} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {allFeatures.length === 0 && (
          <p className="py-20 text-center text-sm text-text-muted">
            {t('features.emptyState')}
          </p>
        )}
      </div>
    </main>
  )
}
