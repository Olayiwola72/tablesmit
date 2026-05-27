import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { FeatureCardProps } from './FeatureCard.types'
import { ContentCard } from '../../ui/ContentCard/ContentCard'
import { routes } from '../../../config/routes/routesConfig'

export function FeatureCard({ feature }: FeatureCardProps): ReactNode {
  const { t } = useTranslation(['common', 'features'])

  return (
    <ContentCard
      linkTo={`${routes.features.path}${feature.slug}/`}
      title={feature.heroHeadline}
      description={feature.heroSubtext}
      learnMoreLabel={t('features.learnMore')}
    />
  )
}
