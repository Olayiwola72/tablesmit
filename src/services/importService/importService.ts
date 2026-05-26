import { siteConfig } from '../../config/siteConfig'
import { MAX_COLS, MAX_IMPORT_FILE_SIZE, MAX_ROWS } from '../../config/table/tableDefaults'
import type { ImportResult } from './importService.types'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'
import type { CellData, MergeRange } from '../../types/table'
import { buildMergeKey } from '../../utils/mergeUtils/mergeUtils'

const FILE_TOO_LARGE = siteConfig.messages.importTooLarge
const READ_ERROR = siteConfig.messages.importParseError

export function argbToHex(argb: string): string {
  const hex = argb.replace('#', '')
  return hex.length === 8 ? `#${hex.slice(2)}` : `#${hex}`
}

function excelColToNum(colStr: string): number {
  let num = 0
  for (let i = 0; i < colStr.length; i++) {
    num = num * 26 + (colStr.charCodeAt(i) - 64)
  }
  return num
}

function parseExcelAddress(ref: string): { row: number; col: number } {
  const match = ref.match(/^([A-Z]+)(\d+)$/)
  if (!match) throw new Error(`Invalid Excel reference: ${ref}`)
  return {
    col: excelColToNum(match[1]),
    row: parseInt(match[2], 10),
  }
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

function normaliseRows(rows: unknown[][], minRows = 1, minCols = 1): ImportResult {
  const stringRows = rows
    .map((row) => row.map((value) => String(value ?? '')))
    .filter((row) => row.some((value) => value.trim()))
  const rawRowCount = Math.max(stringRows.length, minRows)
  const rawColCount = Math.max(...stringRows.map((row) => row.length), minCols)

  const rowCount = Math.min(rawRowCount, MAX_ROWS)
  const colCount = Math.min(rawColCount, MAX_COLS)

  return {
    rows: rowCount,
    cols: colCount,
    cells: normalizeTableData(stringRows, rowCount, colCount),
  }
}

function detectCsvMerges(
  rows: string[][],
  rowCount: number,
  colCount: number,
): MergeRange[] {
  const mergedRanges: MergeRange[] = []

  // Vertical merges: scan each column (skip header row 0 — header labels
  // should not merge with empty data cells below them).
  // Empty cells are merged with the nearest non-empty cell above.
  for (let c = 0; c < colCount; c++) {
    let anchorRow = -1
    for (let r = 1; r < rowCount; r++) {
      const val = (rows[r]?.[c] ?? '').trim()
      if (val === '') {
        if (anchorRow >= 0) {
          // extend merge — will close when we hit a non-empty cell or end of column
        }
      } else {
        if (anchorRow >= 0 && r - 1 > anchorRow) {
          mergedRanges.push({
            key: buildMergeKey(anchorRow, c, r - 1, c),
            startRow: anchorRow,
            startCol: c,
            endRow: r - 1,
            endCol: c,
          })
        }
        anchorRow = r
      }
    }
    if (anchorRow >= 0 && rowCount - 1 > anchorRow) {
      mergedRanges.push({
        key: buildMergeKey(anchorRow, c, rowCount - 1, c),
        startRow: anchorRow,
        startCol: c,
        endRow: rowCount - 1,
        endCol: c,
      })
    }
  }

  // Horizontal merges: scan each row
  for (let r = 0; r < rowCount; r++) {
    let mergeStart = 0
    for (let c = 1; c < colCount; c++) {
      const prevVal = (rows[r]?.[mergeStart] ?? '').trim()
      const curVal = (rows[r]?.[c] ?? '').trim()
      if (curVal !== '' && curVal === prevVal) {
        // continue merge
      } else {
        if (c - 1 > mergeStart) {
          mergedRanges.push({
            key: buildMergeKey(r, mergeStart, r, c - 1),
            startRow: r,
            startCol: mergeStart,
            endRow: r,
            endCol: c - 1,
          })
        }
        mergeStart = c
      }
    }
    if (colCount - 1 > mergeStart) {
      mergedRanges.push({
        key: buildMergeKey(r, mergeStart, r, colCount - 1),
        startRow: r,
        startCol: mergeStart,
        endRow: r,
        endCol: colCount - 1,
      })
    }
  }

  return mergedRanges
}

function applyMergesToCells(
  cells: CellData[][],
  mergedRanges: MergeRange[],
): void {
  for (const range of mergedRanges) {
    const anchor = cells[range.startRow]?.[range.startCol]
    if (!anchor) continue
    anchor.isMerged = true
    anchor.rowSpan = range.endRow - range.startRow + 1
    anchor.colSpan = range.endCol - range.startCol + 1
    for (let r = range.startRow; r <= range.endRow; r++) {
      for (let c = range.startCol; c <= range.endCol; c++) {
        if (r === range.startRow && c === range.startCol) continue
        const cell = cells[r]?.[c]
        if (cell) {
          cell.isHidden = true
          cell.value = ''
        }
      }
    }
  }
}

export async function importCsv(file: File): Promise<ImportResult> {
  assertFileSize(file)
  const Papa = await import('papaparse')
  return new Promise((resolve, reject) => {
    Papa.default.parse<unknown[]>(file, {
      header: false,
      skipEmptyLines: true,
      complete: (parseResult) => {
        const rawRows = parseResult.data as string[][]
        if (rawRows.length === 0) {
          reject(new Error(READ_ERROR))
          return
        }

        let caption: string | undefined
        let dataStartIndex = 0

        // Detect caption row: first row has a single non-empty value while the
        // next row has more (caption + header), or every non-empty cell has the
        // same value (merged-caption exported from Excel).
        const firstRow = rawRows[0]
        const secondRow = rawRows[1]
        const nonEmptyFirst = firstRow.filter((v) => v?.trim())
        const nonEmptySecond = secondRow?.filter((v) => v?.trim()) ?? []

        const isCaption =
          (nonEmptyFirst.length === 1 && nonEmptySecond.length > 1) ||
          (nonEmptyFirst.length > 1 && nonEmptyFirst.every((v) => v === nonEmptyFirst[0]))

        if (isCaption) {
          caption = String(nonEmptyFirst[0] ?? '').trim()
          dataStartIndex = 1
        }

        const dataRows = rawRows.slice(dataStartIndex)
        if (dataRows.length === 0) {
          reject(new Error(READ_ERROR))
          return
        }

        const headers = dataRows[0].map((v) => String(v ?? ''))
        const body = dataRows.slice(1).map((row) =>
          headers.map((_, c) => String(row[c] ?? ''))
        )

        const mergedRows = [headers, ...body]
        const result = normaliseRows(mergedRows)
        if (caption) result.caption = caption

        // Detect and apply merged cells from the already-filtered rows
        if (result.rows > 0 && result.cols > 0) {
          const filteredRows = mergedRows
            .map((r) => r.map((v) => String(v ?? '')))
            .filter((r) => r.some((v) => v.trim()))
            .slice(0, result.rows)
            .map((r) => {
              if (r.length < result.cols) return [...r, ...Array(result.cols - r.length).fill('')]
              return r.slice(0, result.cols)
            })
          const mergedRanges = detectCsvMerges(filteredRows, result.rows, result.cols)
          if (mergedRanges.length > 0) {
            applyMergesToCells(result.cells, mergedRanges)
            result.mergedRanges = mergedRanges
          }
        }

        resolve(result)
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

    // Detect caption: first row with a single non-empty value while the
    // next row has more (merged caption), or every non-empty cell has the
    // same value (non-merged caption exported from Excel).
    let hasCaption = false
    let captionValue: string | undefined
    if (colCount > 1) {
      const firstCell = worksheet.getCell(top, left)
      const firstVal = String(firstCell.value ?? '').trim()
      if (firstVal) {
        // Count non-empty cells in first and second row
        let firstRowNonEmpty = 0
        let secondRowNonEmpty = 0
        for (let col = left; col <= right; col++) {
          if (String(worksheet.getCell(top, col).value ?? '').trim()) firstRowNonEmpty++
          if (String(worksheet.getCell(top + 1, col).value ?? '').trim()) secondRowNonEmpty++
        }

        // Check if all non-empty cells in first row have the same value
        let allSame = true
        for (let col = left + 1; col <= right; col++) {
          if (String(worksheet.getCell(top, col).value ?? '').trim() !== firstVal) {
            allSame = false
            break
          }
        }

        const isCaption =
          (firstRowNonEmpty === 1 && secondRowNonEmpty > 1) ||
          (firstRowNonEmpty > 1 && allSame)

        if (isCaption) {
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
    let captionTextColor: string | undefined
    let captionBgColor: string | undefined
    let captionItalic: boolean | undefined
    let captionAlignment: string | undefined
    const cellColors: Record<string, string> = {}
    const mergeRanges: MergeRange[] = []

    worksheet.eachRow({ includeEmpty: true }, (row, rowIdx) => {
      if (hasCaption && rowIdx === top) {
        // Caption row — capture styling before skipping
        const capCell = row.getCell(left)
        const capFill = getFillColor(capCell.fill)
        if (capFill) captionBgColor = capFill
        const capFontArgb = capCell.font?.color?.argb
        if (capFontArgb) captionTextColor = argbToHex(capFontArgb)
        if (capCell.font?.italic) captionItalic = true
        if (capCell.alignment?.horizontal) {
          const h = capCell.alignment.horizontal
          if (h === 'left' || h === 'center' || h === 'right') captionAlignment = h
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

    // Read worksheet merge ranges and convert to data-space coordinates
    if (worksheet.model.merges) {
      for (const merge of worksheet.model.merges) {
        const rangeStr = typeof merge === 'string' ? merge : (merge as { range: string }).range
        if (!rangeStr || !rangeStr.includes(':')) continue
        const parts = rangeStr.split(':')
        if (parts.length !== 2) continue
        try {
          const sr = parseExcelAddress(parts[0])
          const er = parseExcelAddress(parts[1])
          // Skip merges entirely within the caption row
          if (hasCaption && er.row <= top) continue
          // Clamp merge to data rows (skip caption portion if merge spans caption + data)
          const dataStartRow = hasCaption ? Math.max(sr.row, top + 1) : sr.row
          // Convert to data-space: row offset = top + (caption ? 1 : 0), col offset = left
          const dr0 = dataStartRow - top - (hasCaption ? 1 : 0)
          const dr1 = er.row - top - (hasCaption ? 1 : 0)
          const dc0 = sr.col - left
          const dc1 = er.col - left
          if (dr0 <= dr1 && dc0 <= dc1) {
            mergeRanges.push({
              key: buildMergeKey(dr0, dc0, dr1, dc1),
              startRow: dr0,
              startCol: dc0,
              endRow: dr1,
              endCol: dc1,
            })
          }
        } catch {
          // Ignore unparseable merge ranges
        }
      }
    }

    // Trim empty leading columns — accounts for Column A being empty
    // below a merged title row that spans the full width
    // Only trim if at least one row has content in a later column
    let trimmedColCount = colCount
    while (trimmedColCount > 1 &&
           rows.every(row => !String(row[0] ?? '').trim()) &&
           rows.some(row => row.slice(1).some(v => String(v ?? '').trim()))) {
      for (let r = 0; r < rows.length; r++) {
        rows[r] = rows[r].slice(1)
      }
      trimmedColCount--

      // Rebase cellColors keys
      const shifted: Record<string, string> = {}
      for (const [key, color] of Object.entries(cellColors)) {
        const match = key.match(/^R(\d+)C(\d+)$/)
        if (match) {
          const col = parseInt(match[2], 10)
          if (col > 0) shifted[`R${match[1]}C${col - 1}`] = color
        } else {
          shifted[key] = color
        }
      }
      Object.keys(cellColors).forEach(k => delete cellColors[k])
      Object.assign(cellColors, shifted)

      // Shift merge range column indices to account for trimmed column
      for (const range of mergeRanges) {
        if (range.startCol > 0) range.startCol--
        if (range.endCol > 0) range.endCol--
      }
    }
    // Remove merge ranges that collapsed past their start after trimming
    for (let i = mergeRanges.length - 1; i >= 0; i--) {
      const r = mergeRanges[i]
      if (r.endCol < r.startCol || r.endRow < r.startRow) mergeRanges.splice(i, 1)
    }

    const actualRows = hasCaption ? bottom - top : bottom - top + 1
    const result = normaliseRows(rows, actualRows, trimmedColCount)
    if (captionValue) result.caption = captionValue
    if (captionTextColor) result.captionTextColor = captionTextColor
    if (captionBgColor) result.captionBgColor = captionBgColor
    if (captionItalic) result.captionItalic = captionItalic
    if (captionAlignment) result.captionAlignment = captionAlignment
    if (firstRowFill) {
      result.headerColor = firstRowFill
      result.headerStyle = 'first-row'
    }
    if (borderColor) result.borderColor = borderColor
    if (contentColor) result.contentColor = contentColor
    if (Object.keys(cellColors).length > 0) result.cellColors = cellColors
    if (mergeRanges.length > 0) {
      applyMergesToCells(result.cells, mergeRanges)
      result.mergedRanges = mergeRanges
    }
    return result
  } catch {
    throw new Error(READ_ERROR)
  }
}
