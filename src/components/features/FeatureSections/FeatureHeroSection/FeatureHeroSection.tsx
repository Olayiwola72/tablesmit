import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../../../config/siteConfig'
import type { FeatureHeroSectionProps } from './FeatureHeroSection.types'

export function FeatureHeroSection({ heroHeadline, heroSubtext }: FeatureHeroSectionProps): ReactNode {
  const { t } = useTranslation()

  return (
    <header className="mx-auto mb-16 max-w-narrow text-center">
      <Link
        to={siteConfig.routes.features}
        className="mb-6 inline-block text-sm text-text-muted hover:text-primary"
      >
        &larr; {t('features.backToFeatures')}
      </Link>
      <h1 className="mb-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
        {heroHeadline}
      </h1>
      <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
        {heroSubtext}
      </p>
    </header>
  )
}
