import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { usePresets } from '../../../config/presets'
import { useTableContext } from '../../../context/TableContext'
import { Button } from '../../ui/Button/Button'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

export function QuickPresetsPanel(): ReactNode {
  const { t } = useTranslation()
  const presets = usePresets()
  const { applyPreset } = useTableContext()
  return (
    <section>
      <SectionLabel>{t('panels.quickPresets')}</SectionLabel>
      <div className="grid gap-2">
        {presets.map((preset) => (
          <Button key={preset.id} variant="secondary" size="sm" onClick={() => applyPreset(preset)}>
            {preset.label}
          </Button>
        ))}
      </div>
    </section>
  )
}
