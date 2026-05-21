import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { FeatureStepsSectionProps } from './FeatureStepsSection.types'

export function FeatureStepsSection({ steps }: FeatureStepsSectionProps): ReactNode {
  const { t } = useTranslation()

  if (steps.length === 0) return null

  return (
    <section className="mx-auto mb-16 max-w-narrow">
      <h2 className="mb-8 text-2xl font-bold text-text-primary">{t('features.howItWorks')}</h2>
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-white">
              {step.number}
            </span>
            <div>
              <h3 className="mb-1 text-lg font-semibold text-text-primary">{step.heading}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
