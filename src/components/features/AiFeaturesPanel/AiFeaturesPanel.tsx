import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function AiFeaturesPanel(): ReactNode {
  const { brand, labels } = siteConfig

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <SectionLabel>{labels.aiFeatures}</SectionLabel>
        <Badge>{labels.comingSoon}</Badge>
      </div>
      <ul className="space-y-2 text-sm text-text-secondary">
        {labels.aiFeatureList.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Sparkles size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-text-muted">{labels.aiFeatureNote}</p>
      <Button variant="secondary" size="sm" className="mt-4 w-full" disabled>
        {labels.joinWaitlist}
      </Button>
      <a
        href={`mailto:${brand.contactEmail}?subject=Tablesmit%20AI%20waitlist`}
        className="sr-only"
      >
        Join waitlist via email
      </a>
    </section>
  )
}
