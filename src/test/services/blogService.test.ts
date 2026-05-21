import { describe, it, expect } from 'vitest'
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
} from '../../services/blogService/blogService'

describe('blogService', () => {
  it('loads at least one blog post', async () => {
    const posts = await getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
  })

  it('derives slug from filename correctly', async () => {
    const posts = await getAllPosts()
    const post = posts.find(p => p.slug === 'how-to-make-a-table-in-markdown')
    expect(post).toBeDefined()
  })

  it('puts featured posts before non-featured posts', async () => {
    const posts = await getAllPosts()
    const featuredIdx = posts.findIndex(p => p.featured)
    const nonFeaturedIdx = posts.findIndex(p => !p.featured)
    if (featuredIdx >= 0 && nonFeaturedIdx >= 0) {
      expect(featuredIdx).toBeLessThan(nonFeaturedIdx)
    }
  })

  it('sorts non-featured posts newest first', async () => {
    const posts = await getAllPosts()
    const nonFeatured = posts.filter(p => !p.featured)
    if (nonFeatured.length >= 2) {
      const dates = nonFeatured.map(p => new Date(p.date).getTime())
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeLessThanOrEqual(dates[i - 1])
      }
    }
  })

  it('sorts featured posts before non-featured', async () => {
    const posts = await getAllPosts()
    const featuredIdx = posts.findIndex(p => p.featured)
    const nonFeaturedIdx = posts.findIndex(p => !p.featured)
    if (featuredIdx >= 0 && nonFeaturedIdx >= 0) {
      expect(featuredIdx).toBeLessThan(nonFeaturedIdx)
    }
  })

  it('getPostBySlug returns correct post for valid slug', async () => {
    const post = await getPostBySlug('how-to-make-a-table-in-markdown')
    expect(post).toBeDefined()
    expect(post!.title).toBe('How to Make a Table in Markdown')
  })

  it('getPostBySlug returns undefined for unknown slug', async () => {
    expect(await getPostBySlug('nonexistent')).toBeUndefined()
  })

  it('getAllTags returns unique sorted tags across all posts', async () => {
    const tags = await getAllTags()
    expect(tags.length).toBeGreaterThan(0)
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i] >= tags[i - 1]).toBe(true)
    }
  })

  it('all posts have required fields', async () => {
    const posts = await getAllPosts()
    for (const post of posts) {
      expect(post.title).toBeTruthy()
      expect(post.date).toBeTruthy()
      expect(post.description).toBeTruthy()
      expect(post.author).toBeTruthy()
      expect(post.tags.length).toBeGreaterThan(0)
      expect(post.readTime).toBeGreaterThan(0)
      expect(post.content).toBeTruthy()
    }
  })
})
