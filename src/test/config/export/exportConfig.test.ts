import { describe, expect, it } from 'vitest'
import { EXPORT_QUALITY_PRESETS, exportFormats, exportFileBaseName } from '../../../config/export/exportConfig'

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

describe('EXPORT_QUALITY_PRESETS', () => {
  it('has normal and high presets', () => {
    expect(Object.keys(EXPORT_QUALITY_PRESETS)).toEqual(['normal', 'high'])
  })

  it('normal preset uses scale 1', () => {
    expect(EXPORT_QUALITY_PRESETS.normal.scale).toBe(1)
  })

  it('high preset uses scale 2', () => {
    expect(EXPORT_QUALITY_PRESETS.high.scale).toBe(2)
  })

  it('normal preset uses lower jpegQuality than high', () => {
    expect(EXPORT_QUALITY_PRESETS.normal.jpegQuality).toBeLessThan(EXPORT_QUALITY_PRESETS.high.jpegQuality)
  })

  it('normal preset jpegQuality is between 0 and 1', () => {
    expect(EXPORT_QUALITY_PRESETS.normal.jpegQuality).toBeGreaterThan(0)
    expect(EXPORT_QUALITY_PRESETS.normal.jpegQuality).toBeLessThanOrEqual(1)
  })

  it('high preset jpegQuality is between 0 and 1', () => {
    expect(EXPORT_QUALITY_PRESETS.high.jpegQuality).toBeGreaterThan(0)
    expect(EXPORT_QUALITY_PRESETS.high.jpegQuality).toBeLessThanOrEqual(1)
  })

  it('each preset has required fields', () => {
    for (const preset of Object.values(EXPORT_QUALITY_PRESETS)) {
      expect(preset.quality).toBeTruthy()
      expect(preset.label).toBeTruthy()
      expect(typeof preset.scale).toBe('number')
      expect(typeof preset.jpegQuality).toBe('number')
    }
  })
})
