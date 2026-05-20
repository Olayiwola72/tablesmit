import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { exportFormats } from '../../../config/exportConfig'
import { siteConfig } from '../../../config/siteConfig'
import { Logo } from '../../ui/Logo'
import { getCurrentYear } from '../../../utils/dateUtils'

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
  ]

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
        <div>
          <h2 className="mb-3 text-sm font-semibold text-text-primary">{t('footer.company')}</h2>
          <nav className="flex flex-col gap-2 text-sm text-text-secondary">
            {companyLinks.map((link) => (
              <Link key={link.label} to={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
            <a
              href={brand.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
            >
              {t('footer.github')} <ExternalLink size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-text-primary">{t('footer.export')}</h2>
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            {exportFormats.map((item) => (
              <span key={item.format}>{t(`export.${item.format}`, item.label)}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: Array<{ label: string; href: string }> }): ReactNode {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-text-primary">{title}</h2>
      <nav className="flex flex-col gap-2 text-sm text-text-secondary">
        {links.map((link) => (
          <Link key={link.label} to={link.href} className="transition-colors hover:text-primary">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
