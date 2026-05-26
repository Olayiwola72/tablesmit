import { describe, expect, it } from 'vitest'
import {
  STATIC_ROUTES,
  getBlogRoutes,
  getFeatureRoutes,
  getAllRoutes,
  parseArgs,
  PRERENDER_OUT_DIR,
} from '../../../../scripts/prerender'

describe('STATIC_ROUTES', () => {
  it('does NOT include the homepage', () => {
    expect(STATIC_ROUTES).not.toContain('/')
  })

  it('includes all expected content pages', () => {
    const locs = STATIC_ROUTES
    expect(locs).toContain('/about')
    expect(locs).toContain('/open-source')
    expect(locs).toContain('/blog')
    expect(locs).toContain('/features')
    expect(locs).toContain('/contact')
    expect(locs).toContain('/privacy')
    expect(locs).toContain('/terms')
    expect(locs).toContain('/changelog')
    expect(locs).toContain('/testimonials')
  })
})

describe('getBlogRoutes', () => {
  it('returns an empty array when blog directory does not exist', () => {
    const routes = getBlogRoutes(
      '/tmp/nonexistent',
      () => false,
      () => [],
    )
    expect(routes).toEqual([])
  })

  it('returns blog routes from filenames', () => {
    const routes = getBlogRoutes(
      '/tmp/content',
      () => true,
      () => ['hello-world.ts', 'another-post.ts'],
    )
    expect(routes).toEqual(['/blog/hello-world', '/blog/another-post'])
  })

  it('ignores non-TS files in the blog directory', () => {
    const routes = getBlogRoutes(
      '/tmp/content',
      () => true,
      () => ['hello-world.ts', 'image.png', '.DS_Store'],
    )
    expect(routes).toEqual(['/blog/hello-world'])
  })
})

describe('getFeatureRoutes', () => {
  it('returns an empty array when features directory does not exist', () => {
    const routes = getFeatureRoutes(
      '/tmp/nonexistent',
      () => false,
      () => [],
      () => '',
    )
    expect(routes).toEqual([])
  })

  it('reads slug from JSON when present', () => {
    const routes = getFeatureRoutes(
      '/tmp/content',
      () => true,
      () => ['excel-export.json'],
      () => JSON.stringify({ slug: 'excel-export', title: 'Excel Export' }),
    )
    expect(routes).toEqual(['/features/excel-export'])
  })

  it('falls back to filename when JSON has no slug field', () => {
    const routes = getFeatureRoutes(
      '/tmp/content',
      () => true,
      () => ['pdf-export.json'],
      () => JSON.stringify({ title: 'PDF Export' }),
    )
    expect(routes).toEqual(['/features/pdf-export'])
  })

  it('falls back to filename when JSON is invalid', () => {
    const routes = getFeatureRoutes(
      '/tmp/content',
      () => true,
      () => ['broken.json'],
      () => '{ invalid json }',
    )
    expect(routes).toEqual(['/features/broken'])
  })

  it('handles multiple feature files', () => {
    const files = ['merge-cells.json', 'csv-import.json', 'dark-mode.json']
    const routes = getFeatureRoutes(
      '/tmp/content',
      () => true,
      () => files,
      (p) => {
        if (p.endsWith('merge-cells.json')) return JSON.stringify({ slug: 'merge-cells' })
        if (p.endsWith('csv-import.json')) return JSON.stringify({ slug: 'csv-import' })
        return JSON.stringify({ title: 'Dark Mode' })
      },
    )
    expect(routes).toEqual(['/features/merge-cells', '/features/csv-import', '/features/dark-mode'])
  })
})

describe('getAllRoutes', () => {
  it('returns only static routes when no content dirs exist', () => {
    const routes = getAllRoutes(
      '/tmp/nonexistent',
      () => false,
      () => [],
      () => '',
    )
    expect(routes).toEqual(STATIC_ROUTES)
  })

  it('combines static, blog, and feature routes', () => {
    const routes = getAllRoutes(
      '/tmp/content',
      (p) => p.includes('blog') || p.includes('features'),
      (p) => {
        if (p.includes('blog')) return ['post.ts']
        if (p.includes('features')) return ['feature.json']
        return []
      },
      (p) => {
        if (p.endsWith('feature.json')) return JSON.stringify({ slug: 'feature' })
        return ''
      },
    )
    expect(routes).toContain('/about')
    expect(routes).toContain('/blog/post')
    expect(routes).toContain('/features/feature')
    expect(routes).not.toContain('/')
  })
})

describe('parseArgs', () => {
  it('returns the provided --out-dir resolved relative to project root', () => {
    const result = parseArgs(['node', 'script.ts', '--out-dir', 'prerendered'])
    expect(result.outDir.endsWith('/prerendered')).toBe(true)
  })

  it(`defaults to ${PRERENDER_OUT_DIR} when --out-dir is not provided`, () => {
    const result = parseArgs(['node', 'script.ts'])
    expect(result.outDir.endsWith(`/${PRERENDER_OUT_DIR}`)).toBe(true)
  })

  it(`defaults to ${PRERENDER_OUT_DIR} when only --out-dir flag is given without a value`, () => {
    const result = parseArgs(['node', 'script.ts', '--out-dir'])
    expect(result.outDir.endsWith(`/${PRERENDER_OUT_DIR}`)).toBe(true)
  })
})
