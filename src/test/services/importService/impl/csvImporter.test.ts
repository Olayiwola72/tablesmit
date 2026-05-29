import { describe, expect, it, vi } from 'vitest'

vi.mock('../../../../i18n/i18n', () => ({
  default: {
    t: (key: string, opts?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'errors.fileTooLarge': 'File too large. Maximum size is {{maxSize}}{{unitLabel}}.',
        'errors.importParseError': 'Could not read file. Check the format and try again.',
        'errors.notCsvFormat': 'This .csv file appears to be an Excel workbook (.xlsx), not a plain-text CSV. Try saving the file with a .xlsx extension and using \'Import from Excel\' instead.',
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

import { importCsv } from '../../../../services/importService'

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

  it('rejects file with .csv extension that is actually an xlsx (ZIP content)', async () => {
    const zipBytes = new Uint8Array([0x50, 0x4B, 0x03, 0x04])
    const file = new File([zipBytes], 'fake.csv', { type: 'text/csv' })
    await expect(importCsv(file)).rejects.toThrow('appears to be an Excel workbook')
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
    expect(result.rows).toBe(1)
    expect(result.cols).toBe(2)
    expect(result.cells[0][0].value).toBe('Col1')
    expect(result.cells[0][1].value).toBe('Col2')
  })

  it('detects vertical merges: empty cells below a non-empty cell merge upward', async () => {
    const file = createFile('Item,Region,Sales\nWidget A,,North\n,East,100\nWidget B,West,200')
    const result = await importCsv(file)
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
    const vMerge = result.mergedRanges!.find((r) => r.startCol === 0 && r.startRow === 1)
    expect(vMerge).toBeDefined()
    expect(vMerge!.endRow).toBe(2)
    expect(result.mergedRanges!.length).toBe(1)
    expect(result.cells[1][0].isMerged).toBe(true)
    expect(result.cells[1][0].rowSpan).toBe(2)
    expect(result.cells[2][0].isHidden).toBe(true)
    expect(result.cells[2][0].value).toBe('')
  })

  it('does not merge empty cells without a non-empty anchor above', async () => {
    const file = createFile('Col1,Col2\n,,\n,,\nX,Y')
    const result = await importCsv(file)
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
    expect(result.mergedRanges).toBeUndefined()
  })
})
