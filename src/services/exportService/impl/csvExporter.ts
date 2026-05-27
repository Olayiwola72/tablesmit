import type { CellData } from '../../../types/table'
import type { ExportOptions, ExportStrategy } from '../export.types'
import { exportFileBaseName } from '../../../config/export/exportConfig'
import { downloadUrl, filenameWithExtension, sanitizeSpreadsheetValue } from '../utils'

export class CSVExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const { unparse } = await import('papaparse')
    const caption = options.caption?.trim()
    const values = (options.cells ?? []).map((row) =>
      row.map((cell: CellData) => sanitizeSpreadsheetValue(cell.value)),
    )
    const csv = unparse(values)
    const blob = new Blob(
      caption ? [`${caption}\n${csv}`] : [csv],
      { type: 'text/csv;charset=utf-8;' },
    )
    downloadUrl(URL.createObjectURL(blob), filenameWithExtension(options.filename, exportFileBaseName, 'csv'))
  }
}
