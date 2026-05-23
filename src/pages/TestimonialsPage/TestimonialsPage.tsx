import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { TESTIMONIALS } from '../../config/testimonials/testimonials'
import { siteConfig } from '../../config/siteConfig'
import { TestimonialCard } from '../../components/features/TestimonialCard/TestimonialCard'
import { TestimonialEmptyState } from '../../components/features/TestimonialEmptyState/TestimonialEmptyState'

export function TestimonialsPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main>
      <Helmet>
        <title>{t('meta.testimonialsTitle')}</title>
        <meta name="description" content={t('meta.testimonialsDescription')} />
        <meta property="og:title" content={t('meta.testimonialsTitle')} />
        <meta property="og:description" content={t('meta.testimonialsDescription')} />
        <meta property="og:url" content={`${siteConfig.brand.url}${siteConfig.routes.testimonials}`} />
        <link rel="canonical" href={`${siteConfig.brand.url}${siteConfig.routes.testimonials}`} />
      </Helmet>
      <section className="mx-auto max-w-content px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {t('testimonials.heading')}
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-base leading-relaxed text-text-secondary">
          {t('testimonials.subtext', { name: t('brand.name') })}
        </p>
      </section>

      {TESTIMONIALS.length === 0 ? (
        <TestimonialEmptyState />
      ) : (
        <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default TestimonialsPage
