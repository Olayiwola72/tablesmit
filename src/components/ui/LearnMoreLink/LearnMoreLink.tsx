import type { ReactNode } from 'react'
import type { LearnMoreLinkProps } from './LearnMoreLink.types'


export function LearnMoreLink({ label }: LearnMoreLinkProps): ReactNode {
  return (
    <span className="text-sm font-medium text-primary">
      {label} &rarr;
    </span>
  )
}
