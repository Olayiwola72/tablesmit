import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-merge-cells-in-online-table',
  title: 'How to Merge Cells in an Online Table',
  date: '2026-05-15',
  description:
    'Most web table tools do not support cell merging. Here is how to merge and unmerge cells in Tablesmit — and when to use it in your tables.',
  author: 'Olayiwola Akinnagbe',
  tags: ['merge cells', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## What is cell merging?

Cell merging combines two or more adjacent cells into one. The merged cell spans the space of all the cells it absorbed.

You see it constantly in professional tables:

- A header that spans multiple columns ("Q1 Performance" covering January, February, March)
- A row label that spans multiple rows ("North Region" covering five city entries)
- A summary row that uses a single wide cell for a note or total label

In Excel, merging is a basic operation available from the toolbar or the Format Cells dialog. In most web-based table tools, it is simply not available.

## Why most web table tools do not support it

Cell merging is genuinely difficult to implement in a web table editor. The underlying data model has to track which cells are the "anchor" of a merge, which cells are hidden by the merge, and what happens to that data when the user unmerges, inserts rows, sorts, or exports.

Most tools skip it entirely rather than implement it correctly. The result is a category of table tools that works well for simple grids but fails the moment a table needs any structural complexity.

## How to merge cells in Tablesmit

Tablesmit supports merging any rectangular range. Here are both ways to do it:

### Method 1: Select and click

1. Click the first cell in the range you want to merge
2. Hold Shift and click the last cell in the range — the entire rectangular area highlights
3. Click the **Merge** button in the toolbar

The selected range collapses into a single cell. The content of the top-left cell is preserved. Content from other cells in the range is discarded — so fill the anchor cell first.

### Method 2: Right-click

1. Click any cell to select it
2. Hold Shift and click to extend the selection
3. Right-click anywhere within the selection
4. Choose **Merge cells** from the context menu

Both methods produce the same result.

## How to unmerge

Click on any merged cell. A single click selects it. Then either:
- Click the **Unmerge** button in the toolbar
- Right-click and choose **Unmerge cells**

The merged cell splits back into its original cells. Content returns to the top-left cell. Other cells are empty.

## Practical examples

### Spanning column header

For a table comparing quarterly performance across three categories, you might want a single "Q1" header that spans January, February, and March:

| Q1 Performance |||
|---|---|---|
| January | February | March |
| 48,200 | 51,400 | 49,800 |

Build this by creating the table, entering the data, then selecting the top three cells of the first row and merging them. Type "Q1 Performance" in the merged cell.

### Row group label

For a regional breakdown where multiple city rows belong to the same region:

| Region | City | Revenue |
|---|---|---|
| North | Kano | 182,000 |
| | Kaduna | 147,000 |
| | Zaria | 93,000 |
| South | Lagos | 384,000 |

The "North" and "South" labels in the first column span multiple rows. Build the full table first, then merge the region label cells vertically.

### Summary row

For a table that ends with a note or footnote spanning the full width:
Merge all cells in the last row to create a single wide cell for the note text.

## What happens on export?

Merged cells export correctly across all formats:

- **PDF and PNG** — the merged cell renders exactly as it appears in the editor
- **Excel** — the exported .xlsx file uses Excel's native merge, which opens correctly in Excel and Google Sheets
- **CSV** — merge information cannot be represented in CSV; the anchor cell's value is written and merged cells are empty

[Build your table in Tablesmit](/) — merge cells included.`,
  relatedFeature: 'merge-cells',
}

export default post
