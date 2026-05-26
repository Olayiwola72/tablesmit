import type { SearchConfig } from './searchUtils.types'

export function searchItems<T>(config: SearchConfig<T>): T[] {
  const q = config.query.trim().toLowerCase()
  if (!q) return config.items

  return config.items
    .filter(item => {
      const searchable = config.fields(item).join(' ').toLowerCase()
      return searchable.includes(q)
    })
    .sort((a, b) => {
      if (!config.boostField) return 0
      const aMatch = config.boostField(a).toLowerCase().includes(q) ? 0 : 1
      const bMatch = config.boostField(b).toLowerCase().includes(q) ? 0 : 1
      return aMatch - bMatch
    })
}
