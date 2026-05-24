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

  it('preserves header row when only empty data rows exist', async () => {
    const file = createFile('Col1,Col2\n,\n,\n,')
    const result = await importCsv(file)
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Col1')
    expect(result.cells[0][1].value).toBe('Col2')
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
