import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { allPosts, getAllTags } from '../../services/blogService'
import { formatDate } from '../../utils/formatDate'
import { siteConfig } from '../../config/siteConfig'

export default function BlogListPage(): ReactNode {
  const { t } = useTranslation()
  const tags = getAllTags()

  return (
    <main className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-content">
        <Link
          to={siteConfig.routes.home}
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
        >
          &larr; Home
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
          {allPosts.map(post => (
            <article
              key={post.slug}
              className="rounded-md border border-border p-6 transition-colors duration-150 hover:border-primary"
            >
              {post.featured && (
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {t('blog.featured')}
                </span>
              )}
              <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
              <h2 className="mb-2 mt-2 text-xl font-semibold text-text-primary">
                <Link to={`${siteConfig.routes.blog}/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
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
            </article>
          ))}
        </div>

        {allPosts.length === 0 && (
          <p className="py-20 text-center text-sm text-text-muted">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </main>
  )
}
