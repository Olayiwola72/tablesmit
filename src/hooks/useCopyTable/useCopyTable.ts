import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../utils/toast/toast'
import type { CellData } from '@/types/table'

export function useCopyTable(cells: CellData[][], tableRef: React.RefObject<HTMLDivElement | null>) {
  const { t } = useTranslation()

  const copyAsCsv = useCallback(async (): Promise<void> => {
    try {
      const lines = cells.map((row) =>
        row.map((cell) => {
          let value = cell.value
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
        .map((row) => row.filter((c) => !c.isHidden).map((c) => c.value).join('\t'))
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
      const header = `| ${cells[0]!.map((_c, i) => ` C${i + 1} `).join('|')} |`
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
      const el = tableRef.current?.querySelector('table')
      if (!el) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true })
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      toast.success(t('toast.copyImage'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [tableRef, t])

  const copyAsLatex = useCallback(async (headerStyle?: string): Promise<void> => {
    try {
      const { cellsToLatex } = await import('../../utils/latexUtils')
      const latex = cellsToLatex(cells, headerStyle)
      await navigator.clipboard.writeText(latex)
      toast.success(t('toast.copyLatex', 'Table copied as LaTeX.'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t])

  return { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsImage, copyAsLatex }
}
