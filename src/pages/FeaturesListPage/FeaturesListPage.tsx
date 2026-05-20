import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { allFeatures } from '../../services/featureService'

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
            <article
              key={feature.slug}
              className="rounded-md border border-border p-6 transition-colors duration-150 hover:border-primary"
            >
              <h2 className="mb-2 text-xl font-semibold text-text-primary">
                <Link to={`/features/${feature.slug}`} className="hover:text-primary">
                  {feature.heroHeadline}
                </Link>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {feature.heroSubtext}
              </p>
              <Link
                to={`/features/${feature.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {t('features.learnMore')} &rarr;
              </Link>
            </article>
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
