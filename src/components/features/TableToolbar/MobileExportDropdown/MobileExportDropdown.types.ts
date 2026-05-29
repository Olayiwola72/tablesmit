import type { ExportFormat } from '@/services/exportService/export.types'

export interface MobileExportDropdownProps {
  isExporting: boolean
  onExport: (format: ExportFormat, el?: HTMLElement | null) => void
  tableRef: React.RefObject<HTMLDivElement | null>
}
