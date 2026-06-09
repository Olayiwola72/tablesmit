import type { ReactNode } from 'react'
import type { RouteKey } from '@/config/routes/routesConfig'

export interface PageMetaProps {
  metaKey?: string
  title?: string
  description?: string
  routeKey?: RouteKey
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonicalUrl?: string
  children?: ReactNode
}
