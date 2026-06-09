import { ExternalLink, Quote, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { TestimonialCardProps } from './TestimonialCard.types'

export function TestimonialCard({ testimonial }: TestimonialCardProps): ReactNode {
  const { t } = useTranslation(['common', 'testimonials'])

  return (
    <article className="flex flex-col rounded-md border border-border bg-white p-6 transition-colors duration-150 hover:border-primary">
      <Quote size={28} className="mb-2 text-primary/40" aria-hidden="true" />
      <blockquote className="flex-1 text-base leading-relaxed text-text-primary italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      {testimonial.rating ? (
        <div className="mb-3 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }, (_, i) => (
            <Star key={i} size={16} className="text-amber-500" fill="currentColor" aria-hidden="true" />
          ))}
        </div>
      ) : null}
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
          {testimonial.nameUrl ? (
            <a
              href={testimonial.nameUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm font-semibold text-text-primary hover:underline"
            >
              {testimonial.name}
            </a>
          ) : (
            <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
          )}
          <p className="text-xs text-text-muted">{testimonial.role}</p>
        </div>
        {testimonial.source && testimonial.sourceUrl ? (
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noreferrer nofollow"
            className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <ExternalLink size={12} aria-hidden="true" />
            {t('testimonials.sourceOn', { source: testimonial.source })}
          </a>
        ) : null}
      </footer>
    </article>
  )
}
