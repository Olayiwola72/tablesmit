import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { brand } from '../../../config/brand/brandConfig'
import { Badge } from '../../ui/Badge/Badge'
import { Button } from '../../ui/Button/Button'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'
import { toast } from '../../../utils/toast/toast'

export function AiFeaturesPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  const featureKeys = ['aiFeatures.generateFromText', 'aiFeatures.summarizeTable', 'aiFeatures.cleanData']

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <SectionLabel>{t('aiFeatures.heading')}</SectionLabel>
        <Badge>{t('aiFeatures.comingSoon')}</Badge>
      </div>
      <ul className="space-y-2 text-sm text-text-secondary">
        {featureKeys.map((key) => (
          <li key={key} className="flex items-center gap-2">
            <Sparkles size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
            {t(key)}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-text-muted">{t('aiFeatures.description')}</p>
      <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => toast.info(t('toast.aiWaitlist'))}>
        {t('aiFeatures.joinWaitlist')}
      </Button>
      <a
        href={`mailto:${brand.contactEmail}?subject=${brand.name}%20AI%20waitlist`}
        className="sr-only"
      >
        {t('aiFeatures.joinWaitlist')}
      </a>
    </section>
  )
}

export default AiFeaturesPanel
