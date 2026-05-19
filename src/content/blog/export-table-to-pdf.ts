import type { BlogPost } from '../../types/blog.types'

const post: BlogPost = {
  slug: 'export-table-to-pdf',
  title: 'How to Export a Table to PDF from Your Browser',
  date: '2025-10-01',
  description: 'Exporting a table to PDF does not require special software. Here is how to do it from your browser using Tablesmit.',
  author: 'Olayiwola Akinnagbe',
  tags: ['pdf', 'export', 'tutorial'],
  readTime: 3,
  featured: false,
  content: `## Why PDF?

PDF is the most reliable format for sharing tables with others. It preserves layout, fonts, and alignment regardless of the reader's operating system or software.

## Two ways to export

### Method 1: Browser Print (Ctrl+P)

Tablesmit supports printing directly from the browser. Press Ctrl+P (or Cmd+P on Mac) and your operating system's print dialog opens with the table formatted for A4 landscape.

### Method 2: Export button

Click the PDF button in the export section of the right sidebar. Tablesmit uses jsPDF and html2canvas to render the table as a PDF document.

## Choosing the right method

| Scenario | Best method |
|----------|-------------|
| Quick print for personal use | Ctrl+P |
| Sharing with colleagues | PDF export button |
| Including in a report | PDF export button |
| Draft review | Ctrl+P |

Both methods are free and require no account.

[Open Tablesmit and export a table](/app).`,
}

export default post
