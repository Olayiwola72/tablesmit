import { siteConfig } from '../../config/siteConfig'
import { MAX_COLS, MAX_IMPORT_FILE_SIZE, MAX_ROWS } from '../../config/table/tableDefaults'
import type { ImportResult } from './importService.types'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'

const FILE_TOO_LARGE = siteConfig.messages.importTooLarge
const READ_ERROR = siteConfig.messages.importParseError

export function argbToHex(argb: string): string {
  const hex = argb.replace('#', '')
  return hex.length === 8 ? `#${hex.slice(2)}` : `#${hex}`
}

export function getFillColor(fill: unknown): string | undefined {
  if (!fill || typeof fill !== 'object') return undefined
  const f = fill as Record<string, unknown>
  if (f.type === 'pattern') {
    const fgColor = f.fgColor as Record<string, unknown> | undefined
    const argb = fgColor?.argb
    if (typeof argb === 'string' && argb) {
      return argbToHex(argb)
    }
  }
  if (f.type === 'gradient') {
    const stops = f.stops as Array<Record<string, unknown>> | undefined
    if (stops && stops.length > 0) {
      const color = stops[0].color as Record<string, unknown> | undefined
      const argb = color?.argb
      if (typeof argb === 'string' && argb) {
        return argbToHex(argb)
      }
    }
  }
  return undefined
}

function assertFileSize(file: File): void {
  if (file.size > MAX_IMPORT_FILE_SIZE) {
    throw new Error(FILE_TOO_LARGE)
  }
}

function normaliseRows(rows: unknown[][]): ImportResult {
  const stringRows = rows
    .map((row) => row.map((value) => String(value ?? '')))
    .filter((row) => row.some((value) => value.trim()))
  const rawRowCount = Math.max(stringRows.length, 1)
  const rawColCount = Math.max(...stringRows.map((row) => row.length), 1)

  const rowCount = Math.min(rawRowCount, MAX_ROWS)
  const colCount = Math.min(rawColCount, MAX_COLS)

  return {
    rows: rowCount,
    cols: colCount,
    cells: normalizeTableData(stringRows, rowCount, colCount),
  }
}

export async function importCsv(file: File): Promise<ImportResult> {
  assertFileSize(file)
  const Papa = await import('papaparse')
  return new Promise((resolve, reject) => {
    Papa.default.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length) {
          reject(new Error(READ_ERROR))
          return
        }
        const headers = result.meta.fields ?? []
        const rows = [headers, ...result.data.map((row) => headers.map((header) => row[header] ?? ''))]
        resolve(normaliseRows(rows))
      },
      error: () => reject(new Error(READ_ERROR)),
    })
  })
}

export async function importExcel(file: File): Promise<ImportResult> {
  assertFileSize(file)
  const MAX_XLSX_CELLS = 100_000
  try {
    const buffer = await file.arrayBuffer()
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(buffer)
    const worksheet = workbook.getWorksheet(1)
    if (!worksheet || !worksheet.dimensions) throw new Error(READ_ERROR)

    const { top, left, bottom, right } = worksheet.dimensions
    const colCount = right - left + 1
    const cellCount = (bottom - top + 1) * colCount
    if (cellCount > MAX_XLSX_CELLS) throw new Error(READ_ERROR)

    // Detect caption: first row has same value in every column (merged row)
    let hasCaption = false
    let captionValue: string | undefined
    if (colCount > 1) {
      const firstCell = worksheet.getCell(top, left)
      const firstVal = String(firstCell.value ?? '').trim()
      if (firstVal) {
        let allSame = true
        for (let col = left + 1; col <= right; col++) {
          if (String(worksheet.getCell(top, col).value ?? '').trim() !== firstVal) {
            allSame = false
            break
          }
        }
        if (allSame) {
          hasCaption = true
          captionValue = firstVal
        }
      }
    }

    // Extract cell values and styles
    const rows: unknown[][] = []
    let firstRowFill: string | undefined
    let borderColor: string | undefined
    let contentColor: string | undefined
    const cellColors: Record<string, string> = {}

    worksheet.eachRow({ includeEmpty: true }, (row, rowIdx) => {
      if (hasCaption && rowIdx === top) {
        for (let col = left; col <= right; col++) {
          const cell = row.getCell(col)
          const hex = getFillColor(cell.fill)
          if (hex && hex !== '#FFFFFF' && hex !== '#000000') {
            firstRowFill = hex
            break
          }
        }
        return
      }

      const rowValues: unknown[] = []
      for (let col = left; col <= right; col++) {
        const cell = row.getCell(col)
        rowValues.push(cell.value ?? '')

        // Fill color
        const hex = getFillColor(cell.fill)
        if (hex) {
          const dataRowIdx = rows.length
          cellColors[`R${dataRowIdx}C${col - left}`] = hex
        }

        // Font (text) color — skip header row to avoid white/light font color leaking
        if (rows.length > 0) {
          const fontArgb = cell.font?.color?.argb
          if (fontArgb) {
            const hex = argbToHex(fontArgb)
            if (!contentColor && hex !== '#000000') contentColor = hex
          }
        }

        // Border color (from first cell's top border)
        if (!borderColor && cell.border?.top?.color?.argb) {
          const hex = argbToHex(cell.border.top.color.argb)
          if (hex !== '#000000') borderColor = hex
        }
        if (!borderColor && cell.border?.bottom?.color?.argb) {
          const hex = argbToHex(cell.border.bottom.color.argb)
          if (hex !== '#000000') borderColor = hex
        }
        if (!borderColor && cell.border?.left?.color?.argb) {
          const hex = argbToHex(cell.border.left.color.argb)
          if (hex !== '#000000') borderColor = hex
        }
        if (!borderColor && cell.border?.right?.color?.argb) {
          const hex = argbToHex(cell.border.right.color.argb)
          if (hex !== '#000000') borderColor = hex
        }
      }

      // Detect header color from first data row
      if (rows.length === 0 && !firstRowFill) {
        for (let col = left; col <= right; col++) {
          const cell = row.getCell(col)
          const hex = getFillColor(cell.fill)
          if (hex && hex !== '#FFFFFF' && hex !== '#000000') {
            firstRowFill = hex
            break
          }
        }
      }

      rows.push(rowValues)
    })

    const result = normaliseRows(rows)
    if (captionValue) result.caption = captionValue
    if (firstRowFill) {
      result.headerColor = firstRowFill
      result.headerStyle = 'first-row'
    }
    if (borderColor) result.borderColor = borderColor
    if (contentColor) result.contentColor = contentColor
    if (Object.keys(cellColors).length > 0) result.cellColors = cellColors
    return result
  } catch {
    throw new Error(READ_ERROR)
  }
}
