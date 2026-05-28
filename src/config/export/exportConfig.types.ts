import type { ExportFormat } from '../../services/exportService/export.types'

export interface ExportDefinition {
  format: ExportFormat
  label: string
  extension: string
}

export type ExportQuality = 'normal' | 'high'

export interface ExportQualityPreset {
  quality: ExportQuality
  label: string
  scale: number
  jpegQuality: number
}
