import { describe, expect, it } from 'vitest'
import { appConfig } from './config'

describe('appConfig', () => {
  it('uses the Structra identity from the product guide', () => {
    expect(appConfig.brand.name).toBe('Structra')
    expect(appConfig.brand.tagline).toBe('Tables, your way.')
  })

  it('keeps export options configuration-driven', () => {
    expect(appConfig.exports.map((option) => option.format)).toEqual([
      'pdf',
      'png',
      'jpeg',
      'xls',
      'csv',
    ])
  })

  it('includes white in both configurable color palettes', () => {
    expect(appConfig.colorPalettes.header).toContain('#ffffff')
    expect(appConfig.colorPalettes.content).toContain('#ffffff')
  })
})
