import type { PresetDefinition } from '@/config/table/presets/presets.types'

export interface TemplatesDropdownProps {
  presets: PresetDefinition[]
  onApplyPreset: (preset: PresetDefinition) => void
}
