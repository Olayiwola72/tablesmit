import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-export-table-as-image',
  title: 'How to Export a Table as an Image (PNG or JPEG)',
  date: '2026-05-23',
  description:
    'Render your table as a high-resolution PNG or JPEG image. Perfect for embedding in presentations, social media, dashboards, and documents.',
  author: 'Olayiwola Akinnagbe',
  tags: ['export', 'image', 'png', 'jpeg', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## When you need a table as an image

The best format for a table is the original — HTML, Excel, or Markdown. The reader can interact with it, copy from it, and search within it.

But sometimes you need a static image:

- Embedding in a slide presentation (PowerPoint or Google Slides accept images more reliably than embedded tables)
- Posting on social media where rich content is not supported
- Including in a PDF or document that will be printed and scanned
- Adding to a dashboard or infographic
- Sharing a preview in a messaging app

## PNG vs JPEG — which to use

| | PNG | JPEG |
|---|---|---|
| Best for | Tables with text, logos, solid colours | Photographic content |
| Quality | Lossless — pixel-perfect text | Lossy — may blur text |
| File size | Larger | Smaller |
| Transparency | Supported | Not supported |
| Text rendering | Sharp, readable | Soft, may show artefacts |

**For tables, PNG is almost always the better choice.** Text renders cleanly, edges are sharp, and the file is viewable at any zoom level without artefacts. Use JPEG only if file size is a critical constraint and the table has minimal text.

## How to export a table as an image

1. Style your table in Tablesmit — add borders, colours, and a caption.
2. Click the **Copy** button in the toolbar.
3. Choose **Copy as Image** from the dropdown.
4. Tablesmit renders the table to a high-resolution PNG (2x scale) and copies it to your clipboard.
5. Paste directly into your document, presentation, or image editor.

You can also export as a downloadable file using the Export button in the sidebar — choose PNG or JPEG.

## Resolution and quality

Image export uses \`html2canvas\` at 2x device pixel ratio. This produces sharp images on retina and high-DPI displays. The exported image matches exactly what you see in the editor — same colours, same borders, same caption.

## Table size considerations

Very large tables (50 rows, 20 columns) produce large images. If your table is taller than the viewport, scroll through all sections before exporting to ensure the full table renders. For best results, keep tables under 30 rows when exporting as images.

## Summary

PNG is the default for a reason: it preserves text quality. JPEG works when file size matters more than sharpness. Both formats are available in Tablesmit with one click — and both preserve your table's styling exactly.`,
  relatedFeature: 'image-export',
}

export default post
