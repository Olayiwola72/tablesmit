import { describe, expect, it } from 'vitest'
import { searchItems } from '../../../utils/searchUtils/searchUtils'

interface TestItem {
  id: string
  title: string
  body: string
}

const items: TestItem[] = [
  { id: 'a', title: 'Apple Pie Recipe', body: 'How to bake a delicious apple pie.' },
  { id: 'b', title: 'Banana Bread', body: 'Easy banana bread for beginners.' },
  { id: 'c', title: 'Cherry Cobbler', body: 'A classic cherry cobbler with ice cream.' },
  { id: 'd', title: 'Date Squares', body: 'Apple and date squares make a great snack.' },
]

describe('searchItems', () => {
  it('returns all items when query is empty', () => {
    const result = searchItems({ items, query: '', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(4)
  })

  it('returns all items when query is whitespace', () => {
    const result = searchItems({ items, query: '   ', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(4)
  })

  it('filters items where any field contains the query', () => {
    const result = searchItems({ items, query: 'apple', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(2)
    expect(result.map(r => r.id)).toEqual(['a', 'd'])
  })

  it('is case-insensitive', () => {
    const result = searchItems({ items, query: 'APPLE', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(2)
  })

  it('returns empty array when no items match', () => {
    const result = searchItems({ items, query: 'zzzzz', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(0)
  })

  it('works with empty items array', () => {
    const result = searchItems({ items: [], query: 'apple', fields: i => [i.title, i.body] })
    expect(result).toHaveLength(0)
  })

  describe('boostField', () => {
    it('sorts boost-matched items first', () => {
      const result = searchItems({
        items,
        query: 'apple',
        fields: i => [i.title, i.body],
        boostField: i => i.title,
      })
      expect(result[0].id).toBe('a')
      expect(result[1].id).toBe('d')
    })

    it('preserves original order among boost-matched items', () => {
      const result = searchItems({
        items,
        query: 'a',
        fields: i => [i.title, i.body],
        boostField: i => i.title,
      })
      const boosted = result.filter(r => r.title.toLowerCase().includes('a'))
      const original = items.filter(i => i.title.toLowerCase().includes('a'))
      expect(boosted.map(r => r.id)).toEqual(original.map(i => i.id))
    })

    it('preserves original order among non-boost items', () => {
      const result = searchItems({
        items,
        query: 'apple',
        fields: i => [i.title, i.body],
        boostField: i => i.title,
      })
      expect(result[1].id).toBe('d')
    })

    it('does not reorder when boostField is omitted', () => {
      const result = searchItems({ items, query: 'apple', fields: i => [i.title, i.body] })
      expect(result.map(r => r.id)).toEqual(['a', 'd'])
    })
  })
})
