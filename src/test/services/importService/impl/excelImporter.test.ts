import { describe, expect, it, vi } from 'vitest'

vi.mock('../../../../i18n/i18n', () => ({
  default: {
    t: (key: string, opts?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'errors.fileTooLarge': 'File too large. Maximum size is {{maxSize}}{{unitLabel}}.',
        'errors.importParseError': 'Could not read file. Check the format and try again.',
        'errors.notExcelFormat': "This file doesn't appear to be a valid Excel file (.xlsx). The content looks like plain text, not a spreadsheet. Try saving the file with a .csv extension and using 'Import from CSV' instead.",
      }
      let msg = translations[key] ?? key
      if (opts) {
        for (const [k, v] of Object.entries(opts)) {
          msg = msg.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
        }
      }
      return msg
    },
    language: 'en',
    isInitialized: true,
    on: () => vi.fn(),
    changeLanguage: () => Promise.resolve(),
  },
}))

import { importExcel } from '../../../../services/importService'

const createFile = (content: string, name = 'test.csv', mime = 'text/csv'): File =>
  new File([content], name, { type: mime })

describe('importExcel', () => {
  it('rejects files larger than 5MB', async () => {
    const large = new ArrayBuffer(6 * 1024 * 1024)
    const file = new File([large], 'large.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    await expect(importExcel(file)).rejects.toThrow('File too large')
  })

  it('rejects files that are not valid XLSX', async () => {
    const file = createFile('not a valid xlsx', 'bad.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    await expect(importExcel(file)).rejects.toThrow("doesn't appear to be a valid Excel file")
  })

  it('preserves dimensions when importing a styled empty Excel file', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    for (let r = 1; r <= 5; r++) {
      for (let c = 1; c <= 4; c++) {
        const cell = ws.getCell(r, c)
        cell.value = ''
        cell.border = {
          top:    { style: 'thin', color: { argb: 'FF1E40AF' } },
          bottom: { style: 'thin', color: { argb: 'FF1E40AF' } },
          left:   { style: 'thin', color: { argb: 'FF1E40AF' } },
          right:  { style: 'thin', color: { argb: 'FF1E40AF' } },
        }
      }
    }
    for (let c = 1; c <= 4; c++) {
      ws.getCell(1, c).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E40AF' },
      }
      ws.getCell(1, c).font = { color: { argb: 'FFFFFFFF' }, bold: true }
    }

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'styled-empty.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)
    expect(result.rows).toBe(5)
    expect(result.cols).toBe(4)
    expect(result.headerColor).toBe('#1E40AF')
    expect(result.headerStyle).toBe('first-row')
    result.cells.forEach((row) => row.forEach((cell) => expect(cell.value).toBe('')))
  })

  it('detects a merged title row as caption and trims empty leading column', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.mergeCells('A1:E1')
    ws.getCell('A1').value = 'Q1 Performance'
    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF4444' },
    }

    ws.getCell('B2').value = 'Jan'
    ws.getCell('C2').value = 'Feb'
    ws.getCell('D2').value = 'Mar'
    ws.getCell('E2').value = 'Target'

    ws.getCell('B3').value = 100
    ws.getCell('C3').value = 200
    ws.getCell('D3').value = 150
    ws.getCell('E3').value = 450

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'merged-title.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const result = await importExcel(file)

    expect(result.caption).toBe('Q1 Performance')
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(4)
    expect(result.cells[0][0].value).toBe('Jan')
    expect(result.cells[0][1].value).toBe('Feb')
    expect(result.cells[0][2].value).toBe('Mar')
    expect(result.cells[0][3].value).toBe('Target')
    expect(result.cells[1][0].value).toBe('100')
    expect(result.cells[1][1].value).toBe('200')
    expect(result.cells[1][2].value).toBe('150')
    expect(result.cells[1][3].value).toBe('450')
    expect(result.headerColor).toBeUndefined()
    expect(result.headerStyle).toBeUndefined()
  })

  it('detects merged cells in data area of Excel import', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.getCell('A1').value = 'Region'
    ws.getCell('B1').value = 'Q1'
    ws.getCell('C1').value = ''
    ws.mergeCells('B1:C1')

    ws.getCell('A2').value = 'North'
    ws.getCell('B2').value = '100'
    ws.getCell('C2').value = '200'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'merge-data.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.caption).toBeUndefined()
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(3)

    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(0)
    expect(mr.endCol).toBe(2)

    expect(result.cells[0][1].isMerged).toBe(true)
    expect(result.cells[0][1].colSpan).toBe(2)
    expect(result.cells[0][1].value).toBe('Q1')
    expect(result.cells[0][2].isHidden).toBe(true)
    expect(result.cells[0][2].value).toBe('')
  })

  it('detects merged cells when a caption row is present', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.mergeCells('A1:E1')
    ws.getCell('A1').value = 'Q1 Report'

    ws.getCell('A2').value = 'Region'
    ws.getCell('B2').value = 'Jan'
    ws.getCell('C2').value = ''
    ws.mergeCells('B2:C2')
    ws.getCell('D2').value = 'Feb'
    ws.getCell('E2').value = 'Total'

    ws.getCell('A3').value = 'North'
    ws.getCell('B3').value = '100'
    ws.getCell('C3').value = '200'
    ws.getCell('D3').value = '150'
    ws.getCell('E3').value = '450'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'caption-merge.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.caption).toBe('Q1 Report')
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(5)

    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(0)
    expect(mr.endCol).toBe(2)

    expect(result.cells[0][1].isMerged).toBe(true)
    expect(result.cells[0][1].colSpan).toBe(2)
    expect(result.cells[0][1].value).toBe('Jan')
    expect(result.cells[0][2].isHidden).toBe(true)
    expect(result.cells[0][2].value).toBe('')
  })

  it('detects a multi-row horizontal merge in Excel import', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.mergeCells('B1:D3')
    ws.getCell('B1').value = 'Products'

    ws.getCell('A1').value = 'Category'
    ws.getCell('E1').value = 'Total'

    ws.getCell('A2').value = 'Electronics'
    ws.getCell('E2').value = '300'

    ws.getCell('A3').value = 'Furniture'
    ws.getCell('E3').value = '200'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'multi-row-merge.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.rows).toBe(3)
    expect(result.cols).toBe(5)

    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(2)
    expect(mr.endCol).toBe(3)

    expect(result.cells[0][1].isMerged).toBe(true)
    expect(result.cells[0][1].rowSpan).toBe(3)
    expect(result.cells[0][1].colSpan).toBe(3)
    expect(result.cells[0][1].value).toBe('Products')

    expect(result.cells[0][2].isHidden).toBe(true)
    expect(result.cells[0][3].isHidden).toBe(true)
    expect(result.cells[1][1].isHidden).toBe(true)
    expect(result.cells[1][2].isHidden).toBe(true)
    expect(result.cells[1][3].isHidden).toBe(true)
    expect(result.cells[2][1].isHidden).toBe(true)
    expect(result.cells[2][2].isHidden).toBe(true)
    expect(result.cells[2][3].isHidden).toBe(true)
  })

  it('captures caption text color and background color from Excel import', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.getCell('A1').value = 'Styled Caption'
    ws.getCell('A1').font = { color: { argb: 'FFFFFFFF' }, italic: true, bold: true }
    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E40AF' },
    }
    ws.getCell('A1').alignment = { horizontal: 'center' }

    ws.getCell('A2').value = 'Name'
    ws.getCell('B2').value = 'Value'

    ws.getCell('A3').value = 'Widget'
    ws.getCell('B3').value = '100'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'styled-caption.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.caption).toBe('Styled Caption')
    expect(result.captionTextColor).toBe('#FFFFFF')
    expect(result.captionBgColor).toBe('#1E40AF')
    expect(result.captionItalic).toBe(true)
    expect(result.captionAlignment).toBe('center')
  })

  it('leaves caption styling undefined when caption has no explicit styling', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.getCell('A1').value = 'Plain Caption'

    ws.getCell('A2').value = 'Name'
    ws.getCell('B2').value = 'Value'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'plain-caption.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.caption).toBe('Plain Caption')
    expect(result.captionTextColor).toBeUndefined()
    expect(result.captionBgColor).toBeUndefined()
    expect(result.captionItalic).toBeUndefined()
    expect(result.captionAlignment).toBeUndefined()
  })

  it('extracts formula cell result instead of rendering as [object Object]', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.getCell('A1').value = 'Product'
    ws.getCell('B1').value = 'Q1'
    ws.getCell('C1').value = 'Q2'
    ws.getCell('D1').value = 'Total'

    ws.getCell('A2').value = 'Widget'
    ws.getCell('B2').value = 100
    ws.getCell('C2').value = 200
    ws.getCell('D2').value = { formula: 'SUM(B2:C2)', result: 300 }

    ws.getCell('A3').value = 'Gadget'
    ws.getCell('B3').value = 150
    ws.getCell('C3').value = 250
    ws.getCell('D3').value = { formula: 'SUM(B3:C3)', result: 400 }

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'formula-sum.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const result = await importExcel(file)

    expect(result.rows).toBe(3)
    expect(result.cols).toBe(4)

    expect(result.cells[0][0].value).toBe('Product')
    expect(result.cells[0][1].value).toBe('Q1')
    expect(result.cells[0][2].value).toBe('Q2')
    expect(result.cells[0][3].value).toBe('Total')

    expect(result.cells[1][0].value).toBe('Widget')
    expect(result.cells[1][1].value).toBe('100')
    expect(result.cells[1][2].value).toBe('200')
    expect(result.cells[1][3].value).toBe('300')

    expect(result.cells[2][0].value).toBe('Gadget')
    expect(result.cells[2][1].value).toBe('150')
    expect(result.cells[2][2].value).toBe('250')
    expect(result.cells[2][3].value).toBe('400')

    expect(result.cells[1][3].value).not.toBe('[object Object]')
  })

  it('extracts row fill colors from data rows (row 0 excluded)', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    ws.getCell('A1').value = 'Name'
    ws.getCell('B1').value = 'Value'
    ws.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E40AF' } }
    ws.getCell('B1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E40AF' } }

    ws.getCell('A2').value = 'Alice'
    ws.getCell('B2').value = '100'
    ws.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } }
    ws.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } }

    ws.getCell('A3').value = 'Bob'
    ws.getCell('B3').value = '200'
    ws.getCell('A3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } }
    ws.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } }

    ws.getCell('A4').value = 'Charlie'
    ws.getCell('B4').value = '300'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'row-colors.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    expect(result.headerColor).toBe('#1E40AF')
    expect(result.rowColors).toBeDefined()
    expect(result.rowColors![0]).toBeUndefined()
    expect(result.rowColors![1]).toBe('#F3F4F6')
    expect(result.rowColors![2]).toBe('#E5E7EB')
    expect(result.rowColors![3]).toBeUndefined()
  })
})
