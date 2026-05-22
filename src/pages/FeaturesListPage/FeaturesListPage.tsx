import { useState, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import { getAllFeatures } from '../../services/featureService/featureService'
import { siteConfig } from '../../config/siteConfig'
import { ITEMS_PER_PAGE } from '../../config/table/tableDefaults'
import { PaginationNav } from '../../components/ui/PaginationNav/PaginationNav'

export default function FeaturesListPage(): ReactNode {
  const { t } = useTranslation()
  const [features, setFeatures] = useState<FeaturePage[] | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllFeatures().then(all => setFeatures(all))
  }, [])

  if (features === null) {
    return (
      <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">
          <div className="flex items-center justify-center py-20">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        </div>
      </main>
    )
  }

  const totalPages = Math.max(1, Math.ceil(features.length / ITEMS_PER_PAGE))
  const start = (page - 1) * ITEMS_PER_PAGE
  const pageFeatures = features.slice(start, start + ITEMS_PER_PAGE)

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
          {pageFeatures.map(feature => (
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

        <PaginationNav currentPage={page} totalPages={totalPages} onPageChange={setPage} />

        {features.length === 0 && (
          <p className="py-20 text-center text-sm text-text-muted">
            {t('features.emptyState')}
          </p>
        )}
      </div>
    </main>
  )
}
