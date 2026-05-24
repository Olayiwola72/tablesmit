import { describe, expect, it } from 'vitest'
import { parseFrontmatter } from '../../../../scripts/md-to-blog-post'

describe('parseFrontmatter', () => {
  it('returns empty frontmatter and raw content when no frontmatter is present', () => {
    const raw = 'Just a plain markdown file.\n\nNo frontmatter here.'
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter).toEqual({})
    expect(content).toBe(raw)
  })

  it('parses frontmatter fields and returns remaining content', () => {
    const raw = `---
title: My Post
author: Olayiwola Akinnagbe
date: 2025-09-15
---

This is the article body.

With multiple paragraphs.`
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter).toEqual({
      title: 'My Post',
      author: 'Olayiwola Akinnagbe',
      date: '2025-09-15',
    })
    expect(content).toContain('This is the article body.')
    expect(content).toContain('With multiple paragraphs.')
  })

  it('strips surrounding quotes from frontmatter values', () => {
    const raw = `---
title: "My Quoted Title"
author: 'Author Name'
---

Body text.`
    const { frontmatter } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('My Quoted Title')
    expect(frontmatter.author).toBe('Author Name')
  })

  it('handles empty frontmatter delimiter (--- with nothing inside)', () => {
    const raw = `---
---

Body content.`
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter).toEqual({})
    // No actual frontmatter between the delimiters — regex does not match,
    // so the full raw string is returned as content
    expect(content).toBe(raw)
  })

  it('handles tags field as comma-separated values', () => {
    const raw = `---
tags: markdown, tutorial, tables
---

Content.`
    const { frontmatter } = parseFrontmatter(raw)
    expect(frontmatter.tags).toBe('markdown, tutorial, tables')
  })

  it('trims whitespace from frontmatter keys and values', () => {
    const raw = `---
   title  :   Spaced Out
  author : Someone
---

Body.`
    const { frontmatter } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('Spaced Out')
    expect(frontmatter.author).toBe('Someone')
  })

  it('ignores malformed lines without a colon separator', () => {
    const raw = `---
title: Valid Title
no-separator-here
also-bad
---

Content.`
    const { frontmatter } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('Valid Title')
    expect(Object.keys(frontmatter)).toHaveLength(1)
  })

  it('parses content that includes code blocks with triple backticks', () => {
    const raw = `---
title: Code Example
---

\`\`\`ts
const x = 1
\`\`\`

More text.`
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('Code Example')
    expect(content).toContain('```ts')
  })

  it('parses content that includes internal --- lines (not frontmatter)', () => {
    const raw = `---
title: Contains Dashes
---

Here is a horizontal rule:

---

And more text.`
    const { frontmatter, content } = parseFrontmatter(raw)
    expect(frontmatter.title).toBe('Contains Dashes')
    expect(content).toContain('horizontal rule')
  })
})
