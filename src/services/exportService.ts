import type { CellData, HeaderStyle, MergeRange } from '../types/table.types'
import type { ExportFormat, ExportOptions, ExportStrategy } from '../types/export.types'
import { siteConfig } from '../config/siteConfig'
import { isHeaderCell } from '../context/TableContext'

function downloadUrl(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
}

class PDFExporter implements ExportStrategy {
  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ])
    const canvas = await html2canvas(element, { backgroundColor: '#ffffff', scale: 3, useCORS: true })
    const image = canvas.toDataURL('image/png')
    const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait'
    const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const width = canvas.width * ratio
    const height = canvas.height * ratio
    pdf.addImage(image, 'PNG', (pageWidth - width) / 2, 32, width, Math.min(height, pageHeight - 64))
    pdf.save(`${options.filename ?? siteConfig.exportFileBaseName}.pdf`)
  }
}

class ImageExporter implements ExportStrategy {
  private readonly mime: 'image/png' | 'image/jpeg'

  constructor(mime: 'image/png' | 'image/jpeg') {
    this.mime = mime
  }

  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(element, { backgroundColor: '#ffffff', scale: 3, useCORS: true })
    const extension = this.mime === 'image/png' ? 'png' : 'jpeg'
    downloadUrl(
      canvas.toDataURL(this.mime, options.quality ?? 0.94),
      `${options.filename ?? siteConfig.exportFileBaseName}.${extension}`,
    )
  }
}

class CSVExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const payload = options as ExportOptions & {
      cells?: CellData[][]
      headerStyle?: HeaderStyle
    }
    const { unparse } = await import('papaparse')
    const values = (payload.cells ?? []).map((row) => row.map((cell) => cell.value))
    const csv = unparse(values)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    downloadUrl(URL.createObjectURL(blob), `${options.filename ?? siteConfig.exportFileBaseName}.csv`)
  }
}

class ExcelExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const payload = options as ExportOptions & {
      cells?: CellData[][]
      headerStyle?: HeaderStyle
      mergedRanges?: MergeRange[]
    }
    const { utils, writeFile } = await import('xlsx')
    const values = (payload.cells ?? []).map((row) => row.map((cell) => cell.value))
    const worksheet = utils.aoa_to_sheet(values)

    if (payload.mergedRanges?.length) {
      worksheet['!merges'] = payload.mergedRanges.map((range) => ({
        s: { r: range.startRow, c: range.startCol },
        e: { r: range.endRow, c: range.endCol },
      }))
    }

    if (payload.cells && payload.headerStyle) {
      payload.cells.forEach((row, rowIndex) => {
        row.forEach((_cell, colIndex) => {
          if (!isHeaderCell(payload.headerStyle!, rowIndex, colIndex)) return
          const address = utils.encode_cell({ r: rowIndex, c: colIndex })
          worksheet[address] = worksheet[address] ?? { v: '' }
        })
      })
    }

    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Structra')
    writeFile(workbook, `${options.filename ?? siteConfig.exportFileBaseName}.xlsx`)
  }
}

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
