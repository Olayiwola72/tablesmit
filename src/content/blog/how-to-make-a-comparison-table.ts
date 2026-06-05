import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-make-a-comparison-table',
  title: 'How to Make a Comparison Table Online',
  date: '2026-05-06',
  description:
    'Learn how to make a comparison table online that makes decisions obvious. Tablesmit helps you structure, format, and export tables that persuade fast.',
  author: 'Olayiwola Akinnagbe',
  tags: ['comparison table', 'tutorial', 'templates'],
  readTime: 6,
  featured: false,
  content: `## What makes a comparison table work

Learn how to make a comparison table with Tablesmit. A comparison table has one job: make a decision easier.

Done well, it removes ambiguity. The reader looks at the table and understands, immediately and without interpretation, which option best fits their situation.

Done badly, it just adds visual noise. A table full of check marks and question marks and asterisks that lead to footnotes does not clarify a decision — it delegates it.

The difference is structure. A comparison table is not just a grid. It is an argument.

## The two types of comparison table

**Feature comparison:** Does option A have this capability? Does option B? Used in software, services, and product selection.

**Attribute comparison:** How does option A perform on this metric versus option B? Used in research, product reviews, and decision reports.

The structure is slightly different for each.

### Feature comparison — the tick/cross format

| Feature | Option A | Option B | Option C |
|---------|:--------:|:--------:|:--------:|
| Feature one | ✓ | ✓ | ✗ |
| Feature two | ✓ | ✗ | ✓ |
| Feature three | ~ | ✓ | ✗ |

The first column is your feature list. Options are columns. The cells contain ✓ (yes), ✗ (no), or ~ (partial/limited).

The trick: **list features in order of importance to your reader**, not in order of how many options support them. The reader should be able to scan the first three rows and already be forming a conclusion.

### Attribute comparison — the values format

| Attribute | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Price | £99/mo | £149/mo | £49/mo |
| Setup time | 2 hours | 30 mins | 1 week |
| Support | 24/7 | Business hours | Community only |
| Uptime SLA | 99.9% | 99.5% | None |

The same first-column-as-criteria structure, but cells contain real values instead of symbols.

## Building a comparison table in Tablesmit

### Step 1: Open Tablesmit and set your grid

Open [Tablesmit](/) and set Grid Size to the number of criteria (rows) you have plus a header row, and the number of options (columns) plus one for the criteria column.

For a 5-criteria, 3-option comparison: 6 rows × 4 columns.

### Step 2: Fill the header row

Type your option names in the first row. If you are recommending one option, you will come back to highlight it later.

### Step 3: Fill the criteria column

Type each criterion in the first column. Order them by importance. The most important differentiators go at the top — this is where the reader's eye lands first.

### Step 4: Fill in the values

For feature comparisons, use ✓ ✗ and ~ as standard notation. These are universally understood and visually scannable.

For attribute comparisons, set appropriate column types:
- Currency columns for price data — right-aligned, consistent formatting
- Text columns for qualitative attributes
- Number columns for numeric metrics

### Step 5: Highlight the recommended option

Select the header cell of your recommended option. Use the Header colour picker in the sidebar to give it a slightly different background — or use the Dark Header theme and manually adjust the recommended column's cell background.

Alternatively: merge a cell above the recommended column header and add "Recommended" or "Best value" as a label.

### Step 6: Style with a theme

The **Dark Header** theme works particularly well for comparison tables — strong column headers create clear visual separation between options. The **Striped** theme helps readability in tables with more than eight criteria rows.

Apply the theme from the Theme button in the toolbar.

### Step 7: Export

For embedding in a document: **PNG** gives a clean image that scales without blurring.
For a web page: **PNG** again — or embed via an image tag.
For sharing with colleagues who will edit it: **Excel**.
For a formal report or proposal: **PDF**.

## The persuasion layer

A comparison table that presents information neutrally leaves the decision to the reader. That is sometimes what you want. But if you are building the table to support a recommendation, the structure itself should guide the reader toward the correct conclusion.

**Lead with your strongest differentiator.** If your recommended option wins clearly on the first criterion, the reader sees that immediately. They arrive at the rest of the table already leaning in the right direction.

**Name criteria precisely.** "Customer support" is vague. "Support response time under 2 hours" is a criterion. Specific criteria make the table harder to dismiss.

**Use ~ honestly.** A partial check mark means the feature exists but is limited. Use it accurately — readers will test your table against their own experience. A misleading ~ destroys credibility faster than a ✗.

**The recommended badge earns its place.** Do not label an option "Best choice" unless the table actually shows it winning on the criteria that matter. The badge points to evidence. If the evidence is not there, remove the badge.

---

The best comparison table is the one that makes a good decision feel inevitable.
[Build yours in Tablesmit](/) — the structure is already there. You just need to fill it in.`,
}

export default post
