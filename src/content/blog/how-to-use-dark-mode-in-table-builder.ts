import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-use-dark-mode-in-table-builder',
  title: 'How to Use Dark Mode in a Table Builder for Low-Light Work',
  date: '2026-04-30',
  description:
    'Dark mode reduces eye strain in low-light environments. Here is how to enable it in a table builder and what changes when you switch.',
  author: 'Olayiwola Akinnagbe',
  tags: ['dark mode', 'table editor', 'accessibility'],
  readTime: 3,
  featured: false,
  content: `## Why dark mode matters for table work

Tables involve a lot of staring at a bright screen — white backgrounds with dark text, sometimes for hours at a time. In a well-lit room, this is comfortable. In a dim room, at night, or for people with light sensitivity, a bright interface causes eye fatigue.

Dark mode inverts the relationship — dark backgrounds with light text. The contrast ratio remains readable, but the overall luminance is lower. For people who work on tables in the evening or in low-light environments, this makes a measurable difference in comfort over extended sessions.

## How dark mode works in Tablesmit

Tablesmit supports dark mode through the operating system or a manual toggle.

### Automatic (system preference)

On first visit, Tablesmit checks your system's colour scheme preference. If your operating system is set to dark mode, Tablesmit loads in dark mode automatically. No configuration needed.

### Manual toggle

The dark mode toggle is in the navigation bar — a sun or moon icon on the far right. Click it to switch between light and dark modes. The setting is saved to localStorage and persists across visits.

### Which colours change

In dark mode:

- The page background changes from white to deep navy (#0F172A)
- The surface colour (sidebars, toolbar, card backgrounds) changes from light grey to dark slate (#1E293B)
- Text colours invert — dark text on light backgrounds becomes light text on dark backgrounds
- Borders change from light grey to dark grey (#334155)
- The primary blue shifts from #1E40AF to #3B82F6 for adequate contrast on dark backgrounds
- The accent amber (#F59E0B) works well on both backgrounds and does not change

### Which colours stay the same

- The T-form logo colour changes appropriately per theme
- Cell content colours are preserved — if you set a cell to a specific background colour, it stays that colour in both modes
- Exported tables (PDF, PNG, JPEG, Excel) always use the light theme — dark mode is a screen-only convenience

## How the table grid looks in dark mode

The table grid in dark mode uses the same structural layout but with inverted colours:
- Cell backgrounds: dark surface instead of white
- Cell text: light grey instead of dark
- Selected cell ring: brighter blue (#3B82F6) instead of the default blue
- Header row: the same header colour you selected — Tablesmit does not override your header colour choice
- Merged cell highlight: adjusted for visibility on the dark background

## When to switch

| Environment | Recommended mode |
|---|---|
| Bright office, daylight | Light (default) |
| Dim room, evening | Dark |
| Presentation on a projector | Light (projectors wash out dark colours) |
| Coding or writing at night | Dark |
| Light sensitivity or migraine | Dark |

## Dark mode and accessibility

All dark mode colours pass WCAG 2.1 AA contrast requirements. The muted text colour on dark backgrounds has a contrast ratio of 5.1:1 against the dark background, exceeding the 4.5:1 minimum.

The sun-and-moon toggle icon is labelled with an aria-label that reads "Switch to dark mode" or "Switch to light mode" depending on the current state. Screen readers announce the change.

## Try it

Open [Tablesmit](/) and click the moon icon in the top navigation bar. The interface switches to dark mode. Click again to switch back.`,
}

export default post
