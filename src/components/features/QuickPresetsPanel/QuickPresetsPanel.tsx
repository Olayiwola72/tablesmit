import type { ReactNode } from 'react'
import { presets } from '../../../config/presets'
import { useTableContext } from '../../../context/TableContext'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function QuickPresetsPanel(): ReactNode {
  const { applyPreset } = useTableContext()
  return (
    <section>
      <SectionLabel>Templates</SectionLabel>
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
