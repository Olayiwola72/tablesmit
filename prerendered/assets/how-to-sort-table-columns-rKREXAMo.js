var e={slug:"how-to-sort-table-columns",title:"How to Sort Table Columns by Data — Ascending, Descending, and What Happens to Empty Cells",date:"2026-04-24",description:"Sorting a table column is one of the fastest ways to find patterns in your data. Here is how sorting works and what you need to know before you use it.",author:"Olayiwola Akinnagbe",tags:["sort columns","table sorting","tutorial"],readTime:3,featured:!1,content:`## Sorting as a discovery tool

When you enter data into a table, you usually enter it in the order it arrives — chronologically, by source, or in whatever order makes sense during data collection. The resulting table reflects the order of entry, not the order of the data itself.

Sorting a column rearranges the rows so you can see the data in a meaningful sequence. Sorted alphabetically, a list of product names becomes easier to scan. Sorted by price from low to high, a pricing table reveals the cheapest options first. Sorted by date from newest to oldest, a log becomes a timeline.

## How sorting works in Tablesmit

Tablesmit provides two ways to sort a column: from the column header or from the right-click context menu.

### Sorting from the header

Each column header displays a small sort icon (Lucide ArrowUpDown). Clicking it cycles through three states:
1. No sort (default) — the icon is muted
2. Ascending — the icon changes to ArrowUp in the primary colour
3. Descending — the icon changes to ArrowDown in the primary colour

Clicking again returns to no sort.

### Sorting from the context menu

Right-click any column header to open the context menu. The menu includes two sort options:
- **Sort ascending** — sorts from lowest to highest
- **Sort descending** — sorts from highest to lowest

## How different column types sort

| Type | Sort behaviour |
|---|---|
| Text | Alphabetical (locale-aware) |
| Number | Numeric — 10 comes after 2, not after 100 |
| Currency | Numeric by value, ignoring the symbol |
| Percentage | Numeric by value |
| Date | Chronological |
| Sum | Numeric (same as Number) |
| Auto-number | Numeric by sequence value |

Numeric types sort numerically, not lexicographically. In a Text column, "10" comes before "2" (lexicographic). In a Number column, "2" comes before "10" (numeric). This is the most common sorting mistake — make sure your column type matches your data before you sort.

## What happens to empty cells

Empty cells always sort to the bottom regardless of sort direction. This is intentional — an empty cell has no data to contribute to the sorted view, so it makes sense to push it out of the way.

## Sorting and merged cells

Sorting is disabled when the table contains any merged cell ranges. Merged cells span multiple rows and sorting would break the merge structure. If you need to sort, unmerge the cells first. The context menu item for sorting is hidden when merged ranges exist, and a tooltip explains why.

## Sorting does not modify your data

Sorting is a view-only operation. It reorders rows for display without changing the underlying cell data. The original row order is preserved in the table state. Toggling sort off returns the rows to their original order.

This means you can experiment with sorting without worrying about losing the original arrangement.

## When to sort

- Finding the highest or lowest value in a numeric column
- Arranging a list of names or products alphabetically
- Ordering dates chronologically for a timeline view
- Grouping similar values together to spot patterns
- Preparing data before exporting — a sorted table reads more clearly in PDF or Excel

Open [Tablesmit](/) and click any column header icon to try ascending and descending sort on your data.`,relatedFeature:"column-sorting"};export{e as default};
