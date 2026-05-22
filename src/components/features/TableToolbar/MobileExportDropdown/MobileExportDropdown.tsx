import { ChevronDown, Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { exportFormats } from '../../../../config/export/exportConfig'
import { Button } from '../../../ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../ui/DropdownMenu/DropdownMenu'
import type { MobileExportDropdownProps } from './MobileExportDropdown.types'

export function MobileExportDropdown({ isExporting, onExport }: MobileExportDropdownProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" isLoading={isExporting}>
            <Download size={14} aria-hidden="true" /> {t('export.exportButton')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {exportFormats.map((item) => (
            <DropdownMenuItem key={item.format} onClick={() => onExport(item.format)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
