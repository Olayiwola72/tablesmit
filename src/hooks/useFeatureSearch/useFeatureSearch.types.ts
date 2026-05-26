import type { FeaturePage } from '../../services/featureService/featureService.types'

export interface UseFeatureSearchResult {
  query: string
  setQuery: (query: string) => void
  results: FeaturePage[]
  totalResults: number
}
