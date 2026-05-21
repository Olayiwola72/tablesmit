import { describe, it, expect, vi, afterEach } from 'vitest'
import type { ExportOptions } from '../../../services/exportService/export.types'

const mockExport = vi.fn().mockResolvedValue(undefined)

class MockImageExporter { export = mockExport }

vi.mock('../../../services/exportService/impl/pdfExporter', () => ({
  PDFExporter: vi.fn(function () { return { export: mockExport } }),
}))
vi.mock('../../../services/exportService/impl/imageExporter', () => ({
  ImageExporter: MockImageExporter,
}))
vi.mock('../../../services/exportService/impl/csvExporter', () => ({
  CSVExporter: vi.fn(function () { return { export: mockExport } }),
}))
vi.mock('../../../services/exportService/impl/excelExporter', () => ({
  ExcelExporter: vi.fn(function () { return { export: mockExport } }),
}))
vi.mock('../../../services/exportService/impl/latexExporter', () => ({
  LatexExporter: vi.fn(function () { return { export: mockExport } }),
}))

describe('exportService index', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('delegates to the correct strategy for each format', async () => {
    const { exportTable } = await import('../../../services/exportService/index')

    const formats: Array<ExportOptions['format']> = ['pdf', 'png', 'jpeg', 'csv', 'excel', 'latex']

    for (const format of formats) {
      mockExport.mockClear()
      const el = document.createElement('div')
      await exportTable(el, { format })
      expect(mockExport).toHaveBeenCalledTimes(1)
    }
  })

  it('rejects when strategy export throws', async () => {
    mockExport.mockRejectedValue(new Error('export error'))

    const { exportTable } = await import('../../../services/exportService/index')

    const el = document.createElement('div')
    await expect(exportTable(el, { format: 'pdf' })).rejects.toThrow('export error')
  })
})
