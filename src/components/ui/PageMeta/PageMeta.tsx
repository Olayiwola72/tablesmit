import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { brand } from '@/config/brand/brandConfig'
import { routes } from '@/config/routes/routesConfig'
import type { PageMetaProps } from './PageMeta.types'

export function PageMeta({
  metaKey,
  title: explicitTitle,
  description: explicitDescription,
  routeKey,
  ogTitle: explicitOgTitle,
  ogDescription: explicitOgDescription,
  ogUrl: explicitOgUrl,
  canonicalUrl: explicitCanonicalUrl,
  children,
}: PageMetaProps): ReactNode {
  const { t } = useTranslation(['common'])

  const title = explicitTitle ?? (metaKey ? t(`meta.${metaKey}Title`) : '')
  const description =
    explicitDescription ?? (metaKey ? t(`meta.${metaKey}Description`) : '')

  const ogTitle = explicitOgTitle ?? title
  const ogDescription = explicitOgDescription ?? description

  const resolvedPath = routeKey ? routes[routeKey]?.path : undefined
  const resolvedUrl = resolvedPath ? `${brand.url}${resolvedPath}` : undefined

  const ogUrl = explicitOgUrl ?? resolvedUrl
  const canonicalUrl = explicitCanonicalUrl ?? resolvedUrl

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  )
}

export default PageMeta
