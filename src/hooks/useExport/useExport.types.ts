import type { ExportFormat } from '../../services/exportService/export.types'

export interface ExportApi {
  isExporting: boolean
  exportAs: (format: ExportFormat, element: HTMLElement | null, customFilename?: string, captionTextColor?: string, captionBgColor?: string, captionAlignment?: 'left' | 'center' | 'right') => Promise<void>
}
