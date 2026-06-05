import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-import-csv-into-online-table',
  title: 'How to Import a CSV File into an Online Table',
  date: '2026-04-13',
  description:
    'Learn how to import csv into online table with Tablesmit. Upload CSV files with headers preserved and parse them instantly in browser. Tablesmit makes i...',
  author: 'Olayiwola Akinnagbe',
  tags: ['csv import', 'csv to table', 'tutorial'],
  readTime: 4,
  featured: false,
  content: `## Why CSV import matters

Learn how to import csv into online table with Tablesmit. CSV (comma-separated values) is the most common format for exchanging tabular data between applications. Almost every database, spreadsheet, and analytics tool can export to CSV. If you have ever downloaded a report from a web application, exported a contact list, or received data from a collaborator, it was probably a CSV file.

The challenge is what happens after you download the file. Opening a CSV in a text editor shows raw comma-separated text — unreadable for anything beyond a few rows. Opening it in Excel works but adds the full weight of a spreadsheet application for data that may only need a clean table.

Importing a CSV into a web table tool gives you the structure without the spreadsheet overhead.

## How CSV import works in Tablesmit

### Step 1: Prepare your CSV file

Most CSV files import cleanly, but a few patterns cause issues:

- **Headers** — The first row of your CSV should contain column names. Tablesmit uses these as the header row.
- **Delimiter** — Tablesmit expects comma-separated values. If your file uses semicolons or tabs, convert it first using a text editor or spreadsheet application.
- **Encoding** — UTF-8 is preferred. Files saved in Windows-1252 or other legacy encodings may show incorrect characters for accents and special symbols.
- **Size limit** — Files larger than 5 MB are rejected. This protects against accidentally importing very large datasets that are better handled in a dedicated tool.

### Step 2: Import

1. Open [Tablesmit](/).
2. In the toolbar, click **Import** and select **Import from CSV**.
3. A file picker opens. Select your CSV file.
4. The file is parsed locally using PapaParse — your data never leaves your browser.
5. The table populates with the CSV data. Headers become the header row. Rows and columns match the file content.

### Step 3: Review and adjust

After import, check that:
- Column types are correct. CSV files do not carry type information, so all columns default to Text. Set Number, Currency, or Date types in the Column Formatting panel.
- Column widths fit the content. Drag column borders or double-click to auto-fit.
- The header row is correct. Edit any header by clicking the cell.

## How Tablesmit handles common CSV edge cases

| Scenario | Behaviour |
|---|---|
| Empty cells | Left empty — no placeholder text |
| Quoted fields containing commas | Parsed correctly — the comma is part of the value |
| Quoted fields containing newlines | Parsed correctly — the newline is part of the value |
| Header row | First row becomes the header row |
| Missing values in some rows | Remaining columns are left empty |
| File exceeds 5 MB | Rejected with a toast: "File too large. Maximum size is 5MB." |
| Invalid CSV format | A toast explains the error — check the format and try again |

## When importing is better than pasting

Importing a CSV file is the right choice when:
- The data has more than twenty rows — manual entry or copy-paste becomes error-prone
- The file comes from another application — exports from analytics tools, databases, and CRM systems are all CSV
- You need to preserve the exact data without reformatting — copy-paste can alter formatting during the transfer
- You are working with the same dataset repeatedly — import once and adjust the structure in the table tool

For smaller amounts of data, copying from a spreadsheet and pasting directly into the table may be faster. Tablesmit's smart paste detects HTML tables, TSV, and CSV content from the clipboard.

## CSV export complements import

After editing the imported data, you can export it back to CSV with the same structure. This round-trip workflow — import, clean, format, export — is useful for preparing data that needs to be shared with people who use different tools.

Import your CSV file into [Tablesmit](/) — click Import in the toolbar and select your file.`,
  relatedFeature: 'csv-import',
}

export default post
