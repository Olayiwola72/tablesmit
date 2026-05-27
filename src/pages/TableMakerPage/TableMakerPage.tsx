import { type ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { Helmet } from 'react-helmet-async'
import { TableProvider } from '../../context/TableContext'
import { TableMakerContent } from '../../components/features/TableMakerContent/TableMakerContent'
import { brand } from '../../config/brand/brandConfig'
import { exportFormats } from '../../config/export/exportConfig'
import { routes } from '../../config/routes/routesConfig'

const exportLabels = exportFormats.map((f) => f.label)
const lastLabel = exportLabels[exportLabels.length - 1]
const precedingLabels = exportLabels.slice(0, -1)
const exportList =
  precedingLabels.length > 0
    ? `${precedingLabels.join(', ')}, or ${lastLabel}`
    : lastLabel

const metaDescription = `Build clean, structured tables with full control over headers, formatting, and export. Free. No signup. Export to ${exportList}.`

export function TableMakerPage(): ReactNode {
  const { t } = usePageTranslation('table')
  const tagline = t('tagline')
  return (
    <TableProvider>
      <Helmet>
        <title>{brand.name} — {tagline}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${brand.name} — ${tagline}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={brand.url} />
        <link rel="canonical" href={`${brand.url}${routes.home.path}`} />
      </Helmet>
      <TableMakerContent />
    </TableProvider>
  )
}

export default TableMakerPage
