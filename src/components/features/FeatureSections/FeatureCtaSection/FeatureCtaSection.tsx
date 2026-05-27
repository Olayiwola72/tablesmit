import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routes } from '../../../../config/routes/routesConfig'

export function FeatureCtaSection(): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-16 max-w-narrow rounded-md border border-border bg-surface p-6 text-center">
      <p className="mb-3 text-sm text-text-secondary">
        {t('blog.ctaTitle')}
      </p>
      <Link
        to={routes.home.path}
        className="text-sm font-semibold text-primary hover:underline"
      >
        {t('blog.openTablesmit')}
      </Link>
    </div>
  )
}
