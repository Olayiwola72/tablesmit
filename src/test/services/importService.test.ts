import { describe, expect, it } from 'vitest'
import { importCsv, importExcel } from '../../services/importService/importService'

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
})
