import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-make-a-table-in-markdown',
  title: 'How to Make a Table in Markdown',
  date: '2025-10-10',
  description:
    'Markdown tables are simpler than they look. Learn the syntax in five minutes — then see how Tablesmit generates them for you without writing a single pipe character.',
  author: 'Olayiwola Akinnagbe',
  tags: ['markdown', 'tutorial', 'tables'],
  readTime: 5,
  featured: false,
  content: `## The basics

A Markdown table is built from three things: pipes (\`|\`), hyphens (\`-\`), and plain text.

Here is the simplest possible table:

\`\`\`
| Name    | Role      | Location |
|---------|-----------|----------|
| Amara   | Analyst   | Lagos    |
| Kwame   | Researcher| Accra    |
| Priya   | Writer    | Mumbai   |
\`\`\`

Which renders as:

| Name    | Role       | Location |
|---------|------------|----------|
| Amara   | Analyst    | Lagos    |
| Kwame   | Researcher | Accra    |
| Priya   | Writer     | Mumbai   |

The rules are straightforward:
- The first row is always the header row
- The second row is a separator made of hyphens — at least three per column
- Every row starts and ends with \`|\`

## Controlling alignment

Add a colon to the separator row to control text alignment:

\`\`\`
| Left       | Center     | Right      |
|:-----------|:----------:|----------:|
| Text       | Text       | Text       |
\`\`\`

- \`:---\` — left-aligned (default)
- \`:---:\` — centred
- \`---:\` — right-aligned

Right alignment is particularly useful for numeric columns — it keeps decimal points and digits lined up.

## The limitations of raw Markdown tables

Markdown tables work well for simple data. But they have hard limits:

- **No merged cells.** You cannot span a cell across multiple columns or rows.
- **No custom styling.** You cannot colour a header row or change font weight.
- **No column types.** Numbers, currencies, and dates are all treated as plain text.
- **Editing is painful.** Keeping pipes aligned by hand in a code editor becomes a chore after five columns.

For publication-ready tables — a literature review, a pricing comparison, a structured dataset — raw Markdown quickly becomes the wrong tool.

## A faster way: build visually, export anywhere

Tablesmit lets you build the table with a proper editor and then use the result wherever you need it.

Here is the workflow:

1. Open [Tablesmit](/) and set your grid size
2. Fill in headers and data — click any cell to type
3. Apply a theme, set column types, resize columns by dragging
4. Copy the table — Tablesmit copies as TSV, which pastes cleanly into any Markdown editor or GitHub issue

For static site generators and documentation tools (Hugo, Jekyll, Docusaurus, MkDocs), export as CSV or copy as TSV and convert. The table you build visually renders identically in any Markdown renderer.

## When to use each approach

| Situation                             | Approach             |
|---------------------------------------|----------------------|
| Quick two-column reference list       | Write Markdown by hand |
| 5+ columns with numeric data          | Tablesmit            |
| Merged header cells needed            | Tablesmit            |
| Needs PDF or Excel export too         | Tablesmit            |
| Embedded in GitHub README             | Tablesmit → copy TSV |
| Academic paper or structured report   | Tablesmit → PDF      |

## The markdown table generator that does the work

The fastest Markdown table generator is not a syntax cheat sheet — it is a visual editor that produces clean output in whatever format you need. [Build your table in Tablesmit](/) and stop counting pipes.`,
}

export default post
