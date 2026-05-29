import type { ImportResult, ImportStrategy } from '../import.types'
import { assertFileSize, detectCsvMerges, applyMergesToCells, normaliseRows, readError } from '../utils'

export class CsvImporter implements ImportStrategy {
  async importFile(file: File): Promise<ImportResult> {
    assertFileSize(file)
    const Papa = await import('papaparse')
    return new Promise((resolve, reject) => {
      Papa.default.parse<unknown[]>(file, {
        header: false,
        skipEmptyLines: true,
        complete: (parseResult) => {
          const rawRows = parseResult.data as string[][]
          if (rawRows.length === 0) {
            reject(new Error(readError()))
            return
          }

          let caption: string | undefined
          let dataStartIndex = 0

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
            reject(new Error(readError()))
            return
          }

          const headers = dataRows[0].map((v) => String(v ?? ''))
          const body = dataRows.slice(1).map((row) =>
            headers.map((_, c) => String(row[c] ?? ''))
          )

          const mergedRows = [headers, ...body]
          const result = normaliseRows(mergedRows)
          if (caption) result.caption = caption

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
        error: () => reject(new Error(readError())),
      })
    })
  }
}
