import { isHeaderCell } from '@/utils/cell/cellUtils'
import { DEFAULT_CAPTION_TEXT_COLOR } from '@/config/colors/colorsConfig'
import type { CellData } from '@/types/table/cell.types'
import type { MergeRange } from '@/utils/mergeUtils/mergeUtils.types'
import { EXCEL_HTML_HEAD, EXCEL_HTML_TAIL } from './templates/htmlTemplates'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
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
      const isHeader = isHeaderCell(headerStyle as import('@/types/table').HeaderStyle, r, c, effectiveColSpan)
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

      const isHeader = isHeaderCell(headerStyle as import('@/types/table').HeaderStyle, r, c, effectiveColSpan)
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

  return `${EXCEL_HTML_HEAD}
${body}${EXCEL_HTML_TAIL}`
}
