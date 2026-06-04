import { ChevronDown, Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { MobileExportDropdownProps } from './MobileExportDropdown.types'
import { exportFormats } from '@/config/export/exportConfig'
import { Button } from '@/components/ui/Button/Button'
import { ToolbarSeparator } from '@/components/ui/ToolbarSeparator/ToolbarSeparator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu/DropdownMenu'
import type { ExportFormat } from '@/services/exportService/export.types'

export function MobileExportDropdown({ isExporting, onExport, tableRef }: MobileExportDropdownProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <div className="lg:hidden flex shrink-0 items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" isLoading={isExporting}>
            <Download size={14} aria-hidden="true" /> {t('export.exportButton')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {exportFormats.map((fmt) => (
            <DropdownMenuItem key={fmt.format} onClick={() => onExport(fmt.format as ExportFormat, tableRef.current)}>
              {fmt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToolbarSeparator />
    </div>
  )
}
