import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { exportFormats } from '../../../config/export/exportConfig'
import { brand } from '../../../config/brand/brandConfig'
import { routes } from '../../../config/routes/routesConfig'
import { Logo } from '../../ui/Logo/Logo'
import { getCurrentYear } from '../../../utils/dateUtils/dateUtils'
import { FooterGroup } from '../FooterGroup/FooterGroup'

export function Footer(): ReactNode {
  const { t } = useTranslation()

  const productLinks = [
    { label: t('nav.home', routes.home.label), href: routes.home.path },
    { label: t('nav.blog', routes.blog.label), href: routes.blog.path },
    { label: t('nav.features', routes.features.label), href: routes.features.path },
    { label: t('nav.changelog', routes.changelog.label), href: routes.changelog.path },
    { label: t('nav.openSource', routes.openSource.label), href: routes.openSource.path },
  ]

  const companyLinks = [
    { label: t('nav.about', routes.about.label), href: routes.about.path },
    { label: t('nav.contact', routes.contact.label), href: routes.contact.path },
    { label: t('nav.testimonials', routes.testimonials.label), href: routes.testimonials.path },
    { label: t('footer.privacyPolicy'), href: routes.privacy.path },
    { label: t('footer.termsOfUse'), href: routes.terms.path },
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


