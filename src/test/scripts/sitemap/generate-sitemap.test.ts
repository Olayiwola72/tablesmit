import { describe, expect, it } from 'vitest'
import { generateXml, getAllEntries, STATIC_PAGES } from '../../../../scripts/sitemap/generate-sitemap'

describe('STATIC_PAGES', () => {
  it('includes all expected static routes', () => {
    const locs = STATIC_PAGES.map((p) => p.loc)
    expect(locs).toContain('/')
    expect(locs).toContain('/about/')
    expect(locs).toContain('/open-source/')
    expect(locs).toContain('/blog/')
    expect(locs).toContain('/features/')
    expect(locs).toContain('/contact/')
    expect(locs).toContain('/privacy/')
    expect(locs).toContain('/terms/')
    expect(locs).toContain('/changelog/')
    expect(locs).toContain('/testimonials/')
  })

  it('homepage has weekly changefreq and priority 1.0', () => {
    const home = STATIC_PAGES.find((p) => p.loc === '/')
    expect(home?.changefreq).toBe('weekly')
    expect(home?.priority).toBe('1.0')
  })
})

describe('generateXml', () => {
  it('returns valid XML with urlset root for empty entries', () => {
    const xml = generateXml([])
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('</urlset>')
  })

  it('generates a url block for each entry', () => {
    const entries = [
      { loc: '/', changefreq: 'weekly', priority: '1.0' },
      { loc: '/about/', changefreq: 'monthly', priority: '0.7' },
    ]
    const xml = generateXml(entries)
    expect(xml).toContain('<loc>https://tablesmit.com/</loc>')
    expect(xml).toContain('<loc>https://tablesmit.com/about/</loc>')
    expect(xml).toContain('<changefreq>weekly</changefreq>')
    expect(xml).toContain('<changefreq>monthly</changefreq>')
    expect(xml).toContain('<priority>1.0</priority>')
    expect(xml).toContain('<priority>0.7</priority>')
  })

  it('includes lastmod tag when present on an entry', () => {
    const entries = [
      { loc: '/blog/post-1/', changefreq: 'monthly', priority: '0.7', lastmod: '2025-09-15' },
      { loc: '/features/excel-export/', changefreq: 'monthly', priority: '0.7' },
    ]
    const xml = generateXml(entries)
    expect(xml).toContain('<lastmod>2025-09-15</lastmod>')
    // Entry without lastmod should not have <lastmod>
    const lines = xml.split('\n').filter((l) => l.includes('/features/excel-export/'))
    expect(lines.some((l) => l.includes('<lastmod>'))).toBe(false)
  })

  it('wraps each url block in <url> tags', () => {
    const xml = generateXml([{ loc: '/test', changefreq: 'daily', priority: '0.5' }])
    expect(xml).toMatch(/<url>\s*<loc>/)
    expect(xml).toMatch(/<\/url>/)
  })
})

describe('getAllEntries', () => {
  it('returns only static pages when no blog posts or feature pages exist', () => {
    const entries = getAllEntries(
      '/tmp/content',
      () => '',
      () => false,
      () => [],
    )
    expect(entries).toHaveLength(STATIC_PAGES.length)
  })

  it('includes blog post entries when blog dir has .ts files', () => {
    const entries = getAllEntries(
      '/tmp/content',
      (p) => {
        if (p.endsWith('hello-world.ts')) {
          return [
            'const post = {',
            "  date: '2025-10-01',",
            "  title: 'Hello',",
            '}',
            'export default post',
          ].join('\n')
        }
        return ''
      },
      (p) => p.includes('blog'),
      (p) => (p.includes('blog') ? ['hello-world.ts'] : []),
    )
    const blogPostEntries = entries.filter((e) => e.loc.startsWith('/blog/') && e.loc !== '/blog/')
    expect(blogPostEntries).toHaveLength(1)
    expect(blogPostEntries[0]!.loc).toBe('/blog/hello-world/')
    expect(blogPostEntries[0]!.lastmod).toBe('2025-10-01')
  })

  it('includes feature page entries when features dir has .json files', () => {
    const entries = getAllEntries(
      '/tmp/content',
      (p) => {
        if (p.endsWith('excel-export.json')) {
          return JSON.stringify({ slug: 'excel-export', title: 'Excel Export' })
        }
        if (p.endsWith('pdf-export.json')) {
          return JSON.stringify({ title: 'PDF Export' }) // no slug → filename used
        }
        return ''
      },
      (p) => p.includes('features') || p.includes('blog'),
      (p) => {
        if (p.includes('features')) return ['excel-export.json', 'pdf-export.json']
        if (p.includes('blog')) return []
        return []
      },
    )
    const featureEntries = entries.filter((e) => e.loc.startsWith('/features/') && e.loc !== '/features/')
    expect(featureEntries).toHaveLength(2)
    expect(featureEntries[0]!.loc).toBe('/features/excel-export/')
    expect(featureEntries[1]!.loc).toBe('/features/pdf-export/')
  })

  it('returns static + blog + feature entries combined', () => {
    const entries = getAllEntries(
      '/tmp/content',
      (p) => {
        if (p.endsWith('post.ts')) {
          return [
            'const post = {',
            "  date: '2025-01-01',",
            "  title: 'Post',",
            '}',
            'export default post',
          ].join('\n')
        }
        if (p.endsWith('feature.json')) return JSON.stringify({ slug: 'feature', title: 'F' })
        return ''
      },
      (p) => p.includes('blog') || p.includes('features'),
      (p) => {
        if (p.includes('blog')) return ['post.ts']
        if (p.includes('features')) return ['feature.json']
        return []
      },
    )
    expect(entries.length).toBe(STATIC_PAGES.length + 1 + 1)
    expect(entries.filter((e) => e.loc.startsWith('/blog/') && e.loc !== '/blog/')).toHaveLength(1)
    expect(entries.filter((e) => e.loc.startsWith('/features/') && e.loc !== '/features/')).toHaveLength(1)
  })
})
