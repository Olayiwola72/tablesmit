import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  downloadUrl,
  filenameWithExtension,
  sanitizeFilename,
  sanitizeSpreadsheetValue,
} from '../../../services/exportService/utils'

describe('downloadUrl', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a temporary link and clicks it', () => {
    const click = vi.fn()
    const link = document.createElement('a')
    link.click = click
    const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(link)

    downloadUrl('data:,hello', 'test.txt')

    expect(createSpy).toHaveBeenCalledWith('a')
    expect(click).toHaveBeenCalled()
  })

  it('sets href and download attributes', () => {
    const link = document.createElement('a')
    const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(link)

    downloadUrl('data:,world', 'out.csv')

    const el = createSpy.mock.results[0].value
    expect(el.href).toBe('data:,world')
    expect(el.download).toBe('out.csv')
  })

  it('appends and removes the temporary link', () => {
    const append = vi.spyOn(document.body, 'appendChild')

    downloadUrl('blob:test', 'doc.pdf')

    expect(append).toHaveBeenCalledWith(expect.any(HTMLAnchorElement))
    expect(document.querySelector('a[download="doc.pdf"]')).not.toBeInTheDocument()
  })

  it('revokes object URLs after starting the download', () => {
    vi.useFakeTimers()
    const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)

    downloadUrl('blob:test', 'doc.pdf')
    vi.runAllTimers()

    expect(revoke).toHaveBeenCalledWith('blob:test')
    vi.useRealTimers()
  })
})

describe('sanitizeSpreadsheetValue', () => {
  it('prefixes formula-like values', () => {
    expect(sanitizeSpreadsheetValue('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)")
    expect(sanitizeSpreadsheetValue('+1')).toBe("'+1")
    expect(sanitizeSpreadsheetValue('-1')).toBe("'-1")
    expect(sanitizeSpreadsheetValue('@cmd')).toBe("'@cmd")
  })

  it('leaves normal values unchanged', () => {
    expect(sanitizeSpreadsheetValue('Tablesmit')).toBe('Tablesmit')
  })
})

describe('filenameWithExtension', () => {
  it('removes path and control characters from filenames', () => {
    expect(filenameWithExtension('../bad/name\u0000', 'tablesmit-table', 'csv')).toBe('bad-name.csv')
  })

  it('falls back for empty or reserved filenames', () => {
    expect(sanitizeFilename('   ', 'tablesmit-table')).toBe('tablesmit-table')
    expect(filenameWithExtension('CON', 'tablesmit-table', 'csv')).toBe('tablesmit-table.csv')
  })
})
