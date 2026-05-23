import { type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { TableProvider } from '../../context/TableContext'
import { TableMakerContent } from '../../components/features/TableMakerContent/TableMakerContent'
import { siteConfig } from '../../config/siteConfig'

export function TableMakerPage(): ReactNode {
  const { brand, routes } = siteConfig
  return (
    <TableProvider>
      <Helmet>
        <title>Tablesmit — Tables, Your Way</title>
        <meta name="description" content={brand.metaDescription} />
        <meta property="og:title" content="Tablesmit — Tables, Your Way" />
        <meta property="og:description" content={brand.metaDescription} />
        <meta property="og:url" content={brand.url} />
        <link rel="canonical" href={`${brand.url}${routes.home}`} />
      </Helmet>
      <TableMakerContent />
    </TableProvider>
  )
}

export default TableMakerPage
