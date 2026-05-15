import type { ExportFormat } from '../types/export.types'

export interface ExportDefinition {
  format: ExportFormat
  label: string
  extension: string
}

export const exportFormats: ExportDefinition[] = [
  { format: 'pdf', label: 'PDF', extension: 'pdf' },
  { format: 'png', label: 'PNG', extension: 'png' },
  { format: 'jpeg', label: 'JPEG', extension: 'jpeg' },
  { format: 'excel', label: 'Excel', extension: 'xlsx' },
  { format: 'csv', label: 'CSV', extension: 'csv' },
]
