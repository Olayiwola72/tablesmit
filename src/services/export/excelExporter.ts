import type { ExportOptions, ExportStrategy } from '../../types/export.types'
import { siteConfig } from '../../config/siteConfig'
import { isHeaderCell } from '../../context/TableContext'

export class ExcelExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const { utils, writeFile } = await import('@e965/xlsx')
    const values = (options.cells ?? []).map((row) => row.map((cell) => cell.value))
    const worksheet = utils.aoa_to_sheet(values)

    if (options.mergedRanges?.length) {
      worksheet['!merges'] = options.mergedRanges.map((range) => ({
        s: { r: range.startRow, c: range.startCol },
        e: { r: range.endRow, c: range.endCol },
      }))
    }

    if (options.cells && options.headerStyle) {
      options.cells.forEach((row, rowIndex) => {
        row.forEach((_cell, colIndex) => {
          if (!isHeaderCell(options.headerStyle!, rowIndex, colIndex)) return
          const address = utils.encode_cell({ r: rowIndex, c: colIndex })
          worksheet[address] = worksheet[address] ?? { v: '' }
        })
      })
    }

    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, siteConfig.brand.name)
    writeFile(workbook, `${options.filename ?? siteConfig.exportFileBaseName}.xlsx`)
  }
}
