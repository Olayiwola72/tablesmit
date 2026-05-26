import { describe, expect, it } from 'vitest'
import { importCsv, importExcel, argbToHex, getFillColor } from '../../../services/importService/importService'

const createFile = (content: string, name = 'test.csv', mime = 'text/csv'): File =>
  new File([content], name, { type: mime })

describe('importCsv', () => {
  it('parses a basic CSV and returns cells with headers as first row', async () => {
    const file = createFile('Name,Age\nAlice,30\nBob,25')
    const result = await importCsv(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Name')
    expect(result.cells[0][1].value).toBe('Age')
    expect(result.cells[1][0].value).toBe('Alice')
    expect(result.cells[2][1].value).toBe('25')
  })

  it('rejects files larger than 5MB', async () => {
    const large = new ArrayBuffer(6 * 1024 * 1024)
    const file = new File([large], 'large.csv', { type: 'text/csv' })
    await expect(importCsv(file)).rejects.toThrow('File too large')
  })

  it('preserves column count when header exists but all data rows are empty', async () => {
    const file = createFile('Name,Age,Country\n,,\n,,\n,,')
    const result = await importCsv(file)
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(3)
    expect(result.cells[0][0].value).toBe('Name')
    expect(result.cells[0][1].value).toBe('Age')
    expect(result.cells[0][2].value).toBe('Country')
  })

  it('parses a CSV with TooFewFields (row missing a column) and pads missing values', async () => {
    const file = createFile('Name,Age,City\nAlice,30,New York\nBob,25')
    const result = await importCsv(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(3)
    expect(result.cells[1][0].value).toBe('Alice')
    expect(result.cells[1][2].value).toBe('New York')
    expect(result.cells[2][0].value).toBe('Bob')
    expect(result.cells[2][1].value).toBe('25')
    expect(result.cells[2][2].value).toBe('')
  })

  it('parses a CSV with TooManyFields (extra column) and ignores extra data', async () => {
    const file = createFile('Product,Price\nWidget,10.99\nGadget,24.99,Clearance')
    const result = await importCsv(file)
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(2)
    expect(result.cells[2][0].value).toBe('Gadget')
    expect(result.cells[2][1].value).toBe('24.99')
  })

  it('parses a CSV with quoted fields containing commas', async () => {
    const file = createFile('Item,Description\n1,"Hello, world"\n2,"A,B,C"')
    const result = await importCsv(file)
    expect(result.rows).toBe(3)
    expect(result.cells[1][1].value).toBe('Hello, world')
    expect(result.cells[2][1].value).toBe('A,B,C')
  })

  it('clamps rows to MAX_ROWS (50) when CSV has more than 50 rows', async () => {
    const header = 'Col\n'
    const rows = Array.from({ length: 60 }, (_, i) => `Row${i + 1}`).join('\n')
    const file = createFile(header + rows)
    const result = await importCsv(file)
    expect(result.rows).toBe(50)
    expect(result.cols).toBe(1)
  })

  it('returns a single header row for an empty CSV (no data rows)', async () => {
    const file = createFile('Header1,Header2')
    const result = await importCsv(file)
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Header1')
    expect(result.cells[0][1].value).toBe('Header2')
  })

  it('preserves header row when only empty data rows exist', async () => {
    const file = createFile('Col1,Col2\n,\n,\n,')
    const result = await importCsv(file)
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Col1')
    expect(result.cells[0][1].value).toBe('Col2')
  })

  it('detects a caption row and uses the next row as header', async () => {
    const file = createFile('Quarterly Results\nProduct,Revenue\nWidgets,1000\nGadgets,500')
    const result = await importCsv(file)
    expect(result.caption).toBe('Quarterly Results')
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Product')
    expect(result.cells[0][1].value).toBe('Revenue')
    expect(result.cells[1][0].value).toBe('Widgets')
    expect(result.cells[2][1].value).toBe('500')
  })

  it('detects a merged-caption row (all same value) and uses the next row as header', async () => {
    const file = createFile('Title,Title,Title\nName,Age,City\nAlice,30,NYC\nBob,25,LA')
    const result = await importCsv(file)
    expect(result.caption).toBe('Title')
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(3)
    expect(result.cells[0][0].value).toBe('Name')
    expect(result.cells[0][1].value).toBe('Age')
    expect(result.cells[1][0].value).toBe('Alice')
  })

  it('does not treat a single-column table as a caption', async () => {
    const file = createFile('Product\nWidget\nGadget')
    const result = await importCsv(file)
    expect(result.caption).toBeUndefined()
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(1)
    expect(result.cells[0][0].value).toBe('Product')
    expect(result.cells[1][0].value).toBe('Widget')
    expect(result.cells[2][0].value).toBe('Gadget')
  })

  it('preserves empty data rows when header: false (previously header: true test)', async () => {
    const file = createFile('Col1,Col2\n,\n,\n,')
    const result = await importCsv(file)
    // Empty data rows are skipped by skipEmptyLines: true, so only header row remains
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Col1')
    expect(result.cells[0][1].value).toBe('Col2')
  })

  it('detects vertical merges: empty cells below a non-empty cell merge upward', async () => {
    const file = createFile('Item,Region,Sales\nWidget A,,North\n,East,100\nWidget B,West,200')
    const result = await importCsv(file)
    // Col 0: "Widget A" (r1) followed by "" (r2) → merge R1C0:R2C0
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const vMerge = result.mergedRanges![0]
    expect(vMerge.startRow).toBe(1)
    expect(vMerge.startCol).toBe(0)
    expect(vMerge.endRow).toBe(2)
    expect(vMerge.endCol).toBe(0)
    expect(result.cells[1][0].isMerged).toBe(true)
    expect(result.cells[1][0].rowSpan).toBe(2)
    expect(result.cells[2][0].isHidden).toBe(true)
    expect(result.cells[2][0].value).toBe('')
  })

  it('detects horizontal merges: adjacent cells with same value', async () => {
    const file = createFile('Product,Product,Price\nWidget,Widget,10\nGadget,Gadget,20')
    const result = await importCsv(file)
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(3)
    // Row 0: cols 0-1 both "Product" → merge R0C0:R0C1
    // Row 1: cols 0-1 both "Widget" → merge R1C0:R1C1
    // Row 2: cols 0-1 both "Gadget" → merge R2C0:R2C1
    result.mergedRanges!.forEach((r) => {
      expect(r.endRow).toBe(r.startRow)
      expect(r.endCol - r.startCol).toBe(1)
      expect(result.cells[r.startRow][r.startCol].isMerged).toBe(true)
      expect(result.cells[r.startRow][r.startCol].colSpan).toBe(2)
      expect(result.cells[r.startRow][r.startCol + 1].isHidden).toBe(true)
      expect(result.cells[r.startRow][r.startCol + 1].value).toBe('')
    })
  })

  it('detects both vertical and horizontal merges in the same CSV', async () => {
    const file = createFile('Category,Product,Price\nElectronics,Widget,10\n,Widget,20\nElectronics,Gadget,30')
    const result = await importCsv(file)
    expect(result.mergedRanges).toBeDefined()
    // Vertical: col 0 rows 1-2 ("Electronics" merges down)
    const vMerge = result.mergedRanges!.find((r) => r.startCol === 0 && r.startRow === 1)
    expect(vMerge).toBeDefined()
    expect(vMerge!.endRow).toBe(2)
    // Horizontal: row 1 cols 1-1 is single cell, wait...
    // Row 1: "Widget" (col1), "10" (col2) — different, no merge
    // Row 2: "Widget" (col1), "20" (col2) — different, no merge
    // So just 1 merge range (the vertical one)
    expect(result.mergedRanges!.length).toBe(1)
    expect(result.cells[1][0].isMerged).toBe(true)
    expect(result.cells[1][0].rowSpan).toBe(2)
    expect(result.cells[2][0].isHidden).toBe(true)
    expect(result.cells[2][0].value).toBe('')
  })

  it('does not merge empty cells without a non-empty anchor above', async () => {
    const file = createFile('Col1,Col2\n,,\n,,\nX,Y')
    const result = await importCsv(file)
    // Rows 1-2 are all empty — filtered out by normaliseRows
    // Only row 0 (header) and row 3 (data) remain
    expect(result.rows).toBe(2)
    expect(result.mergedRanges).toBeUndefined()
  })

  it('returns no mergedRanges when every cell is filled', async () => {
    const file = createFile('A,B,C\n1,2,3\n4,5,6')
    const result = await importCsv(file)
    expect(result.mergedRanges).toBeUndefined()
  })

  it('does not merge header row with data rows (header labels stay separate)', async () => {
    const file = createFile('Title,Title,Title\nWidget,Gadget,10\n,Thingy,20')
    const result = await importCsv(file)
    expect(result.caption).toBe('Title')
    // After caption removal: header=["Widget","Gadget","10"], body=["","Thingy","20"]
    // The "" in col 0 row 1 is a data cell below the "Widget" header. This is not a valid
    // merge — header labels should not merge with data cells. It remains as an empty data cell.
    expect(result.mergedRanges).toBeUndefined()
  })
})

describe('importExcel', () => {
  it('rejects files larger than 5MB', async () => {
    const large = new ArrayBuffer(6 * 1024 * 1024)
    const file = new File([large], 'large.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    await expect(importExcel(file)).rejects.toThrow('File too large')
  })

  it('rejects files that are not valid XLSX', async () => {
    const file = createFile('not a valid xlsx', 'bad.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    await expect(importExcel(file)).rejects.toThrow('Could not read file')
  })

  it('preserves dimensions when importing a styled empty Excel file', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    // Create a 5×4 grid where cells 1-4 have styled border + fill but are empty
    for (let r = 1; r <= 5; r++) {
      for (let c = 1; c <= 4; c++) {
        const cell = ws.getCell(r, c)
        cell.value = ''   // empty
        cell.border = {
          top:    { style: 'thin', color: { argb: 'FF1E40AF' } },
          bottom: { style: 'thin', color: { argb: 'FF1E40AF' } },
          left:   { style: 'thin', color: { argb: 'FF1E40AF' } },
          right:  { style: 'thin', color: { argb: 'FF1E40AF' } },
        }
      }
    }
    // Style the first row as header
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
    // All cells should be empty
    result.cells.forEach((row) => row.forEach((cell) => expect(cell.value).toBe('')))
  })

  it('detects a merged title row as caption and trims empty leading column', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    // Row 1: Merged title spanning A1:E1 with red background
    ws.mergeCells('A1:E1')
    ws.getCell('A1').value = 'Q1 Performance'
    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF4444' },
    }

    // Row 2: Column A empty, headers in B–E
    ws.getCell('B2').value = 'Jan'
    ws.getCell('C2').value = 'Feb'
    ws.getCell('D2').value = 'Mar'
    ws.getCell('E2').value = 'Target'

    // Row 3: Column A empty, data in B–E
    ws.getCell('B3').value = 100
    ws.getCell('C3').value = 200
    ws.getCell('D3').value = 150
    ws.getCell('E3').value = 450

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'merged-title.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const result = await importExcel(file)

    // Caption detected
    expect(result.caption).toBe('Q1 Performance')

    // 2 data rows (header + body), 4 columns (B–E)
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(4)

    // Header cell values
    expect(result.cells[0][0].value).toBe('Jan')
    expect(result.cells[0][1].value).toBe('Feb')
    expect(result.cells[0][2].value).toBe('Mar')
    expect(result.cells[0][3].value).toBe('Target')

    // Data cell values
    expect(result.cells[1][0].value).toBe('100')
    expect(result.cells[1][1].value).toBe('200')
    expect(result.cells[1][2].value).toBe('150')
    expect(result.cells[1][3].value).toBe('450')

    // Header color should NOT be red (caption row color)
    // It should be undefined since header row has no fill
    expect(result.headerColor).toBeUndefined()
    expect(result.headerStyle).toBeUndefined()
  })

  it('detects merged cells in data area of Excel import', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    // Row 1: headers — merge B1:C1 so "Jan Feb" becomes a single merged header
    ws.getCell('A1').value = 'Region'
    ws.getCell('B1').value = 'Q1'
    ws.getCell('C1').value = ''  // hidden cell of merge B1:C1
    ws.mergeCells('B1:C1')

    // Row 2: data
    ws.getCell('A2').value = 'North'
    ws.getCell('B2').value = '100'
    ws.getCell('C2').value = '200'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'merge-data.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    // No caption detected — first row has multiple distinct values
    expect(result.caption).toBeUndefined()

    // 2 data rows (header + body), 3 columns
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(3)

    // Verify merge range
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(0)
    expect(mr.endCol).toBe(2)

    // Anchor cell has merge flags and the value
    expect(result.cells[0][1].isMerged).toBe(true)
    expect(result.cells[0][1].colSpan).toBe(2)
    expect(result.cells[0][1].value).toBe('Q1')

    // Hidden cell is marked and cleared
    expect(result.cells[0][2].isHidden).toBe(true)
    expect(result.cells[0][2].value).toBe('')
  })

  it('detects merged cells when a caption row is present', async () => {
    const ExcelJS = await import('exceljs')
    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('Sheet1')

    // Row 1: merged caption spanning A1:E1
    ws.mergeCells('A1:E1')
    ws.getCell('A1').value = 'Q1 Report'

    // Row 2: header row — merge B2:C2
    ws.getCell('A2').value = 'Region'
    ws.getCell('B2').value = 'Jan'
    ws.getCell('C2').value = ''  // hidden
    ws.mergeCells('B2:C2')
    ws.getCell('D2').value = 'Feb'
    ws.getCell('E2').value = 'Total'

    // Row 3: data
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

    // Caption detected
    expect(result.caption).toBe('Q1 Report')

    // 2 data rows (header + body), 5 columns
    expect(result.rows).toBe(2)
    expect(result.cols).toBe(5)

    // Data merge found
    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(0)
    expect(mr.endCol).toBe(2)

    // Anchor cell in data
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

    // Merge B1:D3 — a 3x3 block spanning header + 2 data rows
    ws.mergeCells('B1:D3')
    ws.getCell('B1').value = 'Products'

    // Row 1: header
    ws.getCell('A1').value = 'Category'
    ws.getCell('E1').value = 'Total'

    // Row 2: data
    ws.getCell('A2').value = 'Electronics'
    ws.getCell('E2').value = '300'

    // Row 3: data
    ws.getCell('A3').value = 'Furniture'
    ws.getCell('E3').value = '200'

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new File([buffer], 'multi-row-merge.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const result = await importExcel(file)

    // 3 data rows (header + 2 body), 5 columns
    expect(result.rows).toBe(3)
    expect(result.cols).toBe(5)

    expect(result.mergedRanges).toBeDefined()
    expect(result.mergedRanges!.length).toBe(1)
    const mr = result.mergedRanges![0]
    expect(mr.startRow).toBe(0)
    expect(mr.startCol).toBe(1)
    expect(mr.endRow).toBe(2)
    expect(mr.endCol).toBe(3)

    // Anchor
    expect(result.cells[0][1].isMerged).toBe(true)
    expect(result.cells[0][1].rowSpan).toBe(3)
    expect(result.cells[0][1].colSpan).toBe(3)
    expect(result.cells[0][1].value).toBe('Products')

    // Hidden cells in the merged block
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

    // Row 1: caption with styling
    ws.getCell('A1').value = 'Styled Caption'
    ws.getCell('A1').font = { color: { argb: 'FFFFFFFF' }, italic: true, bold: true }
    ws.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E40AF' },
    }
    ws.getCell('A1').alignment = { horizontal: 'center' }

    // Row 2: headers
    ws.getCell('A2').value = 'Name'
    ws.getCell('B2').value = 'Value'

    // Row 3: data
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

    // Row 1: caption with no styling
    ws.getCell('A1').value = 'Plain Caption'

    // Row 2: headers
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
})

describe('argbToHex', () => {
  it('converts 8-character ARGB to 6-character hex, stripping alpha', () => {
    expect(argbToHex('FFFF0000')).toBe('#FF0000')
    expect(argbToHex('FF1E40AF')).toBe('#1E40AF')
    expect(argbToHex('FF000000')).toBe('#000000')
    expect(argbToHex('FFFFFFFF')).toBe('#FFFFFF')
  })

  it('strips # prefix if present', () => {
    expect(argbToHex('#FFFF0000')).toBe('#FF0000')
    expect(argbToHex('#FF1E40AF')).toBe('#1E40AF')
  })

  it('returns input as-is if not 8 characters (after stripping #)', () => {
    expect(argbToHex('FF0000')).toBe('#FF0000')
    expect(argbToHex('1E40AF')).toBe('#1E40AF')
  })
})

describe('getFillColor', () => {
  it('returns undefined for null/undefined fill', () => {
    expect(getFillColor(null)).toBeUndefined()
    expect(getFillColor(undefined)).toBeUndefined()
    expect(getFillColor({})).toBeUndefined()
  })

  it('returns undefined for non-object fill', () => {
    expect(getFillColor('string')).toBeUndefined()
    expect(getFillColor(123)).toBeUndefined()
    expect(getFillColor(true)).toBeUndefined()
  })

  it('extracts fgColor from pattern fill', () => {
    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF0000' }
    })).toBe('#FF0000')

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E40AF' }
    })).toBe('#1E40AF')
  })

  it('returns undefined for pattern fill without fgColor', () => {
    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid'
    })).toBeUndefined()

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: {}
    })).toBeUndefined()

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '' }
    })).toBeUndefined()
  })

  it('extracts first stop color from gradient angle fill', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: 'FFFF0000' } },
        { position: 1, color: { argb: 'FF0000FF' } }
      ]
    })).toBe('#FF0000')
  })

  it('extracts first stop color from gradient path fill', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'path',
      center: { left: 0.5, top: 0.5 },
      stops: [
        { position: 0, color: { argb: 'FF1E40AF' } },
        { position: 1, color: { argb: 'FF60A5FA' } }
      ]
    })).toBe('#1E40AF')
  })

  it('returns undefined for gradient fill without stops', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: []
    })).toBeUndefined()

    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90
    })).toBeUndefined()
  })

  it('returns undefined for gradient fill without valid first stop color', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: {} }
      ]
    })).toBeUndefined()

    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: '' } }
      ]
    })).toBeUndefined()
  })

  it('returns undefined for unknown fill type', () => {
    expect(getFillColor({
      type: 'unknown',
      fgColor: { argb: 'FFFF0000' }
    })).toBeUndefined()
  })
})
