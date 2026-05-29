import { useState, useMemo } from 'react'
import type { BlogPost } from '@/services/blogService/blogService.types'
import type { UseBlogSearchResult } from './useBlogSearch.types'
import { searchItems } from '../../utils/searchUtils/searchUtils'

export function useBlogSearch(posts: BlogPost[]): UseBlogSearchResult {
  const [query, setQuery] = useState('')

  const results = useMemo(
    () =>
      searchItems({
        items: posts,
        query,
        fields: post => [post.title, post.description, post.content, post.author, ...post.tags],
        boostField: post => post.title,
      }),
    [posts, query],
  )

  return {
    query,
    setQuery,
    results,
    totalResults: results.length,
  }
}
