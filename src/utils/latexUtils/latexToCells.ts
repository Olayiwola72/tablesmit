import { LATEX_UNESCAPE_MAP } from '../../config/latex/latexConfig'
import type { MergeRange } from '../mergeUtils/mergeUtils.types'
import { buildMergeKey } from '../mergeUtils/mergeUtils'

export interface LatexParseResult {
  rows: string[][]
  caption?: string
}

export interface LatexParseResultWithMerges {
  rows: string[][]
  caption?: string
  mergedRanges: MergeRange[]
  cellColors?: Record<string, string>
  captionTextColor?: string
  captionBgColor?: string
  headerColor?: string
  rowColors?: Record<number, string>
  columnColors?: Record<number, string>
}

interface LatexColorInfo {
  caption?: string
  captionTextColor?: string
  captionBgColor?: string
  headerColor?: string
  rowColors?: Record<number, string>
  columnColors?: Record<number, string>
}

interface ActiveMultirow {
  col: number
  remaining: number
}

function cleanCellContent(s: string): string {
  return s.replace(/^\{|\}$/g, '').trim()
}

const multirowRe = /^\\multirow\s*\{(\d+)\}\s*\{[^}]*\}\s*\{(.*)\}\s*$/
const multicolumnRe = /^\\multicolumn\s*\{(\d+)\}\s*\{[^}]*\}\s*\{(.*)\}\s*$/

function extractBracedContent(text: string, openBraceIdx: number): string | null {
  if (text[openBraceIdx] !== '{') return null
  let depth = 1
  let i = openBraceIdx + 1
  while (i < text.length && depth > 0) {
    if (text[i] === '{') depth++
    else if (text[i] === '}') depth--
    if (depth > 0) i++
  }
  if (depth !== 0) return null
  return text.slice(openBraceIdx + 1, i)
}

function extractPreamble(text: string): string | null {
  const m = text.match(/\\begin\s*\{tabular\*?\}\s*/)
  if (!m) return null
  let pos = m.index! + m[0].length
  const firstContent = extractBracedContent(text, pos)
  if (firstContent === null) return null
  if (m[0].includes('*')) {
    pos += firstContent.length + 2
    while (pos < text.length && text[pos] === ' ') pos++
    const secondContent = extractBracedContent(text, pos)
    if (secondContent !== null) return secondContent
  }
  return firstContent
}

function countColumnTypes(preamble: string): number {
  let count = 0
  let i = 0
  while (i < preamble.length) {
    if (preamble[i] === '>' && preamble[i + 1] === '{') {
      const content = extractBracedContent(preamble, i + 1)
      if (content !== null) { i += 2 + content.length + 1; continue }
    }
    if (preamble[i] === '@' && preamble[i + 1] === '{') {
      const content = extractBracedContent(preamble, i + 1)
      if (content !== null) { i += 2 + content.length + 1; continue }
    }
    if (/^[clr]$/.test(preamble[i])) { count++; i++; continue }
    if (/^[pmb]$/.test(preamble[i]) && preamble[i + 1] === '{') {
      const content = extractBracedContent(preamble, i + 1)
      if (content !== null) { i += 2 + content.length + 1; count++; continue }
    }
    if (preamble[i] === '*' && preamble[i + 1] === '{') {
      const nContent = extractBracedContent(preamble, i + 1)
      if (nContent !== null) {
        const n = parseInt(nContent, 10) || 0
        if (n > 0) {
          let searchPos = i + 2 + nContent.length + 1
          while (searchPos < preamble.length && preamble[searchPos] === ' ') searchPos++
          if (preamble[searchPos] === '{') {
            const template = extractBracedContent(preamble, searchPos)
            if (template !== null) {
              count += n * countColumnTypes(template)
              i = searchPos + 2 + template.length + 1
              continue
            }
          }
        }
      }
    }
    i++
  }
  return count
}

function extractColumnColorsFromPreamble(preamble: string): Record<number, string> {
  const colors: Record<number, string> = {}
  let colIdx = 0
  let i = 0
  while (i < preamble.length) {
    if (preamble[i] === '>' && preamble[i + 1] === '{') {
      const blockContent = extractBracedContent(preamble, i + 1)
      if (blockContent !== null) {
        const ccMatch = blockContent.match(/\\columncolor\[HTML\]\s*\{([^}]*)\}/i)
        if (ccMatch) {
          colors[colIdx] = `#${ccMatch[1]!.replace(/^#/, '').toUpperCase()}`
        }
        i += 2 + blockContent.length + 1
        continue
      }
    }
    if (preamble[i] === '@' && preamble[i + 1] === '{') {
      const content = extractBracedContent(preamble, i + 1)
      if (content !== null) { i += 2 + content.length + 1; continue }
    }
    if (/^[clr]$/.test(preamble[i])) { colIdx++; i++; continue }
    if (/^[pmb]$/.test(preamble[i]) && preamble[i + 1] === '{') {
      const content = extractBracedContent(preamble, i + 1)
      if (content !== null) { i += 2 + content.length + 1; colIdx++; continue }
    }
    if (preamble[i] === '*' && preamble[i + 1] === '{') {
      const nContent = extractBracedContent(preamble, i + 1)
      if (nContent !== null) {
        const n = parseInt(nContent, 10) || 0
        if (n > 0) {
          let searchPos = i + 2 + nContent.length + 1
          while (searchPos < preamble.length && preamble[searchPos] === ' ') searchPos++
          if (preamble[searchPos] === '{') {
            const template = extractBracedContent(preamble, searchPos)
            if (template !== null) {
              const innerColors = extractColumnColorsFromPreamble(template)
              const innerCount = countColumnTypes(template)
              for (const [innerCol, color] of Object.entries(innerColors)) {
                for (let k = 0; k < n; k++) {
                  colors[colIdx + k * innerCount + Number(innerCol)] = color
                }
              }
              colIdx += n * innerCount
              i = searchPos + 2 + template.length + 1
              continue
            }
          }
        }
      }
    }
    i++
  }
  return colors
}

function filterRow0(rc: Record<number, string>): Record<number, string> | undefined {
  const filtered: Record<number, string> = {}
  for (const [k, v] of Object.entries(rc)) {
    if (Number(k) !== 0) filtered[Number(k)] = v
  }
  return Object.keys(filtered).length > 0 ? filtered : undefined
}

function extractLatexColors(rawText: string): LatexColorInfo {
  const info: LatexColorInfo = {}

  const captionIdx = rawText.indexOf('\\caption')
  if (captionIdx >= 0) {
    const braceStart = rawText.indexOf('{', captionIdx)
    if (braceStart >= 0) {
      const captionFull = extractBracedContent(rawText, braceStart)
      if (captionFull !== null) {
        let captionContent = captionFull.trim()

        const cbMatch = captionContent.match(/\\colorbox(?:\[[^\]]*\])?\s*\{([^}]*)\}\s*(\{)/)
        if (cbMatch) {
          const hex = `#${cbMatch[1]!.replace(/^#/, '')}`
          info.captionBgColor = hex
          const cbInnerBrace = cbMatch.index! + cbMatch[0].length - 1
          const cbInner = extractBracedContent(captionContent, cbInnerBrace)
          if (cbInner !== null) {
            captionContent = cbInner.trim()
          }
        }

        const tcMatch = captionContent.match(/\\textcolor(?:\[[^\]]*\])?\s*\{([^}]*)\}\s*(\{)/)
        if (tcMatch) {
          const hex = `#${tcMatch[1]!.replace(/^#/, '')}`
          info.captionTextColor = hex
          const tcInnerBrace = tcMatch.index! + tcMatch[0].length - 1
          const tcInner = extractBracedContent(captionContent, tcInnerBrace)
          if (tcInner !== null) {
            captionContent = tcInner.trim()
          }
        }

        captionContent = captionContent.replace(/\\[a-zA-Z]+(?:\s*\{[^}]*\})*/g, '').trim()
        if (captionContent) info.caption = captionContent
      }
    }
  }

  const rowColorText = rawText
    .replace(/\\hline\s*/g, '')
    .replace(/\\toprule\s*/g, '')
    .replace(/\\midrule\s*/g, '')
    .replace(/\\bottomrule\s*/g, '')

  const rowColors: Record<number, string> = {}
  const rowcolorRe = /\\rowcolor\[HTML\]\s*\{([^}]*)\}/g
  let rcm: RegExpExecArray | null
  while ((rcm = rowcolorRe.exec(rowColorText)) !== null) {
    const hex = `#${rcm[1]!.replace(/^#/, '')}`
    const before = rowColorText.slice(0, rcm.index)
    const rowBreaks = (before.match(/\\\\/g) || []).length
    if (rowBreaks === 0) {
      info.headerColor = hex
    }
    rowColors[rowBreaks] = hex
  }
  if (Object.keys(rowColors).length > 0) info.rowColors = rowColors

  const preamble = extractPreamble(rawText)
  if (preamble) {
    const columnColors = extractColumnColorsFromPreamble(preamble)
    if (Object.keys(columnColors).length > 0) info.columnColors = columnColors
  }

  return info
}

function processCellColors(
  rawCell: string,
  cellColors: Record<string, string>,
  r: number,
  col: number,
): string {
  let cell = rawCell

  const ccMatch = cell.match(/^\\cellcolor(?:\[[^\]]*\])?\s*\{([^}]*)\}\s*/)
  if (ccMatch) {
    cellColors[`R${r}C${col}`] = `#${ccMatch[1]!.replace(/^#/, '')}`
    cell = cell.slice(ccMatch[0].length)
  }

  const cbMatch = cell.match(/^\\colorbox(?:\[[^\]]*\])?\s*\{([^}]*)\}\s*(\{)/)
  if (cbMatch) {
    cellColors[`R${r}C${col}`] = `#${cbMatch[1]!.replace(/^#/, '')}`
    const braceStart = cbMatch.index! + cbMatch[0].length - 1
    const inner = extractBracedContent(cell, braceStart)
    if (inner !== null) cell = inner
  }

  const tcMatch = cell.match(/^\\textcolor(?:\[[^\]]*\])?\s*\{([^}]*)\}\s*(\{)/)
  if (tcMatch) {
    const braceStart = tcMatch.index! + tcMatch[0].length - 1
    const inner = extractBracedContent(cell, braceStart)
    if (inner !== null) cell = inner
  }

  return cell
}

export function parseLatexTabularWithMerges(latex: string): LatexParseResultWithMerges {
  let text = latex

  text = text.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '')

  const colorInfo = extractLatexColors(text)

  if (colorInfo.captionBgColor || colorInfo.captionTextColor || colorInfo.caption) {
    const captionCmdIdx = text.indexOf('\\caption')
    if (captionCmdIdx >= 0) {
      const braceStart = text.indexOf('{', captionCmdIdx)
      if (braceStart >= 0) {
        const captionEnd = (() => {
          let depth = 1
          let i = braceStart + 1
          while (i < text.length && depth > 0) {
            if (text[i] === '{') depth++
            else if (text[i] === '}') depth--
            if (depth > 0) i++
          }
          return depth === 0 ? i : -1
        })()
        if (captionEnd >= 0) {
          text = text.slice(0, captionCmdIdx) + text.slice(captionEnd + 1)
        }
      }
    }
  }

  text = text
    .replace(/\\begin\s*\{table\*?\}\s*(?:\[[^\]]*\]\s*)?/g, '')
    .replace(/\\end\s*\{table\*?\}\s*/g, '')
    .replace(/\\label\s*\{[^}]*\}\s*/g, '')
    .replace(/\\ref\s*\{[^}]*\}\s*/g, '')
    .replace(/\\centering\s*/g, '')
    .replace(/\\raggedleft\s*/g, '')
    .replace(/\\raggedright\s*/g, '')
    .replace(/\\toprule\s*/g, '')
    .replace(/\\midrule\s*/g, '')
    .replace(/\\bottomrule\s*/g, '')
    .replace(/\\hline\s*/g, '')
    .replace(/>\{\s*\\columncolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*\}/g, '')
    .replace(/\\begin\s*\{tabular\*?\}\s*(?:\{[^}]*\}\s*)*/g, '')
    .replace(/\\end\s*\{tabular\*?\}\s*/g, '')
    .replace(/\\rowcolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*/g, '')
    .replace(/\\columncolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*/g, '')
    .replace(/\\cellcolor\s*\{[^}]*\}\s*/g, '')
    .replace(/>\{\s*\}/g, '')
    .replace(/\\cline\s*\{[^}]*\}\s*/g, '')
    .trim()

  if (!text) {
    const rowColors = colorInfo.rowColors ? filterRow0(colorInfo.rowColors) : undefined
    return { rows: [], caption: colorInfo.caption, mergedRanges: [], cellColors: undefined, captionTextColor: colorInfo.captionTextColor, captionBgColor: colorInfo.captionBgColor, headerColor: colorInfo.headerColor, rowColors, columnColors: colorInfo.columnColors }
  }

  text = unescapeLatex(text)
  text = text.replace(/\\textcolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*\{([^}]*)\}/g, '$1')
  text = text.replace(/\\textbf\{([^}]*)\}/g, '$1')

  const rawRows = text
    .split(/\\\\/)
    .map((r) => r.trim())
    .filter((r) => r.length > 0)

  const mergedRanges: MergeRange[] = []
  const parsedRows: string[][] = []
  const activeMultirows: ActiveMultirow[] = []
  const cellColors: Record<string, string> = {}

  for (let r = 0; r < rawRows.length; r++) {
    const rawCells = rawRows[r].split('&').map((c) => c.trim())
    const expandedCells: string[] = []
    let rc = 0

    while (rc < rawCells.length) {
      const col = expandedCells.length

      const mrIdx = activeMultirows.findIndex((m) => m.col === col)
      if (mrIdx >= 0) {
        expandedCells.push('')
        activeMultirows[mrIdx].remaining--
        if (activeMultirows[mrIdx].remaining <= 0) {
          activeMultirows.splice(mrIdx, 1)
        }
        if (rc < rawCells.length && rawCells[rc] === '') {
          rc++
        }
        continue
      }

      if (rc >= rawCells.length) break
      const rawCell = rawCells[rc]!

      const mrMatch = rawCell.match(multirowRe)
      if (mrMatch) {
        const span = parseInt(mrMatch[1]!, 10)
        let content = cleanCellContent(mrMatch[2]!)
        content = processCellColors(content, cellColors, r, col)
        expandedCells.push(content)
        if (span > 1) {
          activeMultirows.push({ col, remaining: span - 1 })
          mergedRanges.push({
            key: buildMergeKey(r, col, r + span - 1, col),
            startRow: r,
            startCol: col,
            endRow: r + span - 1,
            endCol: col,
          })
        }
        rc++
        continue
      }

      const mcMatch = rawCell.match(multicolumnRe)
      if (mcMatch) {
        const span = parseInt(mcMatch[1]!, 10)
        let content = cleanCellContent(mcMatch[2]!)
        content = processCellColors(content, cellColors, r, col)
        expandedCells.push(content)
        if (span > 1) {
          for (let i = 1; i < span; i++) expandedCells.push('')
          mergedRanges.push({
            key: buildMergeKey(r, col, r, col + span - 1),
            startRow: r,
            startCol: col,
            endRow: r,
            endCol: col + span - 1,
          })
        }
        rc++
        continue
      }

      const processed = processCellColors(rawCell, cellColors, r, col)
      expandedCells.push(cleanCellContent(processed))
      rc++
    }

    parsedRows.push(expandedCells)
  }

  const result: LatexParseResultWithMerges = {
    rows: parsedRows,
    caption: colorInfo.caption,
    mergedRanges,
    captionTextColor: colorInfo.captionTextColor,
    captionBgColor: colorInfo.captionBgColor,
    headerColor: colorInfo.headerColor,
    rowColors: colorInfo.rowColors ? filterRow0(colorInfo.rowColors) : undefined,
    columnColors: colorInfo.columnColors,
  }
  if (Object.keys(cellColors).length > 0) result.cellColors = cellColors
  return result
}

export function parseLatexTabular(latex: string): LatexParseResult {
  let text = latex

  text = text.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '')

  let caption: string | undefined
  const captionMatch = text.match(/\\caption\s*\{([^}]*)\}/)
  if (captionMatch) {
    caption = captionMatch[1]!.trim()
  }

  text = text
    .replace(/\\begin\s*\{table\*?\}\s*(?:\[[^\]]*\]\s*)?/g, '')
    .replace(/\\end\s*\{table\*?\}\s*/g, '')
    .replace(/\\caption\s*\{[^}]*\}\s*/g, '')
    .replace(/\\label\s*\{[^}]*\}\s*/g, '')
    .replace(/\\ref\s*\{[^}]*\}\s*/g, '')
    .replace(/\\centering\s*/g, '')
    .replace(/\\raggedleft\s*/g, '')
    .replace(/\\raggedright\s*/g, '')
    .replace(/\\toprule\s*/g, '')
    .replace(/\\midrule\s*/g, '')
    .replace(/\\bottomrule\s*/g, '')
    .replace(/\\hline\s*/g, '')
    .replace(/\\begin\s*\{tabular\*?\}\s*(?:\{[^}]*\}\s*)*/g, '')
    .replace(/\\end\s*\{tabular\*?\}\s*/g, '')
    .replace(/>\{\s*\\columncolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*\}/g, '')
    .replace(/\\rowcolor\s*\{[^}]*\}\s*/g, '')
    .replace(/\\columncolor\s*\{[^}]*\}\s*/g, '')
    .replace(/\\cellcolor\s*\{[^}]*\}\s*/g, '')
    .replace(/>\{\s*\}/g, '')
    .replace(/\\multirow\s*\{[^}]*\}\s*\{[^}]*\}\s*\{([^}]*)\}\s*/g, '$1')
    .replace(/\\multicolumn\s*\{[^}]*\}\s*\{[^}]*\}\s*\{([^}]*)\}\s*/g, '$1')
    .trim()

  if (!text) return { rows: [], caption }

  text = unescapeLatex(text)
  text = text.replace(/\\textcolor(?:\[[^\]]*\])?\s*\{[^}]*\}\s*\{([^}]*)\}/g, '$1')
  text = text.replace(/\\colorbox(?:\[[^\]]*\])?\s*\{[^}]*\}\s*\{([^}]*)\}/g, '$1')
  text = text.replace(/\\textbf\{([^}]*)\}/g, '$1')

  const rows = text
    .split(/\\\\/)
    .map((r) => r.replace(/^\s*|\s*$/g, ''))
    .filter((r) => r.length > 0)

  const parsedRows = rows.map((row) => row.split('&').map((cell) => cell.trim()))

  return { rows: parsedRows, caption }
}

function unescapeLatex(text: string): string {
  let result = text
  for (const [escaped, char] of Object.entries(LATEX_UNESCAPE_MAP)) {
    result = result.replaceAll(escaped, char)
  }
  return result
}
