import { describe, it, expect } from 'vitest'
import { parseMarkdownTable } from '../../../utils/markdownUtils/markdownToCells'

describe('parseMarkdownTable', () => {
  it('returns null for empty string', () => {
    expect(parseMarkdownTable('')).toBeNull()
  })

  it('returns null for plain text without a table separator', () => {
    expect(parseMarkdownTable('just some text')).toBeNull()
  })

  it('returns null for text with separator but no header row', () => {
    const md = `| --- | --- |`
    expect(parseMarkdownTable(md)).toBeNull()
  })

  it('returns null for text with separator but no body rows', () => {
    const md = `| H1 | H2 |\n| --- | --- |`
    expect(parseMarkdownTable(md)).toBeNull()
  })

  it('parses a basic Markdown table', () => {
    const md = [
      '| Name | Age |',
      '|------|-----|',
      '| Alice | 30 |',
      '| Bob   | 25 |',
    ].join('\n')

    expect(parseMarkdownTable(md)).toEqual([
      ['Name', 'Age'],
      ['Alice', '30'],
      ['Bob', '25'],
    ])
  })

  it('trims whitespace from cell values', () => {
    const md = [
      '|  Product  |  Price  |',
      '|-----------|---------|',
      '|  Widget   |  9.99   |',
    ].join('\n')

    const result = parseMarkdownTable(md)
    expect(result![0]).toEqual(['Product', 'Price'])
    expect(result![1]).toEqual(['Widget', '9.99'])
  })

  it('handles separator with colons (alignment markers)', () => {
    const md = [
      '| Left | Center | Right |',
      '|:-----|:------:|------:|',
      '| A    | B      | C     |',
    ].join('\n')

    expect(parseMarkdownTable(md)).toEqual([
      ['Left', 'Center', 'Right'],
      ['A', 'B', 'C'],
    ])
  })

  it('normalises rows with differing column counts', () => {
    const md = [
      '| A | B | C |',
      '|---|---|---|',
      '| 1 | 2 |',
      '| 3 |',
    ].join('\n')

    const result = parseMarkdownTable(md)
    expect(result).toHaveLength(3)
    expect(result![0]).toHaveLength(3)
    expect(result![1]).toHaveLength(3)
    expect(result![2]).toHaveLength(3)
    expect(result![1]).toEqual(['1', '2', ''])
    expect(result![2]).toEqual(['3', '', ''])
  })

  it('handles pipes inside cell values gracefully', () => {
    const md = [
      '| Command | Description |',
      '|---------|-------------|',
      '| `echo`  | Print text  |',
    ].join('\n')

    const result = parseMarkdownTable(md)
    expect(result![1][0]).toBe('`echo`')
    expect(result![1][1]).toBe('Print text')
  })

  it('handles table with no leading/trailing spaces on separator', () => {
    const md = [
      '|H1|H2|',
      '|---|---|',
      '|A|B|',
    ].join('\n')

    expect(parseMarkdownTable(md)).toEqual([
      ['H1', 'H2'],
      ['A', 'B'],
    ])
  })

  it('ignores empty lines in the input', () => {
    const md = [
      '',
      '| Name | Age |',
      '|------|-----|',
      '| Alice | 30 |',
      '',
    ].join('\n')

    expect(parseMarkdownTable(md)).toEqual([
      ['Name', 'Age'],
      ['Alice', '30'],
    ])
  })

  it('returns null for line without pipe at start', () => {
    expect(parseMarkdownTable('Name | Age\n--- | ---\nAlice | 30')).toBeNull()
  })
})
