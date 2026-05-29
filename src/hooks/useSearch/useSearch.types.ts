export interface UseSearchConfig<T> {
  items: T[]
  fields: (item: T) => string[]
  boostField?: (item: T) => string
}

export interface UseSearchResult<T> {
  query: string
  setQuery: (query: string) => void
  results: T[]
  totalResults: number
}
