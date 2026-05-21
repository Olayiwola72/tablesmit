import { describe, expect, it } from 'vitest'
import { TESTIMONIALS } from '../../../config/testimonials/testimonials'

describe('TESTIMONIALS', () => {
  it('is an empty array by default', () => {
    expect(TESTIMONIALS).toEqual([])
  })
})
