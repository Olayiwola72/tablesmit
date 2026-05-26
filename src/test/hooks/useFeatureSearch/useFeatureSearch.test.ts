import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { FeaturePage } from '../../../services/featureService/featureService.types'
import { useFeatureSearch } from '../../../hooks/useFeatureSearch/useFeatureSearch'

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

describe('useFeatureSearch', () => {
  it('returns all features when query is empty', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    expect(result.current.results).toHaveLength(5)
    expect(result.current.totalResults).toBe(5)
  })

  it('filters by heroHeadline case-insensitively', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    act(() => result.current.setQuery('export'))
    expect(result.current.results).toHaveLength(2)
    expect(result.current.results.map(r => r.slug)).toContain('pdf-export')
    expect(result.current.results.map(r => r.slug)).toContain('excel-export')
  })

  it('filters by metaTitle', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    act(() => result.current.setQuery('merge cells'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('merge-cells')
  })

  it('filters by metaDescription', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    act(() => result.current.setQuery('clipboard'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('smart-paste')
  })

  it('filters by heroSubtext', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    act(() => result.current.setQuery('further analysis'))
    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0].slug).toBe('excel-export')
  })

  it('returns empty array when no features match', () => {
    const { result } = renderHook(() => useFeatureSearch(mockFeatures))
    act(() => result.current.setQuery('zzzzzzz'))
    expect(result.current.results).toHaveLength(0)
  })

  describe('ranking', () => {
    it('puts heroHeadline matches before non-headline matches', () => {
      const { result } = renderHook(() => useFeatureSearch(mockFeatures))
      act(() => result.current.setQuery('import'))
      const slugs = result.current.results.map(r => r.slug)
      const headlineMatch = slugs.indexOf('csv-import')
      slugs.forEach((slug, i) => {
        if (slug === 'csv-import') return
        expect(i).toBeGreaterThan(headlineMatch)
      })
    })

    it('preserves original order among headline-matched items', () => {
      const { result } = renderHook(() => useFeatureSearch(mockFeatures))
      act(() => result.current.setQuery('export'))
      expect(result.current.results.map(r => r.slug)).toEqual([
        'pdf-export',
        'excel-export',
      ])
    })
  })
})
