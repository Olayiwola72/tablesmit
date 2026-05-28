import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from '../../utils/toast/toast'
import { trackEvent } from '../../utils/analytics/analytics'
import { setCopyBuffer } from '../useClipboardPaste/useClipboardPaste'
import { fixTableBordersForExport } from '../../services/exportService/utils'
import { DEFAULT_CAPTION_TEXT_COLOR } from '../../config/colors/colorsConfig'
import type { CellData, MergeRange } from '@/types/table'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function isHeaderCell(rowIdx: number, colIdx: number, headerStyle?: string, colSpan: number = 1): boolean {
  if (!headerStyle || headerStyle === 'none') return false
  if (headerStyle === 'first-row' && rowIdx === 0) return true
  if (headerStyle === 'first-column' && colIdx === 0 && colSpan === 1) return true
  if (headerStyle === 'both') return rowIdx === 0 || (colIdx === 0 && colSpan === 1)
  return false
}

function getMergeSpan(row: number, col: number, mergedRanges?: MergeRange[]): { colSpan: number; rowSpan: number } | null {
  if (!mergedRanges) return null
  for (const range of mergedRanges) {
    if (range.startRow === row && range.startCol === col) {
      return {
        colSpan: range.endCol - range.startCol + 1,
        rowSpan: range.endRow - range.startRow + 1,
      }
    }
  }
  return null
}

export function buildHtmlTable(
  cells: CellData[][],
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  borderStyle?: string,
  borderColor?: string,
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  cellTextColors?: Record<string, string>,
  mergedRanges?: MergeRange[],
  captionItalic?: boolean,
  theme?: string,
): string {
  const hdrBg = headerColor ?? '#1E40AF'
  const hdrFg = '#FFFFFF'
  const contFg = contentColor ?? '#111827'
  const gap = '6px 10px'
  const borderWidth = borderColor ? (borderStyle === 'double' ? 3 : 1) : 0
  const border = borderColor ? `${borderWidth}px ${borderStyle ?? 'solid'} ${borderColor}` : undefined

  const tableDataAttrs: string[] = []
  if (headerColor) tableDataAttrs.push(`data-header-color="${headerColor}"`)
  if (headerStyle) tableDataAttrs.push(`data-header-style="${headerStyle}"`)
  if (contentColor) tableDataAttrs.push(`data-content-color="${contentColor}"`)
  if (contentBgColor) tableDataAttrs.push(`data-content-bg-color="${contentBgColor}"`)
  if (theme) tableDataAttrs.push(`data-theme="${theme}"`)
  if (borderStyle) tableDataAttrs.push(`data-border-style="${borderStyle}"`)
  if (borderColor) tableDataAttrs.push(`data-border-color="${borderColor}"`)
  if (captionTextColor) tableDataAttrs.push(`data-caption-color="${captionTextColor}"`)
  if (captionBgColor) tableDataAttrs.push(`data-caption-bg="${captionBgColor}"`)
  if (captionAlignment) tableDataAttrs.push(`data-caption-align="${captionAlignment}"`)
  if (captionItalic) tableDataAttrs.push(`data-caption-italic="true"`)
  const tableAttrStr = tableDataAttrs.length > 0 ? ' ' + tableDataAttrs.join(' ') : ''

  let html = `<table style="border-collapse: collapse; font-family: Inter, Arial, sans-serif"${tableAttrStr}>\n`
  if (caption) {
    const capStyles: string[] = ['caption-side: top', 'margin-bottom: 6px', `color: ${captionTextColor ?? DEFAULT_CAPTION_TEXT_COLOR}`]
    if (captionItalic) capStyles.push('font-style: italic')
    if (captionBgColor) capStyles.push(`background: ${captionBgColor}`)
    if (captionAlignment && captionAlignment !== 'center') capStyles.push(`text-align: ${captionAlignment}`)
    html += `  <caption style="${capStyles.join('; ')}">${escapeHtml(caption)}</caption>\n`
  }

  for (let r = 0; r < cells.length; r++) {
    html += '  <tr>\n'
    for (let c = 0; c < cells[r].length; c++) {
      const cell = cells[r][c]
      if (!cell || cell.isHidden) continue
      const attrs: string[] = []
      const cellStyles: string[] = []
      const mergeSpan = getMergeSpan(r, c, mergedRanges)
      const effectiveColSpan = mergeSpan?.colSpan ?? cell.colSpan
      const effectiveRowSpan = mergeSpan?.rowSpan ?? cell.rowSpan
      if (effectiveColSpan > 1) attrs.push(`colspan="${effectiveColSpan}"`)
      if (effectiveRowSpan > 1) attrs.push(`rowspan="${effectiveRowSpan}"`)
      const isHeader = isHeaderCell(r, c, headerStyle, effectiveColSpan)
      const tag = isHeader ? 'th' : 'td'
      const w = columnWidths?.[c]
      if (w && w > 0) cellStyles.push(`width: ${w}px`)
      const bg = cellColors?.[cell.id]
      if (bg && bg !== '' && bg !== 'transparent') {
        cellStyles.push(`background-color: ${bg}`)
      } else if (isHeader) {
        cellStyles.push(`background-color: ${hdrBg}`)
      } else if (contentBgColor) {
        cellStyles.push(`background-color: ${contentBgColor}`)
      }
      const perCellColor = cellTextColors?.[cell.id]
      cellStyles.push(`color: ${perCellColor || (isHeader ? hdrFg : contFg)}`)
      if (isHeader) cellStyles.push('font-weight: 700')
      const align = cellTextAlign?.[cell.id]
      if (align && align !== 'left') cellStyles.push(`text-align: ${align}`)
      cellStyles.push(`padding: ${gap}`, 'font-size: 13px')
      if (border) cellStyles.push(`border: ${border}`)
      if (cellStyles.length > 0) attrs.push(`style="${cellStyles.join('; ')}"`)
      const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : ''
      html += `    <${tag}${attrStr}>${escapeHtml(cell.value)}</${tag}>\n`
    }
    html += '  </tr>\n'
  }
  html += '</table>'
  return html
}

export function buildExcelHtml(
  cells: CellData[][],
  caption?: string,
  columnWidths?: number[],
  cellColors?: Record<string, string>,
  cellTextAlign?: Record<string, string>,
  headerColor?: string,
  headerStyle?: string,
  contentColor?: string,
  contentBgColor?: string,
  theme?: string,
  borderStyle?: string,
  borderColor?: string,
  cellTextColors?: Record<string, string>,
  mergedRanges?: MergeRange[],
  captionTextColor?: string,
  captionBgColor?: string,
  captionAlignment?: string,
  captionItalic?: boolean,
): string {
  const borderWidth = borderColor ? (borderStyle === 'double' ? 3 : 1) : 0
  const border = borderColor ? `${borderWidth}px ${borderStyle ?? 'solid'} ${borderColor}` : undefined

  const hdrBg = headerColor ?? '#1E40AF'
  const hdrFg = '#FFFFFF'
  const contFg = contentColor ?? '#111827'
  const gap = 'padding: 6px 10px'
  const fsize = 'font-size: 13px'

  const colCount = Math.max(...cells.map(row => row.filter(c => !c.isHidden).length), 1)
  const bodyDataAttrs: string[] = []
  if (headerColor) bodyDataAttrs.push(`data-header-color="${headerColor}"`)
  if (headerStyle) bodyDataAttrs.push(`data-header-style="${headerStyle}"`)
  if (contentColor) bodyDataAttrs.push(`data-content-color="${contentColor}"`)
  if (contentBgColor) bodyDataAttrs.push(`data-content-bg-color="${contentBgColor}"`)
  if (theme) bodyDataAttrs.push(`data-theme="${theme}"`)
  if (borderStyle) bodyDataAttrs.push(`data-border-style="${borderStyle}"`)
  if (borderColor) bodyDataAttrs.push(`data-border-color="${borderColor}"`)
  if (caption && !bodyDataAttrs.some(a => a.startsWith('data-caption='))) bodyDataAttrs.push(`data-caption="${escapeHtml(caption)}"`)
  if (captionTextColor) bodyDataAttrs.push(`data-caption-color="${captionTextColor}"`)
  if (captionBgColor) bodyDataAttrs.push(`data-caption-bg="${captionBgColor}"`)
  if (captionAlignment) bodyDataAttrs.push(`data-caption-align="${captionAlignment}"`)
  if (captionItalic) bodyDataAttrs.push(`data-caption-italic="true"`)
  const bodyAttrStr = bodyDataAttrs.length > 0 ? ' ' + bodyDataAttrs.join(' ') : ''

  let body = ''
  body += `<table style="border-collapse: collapse; font-family: Inter, Arial, sans-serif"${bodyAttrStr}>\n`
  if (caption) {
    const capStyles: string[] = [
      `color: ${captionTextColor ?? DEFAULT_CAPTION_TEXT_COLOR}`,
      `mso-foregroundcolor: ${captionTextColor ?? DEFAULT_CAPTION_TEXT_COLOR}`,
      `background-color: ${captionBgColor ?? '#FFFFFF'}`,
      `mso-backgroundcolor: ${captionBgColor ?? '#FFFFFF'}`,
      'mso-pattern: auto none',
      'padding: 6px 10px',
      'font-size: 14px',
    ]
    if (captionItalic) capStyles.push('font-style: italic')
    if (captionAlignment === 'left') capStyles.push('text-align: left')
    else if (captionAlignment === 'right') capStyles.push('text-align: right')
    else capStyles.push('text-align: center')
    body += `  <tr data-caption-row="true">\n    <td colspan="${colCount}" style="${capStyles.join('; ')}">${escapeHtml(caption)}</td>\n  </tr>\n`
  }

  for (let r = 0; r < cells.length; r++) {
    body += '  <tr>\n'
    for (let c = 0; c < cells[r].length; c++) {
      const cell = cells[r][c]
      if (!cell || cell.isHidden) continue

      const cellStyles: string[] = []
      const attrs: string[] = []

      const mergeSpan = getMergeSpan(r, c, mergedRanges)
      const effectiveColSpan = mergeSpan?.colSpan ?? cell.colSpan
      const effectiveRowSpan = mergeSpan?.rowSpan ?? cell.rowSpan
      if (effectiveColSpan > 1) attrs.push(`colspan="${effectiveColSpan}"`)
      if (effectiveRowSpan > 1) attrs.push(`rowspan="${effectiveRowSpan}"`)

      const isHeader = isHeaderCell(r, c, headerStyle, effectiveColSpan)
      const tag = isHeader ? 'th' : 'td'

      const w = columnWidths?.[c]
      if (w && w > 0) cellStyles.push(`width: ${w}px`)

      const bg = cellColors?.[cell.id]
      if (bg && bg !== '' && bg !== 'transparent') {
        cellStyles.push(`background-color: ${bg}; mso-backgroundcolor: ${bg}; mso-pattern: auto none`)
      } else if (isHeader) {
        cellStyles.push(`background-color: ${hdrBg}; mso-backgroundcolor: ${hdrBg}; mso-pattern: auto none`)
      } else if (contentBgColor) {
        cellStyles.push(`background-color: ${contentBgColor}; mso-backgroundcolor: ${contentBgColor}; mso-pattern: auto none`)
      }

      const perCellColor = cellTextColors?.[cell.id]
      cellStyles.push(`color: ${perCellColor || (isHeader ? hdrFg : contFg)}`)

      if (isHeader) cellStyles.push('font-weight: 700')

      const align = cellTextAlign?.[cell.id] ?? (isHeader && !cellTextAlign?.[cell.id] ? 'center' : undefined)
      if (align && align !== 'left') cellStyles.push(`text-align: ${align}`)

      cellStyles.push(gap, fsize)

      if (border) cellStyles.push(`border: ${border}; mso-border-alt: ${border}`)

      if (cellStyles.length > 0) attrs.push(`style="${cellStyles.join('; ')}"`)

      const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : ''
      body += `    <${tag}${attrStr}>${escapeHtml(cell.value)}</${tag}>\n`
    }
    body += '  </tr>\n'
  }
  body += '</table>\n'

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>
<x:ExcelWorksheet><x:Name>Sheet1</x:Name></x:ExcelWorksheet>
</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
</head>
<body>
<!--StartFragment-->
${body}<!--EndFragment-->
</body>
</html>`
}

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
      const latex = cellsToLatex(cells, headerStyle)
      await navigator.clipboard.writeText(latex)
      trackEvent('table_copied', { method: 'latex' })
      showCopySuccess('latex')
    } catch {
      toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.'))
    }
  }, [cells, t, showCopySuccess])

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
