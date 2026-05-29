import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import { getAllFeatures } from '../../services/featureService/featureService'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'
import { ITEMS_PER_PAGE } from '../../config/pagination/paginationConfig'
import { ContentListPage } from '../../components/ui/ContentListPage/ContentListPage'
import { FeatureCard } from '../../components/features/FeatureCard/FeatureCard'
import { useSearch } from '../../hooks/useSearch/useSearch'

export default function FeaturesListPage(): ReactNode {
  const { t } = usePageTranslation('features')
  const [features, setFeatures] = useState<FeaturePage[] | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllFeatures().then(all => setFeatures(all))
  }, [])

  const { query, setQuery, results, totalResults } = useSearch({
    items: features ?? [],
    fields: feature => [
      feature.heroHeadline,
      feature.metaTitle,
      feature.metaDescription,
      feature.heroSubtext,
    ],
    boostField: feature => feature.heroHeadline,
  })

  const handleSearchChange = useCallback(
    (q: string) => {
      setQuery(q)
      setPage(1)
    },
    [setQuery],
  )

  const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE))
  const start = (page - 1) * ITEMS_PER_PAGE

  return (
    <ContentListPage
      meta={{ title: t('meta.featuresTitle'), description: t('meta.featuresDescription') }}
      canonicalUrl={`${brand.url}${routes.features.path}`}
      breadcrumb={[
        { label: t('nav.home'), to: routes.home.path },
        { label: t('nav.features') },
      ]}
      heading={t('features.heading')}
      headingSubtext={t('features.subtext')}
      searchQuery={query}
      onSearchChange={handleSearchChange}
      totalResults={totalResults}
      totalItems={features?.length ?? 0}
      searchPlaceholder={t('features.searchPlaceholder')}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      isLoading={features === null}
      isEmpty={features !== null && features.length === 0}
      emptyMessage={t('features.emptyState')}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {results.slice(start, start + ITEMS_PER_PAGE).map(feature => (
          <FeatureCard key={feature.slug} feature={feature} />
        ))}
      </div>
    </ContentListPage>
  )
}
