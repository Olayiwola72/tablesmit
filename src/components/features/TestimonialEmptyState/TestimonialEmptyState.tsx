import { Mail, Quote } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { brand } from '@/config/brand/brandConfig'
import { routes } from '@/config/routes/routesConfig'
import { EmptyStateShell } from '../../ui/EmptyStateShell/EmptyStateShell'

export function TestimonialEmptyState(): ReactNode {
  const { t } = useTranslation(['common', 'testimonials'])

  return (
    <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
      <EmptyStateShell
        icon={<div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent"><Quote size={28} className="text-white" /></div>}
        title={t('testimonials.emptyHeading')}
        description={t('testimonials.emptyBody')}
        action={
          <Link
            to={routes.contact.path}
            className="text-sm font-semibold text-primary underline underline-offset-2"
          >
            {t('testimonials.shareExperience')} &rarr;
          </Link>
        }
        secondary={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={brand.authorTwitter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm text-text-primary shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @{brand.authorTwitter.split('/').pop()}
            </a>
            <a
              href={`mailto:${brand.contactEmail}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm text-text-primary shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Mail size={16} aria-hidden="true" />
              {brand.contactEmail}
            </a>
          </div>
        }
      />
    </section>
  )
}
