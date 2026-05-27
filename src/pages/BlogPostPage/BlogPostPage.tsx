import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect, useMemo, useCallback, type ReactNode, type ComponentPropsWithoutRef, type FC } from 'react'

type MdComponent = FC<{ remarkPlugins: unknown[]; components: Record<string, unknown>; children: string }>
import remarkGfm from 'remark-gfm'
import { Helmet } from 'react-helmet-async'
import { Copy, Check } from 'lucide-react'
import type { BlogPost } from '../../services/blogService/blogService.types'
import { getPostBySlug, getAllPosts } from '../../services/blogService/blogService'
import { formatDate } from '../../utils/formatDate/formatDate'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'
import { toast } from '../../utils/toast/toast'
import { SearchBar } from '../../components/features/SearchBar/SearchBar'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { useBlogSearch } from '../../hooks/useBlogSearch/useBlogSearch'
import { ITEMS_PER_PAGE } from '../../config/pagination/paginationConfig'
import { PaginationNav } from '../../components/ui/PaginationNav/PaginationNav'

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children: ReactNode } }).props.children)
  }
  return ''
}

type PreBlockProps = ComponentPropsWithoutRef<'pre'>

function PreBlock(props: PreBlockProps): ReactNode {
  const { t } = usePageTranslation('blog')
  const [copied, setCopied] = useState(false)
  const { children } = props

  const handleCopy = (): void => {
    const text = extractText(children)
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      toast.success(t('blog.copiedToClipboard'))
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => toast.error(t('blog.failedToCopy')))
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-sm bg-white/90 p-1.5 text-text-muted opacity-0 shadow-sm ring-1 ring-border transition-opacity duration-150 hover:bg-white hover:text-text-primary group-hover:opacity-100 focus-visible:opacity-100"
        aria-label={t('blog.copyCode')}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre>{children}</pre>
    </div>
  )
}

const markdownComponents = {
  pre: PreBlock,
}

export default function BlogPostPage(): ReactNode {
  const { t } = usePageTranslation('blog')
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | undefined | null>(undefined)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [Md, setMd] = useState<MdComponent | null>(null)

  const { query, setQuery, results, totalResults } = useBlogSearch(allPosts)
  const [browsePage, setBrowsePage] = useState(1)

  const onSearchChange = useCallback((q: string) => {
    setQuery(q)
    setBrowsePage(1)
  }, [setQuery])

  const paginatedResults = useMemo(
    () => results.slice((browsePage - 1) * ITEMS_PER_PAGE, browsePage * ITEMS_PER_PAGE),
    [results, browsePage],
  )
  const totalBrowsePages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE))

  useEffect(() => {
    let cancelled = false
    getPostBySlug(slug ?? '').then(result => {
      if (!cancelled) setPost(result ?? null)
    })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    getAllPosts().then(posts => setAllPosts(posts))
  }, [])

  useEffect(() => {
    if (!post) return
    let cancelled = false
    import('react-markdown' as string).then(mod => {
      if (cancelled) return
      setMd(() => (mod as { default: MdComponent }).default)
    })
    return () => { cancelled = true }
  }, [post])

  if (post === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    )
  }

  if (!post) return <Navigate to={routes.blog.path} replace />

  const postUrl = `${brand.url}${routes.blog.path}${post.slug}/`

  return (
    <>
      <Helmet>
        <title>{post.title} — {brand.name}</title>
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
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('nav.blog'), to: routes.blog.path },
          { label: post.title },
        ]} />
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
            <Link to={routes.blog.path} className="hover:text-primary">Blog</Link>
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
                        prose-code:rounded-sm prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-medium prose-code:text-text-primary
                        prose-pre:rounded-md prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-pre:text-text-primary
                        prose-table:border-collapse
                        prose-th:bg-primary prose-th:text-white prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                        prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2 prose-td:text-text-primary
                        prose-tr:nth-child(even) prose-td:bg-surface
                        prose-blockquote:border-l-primary prose-blockquote:text-text-secondary">
          {Md ? (
            <Md remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</Md>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
            </div>
          )}
        </div>

        <div className="mt-16 rounded-md border border-border bg-surface p-6 text-center">
          <p className="mb-3 text-sm text-text-secondary">
            {t('blog.ctaTitle', { name: brand.name })}
          </p>
          <Link
            to={routes.home.path}
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t('blog.openBrand', { name: brand.name })}
          </Link>
        </div>
      </article>

      {allPosts.length > 0 && (
        <section className="mx-auto max-w-narrow border-t border-border px-4 pb-16 pt-12">
          <h2 className="mb-6 text-xl font-semibold text-text-primary">
            {t('blog.browsePosts')}
          </h2>
          <SearchBar
            query={query}
            onQueryChange={onSearchChange}
            totalResults={totalResults}
            totalItems={allPosts.length}
            placeholder={t('blog.searchPlaceholder')}
          />
          {results.length > 0 && (
            <>
              <div className="mt-4 space-y-3">
                {paginatedResults.map(other => (
                  <Link
                    key={other.slug}
                    to={`${routes.blog.path}${other.slug}/`}
                    className={`block rounded-md border p-4 transition-colors duration-150 hover:border-primary ${
                      other.slug === slug ? 'border-primary bg-primary-light' : 'border-border'
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-text-primary">{other.title}</h3>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2">{other.description}</p>
                  </Link>
                ))}
              </div>
              <PaginationNav
                currentPage={browsePage}
                totalPages={totalBrowsePages}
                onPageChange={setBrowsePage}
              />
            </>
          )}
          {query && results.length === 0 && (
            <p className="mt-4 text-sm text-text-muted">{t('search.noResults')}</p>
          )}
        </section>
      )}
    </>
  )
}
