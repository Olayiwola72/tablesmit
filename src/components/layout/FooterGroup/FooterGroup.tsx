import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { FooterGroupProps, FooterLinkItem } from './FooterGroup.types'

function FooterLink({ label, href, external }: FooterLinkItem): ReactNode {
  if (!href) {
    return <span className="cursor-default text-sm text-text-secondary">{label}</span>
  }
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-primary"
      >
        {label} <ExternalLink size={13} aria-hidden="true" />
      </a>
    )
  }
  return (
    <Link to={href} className="text-sm text-text-secondary transition-colors hover:text-primary">
      {label}
    </Link>
  )
}

export function FooterGroup({ title, links }: FooterGroupProps): ReactNode {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-text-primary">{title}</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </nav>
    </div>
  )
}
