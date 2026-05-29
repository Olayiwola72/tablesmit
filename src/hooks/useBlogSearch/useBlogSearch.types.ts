import type { BlogPost } from '@/services/blogService/blogService.types'

export interface UseBlogSearchResult {
  query: string
  setQuery: (query: string) => void
  results: BlogPost[]
  totalResults: number
}
