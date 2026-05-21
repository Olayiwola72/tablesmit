import type { ExportFormat, ExportOptions, ExportStrategy } from './export.types'
import { PDFExporter } from './impl/pdfExporter'
import { ImageExporter } from './impl/imageExporter'
import { CSVExporter } from './impl/csvExporter'
import { ExcelExporter } from './impl/excelExporter'
import { LatexExporter } from './impl/latexExporter'

const strategies: Record<ExportFormat, ExportStrategy> = {
  pdf: new PDFExporter(),
  png: new ImageExporter('image/png'),
  jpeg: new ImageExporter('image/jpeg'),
  excel: new ExcelExporter(),
  csv: new CSVExporter(),
  latex: new LatexExporter(),
}

export async function exportTable(element: HTMLElement, options: ExportOptions): Promise<void> {
  await strategies[options.format].export(element, options)
}
