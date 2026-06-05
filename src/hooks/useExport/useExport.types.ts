import type { CellData } from '../../types/table/cell.types'
import type { ExportFormat } from '../../services/exportService/export.types'
import type { ExportQuality } from '../../config/export/exportConfig.types'

export interface ExportApi {
  exportingFormat: ExportFormat | null
  exportQuality: ExportQuality
  setExportQuality: (quality: ExportQuality) => void
  exportAs: (format: ExportFormat, element: HTMLElement | null, customFilename?: string, captionTextColor?: string, captionBgColor?: string, captionAlignment?: 'left' | 'center' | 'right', captionItalic?: boolean, cellsOverride?: CellData[][]) => Promise<void>
}
