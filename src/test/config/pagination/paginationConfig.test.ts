import { describe, expect, it } from 'vitest'
import { ITEMS_PER_PAGE } from '../../../config/pagination/paginationConfig'

describe('paginationConfig', () => {
  it('ITEMS_PER_PAGE is 6', () => {
    expect(ITEMS_PER_PAGE).toBe(6)
  })
})
