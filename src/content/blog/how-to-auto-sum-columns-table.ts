import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-auto-sum-columns-table',
  title: 'How to Auto-Sum Columns in an Online Table',
  date: '2026-05-25',
  description:
    'Need a total row at the bottom of your table? Enable Auto-Sum on any Number, Currency, or Percentage column. Tablesmit calculates it for you.',
  author: 'Olayiwola Akinnagbe',
  tags: ['auto-sum', 'numbers', 'productivity', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## A table that adds itself

You are building a budget table. Six rows of expenses. One column for amounts. You reach for a calculator, or you copy the data into a spreadsheet just to get a total.

Tablesmit has a better way: Auto-Sum.

## How Auto-Sum works

Any column formatted as **Number**, **Currency**, or **Percentage** can display a running total at the bottom of the table:

1. Click the column header to select the column.
2. Open the **Column Type** panel in the right sidebar.
3. Set the column type to Number, Currency, or Percentage.
4. Toggle **Show sum row** on.

A non-editable footer row appears below the table. The footer cell for that column displays the sum of all non-empty cells. The footer is styled in a muted surface colour to distinguish it from data rows.

## What gets summed

- Every cell with a valid numeric value in that column
- Positive and negative numbers
- Decimal values

Cells containing text, empty cells, and non-numeric content are ignored. If every cell in the column is empty or non-numeric, the footer shows nothing.

## Auto-Sum across multiple columns

Each column is independent. You can enable Auto-Sum on one column or all of them. A table tracking monthly revenue might have Auto-Sum on the Revenue column and the Expenses column, while the Notes column stays text-only.

## Auto-Sum in exports

Sum rows are excluded from some exports and included in others:

- **PDF** — included, styled as the footer
- **Excel** — included as a formula row (=SUM)
- **PNG / JPEG** — included, rendered as shown
- **CSV** — excluded (CSV is raw data only)
- **LaTeX** — included as a \\hline + sum row at the bottom

## Auto-Numbering

Related feature: columns with type **Number** also support **Auto-Numbering**. Toggle it on and the column fills with sequential integers (1, 2, 3…). Insert a row, and the numbers re-sequence automatically. Cells are read-only while auto-numbering is active — shown with a small lock icon.

## When to use Auto-Sum

- **Budget tables** — total expenses, total revenue, net balance
- **Survey results** — total responses per category
- **Inventory lists** — total quantity and total value
- **Time tracking** — total hours across projects

Any column where the last question is "what is the total?".

## Quick start

Select a numeric column. Open Column Type. Choose Currency. Toggle Show sum row. Your table now has a running total — updated automatically as you edit.`,
  relatedFeature: 'auto-sum',
}

export default post
