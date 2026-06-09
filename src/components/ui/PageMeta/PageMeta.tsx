import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { brand } from '@/config/brand/brandConfig'
import { routes } from '@/config/routes/routesConfig'
import type { PageMetaProps } from './PageMeta.types'

const DEFAULT_OG_IMAGE = `${brand.url}/og-image.webp`
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'
const TWITTER_HANDLE = brand.authorTwitter.split('/').pop() ?? ''

export function PageMeta({
  metaKey,
  title: explicitTitle,
  description: explicitDescription,
  routeKey,
  ogTitle: explicitOgTitle,
  ogDescription: explicitOgDescription,
  ogUrl: explicitOgUrl,
  ogImage: explicitOgImage,
  ogType = 'website',
  canonicalUrl: explicitCanonicalUrl,
  children,
}: PageMetaProps): ReactNode {
  const { t } = useTranslation(['common'])

  const title = explicitTitle ?? (metaKey ? t(`meta.${metaKey}Title`) : '')
  const description =
    explicitDescription ?? (metaKey ? t(`meta.${metaKey}Description`) : '')

  const ogTitle = explicitOgTitle ?? title
  const ogDescription = explicitOgDescription ?? description
  const ogImage = explicitOgImage ?? DEFAULT_OG_IMAGE

  const resolvedPath = routeKey ? routes[routeKey]?.path : undefined
  const resolvedUrl = resolvedPath ? `${brand.url}${resolvedPath}` : undefined

  const ogUrl = explicitOgUrl ?? resolvedUrl
  const canonicalUrl = explicitCanonicalUrl ?? resolvedUrl

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:locale" content="en_US" />
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${TWITTER_HANDLE}`} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  )
}

export default PageMeta
