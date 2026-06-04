import { describe, expect, it } from 'vitest'
import { productHunt } from '../../../config/productHunt/productHuntConfig'
import { brand } from '../../../config/brand/brandConfig'

describe('productHunt', () => {
  it('has a null postId pre-launch', () => {
    expect(productHunt.postId).toBeNull()
  })

  it('url matches brand.productHuntUrl', () => {
    expect(productHunt.url).toBe(brand.productHuntUrl)
  })

  it('embedUrl is derived from url with utm params', () => {
    expect(productHunt.embedUrl).toBe(
      `${brand.productHuntUrl}?embed=true&utm_source=embed&utm_medium=post_embed`,
    )
  })

  it('has a valid Product Hunt URL', () => {
    expect(productHunt.url).toMatch(/^https:\/\/www\.producthunt\.com\//)
  })
})
