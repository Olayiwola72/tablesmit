import { siteConfig } from '../../config/siteConfig'
import { MAX_COLS, MAX_IMPORT_FILE_SIZE, MAX_ROWS } from '../../config/table/tableDefaults'
import type { ImportResult } from './importService.types'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'

const FILE_TOO_LARGE = siteConfig.messages.importTooLarge
const READ_ERROR = siteConfig.messages.importParseError

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
    const cellCount = (bottom - top + 1) * (right - left + 1)
    if (cellCount > MAX_XLSX_CELLS) throw new Error(READ_ERROR)

    const rows: unknown[][] = []
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      const rowValues: unknown[] = []
      for (let col = left; col <= right; col++) {
        rowValues.push(row.getCell(col).value ?? '')
      }
      rows.push(rowValues)
    })
    return normaliseRows(rows)
  } catch {
    throw new Error(READ_ERROR)
  }
}
