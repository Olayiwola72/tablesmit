import type { CellData, BorderStyle as TbBorderStyle } from '../../../context/table.types'
import type { ExportOptions, ExportStrategy, ExportStyleOptions } from '../export.types'
import { siteConfig } from '../../../config/siteConfig'
import { downloadUrl } from '../utils'
import { isHeaderCell } from '../../../context/TableContext'

type ExceljsBorderStyle = 'thin' | 'dotted' | 'dashed' | 'double'

function toArgb(hex: string): string {
  return hex.startsWith('#') ? `FF${hex.slice(1)}` : `FF${hex}`
}

function mapBorderStyle(style: TbBorderStyle): ExceljsBorderStyle | null {
  switch (style) {
    case 'none': return null
    case 'solid': return 'thin'
    case 'dotted': return 'dotted'
    case 'dashed': return 'dashed'
    case 'double': return 'double'
  }
}

function makeCellId(row: number, col: number): string {
  return `R${row}C${col}`
}

function resolveBg(
  cellId: string, row: number, col: number,
  styles: ExportStyleOptions | undefined,
  isHeader: boolean, altRowHex: string, headerHex: string, defaultBgHex: string,
): string {
  if (styles?.cellColors?.[cellId]) return toArgb(styles.cellColors[cellId])
  if (styles?.rowColors?.[row]) return toArgb(styles.rowColors[row])
  if (styles?.columnColors?.[col]) return toArgb(styles.columnColors[col])
  if (isHeader) return headerHex
  if (row % 2 === 1) return altRowHex
  return defaultBgHex
}

function resolveAlign(
  cellId: string, col: number,
  styles: ExportStyleOptions | undefined,
  isHeader: boolean,
): 'left' | 'center' | 'right' {
  if (styles?.cellTextAlign?.[cellId]) return styles.cellTextAlign[cellId] as 'left' | 'center' | 'right'
  if (styles?.columnTextAlign?.[col]) return styles.columnTextAlign[col] as 'left' | 'center' | 'right'
  return isHeader ? 'center' : 'left'
}

export class ExcelExporter implements ExportStrategy {
  async export(_element: HTMLElement, options: ExportOptions): Promise<void> {
    const ExcelJS = await import('exceljs')
    const caption = options.caption?.trim()
    const cellsData = (options.cells ?? []) as CellData[][]
    const stylesObj = options.styles

    const headerHex = stylesObj ? toArgb(stylesObj.headerColor) : 'FF1E40AF'
    const headerTextHex = stylesObj ? toArgb(stylesObj.headerTextColor) : 'FFFFFFFF'
    const borderHex = stylesObj ? toArgb(stylesObj.borderColor) : 'FFE5E7EB'
    const altRowHex = stylesObj ? toArgb(stylesObj.altRowBg) : 'FFF9FAFB'
    const defaultBgHex = 'FFFFFFFF'
    const xlsxBorderStyle = stylesObj ? mapBorderStyle(stylesObj.borderStyle) : 'thin'
    const hasBorders = xlsxBorderStyle !== null

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(siteConfig.brand.name)

    // ── Column widths ──
    if (stylesObj?.columnWidths?.length) {
      stylesObj.columnWidths.forEach((w, i) => {
        worksheet.getColumn(i + 1).width = Math.round(w / 7)
      })
    }

    // ── Write data (exceljs is 1-indexed) ──
    let dataStartRow = 1

    if (caption) {
      worksheet.getCell(1, 1).value = caption
      const cols = (cellsData[0]?.length ?? 1)
      if (cols > 1) {
        worksheet.mergeCells(1, 1, 1, cols)
      }
      dataStartRow = 2
    }

    // ── Merges ──
    if (options.mergedRanges?.length) {
      options.mergedRanges.forEach((range) => {
        worksheet.mergeCells(
          range.startRow + dataStartRow,
          range.startCol + 1,
          range.endRow + dataStartRow,
          range.endCol + 1,
        )
      })
    }

    // ── Data rows + cell styling ──
    cellsData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const excelRow = rowIndex + dataStartRow
        const excelCol = colIndex + 1
        const cellId = makeCellId(rowIndex, colIndex)
        const isHeader = isHeaderCell(options.headerStyle ?? 'none', rowIndex, colIndex)

        const xlCell = worksheet.getCell(excelRow, excelCol)
        xlCell.value = cell.value

        const bgHex = resolveBg(cellId, rowIndex, colIndex, stylesObj, isHeader, altRowHex, headerHex, defaultBgHex)
        const hAlign = resolveAlign(cellId, colIndex, stylesObj, isHeader)

        xlCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgHex },
        }

        xlCell.font = {
          name: 'Calibri',
          size: 11,
          bold: isHeader,
          color: { argb: isHeader ? headerTextHex : 'FF111827' },
        }

        xlCell.alignment = {
          horizontal: hAlign,
          vertical: 'middle',
        }

        if (hasBorders) {
          xlCell.border = {
            top: { style: xlsxBorderStyle, color: { argb: borderHex } },
            bottom: { style: xlsxBorderStyle, color: { argb: borderHex } },
            left: { style: xlsxBorderStyle, color: { argb: borderHex } },
            right: { style: xlsxBorderStyle, color: { argb: borderHex } },
          }
        }
      })
    })

    // ── Write file ──
    const buffer = (await workbook.xlsx.writeBuffer()) as ArrayBuffer
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    downloadUrl(URL.createObjectURL(blob), `${options.filename ?? siteConfig.exportFileBaseName}.xlsx`)
  }
}
