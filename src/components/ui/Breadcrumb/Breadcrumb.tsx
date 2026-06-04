import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { BreadcrumbProps } from './Breadcrumb.types'

export function Breadcrumb({ segments }: BreadcrumbProps): ReactNode {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          return (
            <li key={segment.to ?? segment.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-text-muted" aria-hidden="true">›</span>
              )}
              {segment.to && !isLast ? (
                <Link
                  to={segment.to}
                  className="transition-colors hover:text-primary"
                >
                  {segment.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-text-primary font-medium' : ''}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {segment.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
