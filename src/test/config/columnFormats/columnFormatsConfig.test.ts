import { describe, expect, it } from 'vitest'
import { columnFormats } from '../../../config/columnFormats/columnFormatsConfig'

describe('columnFormats', () => {
  it('has exactly 7 formats', () => {
    expect(columnFormats).toHaveLength(7)
  })

  it('includes standard formats', () => {
    const values = columnFormats.map((f) => f.value)
    expect(values).toContain('text')
    expect(values).toContain('number')
    expect(values).toContain('currency')
    expect(values).toContain('percentage')
    expect(values).toContain('date')
    expect(values).toContain('sum')
    expect(values).toContain('auto-number')
  })

  it.each(columnFormats)('$value has a label', (fmt) => {
    expect(fmt.label).toBeTruthy()
  })
})
