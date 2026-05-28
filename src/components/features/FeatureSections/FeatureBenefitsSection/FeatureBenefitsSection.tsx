import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { FeatureBenefitsSectionProps } from './FeatureBenefitsSection.types'

export function FeatureBenefitsSection({ benefits }: FeatureBenefitsSectionProps): ReactNode {
  const { t } = useTranslation(['common', 'features'])

  if (benefits.length === 0) return null

  return (
    <section className="mx-auto mb-16 max-w-content">
      <h2 className="mb-8 text-2xl font-bold text-text-primary">{t('features.benefits')}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div key={benefit.heading} className="rounded-md border border-border p-6">
            <h3 className="mb-2 text-lg font-semibold text-text-primary">{benefit.heading}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{benefit.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
