import { describe, expect, it, beforeAll } from 'vitest'
import { getAllFeatures } from '../../../services/featureService/featureService'

describe('all feature pages', () => {
  let features: Awaited<ReturnType<typeof getAllFeatures>>

  beforeAll(async () => {
    features = await getAllFeatures()
  })

  it('has at least one feature', () => {
    expect(features.length).toBeGreaterThan(0)
  })

  it.each([0])('each feature has required fields', () => {
    for (const feature of features) {
      expect(feature.slug).toBeTruthy()
      expect(feature.metaTitle).toBeTruthy()
      expect(feature.metaDescription).toBeTruthy()
      expect(feature.heroHeadline).toBeTruthy()
      expect(feature.heroSubtext).toBeTruthy()
      expect(Array.isArray(feature.benefits)).toBe(true)
    }
  })

  it.each([0])('each feature has at least one benefit', () => {
    for (const feature of features) {
      expect(feature.benefits.length).toBeGreaterThan(0)
    }
  })

  it.each([0])('benefits have required fields', () => {
    for (const feature of features) {
      for (const b of feature.benefits) {
        expect(b.heading).toBeTruthy()
        expect(b.body).toBeTruthy()
      }
    }
  })

  it('all slugs are unique', () => {
    const slugs = features.map(f => f.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all metaDescriptions are under 160 characters', () => {
    for (const feature of features) {
      expect(feature.metaDescription.length).toBeLessThanOrEqual(160)
    }
  })

  it('relatedPost references a valid blog post slug when present', async () => {
    const { getAllPosts } = await import('../../../services/blogService/blogService')
    const posts = await getAllPosts()
    const postSlugs = new Set(posts.map(p => p.slug))
    for (const feature of features) {
      if (feature.relatedPost) {
        expect(postSlugs.has(feature.relatedPost)).toBe(true)
      }
    }
  })
})
