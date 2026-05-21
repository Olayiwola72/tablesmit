import { describe, expect, it } from 'vitest'
import { getAllPosts } from '../../../services/blogService/blogService'

describe('all blog posts', () => {
  let posts: Awaited<ReturnType<typeof getAllPosts>>

  beforeAll(async () => {
    posts = await getAllPosts()
  })

  it('has at least one post', () => {
    expect(posts.length).toBeGreaterThan(0)
  })

  it.each([0])('each post has required fields', () => {
    for (const post of posts) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.description).toBeTruthy()
      expect(post.author).toBeTruthy()
      expect(Array.isArray(post.tags)).toBe(true)
      expect(post.readTime).toBeGreaterThan(0)
      expect(post.content).toBeTruthy()
    }
  })

  it.each([0])('tags are lowercase', () => {
    for (const post of posts) {
      for (const tag of post.tags) {
        expect(tag).toEqual(tag.toLowerCase())
      }
    }
  })

  it('featured post is first', () => {
    const featured = posts.filter(p => p.featured)
    if (featured.length > 0) {
      expect(posts[0].featured).toBe(true)
    }
  })

  it('all slugs are unique', () => {
    const slugs = posts.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all descriptions are under 160 characters', () => {
    for (const post of posts) {
      expect(post.description.length).toBeLessThanOrEqual(160)
    }
  })
})
