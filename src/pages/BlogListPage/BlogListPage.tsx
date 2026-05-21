import { useState, useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { BlogPost } from '../../services/blogService/blogService.types'
import { getAllPosts, getAllTags } from '../../services/blogService/blogService'
import { formatDate } from '../../utils/formatDate/formatDate'
import { siteConfig } from '../../config/siteConfig'
import { ITEMS_PER_PAGE } from '../../config/table/tableDefaults'
import { Button } from '../../components/ui/Button/Button'

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

  const totalPages = Math.max(1, Math.ceil(posts.length / ITEMS_PER_PAGE))
  const start = (page - 1) * ITEMS_PER_PAGE
  const pagePosts = posts.slice(start, start + ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <Link
          to={siteConfig.routes.home}
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
        >
          &larr; {t('nav.home')}
        </Link>
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {t('blog.heading')}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
          </p>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {pagePosts.map(post => (
            <Link
              key={post.slug}
              to={`${siteConfig.routes.blog}/${post.slug}`}
              className="block rounded-md border border-border p-6 transition-colors duration-150 hover:border-primary"
            >
              {post.featured && (
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {t('blog.featured')}
                </span>
              )}
              <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
              <h2 className="mb-2 mt-2 text-xl font-semibold text-text-primary">
                {post.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span>{t('blog.minRead', { count: post.readTime })}</span>
                <span>·</span>
                <span>{post.author}</span>
                <span>·</span>
                {post.tags.map(tag => (
                  <span key={tag} className="rounded-sm bg-surface px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              isDisabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              aria-label={t('pagination.prevAria')}
            >
              &larr; {t('pagination.prev')}
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <Button
                key={n}
                variant={n === page ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPage(n)}
                aria-label={t('pagination.pageAria', { number: n })}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              isDisabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              aria-label={t('pagination.nextAria')}
            >
              {t('pagination.next')} &rarr;
            </Button>
          </nav>
        )}

        {posts.length === 0 && (
          <p className="py-20 text-center text-sm text-text-muted">
            {t('blog.empty')}
          </p>
        )}
      </div>
    </main>
  )
}
