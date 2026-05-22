import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../../../config/siteConfig'
import type { FeatureRelatedSectionProps } from './FeatureRelatedSection.types'

export function FeatureRelatedSection({ relatedFeatures }: FeatureRelatedSectionProps): ReactNode {
  const { t } = useTranslation()

  if (relatedFeatures.length === 0) return null

  return (
    <section className="mx-auto max-w-narrow border-t border-border pt-10">
      <h2 className="mb-6 text-xl font-bold text-text-primary">{t('features.relatedFeatures')}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {relatedFeatures.map((rf) => (
          <Link
            key={rf.slug}
            to={`${siteConfig.routes.features}/${rf.slug}`}
            className="rounded-md border border-border p-4 transition-colors hover:border-primary"
          >
            <h3 className="text-sm font-semibold text-text-primary">{rf.heroHeadline}</h3>
            <p className="mt-1 text-xs text-text-muted">{rf.heroSubtext}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
