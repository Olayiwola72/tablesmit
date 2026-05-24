import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-make-a-pricing-table',
  title: 'How to Make a Pricing Table Online',
  date: '2026-05-23',
  description:
    'A pricing table that looks unprofessional costs you clients before you have even spoken. Here is how to build one that earns trust — in under five minutes.',
  author: 'Olayiwola Akinnagbe',
  tags: ['pricing table', 'tutorial', 'templates'],
  readTime: 5,
  featured: false,
  content: `## Why the pricing table matters more than you think

A pricing table is not a grid of numbers. It is the moment a potential client makes a decision about whether your work is worth what you are charging.

A table that looks inconsistent — misaligned columns, mixed formatting, numbers with different decimal places — signals carelessness before anyone has read a word. A clean, well-structured pricing table signals that you take your work seriously.

The good news is that building a professional pricing table does not require design skills or a paid tool. It requires the right structure and the right formatting choices.

## The anatomy of a good pricing table

Every effective pricing table has the same structure:

| Plan | Price | Included | Support | Best for |
|------|-------|----------|---------|----------|
| Starter | £99/mo | 5 users, 10GB | Email | Small teams |
| Growth | £249/mo | 25 users, 50GB | Priority | Growing businesses |
| Enterprise | £599/mo | Unlimited | Dedicated | Large organisations |

**Plan column:** Clear tier names. Short, distinct, memorable.

**Price column:** Formatted as currency, right-aligned, consistent units (all monthly or all annual — never mixed).

**Included column:** The specific deliverables at each tier. Be precise. "Unlimited users" means something. "More features" means nothing.

**Support column:** Clients read this carefully. Response time, channel, and priority are all meaningful differences.

**Best for column:** This is the column that closes deals. Tell the client which tier is for them. Remove their uncertainty.

## Building it in Tablesmit

### Step 1: Use the Pricing Table template

Open [Tablesmit](/) and click Templates in the toolbar. Select Pricing Table. A five-column table generates with the standard pricing structure already in place — Plan, Price, Users, Storage, Support.

Rename the columns to match your specific offering. Click any column header to edit the label.

### Step 2: Set column types

Click the type label at the top of your Price column and set it to **Currency**. This right-aligns all values and applies consistent formatting. If your pricing includes decimal places, they will align correctly across all rows.

Set the Plan column to **Text**. Set any quantity columns (users, units, seats) to **Number**.

### Step 3: Fill in your tiers

Click any cell to edit. Tab to move to the next cell. Fill in each row from left to right.

Keep pricing language parallel across rows:
- ✓ £99/month · £249/month · £599/month
- ✗ £99/mo · £249 per month · £599

Consistency in language is as important as consistency in formatting. A pricing table where each row describes the same thing in a different way erodes trust.

### Step 4: Highlight the recommended tier

If you have a middle tier you want to encourage — and most businesses do — merge the header cell above it and add "Most popular" or "Recommended". Select the cell, use Ctrl+L to left-align or Ctrl+E to centre it.

Alternatively, use the Header colour picker in the sidebar to give the recommended column a slightly different header colour. Subtle visual weight draws the eye without being aggressive.

### Step 5: Add a caption

Click the caption field above the table and type the pricing table's context — "Service tiers — 2025" or "Monthly subscription plans". This appears in exports and becomes the filename when you save.

### Step 6: Export

For a client proposal: **PDF** (Ctrl+P). The table exports cleanly — no toolbar, no sidebars, just the pricing information.

For a spreadsheet you will continue editing: **Excel** (Ctrl+E). The currency formatting and column structure transfer correctly.

For a document or presentation: **PNG** — paste directly into Word, Google Docs, or PowerPoint.

## Common pricing table mistakes

**Too many tiers.** Three is the standard. Four is acceptable. Five makes clients feel they are choosing a mobile phone contract, not hiring a professional.

**Vague inclusions.** "Advanced features" is not an inclusion. "Automated monthly reports" is. Be specific.

**No recommendation.** A pricing table without a highlighted recommended tier forces the client to make a choice with no guidance. Most will choose the cheapest option. Give them permission to choose the middle.

**Inconsistent currency formatting.** Some rows with decimals, some without. Some with currency symbols, some without. Tablesmit's Currency column type handles this — every cell formats the same way.

**Exporting as a screenshot.** Screenshots are blurry in PDFs and unreadable when zoomed. Export as PDF or PNG from Tablesmit — the output is crisp at any size.

---

Your pricing table is the last thing a client reads before deciding whether to reply to your proposal. [Build it properly in Tablesmit](/) — it takes less time than you think and the difference is visible.`,
}

export default post
