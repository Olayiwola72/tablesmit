import { describe, expect, it } from 'vitest'
import { importConfig, KB, MB } from '../../../config/import/importConfig'

describe('importConfig', () => {
  it('maxSize is 5', () => {
    expect(importConfig.maxSize).toBe(5)
  })

  it('unit is MB (1024*1024)', () => {
    expect(importConfig.unit).toBe(MB)
  })

  it('unitLabel is "MB"', () => {
    expect(importConfig.unitLabel).toBe('MB')
  })
})

describe('file size units', () => {
  it('KB is 1024', () => {
    expect(KB).toBe(1024)
  })

  it('MB is 1024 * KB', () => {
    expect(MB).toBe(1024 * 1024)
  })
})
