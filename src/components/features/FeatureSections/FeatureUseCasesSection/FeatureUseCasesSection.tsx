import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { FeatureUseCasesSectionProps } from './FeatureUseCasesSection.types'

export function FeatureUseCasesSection({ useCases }: FeatureUseCasesSectionProps): ReactNode {
  const { t } = useTranslation(['common', 'features'])

  if (useCases.length === 0) return null

  return (
    <section className="mx-auto mb-16 max-w-narrow">
      <h2 className="mb-6 text-2xl font-bold text-text-primary">{t('features.useCases')}</h2>
      <ul className="space-y-3">
        {useCases.map((uc) => (
          <li key={uc} className="flex items-start gap-3 text-sm text-text-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {uc}
          </li>
        ))}
      </ul>
    </section>
  )
}
