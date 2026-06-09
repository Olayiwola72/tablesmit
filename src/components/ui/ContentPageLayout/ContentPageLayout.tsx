import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PageMeta } from '../PageMeta/PageMeta'
import type { ContentPageLayoutProps } from './ContentPageLayout.types'

export function ContentPageLayout({
  metaKey,
  routeKey,
  title,
  description,
  canonicalUrl,
  ogUrl,
  ogImage,
  ogType,
  children,
  metaChildren,
  className,
}: ContentPageLayoutProps): ReactNode {
  return (
    <>
      <PageMeta
        metaKey={metaKey}
        routeKey={routeKey}
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogUrl={ogUrl}
        ogImage={ogImage}
        ogType={ogType}
      >
        {metaChildren}
      </PageMeta>
      <main className={cn('bg-white dark:bg-slate-900', className)}>
        {children}
      </main>
    </>
  )
}
