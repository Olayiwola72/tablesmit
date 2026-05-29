import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlogPostCardProps } from './BlogPostCard.types'
import { ContentCard } from '../../ui/ContentCard/ContentCard'
import { formatDate } from '@/utils/formatDate/formatDate'
import { routes } from '@/config/routes/routesConfig'

export function BlogPostCard({ post }: BlogPostCardProps): ReactNode {
  const { t } = useTranslation(['common', 'blog'])

  return (
    <ContentCard
      linkTo={`${routes.blog.path}${post.slug}/`}
      title={post.title}
      description={post.description}
      learnMoreLabel={t('blog.learnMore')}
      featured={post.featured}
      featuredLabel={post.featured ? t('blog.featured') : undefined}
      date={formatDate(post.date)}
      metadata={
        <>
          <span>{t('blog.minRead', { count: post.readTime })}</span>
          <span>·</span>
          <span>{post.author}</span>
          <span>·</span>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-sm bg-surface px-2 py-0.5">
              {tag}
            </span>
          ))}
        </>
      }
    />
  )
}
