import type { ExportFormat } from '../../../../services/exportService/export.types'

export interface MobileExportDropdownProps {
  isExporting: boolean
  onExport: (format: ExportFormat) => void
}
