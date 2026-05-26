export interface SearchConfig<T> {
  items: T[]
  query: string
  fields: (item: T) => string[]
  boostField?: (item: T) => string
}
