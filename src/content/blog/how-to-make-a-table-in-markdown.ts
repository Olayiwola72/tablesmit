import type { BlogPost } from '../../types/blog.types'

const post: BlogPost = {
  slug: 'how-to-make-a-table-in-markdown',
  title: 'How to Make a Table in Markdown',
  date: '2025-09-15',
  description: 'A practical guide to creating clean tables in Markdown — with examples you can generate in Tablesmit and paste directly.',
  author: 'Olayiwola Akinnagbe',
  tags: ['markdown', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## Introduction

Markdown tables are simpler than they look. Once you understand the pipe-and-dash syntax, you can create clean, readable tables in any Markdown environment — GitHub, Notion, Obsidian, and more.

## Basic Syntax

A Markdown table uses pipes (\`|\`) to separate columns and dashes (\`-\`) to separate the header from the body:

\`\`\`markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell A1  | Cell B1  | Cell C1  |
| Cell A2  | Cell B2  | Cell C2  |
\`\`\`

## Tips for Clean Tables

1. **Keep cells short** — long text is hard to read in a table.
2. **Align columns visually** — padding with spaces in your source makes the raw Markdown readable.
3. **Escape pipes in content** — use \`\\|\` if your cell text contains a pipe character.

## Generating Markdown Tables

Writing Markdown tables by hand is fine for 3×3 grids. For anything larger, use a table builder like Tablesmit to generate the syntax automatically.

Try it: open [Tablesmit](/app), build your table, and copy it as Markdown.`,
}

export default post
