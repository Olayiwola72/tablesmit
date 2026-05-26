import { useState, useMemo } from 'react'
import type { FeaturePage } from '../../services/featureService/featureService.types'
import type { UseFeatureSearchResult } from './useFeatureSearch.types'
import { searchItems } from '../../utils/searchUtils/searchUtils'

export function useFeatureSearch(features: FeaturePage[]): UseFeatureSearchResult {
  const [query, setQuery] = useState('')

  const results = useMemo(
    () =>
      searchItems({
        items: features,
        query,
        fields: feature => [
          feature.heroHeadline,
          feature.metaTitle,
          feature.metaDescription,
          feature.heroSubtext,
        ],
        boostField: feature => feature.heroHeadline,
      }),
    [features, query],
  )

  return {
    query,
    setQuery,
    results,
    totalResults: results.length,
  }
}
