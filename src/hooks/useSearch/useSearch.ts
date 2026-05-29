import { useState, useMemo } from 'react'
import type { UseSearchConfig, UseSearchResult } from './useSearch.types'
import { searchItems } from '../../utils/searchUtils/searchUtils'

export function useSearch<T>(config: UseSearchConfig<T>): UseSearchResult<T> {
  const [query, setQuery] = useState('')

  const results = useMemo(
    () =>
      searchItems({
        items: config.items,
        query,
        fields: config.fields,
        boostField: config.boostField,
      }),
    [config.items, query, config.fields, config.boostField],
  )

  return {
    query,
    setQuery,
    results,
    totalResults: results.length,
  }
}
