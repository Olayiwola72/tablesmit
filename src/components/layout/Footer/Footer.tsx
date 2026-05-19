import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { exportFormats } from '../../../config/exportConfig'
import { siteConfig } from '../../../config/siteConfig'
import { Logo } from '../../ui/Logo'
import { getCurrentYear } from '../../../utils/dateUtils'

const { brand, routes } = siteConfig

const productLinks = [
  { label: 'Home', href: routes.home },
  { label: 'Blog', href: routes.blog },
  { label: 'Changelog', href: routes.changelog },
  { label: 'Open Source', href: routes.openSource },
]

const companyLinks = [
  { label: 'About', href: routes.about },
  { label: 'Contact', href: routes.contact },
  { label: 'Testimonials', href: routes.testimonials },
  { label: siteConfig.labels.privacyPolicy, href: routes.privacy },
  { label: siteConfig.labels.termsOfUse, href: routes.terms },
]

export function Footer(): ReactNode {
  return (
    <footer className="border-t border-border bg-white py-4">
      <div className="mx-auto grid max-w-content gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <Logo variant="full" className="h-9 w-[165px]" />
          <p className="text-sm text-text-secondary">{brand.tagline}</p>
          <p className="text-xs text-text-muted">
            © {getCurrentYear()} {brand.name}. Open source under MIT license.
          </p>
        </div>
        <FooterGroup title="Product" links={productLinks} />
        <div>
          <h2 className="mb-3 text-sm font-semibold text-text-primary">Company</h2>
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
              GitHub <ExternalLink size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-text-primary">{siteConfig.labels.exportOptions}</h2>
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            {exportFormats.map((item) => (
              <span key={item.format}>{item.label}</span>
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
