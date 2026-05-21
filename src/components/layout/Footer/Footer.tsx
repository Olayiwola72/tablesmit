import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { exportFormats } from '../../../config/export/exportConfig'
import { siteConfig } from '../../../config/siteConfig'
import { Logo } from '../../ui/Logo/Logo'
import { getCurrentYear } from '../../../utils/dateUtils/dateUtils'
import { FooterGroup } from '../FooterGroup/FooterGroup'

const { brand, routes } = siteConfig

export function Footer(): ReactNode {
  const { t } = useTranslation()

  const productLinks = [
    { label: t('footer.home'), href: routes.home },
    { label: t('nav.blog'), href: routes.blog },
    { label: t('nav.features'), href: routes.features },
    { label: t('nav.changelog'), href: routes.changelog },
    { label: t('nav.openSource'), href: routes.openSource },
  ]

  const companyLinks = [
    { label: t('nav.about'), href: routes.about },
    { label: t('nav.contact'), href: routes.contact },
    { label: t('nav.testimonials'), href: routes.testimonials },
    { label: t('footer.privacyPolicy'), href: routes.privacy },
    { label: t('footer.termsOfUse'), href: routes.terms },
    { label: t('footer.github'), href: brand.githubUrl, external: true },
  ]

  const exportLinks = exportFormats.map((item) => ({
    label: t(`export.${item.format}`, item.label),
  }))

  return (
    <footer className="border-t border-border bg-white py-4">
      <div className="mx-auto grid max-w-content gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <Logo variant="full" className="h-9 w-[165px]" />
          <p className="text-sm text-text-secondary">{t('brand.tagline')}</p>
          <p className="text-xs text-text-muted">
            © {getCurrentYear()} {brand.name}. {t('footer.license')}
          </p>
        </div>
        <FooterGroup title={t('footer.product')} links={productLinks} />
        <FooterGroup title={t('footer.company')} links={companyLinks} />
        <FooterGroup title={t('footer.export')} links={exportLinks} />
      </div>
    </footer>
  )
}


