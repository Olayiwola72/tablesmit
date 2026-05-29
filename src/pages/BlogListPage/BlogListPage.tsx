import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import type { BlogPost } from '../../services/blogService/blogService.types'
import { getAllPosts, getAllTags } from '../../services/blogService/blogService'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'
import { ITEMS_PER_PAGE } from '../../config/pagination/paginationConfig'
import { ContentListPage } from '../../components/ui/ContentListPage/ContentListPage'
import { BlogPostCard } from '../../components/features/BlogPostCard/BlogPostCard'
import { useSearch } from '../../hooks/useSearch/useSearch'

export default function BlogListPage(): ReactNode {
  const { t } = usePageTranslation('blog')
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    Promise.all([getAllPosts(), getAllTags()]).then(([all, allTags]) => {
      setPosts(all)
      setTags(allTags)
    })
  }, [])

  const { query, setQuery, results, totalResults } = useSearch({
    items: posts ?? [],
    fields: post => [post.title, post.description, post.content, post.author, ...post.tags],
    boostField: post => post.title,
  })

  const handleSearchChange = useCallback(
    (q: string) => {
      setQuery(q)
      setPage(1)
    },
    [setQuery],
  )

  const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE))
  const start = (page - 1) * ITEMS_PER_PAGE

  return (
    <ContentListPage
      meta={{ title: t('meta.blogTitle'), description: t('meta.blogDescription') }}
      canonicalUrl={`${brand.url}${routes.blog.path}`}
      breadcrumb={[
        { label: t('nav.home'), to: routes.home.path },
        { label: t('nav.blog') },
      ]}
      heading={t('blog.heading')}
      headingExtra={
        tags.length > 0 ? (
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
        ) : undefined
      }
      searchQuery={query}
      onSearchChange={handleSearchChange}
      totalResults={totalResults}
      totalItems={posts?.length ?? 0}
      searchPlaceholder={t('blog.searchPlaceholder')}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      isLoading={posts === null}
      isEmpty={posts !== null && posts.length === 0}
      emptyMessage={t('blog.empty')}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {results.slice(start, start + ITEMS_PER_PAGE).map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </ContentListPage>
  )
}
