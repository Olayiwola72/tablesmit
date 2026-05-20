import { MessageSquareQuote, Quote } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '../../config/siteConfig'
import { TESTIMONIALS } from '../../config/testimonials'

const { routes, brand } = siteConfig

export function TestimonialsPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main>
      <Helmet>
        <title>{t('meta.testimonialsTitle')}</title>
      </Helmet>
      <section className="mx-auto max-w-content px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {t('testimonials.heading')}
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-base leading-relaxed text-text-secondary">
          Hear from writers, analysts, researchers, and technical thinkers who use {brand.name} every day.
        </p>
      </section>

      {TESTIMONIALS.length === 0 ? (
        <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-narrow rounded-md border-2 border-dashed border-border bg-surface p-10 text-center">
            <MessageSquareQuote size={36} className="mx-auto text-primary-light" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-text-primary">{t('testimonials.emptyHeading')}</h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t('testimonials.emptyBody')}
            </p>
            <p className="mt-6">
              <Link
                to={routes.contact}
                className="text-sm font-semibold text-primary underline underline-offset-2"
              >
                {t('testimonials.shareExperience')} &rarr;
              </Link>
            </p>
            <p className="mt-4 text-xs text-text-muted">
              {t('testimonials.orReachOnX')}{' '}
              <a
                href={brand.authorTwitter}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                X @{brand.authorTwitter.split('/').pop()}
              </a>
              {' / '}
              <a
                href={`mailto:${brand.contactEmail}`}
                className="text-primary hover:underline"
              >
                {brand.contactEmail}
              </a>
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex flex-col rounded-md border border-border bg-white p-6 transition-colors duration-150 hover:border-primary"
              >
                <Quote size={28} className="mb-2 text-primary-light" aria-hidden="true" />
                <blockquote className="flex-1 text-base leading-relaxed text-text-secondary italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-primary-light">
                    <span className="flex h-full items-center justify-center text-sm font-semibold text-primary">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                  </div>
                  {testimonial.source && testimonial.sourceUrl ? (
                    <a
                      href={testimonial.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto text-xs text-primary hover:underline"
                    >
                      {t('testimonials.sourceOn', { source: testimonial.source })}
                    </a>
                  ) : null}
                </footer>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default TestimonialsPage
