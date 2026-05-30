import { MAX_COLS, MAX_ROWS } from '../../config/table/tableDefaults/tableDefaults'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'
import type { CellData } from '../../types/table/cell.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'
import type { CellsStyleMeta } from '../../context/TableReducer/TableReducer.types'
import type { PasteResult, PasteStyleMeta } from './clipboardParser.types'

let _copyBuffer: { tsv: string; caption?: string; styles: PasteStyleMeta } | null = null

export function setCopyBuffer(data: { tsv: string; caption?: string; styles: PasteStyleMeta }): void {
  _copyBuffer = data
}

export function clearCopyBuffer(): void {
  _copyBuffer = null
}

export function getCopyBuffer(): typeof _copyBuffer {
  return _copyBuffer
}

function rgbToHex(rgb: string): string {
  const m = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)
  if (!m) return rgb
  const r = Math.min(255, Math.max(0, parseInt(m[1]!, 10)))
  const g = Math.min(255, Math.max(0, parseInt(m[2]!, 10)))
  const b = Math.min(255, Math.max(0, parseInt(m[3]!, 10)))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export async function parseClipboardContent(
  text: string,
  html?: string | null,
): Promise<PasteResult | null> {
  let pastedRows: string[][] = []
  const cellColors: Record<string, string> = {}
  const cellTextColors: Record<string, string> = {}
  const cellTextAlign: Record<string, string> = {}
  const mergedRanges: MergeRange[] = []
  const columnWidths: number[] = []
  let hasStyles = false

  let caption: string | undefined
  let headerColor: string | undefined
  let headerStyle: string | undefined
  let contentColor: string | undefined
  let contentBgColor: string | undefined
  let theme: string | undefined
  let borderStyle: string | undefined
  let borderColor: string | undefined
  let captionTextColor: string | undefined
  let captionBgColor: string | undefined
  let captionAlignment: string | undefined
  let captionItalic: boolean | undefined

  // Check for LaTeX FIRST — prefer LaTeX parser over HTML when clipboard has LaTeX
  if (pastedRows.length === 0 && text && (text.includes('\\begin{tabular}') || text.includes('\\begin{table}'))) {
    const { parseLatexTabular } = await import('../../utils/latexUtils')
    const latexResult = parseLatexTabular(text)
    pastedRows = latexResult.rows
    if (latexResult.caption && !caption) caption = latexResult.caption
  }

  if (pastedRows.length === 0 && html) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const table = doc.querySelector('table')
    if (table) {
      const captionEl = table.querySelector('caption')
      const captionText = captionEl?.textContent?.trim()
      if (captionText) caption = captionText
      else caption = table.getAttribute('data-caption') ?? undefined

      if (captionEl) {
        const capStyle = (captionEl as HTMLElement).style
        if (capStyle.color) captionTextColor = rgbToHex(capStyle.color)
        if (capStyle.background) captionBgColor = rgbToHex(capStyle.background)
        if (capStyle.textAlign) captionAlignment = capStyle.textAlign
        if (capStyle.fontStyle === 'italic') captionItalic = true
      }
      if (table.getAttribute('data-caption-color')) captionTextColor = table.getAttribute('data-caption-color') ?? undefined
      if (table.getAttribute('data-caption-bg')) captionBgColor = table.getAttribute('data-caption-bg') ?? undefined
      if (table.getAttribute('data-caption-align')) captionAlignment = table.getAttribute('data-caption-align') ?? undefined
      if (table.getAttribute('data-caption-italic') === 'true') captionItalic = true

      headerColor = table.getAttribute('data-header-color') ?? undefined
      headerStyle = table.getAttribute('data-header-style') ?? undefined
      contentColor = table.getAttribute('data-content-color') ?? undefined
      contentBgColor = table.getAttribute('data-content-bg-color') ?? undefined
      theme = table.getAttribute('data-theme') ?? undefined
      borderStyle = table.getAttribute('data-border-style') ?? undefined
      borderColor = table.getAttribute('data-border-color') ?? undefined
      if (headerColor || headerStyle || contentColor || contentBgColor || theme || borderStyle || borderColor) {
        hasStyles = true
      }
      const occupied: boolean[][] = []
      let firstRowColSpan = 0

      const nonCaptionRows = Array.from(table.rows).filter(
        tr => tr.getAttribute('data-caption-row') !== 'true',
      )
      pastedRows = nonCaptionRows.map((tr, row) => {
        const cells: string[] = []
        if (!occupied[row]) occupied[row] = []

        let col = 0
        const children = Array.from(tr.children)

        for (const td of children) {
          while (occupied[row]?.[col]) col++

          let bg = (td as HTMLElement).style.backgroundColor
          if (!bg) bg = (td as HTMLElement).style.background
          const textColor = (td as HTMLElement).style.color
          const align = (td as HTMLElement).style.textAlign
          const colSpan = td.getAttribute('colspan')
          const rowSpan = td.getAttribute('rowspan')
          const w = (td as HTMLElement).style.width
          const bdr = (td as HTMLElement).style.border

          const spanCols = colSpan ? parseInt(colSpan, 10) : 1
          const spanRows = rowSpan ? parseInt(rowSpan, 10) : 1

          for (let sr = 0; sr < spanRows; sr++) {
            for (let sc = 0; sc < spanCols; sc++) {
              if (!occupied[row + sr]) occupied[row + sr] = []
              occupied[row + sr]![col + sc] = true
            }
          }

          if (row === 0) firstRowColSpan += spanCols

          const cellId = `R${row}C${col}`
          if (bg) {
            hasStyles = true
            cellColors[cellId] = rgbToHex(bg)
          }
          if (textColor) {
            hasStyles = true
            cellTextColors[cellId] = rgbToHex(textColor)
          }
          if (align) {
            hasStyles = true
            cellTextAlign[cellId] = align
          }
          if (w) {
            const parsed = parseInt(w, 10)
            if (!isNaN(parsed)) columnWidths[col] = parsed
          }
          if (bdr && !borderStyle && !borderColor) {
            const parsed = parseBorder(bdr)
            if (parsed) {
              borderStyle = parsed.borderStyle
              borderColor = parsed.borderColor
              hasStyles = true
            }
          }

          if (spanCols > 1 || spanRows > 1) {
            hasStyles = true
            const endRow = row + spanRows - 1
            const endCol = col + spanCols - 1
            if ((endCol !== col || endRow !== row) && row < MAX_ROWS && col < MAX_COLS) {
              mergedRanges.push({
                key: `R${row}C${col}:R${endRow}C${endCol}`,
                startRow: row, startCol: col, endRow, endCol,
              })
            }
          }

          for (let s = 0; s < spanCols; s++) {
            cells.push((td.textContent ?? '').trim())
          }
          col += spanCols
        }

        // Check for data-header-row
        const firstRowCells = firstRowColSpan > 0
        if (!headerColor && !headerStyle && firstRowCells && row === 0) {
          const hdrAttr = table.getAttribute('data-header-row')
          if (hdrAttr !== null) headerStyle = 'first-row'
        }

        return cells
      })

      // Shift cell IDs in styles/colors when pasted table has leading colspan
      if (firstRowColSpan > 0) {
        const row0Len = firstRowColSpan
        const normalRowLen = pastedRows[1]?.length ?? row0Len
        if (normalRowLen < row0Len) {
          const shiftKey = (key: string): string | null => {
            const m = key.match(/^R(\d+)C(\d+)$/)
            if (!m) return null
            if (m[1] === '0') return null
            return `R${parseInt(m[1]!, 10) - 1}C${m[2]}`
          }
          for (const map of [cellColors, cellTextColors, cellTextAlign]) {
            for (const key of Object.keys(map)) {
              const shifted = shiftKey(key)
              if (!shifted) {
                delete map[key]
              } else if (shifted !== key) {
                map[shifted] = map[key]!
                delete map[key]
              }
            }
          }
        }
      }
    }
  }

  if (pastedRows.length === 0 && text && text.includes('|')) {
    const { parseMarkdownTable } = await import('../../utils/markdownUtils/markdownToCells')
    const result = parseMarkdownTable(text)
    if (result) pastedRows = result
  }

  if (pastedRows.length === 0 && text) {
    const lines = text.split(/\r?\n/).filter(Boolean)
    const delim = lines.some((line) => line.includes('\t')) ? '\t' : ','
    if (delim === ',') {
      const { default: Papa } = await import('papaparse')
      const result = Papa.parse<unknown[]>(text, { header: false, skipEmptyLines: true })
      if (result.data.length > 0) {
        pastedRows = result.data.map((row) => (row as string[]).map((v) => v.trim()))
      }
    } else {
      pastedRows = lines.map((line) => line.split(delim).map((v) => v.trim()))
    }
    if (delim === ',' && pastedRows.every((r) => r.length === 1)) pastedRows = []
  }

  if (pastedRows.length > 1 && !caption) {
    const firstRow = pastedRows[0]!
    if (firstRow.length > 1) {
      const nonEmpty = firstRow.filter(v => v.trim())
      if (nonEmpty.length === 1) {
        caption = nonEmpty[0]!
        pastedRows = pastedRows.slice(1)
      }
    } else if (firstRow.length === 1) {
      const first = firstRow[0]!
      const match = first.match(/^#\s+(.+)/)
      if (match) {
        caption = match[1]!
        pastedRows = pastedRows.slice(1)
      } else if (pastedRows.length > 2) {
        caption = first
        pastedRows = pastedRows.slice(1)
      }
    }
  }

  if (pastedRows.length >= 1 && pastedRows[0]!.length >= 1) {
    const r = Math.min(pastedRows.length, MAX_ROWS)
    const c = Math.min(Math.max(...pastedRows.map((row) => row.length)), MAX_COLS)
    const trimmedRows = pastedRows.slice(0, r).map((row) => row.slice(0, c))
    const result: PasteResult = { rows: trimmedRows, rowCount: r, colCount: c, caption }
    const styles: PasteStyleMeta = {
      cellColors,
      cellTextColors,
      cellTextAlign,
      mergedRanges,
      columnWidths,
    }
    if (headerColor) styles.headerColor = headerColor
    if (headerStyle) styles.headerStyle = headerStyle
    if (contentColor) styles.contentColor = contentColor
    if (contentBgColor) styles.contentBgColor = contentBgColor
    if (theme) styles.theme = theme
    if (borderStyle) styles.borderStyle = borderStyle
    if (borderColor) styles.borderColor = borderColor
    if (captionTextColor) styles.captionTextColor = captionTextColor
    if (captionBgColor) styles.captionBgColor = captionBgColor
    if (captionAlignment) styles.captionAlignment = captionAlignment
    if (captionItalic) styles.captionItalic = captionItalic
    const hasCaptionStyles = !!(captionTextColor || captionBgColor || captionAlignment || captionItalic)
    if (hasStyles || hasCaptionStyles) {
      result.styles = styles
    }
    return result
  }

  return null
}

function parseBorder(border: string): { borderStyle?: string; borderColor?: string } | null {
  const m = border.match(/^(\d+)px\s+(none|solid|dotted|dashed|double)\s+(.+)$/)
  if (!m) return null
  return { borderStyle: m[2]!, borderColor: rgbToHex(m[3]!) }
}

export async function handlePasteData(
  text: string,
  html: string | null,
  setCells: (cells: CellData[][], mergedRanges?: MergeRange[], styles?: CellsStyleMeta) => void,
): Promise<PasteResult | null> {
  const result = await parseClipboardContent(text, html)
  if (!result) return null

  const buf = getCopyBuffer()
  if (buf && text === buf.tsv) {
    result.styles = { ...buf.styles, ...result.styles }
    if (buf.caption && !result.caption) result.caption = buf.caption
  }
  clearCopyBuffer()

  const cellData = normalizeTableData(result.rows, result.rowCount, result.colCount)
  const mergedRanges = result.styles?.mergedRanges
  const stylesMeta: CellsStyleMeta | undefined = result.styles || result.caption
    ? { ...result.styles, caption: result.caption } as CellsStyleMeta
    : undefined
  setCells(cellData, mergedRanges, stylesMeta)
  return result
}
