import type { ReactNode } from 'react'
import type { FeatureHeroSectionProps } from './FeatureHeroSection.types'

export function FeatureHeroSection({ heroHeadline, heroSubtext }: FeatureHeroSectionProps): ReactNode {
  return (
    <header className="mx-auto mb-16 max-w-narrow text-center">
      <h1 className="mb-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
        {heroHeadline}
      </h1>
      <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
        {heroSubtext}
      </p>
    </header>
  )
}
