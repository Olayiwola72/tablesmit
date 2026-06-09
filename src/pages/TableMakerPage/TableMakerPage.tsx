import { type ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { TableProvider } from '../../context/TableContext'
import { TableMakerContent } from '../../components/features/TableMakerContent/TableMakerContent'
import { PageMeta } from '../../components/ui/PageMeta/PageMeta'
import { brand } from '../../config/brand/brandConfig'
import { exportFormats } from '../../config/export/exportConfig'
import { TESTIMONIALS } from '../../config/testimonials/testimonials'

const exportList = exportFormats.map((f) => f.label).join(', ')

const metaDescription = `Build clean, structured tables with full control over headers, formatting, and export. Free, no signup needed. Export to ${exportList}.`

const ratings = TESTIMONIALS.map((t) => t.rating).filter((r): r is number => r !== undefined)
const ratingCount = ratings.length
const ratingValue = ratingCount > 0
  ? (ratings.reduce((sum, r) => sum + r, 0) / ratingCount).toFixed(1)
  : undefined

export function TableMakerPage(): ReactNode {
  const { t } = usePageTranslation('table')
  const tagline = t('tagline')
  return (
    <TableProvider>
      <PageMeta
        title={`${brand.name} — ${tagline}`}
        description={metaDescription}
        routeKey="home"
      >
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: brand.name,
          alternateName: 'Tablesmith',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web',
          url: brand.url,
          description: metaDescription,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          featureList: exportFormats.map((f) => f.label),
          author: { '@type': 'Organization', name: brand.name },
          ...(ratingValue && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue,
              ratingCount,
              bestRating: '5',
              worstRating: '1',
            },
          }),
        })}</script>
      </PageMeta>
      <TableMakerContent />
    </TableProvider>
  )
}

export default TableMakerPage
