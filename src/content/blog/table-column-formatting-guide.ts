import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'table-column-formatting-guide',
  title: 'How to Format Table Columns by Type — Number, Currency, Date, and More',
  date: '2026-05-22',
  description:
    'Not every column should behave like plain text. Here is a practical guide to column formats and when each one makes your table clearer.',
  author: 'Olayiwola Akinnagbe',
  tags: ['column formatting', 'column types', 'guide'],
  readTime: 5,
  featured: false,
  content: `## Why column types matter

A table where every cell is plain text works for simple lists. But as soon as your table contains numbers, dates, or prices, treating everything as text creates problems. Numbers do not align properly. Dates display in inconsistent formats. Currency values mix symbols and decimals in unpredictable ways.

Column types solve this by telling the table how to display and handle each column's content. The underlying data stays the same — the column type only changes how it is presented and, in some cases, how it behaves.

## The available column types

Tablesmit supports six column types. Each one is selected per column from the Column Formatting panel in the right sidebar.

### Text

The default type. Content is displayed as-is with left alignment. Use this for names, descriptions, categories, and any column where the values are not numeric or date-based.

### Number

Right-aligned with consistent decimal formatting. Use this for quantities, counts, ratings, and any numeric data where the decimal precision should be uniform. Numbers sort correctly regardless of whether they contain decimals or commas.

### Currency

Right-aligned with the currency symbol and two decimal places. Use this for prices, budgets, costs, and any monetary value. The symbol and formatting are consistent across all cells in the column regardless of how you entered the value.

### Percentage

Displays values with a percentage sign and configurable decimal places. Enter "12.5" and it displays as "12.50%". Use this for growth rates, completion percentages, tax rates, and similar metrics.

### Date

Normalises date display to a consistent format regardless of how the date was entered. Type "jan 15" and it displays as "2025-01-15". Use this for deadlines, publication dates, meeting dates, and any column where date consistency matters.

### Sum

Identical to Number in display but adds a non-editable footer row that displays the sum of all non-empty cells in the column. Only columns containing numeric values should use this type — text values are ignored in the sum.

### Auto-number

Fills the column with sequential integers starting from 1. Cells are read-only while this type is active. Inserting or deleting rows re-sequences the entire column automatically. Use this for row numbering, index columns, and any situation where you need a stable ordered identifier.

## Which type to choose

| Content you are entering | Use this type |
|---|---|
| Names, notes, categories, descriptions | Text |
| Quantities, counts, scores | Number |
| Prices, budgets, costs | Currency |
| Growth rates, completion, tax rates | Percentage |
| Deadlines, publication dates | Date |
| A column of numbers you want to total | Sum |
| Row numbering or sequential IDs | Auto-number |

## How column types affect export

Column types are preserved in Excel and PDF exports. A column set to Currency exports with the currency symbol in Excel. A column set to Date exports with the same consistent format.

CSV export ignores column types — CSV is a plain-text format with no formatting metadata. LaTeX export preserves alignment and numeric formatting.

## Changing a column type

Types are safe to change at any point. Switching from Text to Number does not erase your data — it only changes how the existing values are displayed. If a value cannot be interpreted as a number, it displays as-is and is ignored in calculations.

Open [Tablesmit](/) and select any column in your table, then open the Column Formatting panel to try the available types.`,
}

export default post
