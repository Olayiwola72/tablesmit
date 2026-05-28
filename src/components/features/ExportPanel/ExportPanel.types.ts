import type { ExportFormat } from '../../../services/exportService/export.types'
import type { ExportQuality } from '../../../config/export/exportConfig.types'

export interface ExportPanelProps {
  onExport: (format: ExportFormat) => void
  exportingFormat: ExportFormat | null
  exportQuality: ExportQuality
  onExportQualityChange: (quality: ExportQuality) => void
}
