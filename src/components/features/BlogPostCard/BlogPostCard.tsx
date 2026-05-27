import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogPostCardProps } from './BlogPostCard.types'
import { LearnMoreLink } from '../../ui/LearnMoreLink/LearnMoreLink'
import { formatDate } from '../../../utils/formatDate/formatDate'
import { routes } from '../../../config/routes/routesConfig'

export function BlogPostCard({ post }: BlogPostCardProps): ReactNode {
  const { t } = useTranslation()

  return (
    <Link
      to={`${routes.blog.path}${post.slug}/`}
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
      <div className="mb-3">
        <LearnMoreLink label={t('blog.learnMore')} />
      </div>
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <span>{t('blog.minRead', { count: post.readTime })}</span>
        <span>·</span>
        <span>{post.author}</span>
        <span>·</span>
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-sm bg-surface px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
