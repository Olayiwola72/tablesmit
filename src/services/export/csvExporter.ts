import type { CellData } from '../../types/table.types'
import type { ExportOptions, ExportStrategy } from '../../types/export.types'
import { siteConfig } from '../../config/siteConfig'
import { downloadUrl } from './utils'

function sanitizeCsvValue(value: string): string {
  if (/^[=+\-@\t]/.test(value)) {
    return `'${value}`
  }
  return value
}

export class CSVExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const { unparse } = await import('papaparse')
    const values = (options.cells ?? []).map((row) =>
      row.map((cell: CellData) => sanitizeCsvValue(cell.value)),
    )
    const csv = unparse(values)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    downloadUrl(URL.createObjectURL(blob), `${options.filename ?? siteConfig.exportFileBaseName}.csv`)
  }
}
