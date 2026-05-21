import type { ExportFormat } from '../../services/exportService/export.types'

export interface ExportDefinition {
  format: ExportFormat
  label: string
  extension: string
}
