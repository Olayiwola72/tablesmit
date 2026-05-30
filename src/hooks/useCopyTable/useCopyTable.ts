import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../utils/toast/toast'
import { trackEvent } from '../../utils/analytics/analytics'
import { setCopyBuffer } from '../useClipboardPaste/useClipboardPaste'
import { fixTableBordersForExport } from '../../services/exportService/utils'
import { buildHtmlTable, buildExcelHtml } from '@/services/tableHtmlBuilder'
import type { CellData } from '@/types/table/cell.types'
import type { MergeRange } from '@/utils/mergeUtils/mergeUtils.types'

export function useCopyTable(
  cells: CellData[][],
  tableRef: React.RefObject<HTMLDivElement | null>,
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  mergedRanges?: MergeRange[],
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  theme?: string,
  borderStyle?: string,
  borderColor?: string,
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  captionItalic?: boolean,
) {
  const [isCopying, setIsCopying] = useState(false)
  const { t } = useTranslation(['common', 'table'])

  const showCopySuccess = useCallback((formatType: string): void => {
    toast.success(t('toast.copySuccess', { copyFormat: t(`format.${formatType}`) }))
  }, [t])

  const copyAsCsv = useCallback(async (): Promise<void> => {
    try {
      const lines = cells.map((row) =>
        row.map((cell) => {
          let value = cell.value
          if (/[,"\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`
          return value
        }).join(','),
      )
      const output = caption ? `# ${caption}\n${lines.join('\n')}` : lines.join('\n')
      await navigator.clipboard.writeText(output)
      trackEvent('table_copied', { method: 'csv' })
      showCopySuccess('csv')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, caption, t, showCopySuccess])

  const copyAsExcelData = useCallback(async (): Promise<void> => {
    try {
      const tsv = cells
        .map((row) => row.filter((c) => !c.isHidden).map((c) => c.value).join('\t'))
        .join('\n')
      setCopyBuffer({
        tsv,
        caption,
        styles: {
          cellColors,
          cellTextColors,
          cellTextAlign,
          mergedRanges,
          columnWidths,
          headerColor,
          headerStyle,
          contentColor,
          contentBgColor,
          theme,
          borderStyle,
          borderColor,
          captionTextColor,
          captionBgColor,
          captionAlignment,
          captionItalic,
        },
      })
      const html = buildExcelHtml(
        cells, caption, columnWidths, cellColors, cellTextAlign,
        headerColor, headerStyle, contentColor, contentBgColor, theme, borderStyle, borderColor,
        cellTextColors, mergedRanges, captionTextColor, captionBgColor, captionAlignment, captionItalic,
      )
      if (typeof ClipboardItem !== 'undefined' && typeof navigator.clipboard.write !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
          }),
        ])
      } else {
        const div = document.createElement('div')
        div.style.position = 'fixed'
        div.style.left = '-9999px'
        div.style.top = '0'
        div.innerHTML = html
        document.body.appendChild(div)
        const range = document.createRange()
        range.selectNodeContents(div)
        const selection = window.getSelection()
        if (selection) { selection.removeAllRanges(); selection.addRange(range) }
        const copied = document.execCommand('copy')
        selection?.removeAllRanges()
        document.body.removeChild(div)
        if (!copied) await navigator.clipboard.writeText(tsv)
      }
      trackEvent('table_copied', { method: 'excel' })
      toast.success(t('toast.copyData'))
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, caption, columnWidths, cellColors, cellTextColors, cellTextAlign, mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, theme, borderStyle, borderColor, captionItalic, captionAlignment, captionBgColor, captionTextColor, t])

  const copyAsMarkdown = useCallback(async (): Promise<void> => {
    try {
      if (cells.length === 0) return
      const colCount = cells[0]!.length
      const header = `| ${cells[0]!.map((_c, i) => ` C${i + 1} `).join('|')} |`
      const separator = `| ${Array.from({ length: colCount }, () => ' --- ').join('|')} |`
      const body = cells.map((row) =>
        `| ${row.map((cell) => ` ${cell.value || ' '} `).join('|')} |`,
      ).join('\n')
      const table = `${header}\n${separator}\n${body}`
      const output = caption ? `${caption}\n\n${table}` : table
      await navigator.clipboard.writeText(output)
      trackEvent('table_copied', { method: 'markdown' })
      showCopySuccess('markdown')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, caption, t, showCopySuccess])

  const copyAsImage = useCallback(async (): Promise<void> => {
    setIsCopying(true)
    try {
      const el = tableRef.current?.querySelector('table')
      if (!el) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc: Document): void => {
          fixTableBordersForExport(clonedDoc)
        },
      })
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      trackEvent('table_copied', { method: 'image' })
      showCopySuccess('image')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    } finally {
      setIsCopying(false)
    }
  }, [tableRef, t, showCopySuccess])

  const copyAsLatex = useCallback(async (headerStyle?: string): Promise<void> => {
    try {
      const { cellsToLatex } = await import('../../utils/latexUtils')
      const latex = cellsToLatex(cells, headerStyle, caption)
      await navigator.clipboard.writeText(latex)
      trackEvent('table_copied', { method: 'latex' })
      showCopySuccess('latex')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, caption, t, showCopySuccess])

  const copyAsHtml = useCallback(async (): Promise<void> => {
    try {
      const html = buildHtmlTable(
        cells, caption, columnWidths, cellColors, cellTextAlign,
        headerColor, headerStyle, contentColor, contentBgColor,
        borderStyle, borderColor,
        captionTextColor, captionBgColor, captionAlignment,
        cellTextColors, mergedRanges, captionItalic, theme,
      )
      if (typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([html], { type: 'text/plain' }),
          }),
        ])
      } else {
        await navigator.clipboard.writeText(html)
      }
      trackEvent('table_copied', { method: 'html' })
      showCopySuccess('html')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, caption, columnWidths, cellColors, cellTextColors, cellTextAlign, mergedRanges, headerColor, headerStyle, contentColor, contentBgColor, borderStyle, borderColor, captionTextColor, captionBgColor, captionAlignment, captionItalic, theme, t, showCopySuccess])

  return { copyAsCsv, copyAsExcelData, copyAsMarkdown, copyAsImage, copyAsLatex, copyAsHtml, isCopying }
}
