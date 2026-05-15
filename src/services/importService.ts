import Papa from 'papaparse'
import { read, utils } from 'xlsx'
import { MAX_IMPORT_FILE_SIZE } from '../config/tableDefaults'
import type { ImportResult } from '../types/import.types'
import { normalizeTableData } from '../utils/tableUtils'

const FILE_TOO_LARGE = 'File too large. Maximum size is 5MB.'
const READ_ERROR = 'Could not read file. Check the format and try again.'

function assertFileSize(file: File): void {
  if (file.size > MAX_IMPORT_FILE_SIZE) {
    throw new Error(FILE_TOO_LARGE)
  }
}

function normaliseRows(rows: unknown[][]): ImportResult {
  const stringRows = rows
    .map((row) => row.map((value) => String(value ?? '')))
    .filter((row) => row.some((value) => value.trim()))
  const rowCount = Math.max(stringRows.length, 1)
  const colCount = Math.max(...stringRows.map((row) => row.length), 1)

  return {
    rows: rowCount,
    cols: colCount,
    cells: normalizeTableData(stringRows, rowCount, colCount),
  }
}

export async function importCsv(file: File): Promise<ImportResult> {
  assertFileSize(file)
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
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
  try {
    const buffer = await file.arrayBuffer()
    const workbook = read(buffer)
    const sheetName = workbook.SheetNames[0]
    const rows = utils.sheet_to_json<unknown[]>(workbook.Sheets[sheetName], { header: 1 })
    return normaliseRows(rows)
  } catch {
    throw new Error(READ_ERROR)
  }
}
