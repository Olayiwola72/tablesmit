import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-add-table-to-medium-post',
  title: 'How to Add a Table to a Medium Post',
  date: '2026-06-01',
  description:
    'Medium does not support native tables. Three workarounds that work — including how to get a clean, formatted table into your Medium post in under two minutes.',
  author: 'Olayiwola Akinnagbe',
  tags: ['medium', 'writing', 'tutorial'],
  readTime: 5,
  featured: false,
  content: `## The problem

Medium cannot render a \`<table>\` tag. After 13 years, that still has not changed.

The editor handles text, images, embeds, and code blocks — but structured tables are not on that list. It is a known frustration, and it is not going away.

That does not mean you are stuck. There are three workarounds that actually work, and one of them takes less than two minutes.

## Method 1: Build your table, export as PNG, embed as image

This is the most reliable solution for most Medium writers. A PNG image of a well-formatted table looks exactly as intended on desktop, tablet, and mobile — because it is an image. Medium handles images cleanly. Your table benefits from that.

**Step-by-step:**

1. Open [{{BRAND_NAME}}](/).
2. Build your table. Add headers, type your data, set column types if needed.
3. Add a table caption in the right sidebar (optional).
4. Click **Export → PNG**.
5. In Medium's editor, click the **+** icon → **Image** → upload the PNG.

Total time: under two minutes. {{BRAND_NAME}} renders the table instantly — you spend time on structure, not formatting.

**Tips for a clean result:**

- Use the default light theme — it sits naturally against Medium's white layout
- Keep the table under six columns — wider tables become hard to read on mobile even as images
- If you are writing a comparison table, the **Feature Matrix** template is a solid starting point
- If accessibility matters for your audience, add alt text when Medium prompts you after upload — write a plain-text summary of the table's contents

**Why this is the best method:** It works on every device, takes two minutes, and your table looks exactly how you designed it. No platform dependency. No formatting drift.

## Method 2: GitHub Gist embed

This works well for technical writers and developer-focused posts. Medium supports embedding GitHub Gists, and a Gist can contain an HTML table.

**Step-by-step:**

1. Open your table in [{{BRAND_NAME}}](/), then click **Copy → Copy as HTML**. This generates a complete table with styles applied.
2. Go to [gist.github.com](https://gist.github.com) — a free GitHub account is required.
3. Create a new public Gist with filename \`table.html\`.
4. Paste the copied HTML.
5. Click **Create public Gist** and copy the URL.
6. In Medium's editor, paste the URL on its own line and press Enter.

**The limitation:** Gist embeds look like code blocks, not document tables. For a general readership the PNG method looks more intentional. For a technical audience this is fine.

## Method 3: Notion embed

If you already use Notion, you can make a Notion page public and paste the share URL into Medium as an embed.

**The honest caveat:** Medium does not officially support Notion embeds. Some posts render them. Many do not. The result depends on Medium's embed detection, which changes without notice. Test it before relying on it. If it fails, fall back to the PNG method.

## Which method should you use?

| Situation | Best method |
|---|---|
| Visual comparison or data table | PNG via {{BRAND_NAME}} |
| Technical post, developer audience | GitHub Gist HTML |
| Table that updates frequently | PNG — re-export when data changes |
| You already have the data in Notion | Try the Notion embed, test first |

For most Medium writers, the PNG method is the right answer. It is fast, it looks exactly as intended, and it works on every device without exception.

## Summary

Medium does not support native tables. Until it does, the three options are:

1. **PNG embed via {{BRAND_NAME}}** — fastest, cleanest, works everywhere
2. **GitHub Gist HTML** — good for technical posts, looks like a code embed
3. **Notion embed** — unreliable, use only if you already have the data in Notion

Build the table at [{{BRAND_NAME}}](/) — free, no account, exports to PNG in one click.`,
  relatedFeature: 'image-export',
}

export default post
