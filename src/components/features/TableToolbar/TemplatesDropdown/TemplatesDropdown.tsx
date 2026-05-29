import { ChevronDown, LayoutTemplate } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { TemplatesDropdownProps } from './TemplatesDropdown.types'
import { Button } from '@/components/ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu/DropdownMenu'

export function TemplatesDropdown({ presets, onApplyPreset }: TemplatesDropdownProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <LayoutTemplate size={14} aria-hidden="true" /> {t('toolbar.templates')} <ChevronDown size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {presets.map((preset) => (
          <DropdownMenuItem key={preset.id} onClick={() => onApplyPreset(preset)}>
            {preset.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
