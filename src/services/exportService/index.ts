import type { ExportFormat, ExportOptions, ExportStrategy } from './export.types'

async function loadExporter(format: ExportFormat): Promise<ExportStrategy> {
  switch (format) {
    case 'pdf': {
      const { PDFExporter } = await import('./impl/pdfExporter')
      return new PDFExporter()
    }
    case 'png': {
      const { ImageExporter } = await import('./impl/imageExporter')
      return new ImageExporter('image/png')
    }
    case 'jpeg': {
      const { ImageExporter } = await import('./impl/imageExporter')
      return new ImageExporter('image/jpeg')
    }
    case 'excel': {
      const { ExcelExporter } = await import('./impl/excelExporter')
      return new ExcelExporter()
    }
    case 'csv': {
      const { CSVExporter } = await import('./impl/csvExporter')
      return new CSVExporter()
    }
    case 'latex': {
      const { LatexExporter } = await import('./impl/latexExporter')
      return new LatexExporter()
    }
  }
}

export async function exportTable(element: HTMLElement, options: ExportOptions): Promise<void> {
  const exporter = await loadExporter(options.format)
  await exporter.export(element, options)
}
