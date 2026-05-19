import type { ExportFormat, ExportOptions, ExportStrategy } from '../../types/export.types'
import { PDFExporter } from './pdfExporter'
import { ImageExporter } from './imageExporter'
import { CSVExporter } from './csvExporter'
import { ExcelExporter } from './excelExporter'

const strategies: Record<ExportFormat, ExportStrategy> = {
  pdf: new PDFExporter(),
  png: new ImageExporter('image/png'),
  jpeg: new ImageExporter('image/jpeg'),
  excel: new ExcelExporter(),
  csv: new CSVExporter(),
}

export async function exportTable(element: HTMLElement, options: ExportOptions): Promise<void> {
  await strategies[options.format].export(element, options)
}
