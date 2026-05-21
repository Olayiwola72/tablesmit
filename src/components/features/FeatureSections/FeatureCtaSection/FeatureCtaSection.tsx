import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../../../config/siteConfig'

export function FeatureCtaSection(): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-16 max-w-narrow rounded-md border border-border bg-surface p-6 text-center">
      <p className="mb-3 text-sm text-text-secondary">
        {t('blog.ctaTitle')}
      </p>
      <Link
        to={siteConfig.routes.home}
        className="text-sm font-semibold text-primary hover:underline"
      >
        {t('blog.openTablesmit')}
      </Link>
    </div>
  )
}
