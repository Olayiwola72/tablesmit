import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import { getFeatureBySlug, getAllFeatures } from '../../services/featureService/featureService'
import { siteConfig } from '../../config/siteConfig'
import { FeatureHeroSection } from '../../components/features/FeatureSections/FeatureHeroSection/FeatureHeroSection'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'

import { FeatureBenefitsSection } from '../../components/features/FeatureSections/FeatureBenefitsSection/FeatureBenefitsSection'

import { FeatureStepsSection } from '../../components/features/FeatureSections/FeatureStepsSection/FeatureStepsSection'

import { FeatureUseCasesSection } from '../../components/features/FeatureSections/FeatureUseCasesSection/FeatureUseCasesSection'

import { FeatureRelatedSection } from '../../components/features/FeatureSections/FeatureRelatedSection/FeatureRelatedSection'

import { FeatureCtaSection } from '../../components/features/FeatureSections/FeatureCtaSection/FeatureCtaSection'

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
        <Breadcrumb segments={[
          { label: t('nav.home'), to: siteConfig.routes.home },
          { label: t('nav.features'), to: siteConfig.routes.features },
          { label: feature.heroHeadline },
        ]} />
        <FeatureHeroSection heroHeadline={feature.heroHeadline} heroSubtext={feature.heroSubtext} />
        <FeatureBenefitsSection benefits={feature.benefits} />
        <FeatureStepsSection steps={feature.steps} />
        <FeatureUseCasesSection useCases={feature.useCases} />
        <FeatureRelatedSection relatedFeatures={relatedFeatures} />
        <FeatureCtaSection />
      </main>
    </>
  )
}
