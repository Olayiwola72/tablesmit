import type { PresetDefinition } from '@/types/table'

export interface TemplatesDropdownProps {
  presets: PresetDefinition[]
  onApplyPreset: (preset: PresetDefinition) => void
}
