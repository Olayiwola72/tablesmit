import type { ExportDefinition, ExportQuality, ExportQualityPreset } from '../export/exportConfig.types'

export const exportFileBaseName = 'tablesmit-table'

export const exportFormats: ExportDefinition[] = [
  { format: 'pdf', label: 'PDF', extension: 'pdf' },
  { format: 'png', label: 'PNG', extension: 'png' },
  { format: 'jpeg', label: 'JPEG', extension: 'jpeg' },
  { format: 'excel', label: 'Excel', extension: 'xlsx' },
  { format: 'csv', label: 'CSV', extension: 'csv' },
  { format: 'latex', label: 'LaTeX', extension: 'tex' },
]

export const EXPORT_QUALITY_PRESETS: Record<ExportQuality, ExportQualityPreset> = {
  normal: {
    quality: 'normal',
    label: 'Normal',
    scale: 1,
    jpegQuality: 0.8,
    default: false,
  },
  high: {
    quality: 'high',
    label: 'High',
    scale: 2,
    jpegQuality: 0.92,
    default: true,
  },
}

export const defaultExportQuality: ExportQuality = Object.values(EXPORT_QUALITY_PRESETS).find((p) => p.default)!.quality
