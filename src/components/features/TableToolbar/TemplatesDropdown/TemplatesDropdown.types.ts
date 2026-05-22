import type { PresetDefinition } from '../../../../config/ui.types'

export interface TemplatesDropdownProps {
  presets: PresetDefinition[]
  onApplyPreset: (preset: PresetDefinition) => void
}
