import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Helmet } from 'react-helmet-async'
import { getPostBySlug } from '../../services/blogService'
import { formatDate } from '../../utils/formatDate'
import { siteConfig } from '../../config/siteConfig'

export default function BlogPostPage(): ReactNode {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug ?? '')

  if (!post) return <Navigate to="/blog" replace />

  const postUrl = `${siteConfig.brand.url}/blog/${post.slug}`

  return (
    <>
      <Helmet>
        <title>{post.title} — {siteConfig.brand.name}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={postUrl} />
        <link rel="canonical" href={postUrl} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author },
          url: postUrl,
        })}</script>
      </Helmet>

      <article className="mx-auto max-w-narrow px-4 py-16">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span>·</span>
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{t('blog.minRead', { count: post.readTime })}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-text-primary">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-text-secondary">
            {post.description}
          </p>
          <div className="mt-4 flex gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="rounded-sm border border-border bg-surface px-2 py-1 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="mb-10 border-border" />

        <div className="prose prose-slate max-w-none
                        prose-headings:text-text-primary
                        prose-p:text-text-secondary
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-code:rounded-sm prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                        prose-pre:rounded-md prose-pre:border prose-pre:border-border prose-pre:bg-surface
                        prose-th:bg-primary prose-th:text-white prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                        prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
                        prose-tr:nth-child(even) prose-td:bg-surface
                        prose-blockquote:border-l-primary prose-blockquote:text-text-secondary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 rounded-md border border-border bg-surface p-6 text-center">
          <p className="mb-3 text-sm text-text-secondary">
            {t('blog.ctaTitle')}
          </p>
          <Link
            to="/app"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t('blog.openTablesmit')}
          </Link>
        </div>
      </article>
    </>
  )
}
