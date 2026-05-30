var e={slug:"how-to-import-excel-files-online-table",title:"How to Import Excel Files into an Online Table Editor",date:"2026-05-29",description:"Upload an .xlsx file directly into {{BRAND_NAME}}. Excel import preserves cell content, merged cells, column widths, and caption styling — no server upload.",author:"Olayiwola Akinnagbe",tags:["excel","import","xlsx","tutorial","tables"],readTime:5,featured:!1,content:`## Why Excel import matters

Most people start their tables in Excel. It is the tool they know, the tool their data lives in, and the tool their colleagues send them files from. But Excel is overkill when you just need a clean, formatted table for a report, blog post, or research paper.

The solution: build the data in Excel, then import it into Tablesmit for polishing, styling, and export.

## How Excel import works

1. Click the **Import** button in the toolbar.
2. Select **Excel (.xlsx)** from the dropdown.
3. Choose your file. Tablesmit reads it locally — the file never leaves your browser.
4. The table appears with all your data, merged cells, and formatting.

## What gets preserved

- **Cell values** — text, numbers, dates, and formulas (as their computed values)
- **Merged cells** — Excel merged ranges are detected and recreated in Tablesmit
- **Column widths** — approximate widths preserved for a smooth transition
- **Row heights** — approximate heights carried over
- **Table caption** — if your Excel worksheet has a caption row, it is detected and migrated to the caption field
- **Caption styling** — bold, italic, text color, and background color are captured from the caption cell

## What does not transfer

- Cell-level borders (imported as uniform grid — use the Border panel to restyle)
- Font families (Tablesmit uses Inter for all content)
- Conditional formatting rules
- Charts, images, and other embedded objects
- Multiple worksheets (only the active sheet is imported)

## File size and limits

- Maximum file size: 5MB
- Maximum rows: 50
- Maximum columns: 20
- Maximum cells: 100,000

These limits keep the editor responsive. If your Excel file exceeds them, consider splitting it into smaller tables.

## Excel import vs CSV import

| | Excel (.xlsx) | CSV (.csv) |
|---|---|---|
| Formatting | Preserves merged cells, column widths | Plain data only |
| Multiple sheets | First sheet only | Single table |
| Caption detection | Yes | No |
| File size limit | 5MB | 5MB |

## Step-by-step example

1. Open your Excel file and review the worksheet. Make sure the first row is either a header or a caption.
2. In Tablesmit, click **Import** → **Excel**.
3. Select the .xlsx file. Wait 1-2 seconds while it parses.
4. Your table appears with all data intact. Adjust borders, colors, or column types as needed.
5. Export to PDF, Markdown, or your final format.

Excel import turns Tablesmit into a finishing tool for data that started in a spreadsheet — the best of both workflows.`,relatedFeature:"excel-import"};export{e as default};
