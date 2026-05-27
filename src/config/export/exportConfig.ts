import type { ExportDefinition } from '../export/exportConfig.types'

export const exportFileBaseName = 'tablesmit-table'

export const exportFormats: ExportDefinition[] = [
  { format: 'pdf', label: 'PDF', extension: 'pdf' },
  { format: 'png', label: 'PNG', extension: 'png' },
  { format: 'jpeg', label: 'JPEG', extension: 'jpeg' },
  { format: 'excel', label: 'Excel', extension: 'xlsx' },
  { format: 'csv', label: 'CSV', extension: 'csv' },
  { format: 'latex', label: 'LaTeX', extension: 'tex' },
]
