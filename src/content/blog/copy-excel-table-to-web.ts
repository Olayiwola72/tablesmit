import type { BlogPost } from '../../types/blog.types'

const post: BlogPost = {
  slug: 'copy-excel-table-to-web',
  title: 'How to Copy a Table from Excel to the Web',
  date: '2025-09-20',
  description: 'Copying tables from Excel to web tools often breaks formatting. Here is how Tablesmit\'s smart clipboard paste keeps everything intact.',
  author: 'Olayiwola Akinnagbe',
  tags: ['excel', 'clipboard', 'tutorial'],
  readTime: 3,
  featured: false,
  content: `## The Problem

You have a carefully formatted table in Excel. You copy it, paste it into a web tool, and the formatting is gone. Columns misalign. Numbers lose their format. Headers disappear.

## How Tablesmit Handles It

Tablesmit reads the HTML table data directly from your clipboard. When you paste, it detects the table structure, parses the rows and columns, and populates the grid exactly as it appeared in Excel.

### Paste behavior

- If the table is empty, Tablesmit creates a new grid matching the dimensions of your clipboard data.
- If the table already has content, the pasted data fills in starting from the selected cell, expanding the grid if necessary.

## Step-by-step

1. Select your table in Excel and copy it (Ctrl+C).
2. Open Tablesmit at [/app](/app).
3. Click into any cell and paste (Ctrl+V).
4. Your table appears — rows, columns, and data intact.

## Try it

Open [Tablesmit](/app) and paste an Excel table right now. No upload. No file selection. Just copy and paste.`,
}

export default post
