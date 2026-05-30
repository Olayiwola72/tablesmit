import type { ReactNode } from 'react'
import type { BreadcrumbSegment } from '../Breadcrumb/Breadcrumb.types'

export interface ContentListPageMeta {
  title: string
  description: string
}

export interface ContentListPageProps {
  meta: ContentListPageMeta
  metaChildren?: ReactNode
  canonicalUrl: string
  breadcrumb: BreadcrumbSegment[]
  heading: string
  headingSubtext?: string
  headingExtra?: ReactNode
  searchQuery: string
  onSearchChange: (q: string) => void
  totalResults: number
  totalItems: number
  searchPlaceholder: string
  children: ReactNode
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading: boolean
  isEmpty: boolean
  emptyMessage: string
}
