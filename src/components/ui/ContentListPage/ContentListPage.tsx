import type { ReactNode } from 'react'
import type { ContentListPageProps } from './ContentListPage.types'
import { PageMeta } from '../PageMeta/PageMeta'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { SearchBar } from '../../features/SearchBar/SearchBar'
import { PaginationNav } from '../PaginationNav/PaginationNav'

export function ContentListPage({
  meta,
  metaChildren,
  canonicalUrl,
  ogImage,
  ogType,
  breadcrumb,
  heading,
  headingSubtext,
  headingExtra,
  searchQuery,
  onSearchChange,
  totalResults,
  totalItems,
  searchPlaceholder,
  children,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  isEmpty,
  emptyMessage,
}: ContentListPageProps): ReactNode {
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-content">
          <div className="flex items-center justify-center py-20">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <PageMeta
        title={meta.title}
        description={meta.description}
        ogUrl={canonicalUrl}
        ogImage={ogImage}
        ogType={ogType}
        canonicalUrl={canonicalUrl}
      >
        {metaChildren}
      </PageMeta>
      <div className="mx-auto max-w-content">
        <Breadcrumb segments={breadcrumb} />
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {heading}
          </h1>
          {headingSubtext && (
            <p className="mt-3 text-base text-text-secondary">{headingSubtext}</p>
          )}
          {headingExtra}
        </header>

        <SearchBar
          query={searchQuery}
          onQueryChange={onSearchChange}
          totalResults={totalResults}
          totalItems={totalItems}
          placeholder={searchPlaceholder}
        />

        {isEmpty ? (
          <p className="py-20 text-center text-sm text-text-muted">
            {emptyMessage}
          </p>
        ) : (
          <>
            {children}
            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </main>
  )
}
