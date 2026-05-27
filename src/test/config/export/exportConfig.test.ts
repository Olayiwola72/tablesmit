import { describe, expect, it } from 'vitest'
import { exportFormats, exportFileBaseName } from '../../../config/export/exportConfig'

describe('exportFileBaseName', () => {
  it('uses tablesmit-table as the default export basename', () => {
    expect(exportFileBaseName).toBe('tablesmit-table')
  })
})

describe('exportFormats', () => {
  it('has exactly 6 formats', () => {
    expect(exportFormats).toHaveLength(6)
  })

  it('includes PDF, PNG, JPEG, Excel, CSV, LaTeX', () => {
    const labels = exportFormats.map(f => f.label)
    expect(labels).toContain('PDF')
    expect(labels).toContain('PNG')
    expect(labels).toContain('JPEG')
    expect(labels).toContain('Excel')
    expect(labels).toContain('CSV')
    expect(labels).toContain('LaTeX')
  })

  it.each(exportFormats)('$label has valid format, label, and extension', (fmt) => {
    expect(['pdf', 'png', 'jpeg', 'excel', 'csv', 'latex']).toContain(fmt.format)
    expect(fmt.label).toBeTruthy()
    expect(fmt.extension).toBeTruthy()
  })
})
