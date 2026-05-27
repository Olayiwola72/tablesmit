import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ContentCardProps } from './ContentCard.types'
import { LearnMoreLink } from '../LearnMoreLink/LearnMoreLink'

export function ContentCard({
  linkTo,
  title,
  description,
  learnMoreLabel,
  featured,
  featuredLabel,
  date,
  metadata,
}: ContentCardProps): ReactNode {
  return (
    <Link
      to={linkTo}
      className="block rounded-md border border-border p-6 transition-colors duration-150 hover:border-primary"
    >
      {featured && featuredLabel && (
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {featuredLabel}
        </span>
      )}
      {date && <time className="text-xs text-text-muted">{date}</time>}
      <h2 className="mb-2 mt-2 text-xl font-semibold text-text-primary">
        {title}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="mb-3">
        <LearnMoreLink label={learnMoreLabel} />
      </div>
      {metadata && (
        <div className="flex items-center gap-3 text-xs text-text-muted">
          {metadata}
        </div>
      )}
    </Link>
  )
}
