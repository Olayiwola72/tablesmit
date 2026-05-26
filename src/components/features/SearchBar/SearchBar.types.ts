export interface SearchBarProps {
  query: string
  onQueryChange: (value: string) => void
  totalResults: number
  totalItems: number
  placeholder?: string
}
