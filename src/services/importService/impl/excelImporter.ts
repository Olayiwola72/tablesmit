import type { MergeRange } from '@/utils/mergeUtils/mergeUtils.types'
import type { ImportResult, ImportStrategy } from '../import.types'
import {
  argbToHex,
  assertFileSize,
  applyMergesToCells,
  getFillColor,
  normaliseRows,
  readError,
} from '../utils'
import { buildMergeKey } from '@/utils/mergeUtils/mergeUtils'

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

export class ExcelImporter implements ImportStrategy {
  async importFile(file: File): Promise<ImportResult> {
    assertFileSize(file)
    const MAX_XLSX_CELLS = 100_000
    try {
      const buffer = await file.arrayBuffer()
      const ExcelJS = await import('exceljs')
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(buffer)
      const worksheet = workbook.getWorksheet(1)
      if (!worksheet || !worksheet.dimensions) throw new Error(readError())

      const { top, left, bottom, right } = worksheet.dimensions
      const colCount = right - left + 1
      const cellCount = (bottom - top + 1) * colCount
      if (cellCount > MAX_XLSX_CELLS) throw new Error(readError())

      let hasCaption = false
      let captionValue: string | undefined
      if (colCount > 1) {
        const firstCell = worksheet.getCell(top, left)
        const firstVal = String(firstCell.value ?? '').trim()
        if (firstVal) {
          let firstRowNonEmpty = 0
          let secondRowNonEmpty = 0
          for (let col = left; col <= right; col++) {
            if (String(worksheet.getCell(top, col).value ?? '').trim()) firstRowNonEmpty++
            if (String(worksheet.getCell(top + 1, col).value ?? '').trim()) secondRowNonEmpty++
          }

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

          const hex = getFillColor(cell.fill)
          if (hex) {
            const dataRowIdx = rows.length
            cellColors[`R${dataRowIdx}C${col - left}`] = hex
          }

          if (rows.length > 0) {
            const fontArgb = cell.font?.color?.argb
            if (fontArgb) {
              const hex = argbToHex(fontArgb)
              if (!contentColor && hex !== '#000000') contentColor = hex
            }
          }

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

      if (worksheet.model.merges) {
        for (const merge of worksheet.model.merges) {
          const rangeStr = typeof merge === 'string' ? merge : (merge as { range: string }).range
          if (!rangeStr || !rangeStr.includes(':')) continue
          const parts = rangeStr.split(':')
          if (parts.length !== 2) continue
          try {
            const sr = parseExcelAddress(parts[0])
            const er = parseExcelAddress(parts[1])
            if (hasCaption && er.row <= top) continue
            const dataStartRow = hasCaption ? Math.max(sr.row, top + 1) : sr.row
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

      let trimmedColCount = colCount
      while (trimmedColCount > 1 &&
             rows.every(row => !String(row[0] ?? '').trim()) &&
             rows.some(row => row.slice(1).some(v => String(v ?? '').trim()))) {
        for (let r = 0; r < rows.length; r++) {
          rows[r] = rows[r].slice(1)
        }
        trimmedColCount--

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

        for (const range of mergeRanges) {
          if (range.startCol > 0) range.startCol--
          if (range.endCol > 0) range.endCol--
        }
      }
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
      throw new Error(readError())
    }
  }
}
