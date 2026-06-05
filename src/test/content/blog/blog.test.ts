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

  describe('SEO compliance', () => {
    it('all titles are ≤48 characters', () => {
      for (const post of posts) {
        expect(
          post.title.length,
          `${post.slug}: title "${post.title}" is ${post.title.length} chars`
        ).toBeLessThanOrEqual(48)
      }
    })

    it('all descriptions are 140–155 characters', () => {
      for (const post of posts) {
        expect(
          post.description.length,
          `${post.slug}: description is ${post.description.length} chars`
        ).toBeGreaterThanOrEqual(140)
        expect(
          post.description.length,
          `${post.slug}: description is ${post.description.length} chars`
        ).toBeLessThanOrEqual(155)
      }
    })

    it('all descriptions contain the slug-derived keyword as a substring', () => {
      for (const post of posts) {
        const keyword = post.slug.replace(/-/g, ' ')
        expect(
          post.description.toLowerCase(),
          `${post.slug}: description missing keyword "${keyword}"`
        ).toContain(keyword)
      }
    })

    it('all content has at least 2 internal links', () => {
      for (const post of posts) {
        const links = post.content.match(/\]\(\//g)
        const count = links ? links.length : 0
        expect(
          count,
          `${post.slug}: has ${count} internal link(s)`
        ).toBeGreaterThanOrEqual(2)
      }
    })

    it('all content contains the slug-derived keyword in the first ~100 words', () => {
      for (const post of posts) {
        const keyword = post.slug.replace(/-/g, ' ')
        const opening = post.content.slice(0, 600).toLowerCase()
        expect(
          opening,
          `${post.slug}: keyword "${keyword}" not found in first 600 chars`
        ).toContain(keyword)
      }
    })
  })

  it('relatedFeature references an existing feature page slug when present', () => {
    const features = ['merge-cells', 'pdf-export', 'latex-export', 'freeze-panes', 'column-sorting',
      'find-replace', 'csv-import', 'copy-table', 'templates', 'dark-mode', 'offline', 'column-types',
      'border-styles', 'context-menu', 'custom-headers', 'excel-import', 'table-caption', 'table-themes',
      'undo', 'auto-sum', 'drag-to-resize', 'image-export', 'keyboard-shortcuts', 'ai-features',
      'markdown-table', 'academic-tables', 'accessible-tables', 'smart-paste']
    for (const post of posts) {
      if (post.relatedFeature) {
        expect(features).toContain(post.relatedFeature)
      }
    }
  })
})
