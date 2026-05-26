import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import type { BlogPost } from '../../services/blogService/blogService.types'
import { getAllPosts, getAllTags } from '../../services/blogService/blogService'
import { siteConfig } from '../../config/siteConfig'
import { ITEMS_PER_PAGE } from '../../config/table/tableDefaults'
import { PaginationNav } from '../../components/ui/PaginationNav/PaginationNav'
import { BlogPostCard } from '../../components/features/BlogPostCard/BlogPostCard'
import { SearchBar } from '../../components/features/SearchBar/SearchBar'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { useBlogSearch } from '../../hooks/useBlogSearch/useBlogSearch'

export default function BlogListPage(): ReactNode {
  const { t } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    Promise.all([getAllPosts(), getAllTags()]).then(([all, allTags]) => {
      setPosts(all)
      setTags(allTags)
    })
  }, [])

  const { query, setQuery, results, totalResults } = useBlogSearch(posts ?? [])

  const handleSearchChange = useCallback(
    (q: string) => {
      setQuery(q)
      setPage(1)
    },
    [setQuery],
  )

  if (posts === null) {
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

  const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE))
  const start = (page - 1) * ITEMS_PER_PAGE
  const pagePosts = results.slice(start, start + ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <Helmet>
        <title>{t('meta.blogTitle')}</title>
        <meta name="description" content={t('meta.blogDescription')} />
        <meta property="og:title" content={t('meta.blogTitle')} />
        <meta property="og:description" content={t('meta.blogDescription')} />
        <meta property="og:url" content={`${siteConfig.brand.url}${siteConfig.routes.blog}`} />
        <link rel="canonical" href={`${siteConfig.brand.url}${siteConfig.routes.blog}`} />
      </Helmet>
      <div className="mx-auto max-w-content">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: siteConfig.routes.home },
          { label: t('nav.blog') },
        ]} />
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {t('blog.heading')}
          </h1>
          <p className="mt-3 text-base text-text-secondary" />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="rounded-sm bg-surface px-2 py-0.5 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          totalResults={totalResults}
          totalItems={posts.length}
          placeholder={t('blog.searchPlaceholder')}
        />

        {pagePosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {pagePosts.map(post => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            <PaginationNav currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : !query && posts.length === 0 ? (
          <p className="py-20 text-center text-sm text-text-muted">
            {t('blog.empty')}
          </p>
        ) : null}
      </div>
    </main>
  )
}
