import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { BlogPost } from '../../../services/blogService/blogService.types'
import type { FeaturePage } from '../../../services/featureService/featureService.types'
import { useSearch } from '../../../hooks/useSearch/useSearch'

const blogSearchConfig = {
  fields: (post: BlogPost) => [post.title, post.description, post.content, post.author, ...post.tags],
  boostField: (post: BlogPost) => post.title,
}

const mockPosts: BlogPost[] = [
  {
    slug: 'how-to-make-a-table',
    title: 'How to Make a Table in Markdown',
    date: '2026-04-10',
    description: 'A practical guide to creating clean tables in Markdown.',
    author: 'Olayiwola Akinnagbe',
    tags: ['markdown', 'tutorial'],
    readTime: 4,
    featured: false,
    content: 'Markdown tables look complex but follow a simple pattern.\n\n## Getting Started',
  },
  {
    slug: 'export-table-to-pdf',
    title: 'How to Export a Table to PDF',
    date: '2026-04-19',
    description: 'Export your tables to PDF from your browser.',
    author: 'Olayiwola Akinnagbe',
    tags: ['export', 'pdf'],
    readTime: 3,
    featured: false,
    content: 'Exporting tables to PDF is straightforward with the right tools.',
  },
  {
    slug: 'merge-cells-online',
    title: 'How to Merge Cells in an Online Table',
    date: '2026-05-15',
    description: 'Merge cells to create clean table layouts.',
    author: 'Jane Doe',
    tags: ['merge', 'formatting'],
    readTime: 2,
    featured: true,
    content: 'Merging cells helps you create better table structures.',
  },
  {
    slug: 'copy-excel-table-to-web',
    title: 'Copy Excel Table to Web',
    date: '2026-04-01',
    description: 'Paste Excel tables directly into online table builders.',
    author: 'Olayiwola Akinnagbe',
    tags: ['excel', 'import', 'paste'],
    readTime: 5,
    featured: false,
    content: 'Excel integration makes data transfer seamless.',
  },
  {
    slug: 'best-table-tool-for-researchers',
    title: 'Best Table Tool for Researchers',
    date: '2026-05-14',
    description: 'Find the best table tool for academic research.',
    author: 'Olayiwola Akinnagbe',
    tags: ['research', 'academic'],
    readTime: 6,
    featured: false,
    content: 'Researchers need powerful yet simple table editing tools.',
  },
  {
    slug: 'writing-tips-academic-papers',
    title: 'Writing Tips for Academic Papers',
    date: '2026-05-10',
    description: 'Improve your academic writing with these tips.',
    author: 'Olayiwola Akinnagbe',
    tags: ['writing', 'academic'],
    readTime: 3,
    featured: false,
    content: 'Good academic writing requires clear table formatting and structured data presentation.',
  },
]

const featureSearchConfig = {
  fields: (feature: FeaturePage) => [
    feature.heroHeadline,
    feature.metaTitle,
    feature.metaDescription,
    feature.heroSubtext,
  ],
  boostField: (feature: FeaturePage) => feature.heroHeadline,
}

const mockFeatures: FeaturePage[] = [
  {
    slug: 'pdf-export',
    metaTitle: 'Export Table to PDF',
    metaDescription: 'Export your tables to PDF format online.',
    heroHeadline: 'PDF Export',
    heroSubtext: 'Export tables to PDF with one click.',
    icon: 'file-text',
    benefits: [],
    steps: [],
    useCases: [],
    relatedFeatures: [],
  },
  {
    slug: 'excel-export',
    metaTitle: 'Export Table to Excel',
    metaDescription: 'Export your tables to Excel sheets.',
    heroHeadline: 'Excel Export',
    heroSubtext: 'Export to Excel for further analysis.',
    icon: 'file-spreadsheet',
    benefits: [],
    steps: [],
    useCases: [],
    relatedFeatures: [],
  },
  {
    slug: 'csv-import',
    metaTitle: 'Import CSV to Table',
    metaDescription: 'Import CSV files directly into your table.',
    heroHeadline: 'CSV Import',
    heroSubtext: 'Quickly import data from CSV files.',
    icon: 'upload',
    benefits: [],
    steps: [],
    useCases: [],
    relatedFeatures: [],
  },
  {
    slug: 'merge-cells',
    metaTitle: 'Merge Cells Online',
    metaDescription: 'Merge table cells to create clean layouts.',
    heroHeadline: 'Merge Cells',
    heroSubtext: 'Combine cells for better table structure.',
    icon: 'combine',
    benefits: [],
    steps: [],
    useCases: [],
    relatedFeatures: [],
  },
  {
    slug: 'smart-paste',
    metaTitle: 'Smart Paste from Excel',
    metaDescription: 'Paste Excel data directly into tables.',
    heroHeadline: 'Smart Paste',
    heroSubtext: 'Import with smart clipboard paste from spreadsheets.',
    icon: 'clipboard-paste',
    benefits: [],
    steps: [],
    useCases: [],
    relatedFeatures: [],
  },
]

describe('useSearch<BlogPost>', () => {
  it('returns all posts when query is empty', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    expect(result.current.results).toHaveLength(6)
    expect(result.current.totalResults).toBe(6)
  })

  it('returns all posts when query is whitespace only', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('   '))
    expect(result.current.results).toHaveLength(6)
  })

  it('filters posts by title case-insensitively', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('markdown'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('how-to-make-a-table')
  })

  it('filters posts by description case-insensitively', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('export'))
    expect(result.current.results.length).toBeGreaterThanOrEqual(1)
    expect(result.current.results.map(r => r.slug)).toContain('export-table-to-pdf')
  })

  it('filters posts by content case-insensitively', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('merging cells'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('merge-cells-online')
  })

  it('filters posts by tag case-insensitively', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('excel'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('copy-excel-table-to-web')
  })

  it('filters posts by author', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('jane'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('merge-cells-online')
  })

  it('returns empty array when no posts match', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('zzzzzzz'))
    expect(result.current.results).toHaveLength(0)
    expect(result.current.totalResults).toBe(0)
  })

  it('updates query when setQuery is called', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    expect(result.current.query).toBe('')
    act(() => result.current.setQuery('pdf'))
    expect(result.current.query).toBe('pdf')
  })

  it('works with empty posts array', () => {
    const { result } = renderHook(() => useSearch({ items: [], ...blogSearchConfig }))
    expect(result.current.results).toHaveLength(0)
    expect(result.current.totalResults).toBe(0)
  })

  it('memoizes results reference when query stays the same', () => {
    const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
    act(() => result.current.setQuery('table'))
    const first = result.current.results
    act(() => result.current.setQuery('table'))
    expect(result.current.results).toBe(first)
  })

  describe('ranking', () => {
    it('puts title matches before non-title matches', () => {
      const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
      act(() => result.current.setQuery('academic'))
      const slugs = result.current.results.map(r => r.slug)
      const titleSlug = 'writing-tips-academic-papers'
      const nonTitleSlug = 'best-table-tool-for-researchers'
      expect(slugs.indexOf(titleSlug)).toBeLessThan(slugs.indexOf(nonTitleSlug))
    })

    it('preserves original order among title matches', () => {
      const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
      act(() => result.current.setQuery('table'))
      const slugs = result.current.results.map(r => r.slug)
      const titleSlugs = slugs.filter(s =>
        mockPosts.find(p => p.slug === s)?.title.toLowerCase().includes('table'),
      )
      const originalOrder = mockPosts
        .filter(p => p.title.toLowerCase().includes('table'))
        .map(p => p.slug)
      expect(titleSlugs).toEqual(originalOrder)
    })

    it('does not reorder when all matches have titles', () => {
      const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
      act(() => result.current.setQuery('markdown'))
      expect(result.current.results.map(r => r.slug)).toEqual(['how-to-make-a-table'])
    })

    it('ranks title matches before non-title matches in mixed results', () => {
      const { result } = renderHook(() => useSearch({ items: mockPosts, ...blogSearchConfig }))
      act(() => result.current.setQuery('academic'))
      const slugs = result.current.results.map(r => r.slug)
      expect(slugs).toEqual([
        'writing-tips-academic-papers',
        'best-table-tool-for-researchers',
      ])
    })
  })
})

describe('useSearch<FeaturePage>', () => {
  it('returns all features when query is empty', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    expect(result.current.results).toHaveLength(5)
    expect(result.current.totalResults).toBe(5)
  })

  it('filters by heroHeadline case-insensitively', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    act(() => result.current.setQuery('export'))
    expect(result.current.results).toHaveLength(2)
    expect(result.current.results.map(r => r.slug)).toContain('pdf-export')
    expect(result.current.results.map(r => r.slug)).toContain('excel-export')
  })

  it('filters by metaTitle', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    act(() => result.current.setQuery('merge cells'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('merge-cells')
  })

  it('filters by metaDescription', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    act(() => result.current.setQuery('clipboard'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('smart-paste')
  })

  it('filters by heroSubtext', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    act(() => result.current.setQuery('further analysis'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('excel-export')
  })

  it('returns empty array when no features match', () => {
    const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
    act(() => result.current.setQuery('zzzzzzz'))
    expect(result.current.results).toHaveLength(0)
  })

  describe('ranking', () => {
    it('puts heroHeadline matches before non-headline matches', () => {
      const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
      act(() => result.current.setQuery('import'))
      const slugs = result.current.results.map(r => r.slug)
      const headlineMatch = slugs.indexOf('csv-import')
      slugs.forEach((slug, i) => {
        if (slug === 'csv-import') return
        expect(i).toBeGreaterThan(headlineMatch)
      })
    })

    it('preserves original order among headline-matched items', () => {
      const { result } = renderHook(() => useSearch({ items: mockFeatures, ...featureSearchConfig }))
      act(() => result.current.setQuery('export'))
      expect(result.current.results.map(r => r.slug)).toEqual([
        'pdf-export',
        'excel-export',
      ])
    })
  })
})
