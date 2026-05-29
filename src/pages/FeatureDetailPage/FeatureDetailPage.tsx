import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect, type ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import { getFeatureBySlug, getAllFeatures } from '../../services/featureService/featureService'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'
import { FeatureHeroSection } from '../../components/features/FeatureSections/FeatureHeroSection/FeatureHeroSection'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'

import { FeatureBenefitsSection } from '../../components/features/FeatureSections/FeatureBenefitsSection/FeatureBenefitsSection'

import { FeatureStepsSection } from '../../components/features/FeatureSections/FeatureStepsSection/FeatureStepsSection'

import { FeatureUseCasesSection } from '../../components/features/FeatureSections/FeatureUseCasesSection/FeatureUseCasesSection'

import { FeatureRelatedSection } from '../../components/features/FeatureSections/FeatureRelatedSection/FeatureRelatedSection'

import { FeatureCtaSection } from '../../components/features/FeatureSections/FeatureCtaSection/FeatureCtaSection'

export default function FeatureDetailPage(): ReactNode {
  const { t } = usePageTranslation('features')
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

  if (!feature) return <Navigate to={routes.features.path} replace />

  const featureUrl = `${brand.url}${routes.features.path}${feature.slug}/`

  return (
    <ContentPageLayout
      title={feature.metaTitle}
      description={feature.metaDescription}
      canonicalUrl={featureUrl}
      ogUrl={featureUrl}
      metaChildren={
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: feature.metaTitle,
          description: feature.metaDescription,
          url: featureUrl,
        })}</script>
      }
      className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('nav.features'), to: routes.features.path },
          { label: feature.heroHeadline },
        ]} />
        <FeatureHeroSection heroHeadline={feature.heroHeadline} heroSubtext={feature.heroSubtext} />
        <FeatureBenefitsSection benefits={feature.benefits} />
        <FeatureStepsSection steps={feature.steps} />
        <FeatureUseCasesSection useCases={feature.useCases} />
        <FeatureRelatedSection relatedFeatures={relatedFeatures} />
        <FeatureCtaSection />
      </ContentPageLayout>
  )
}
