import type { ReactNode } from 'react'

export interface ContentPageLayoutProps {
  metaKey?: string
  routeKey?: string
  title?: string
  description?: string
  canonicalUrl?: string
  ogUrl?: string
  children?: ReactNode
  metaChildren?: ReactNode
  className?: string
}
