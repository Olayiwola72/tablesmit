import type { ExportFormat } from '../../services/exportService/export.types'

export interface ExportApi {
  exportingFormat: ExportFormat | null
  exportAs: (format: ExportFormat, element: HTMLElement | null, customFilename?: string, captionTextColor?: string, captionBgColor?: string, captionAlignment?: 'left' | 'center' | 'right', captionItalic?: boolean) => Promise<void>
}
