import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import { getFeatureBySlug, getAllFeatures } from '../../services/featureService/featureService'
import { siteConfig } from '../../config/siteConfig'

export default function FeatureDetailPage(): ReactNode {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const [feature, setFeature] = useState<FeaturePage | undefined | null>(undefined)
  const [relatedFeatures, setRelatedFeatures] = useState<FeaturePage[]>([])

  useEffect(() => {
    let cancelled = false
    Promise.all([getFeatureBySlug(slug ?? ''), getAllFeatures()]).then(
      ([f, all]) => {
        if (cancelled) return
        if (f) {
          setFeature(f)
          setRelatedFeatures(
            f.relatedFeatures
              .map(s => all.find(rf => rf.slug === s))
              .filter(Boolean) as FeaturePage[]
          )
        } else {
          setFeature(null)
        }
      }
    )
    return () => { cancelled = true }
  }, [slug])

  if (feature === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    )
  }

  if (!feature) return <Navigate to={siteConfig.routes.features} replace />

  const featureUrl = `${siteConfig.brand.url}${siteConfig.routes.features}/${feature.slug}`

  return (
    <>
      <Helmet>
        <title>{feature.metaTitle}</title>
        <meta name="description" content={feature.metaDescription} />
        <meta property="og:title" content={feature.metaTitle} />
        <meta property="og:description" content={feature.metaDescription} />
        <meta property="og:url" content={featureUrl} />
        <link rel="canonical" href={featureUrl} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: feature.metaTitle,
          description: feature.metaDescription,
          url: featureUrl,
        })}</script>
      </Helmet>

      <main className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mx-auto mb-16 max-w-narrow text-center">
          <Link
            to={siteConfig.routes.features}
            className="mb-6 inline-block text-sm text-text-muted hover:text-primary"
          >
            &larr; {t('features.backToFeatures')}
          </Link>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
            {feature.heroHeadline}
          </h1>
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
            {feature.heroSubtext}
          </p>
        </header>

        {/* Benefits */}
        <section className="mx-auto mb-16 max-w-content">
          <h2 className="mb-8 text-2xl font-bold text-text-primary">{t('features.benefits')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {feature.benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-md border border-border p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {benefit.heading}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto mb-16 max-w-narrow">
          <h2 className="mb-8 text-2xl font-bold text-text-primary">{t('features.howItWorks')}</h2>
          <div className="space-y-8">
            {feature.steps.map(step => (
              <div key={step.number} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-text-primary">
                    {step.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        {feature.useCases.length > 0 && (
          <section className="mx-auto mb-16 max-w-narrow">
            <h2 className="mb-6 text-2xl font-bold text-text-primary">{t('features.useCases')}</h2>
            <ul className="space-y-3">
              {feature.useCases.map((uc, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {uc}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related features */}
        {relatedFeatures.length > 0 && (
          <section className="mx-auto max-w-narrow border-t border-border pt-10">
            <h2 className="mb-6 text-xl font-bold text-text-primary">{t('features.relatedFeatures')}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedFeatures.map(rf => rf && (
                <Link
                  key={rf.slug}
                  to={`${siteConfig.routes.features}/${rf.slug}`}
                  className="rounded-md border border-border p-4 transition-colors hover:border-primary"
                >
                  <h3 className="text-sm font-semibold text-text-primary">
                    {rf.heroHeadline}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    {rf.heroSubtext}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-narrow rounded-md border border-border bg-surface p-6 text-center">
          <p className="mb-3 text-sm text-text-secondary">
            {t('blog.ctaTitle')}
          </p>
          <Link
            to={siteConfig.routes.home}
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t('blog.openTablesmit')}
          </Link>
        </div>
      </main>
    </>
  )
}
