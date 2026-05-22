import { useCallback, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import type { CellData } from '../../types/table'
import { sanitizeSpreadsheetValue } from '../../services/exportService/utils'
import { toast } from '../../utils/toast/toast'

export function useCopyTable(cells: CellData[][], tableRef: RefObject<HTMLDivElement | null>) {
  const { t } = useTranslation()

  const copyAsCsv = useCallback(async (): Promise<void> => {
    try {
      const lines = cells.map((row) =>
        row.map((cell) => {
          let value = sanitizeSpreadsheetValue(cell.value)
          if (/[,"\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`
          return value
        }).join(','),
      )
      await navigator.clipboard.writeText(lines.join('\n'))
      toast.success(t('toast.copyCsv', 'Table data copied as CSV.'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsExcelData = useCallback(async (): Promise<void> => {
    try {
      const tsv = cells
        .map((row) => row.filter((cell) => !cell.isHidden).map((cell) => sanitizeSpreadsheetValue(cell.value)).join('\t'))
        .join('\n')
      await navigator.clipboard.writeText(tsv)
      toast.success(t('toast.copyData'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsMarkdown = useCallback(async (): Promise<void> => {
    try {
      if (cells.length === 0) return
      const colCount = cells[0]!.length
      const header = `| ${cells[0]!.map((_cell, index) => ` C${index + 1} `).join('|')} |`
      const separator = `| ${Array.from({ length: colCount }, () => ' --- ').join('|')} |`
      const body = cells.map((row) =>
        `| ${row.map((cell) => ` ${cell.value || ' '} `).join('|')} |`,
      ).join('\n')
      await navigator.clipboard.writeText(`${header}\n${separator}\n${body}`)
      toast.success(t('toast.copyMarkdown', 'Table copied as Markdown.'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  const copyAsImage = useCallback(async (): Promise<void> => {
    try {
      const element = tableRef.current?.querySelector('table')
      if (!element) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(element, { backgroundColor: '#ffffff', scale: 2, useCORS: true })
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      toast.success(t('toast.copyImage'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [tableRef, t])

  return { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsImage }
}
