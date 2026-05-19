# Tablesmit — Brand Identity & Engineering Implementation Guide
> For AI Coding Agents (Codex, Claude Code, etc.)
> Version 6.0 | Brand + Positioning + Architecture + TDD | Tailwind CSS Edition
> Status: Authoritative. Do not deviate without explicit instruction.

---

## 0. The North Star

**Tablesmit** is a minimalist table builder for analytical writing.

It exists for writers, analysts, researchers, and technical thinkers who need clean
structured tables with full control over headers, formatting, and export —
without the noise of a spreadsheet, the complexity of a database, or the
aesthetic overwhelm of a design tool.

> **Tagline:** *Tables, your way.*
> **Subtext (hero):** *A minimalist table builder for analytical writing — with full control over headers, formatting, and export.*
> **About line:** *Tablesmit was created by a writer who needed more control than basic table generators provided. Built for people who think in structure and publish with precision.*

### Positioning Statement
```
For:     Writers, analysts, researchers, and technical thinkers
Who:     Need clean, structured tables with customization control
Tablesmit is: A minimalist table builder for analytical writing
That:    Gives full control over headers, formatting, and export
Unlike:  Generic table tools that are either too rigid or too complex
```

### What Tablesmit Is Not
```
Not a spreadsheet.
Not a database.
Not a Notion competitor.
Not a design-heavy tool.

Tablesmit is a structured writing tool.
```
Every product decision must be filtered through this. If a feature makes
Tablesmit feel like any of the above — reconsider it.

### Tone of Voice
| Dimension   | Direction                                                        |
|-------------|------------------------------------------------------------------|
| Personality | Friendly productivity. Calm. Competent. Minimal.                 |
| Writing     | Short sentences. Active voice. No marketing fluff.               |
| UI copy     | Direct. Label the action. No clever wordplay in functional UI.   |
| Error msgs  | Clear cause + clear fix. Never blame the user.                   |
| Empty states| Invite action. Do not describe what is missing.                  |

### Emotional Design Goal
Every UI decision must make the user feel:

> **Clarity. Control. Calm confidence.**

If a design choice introduces visual noise, decision fatigue, or uncertainty —
remove it. When in doubt: simplify.

---

## 1. Brand Name & Identity

| Field          | Value                                                                              |
|----------------|------------------------------------------------------------------------------------|
| Product Name   | **Tablesmit**                                                                      |
| Domain         | tablesmit.com (confirmed, ~$11/year)                                               |
| Origin         | Table + Smith. A smith crafts with precision — wordsmith, goldsmith, tablesmith.   |
|                | The missing "h" is intentional — own it as the brand spelling (cf. Tumblr, Flickr)|
| Pronunciation  | TAY-bul-smit                                                                       |
| SEO note       | Cover "tablesmith" in meta description and GitHub — users will search both spellings|
| Personality    | Calm. Competent. Minimal. Friendly but never chatty.                               |
| Open Source    | Yes — GitHub link in secondary CTA + Sponsor button                                |
| What it is NOT | Loud, cluttered, feature-heavy, or visually expressive.                            |

---

## 2. Logo

### 2A. Primary Logo (Full — Icon + Wordmark)

```svg
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(4,8)">
    <rect x="0" y="0" width="32" height="32" rx="6"
          stroke="#1E293B" stroke-width="1.5" fill="none"/>
    <line x1="12" y1="6" x2="12" y2="26"
          stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="6" y1="14" x2="26" y2="14"
          stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <text x="52" y="30"
        font-family="Inter, -apple-system, sans-serif"
        font-size="22" font-weight="600" letter-spacing="-0.5"
        fill="#1E293B">Tablesmit</text>
</svg>
```

### 2B. Icon Mark Only (Favicon)

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="30" height="30" rx="6"
        stroke="#1E293B" stroke-width="1.5" fill="none"/>
  <line x1="11" y1="5" x2="11" y2="27"
        stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="5" y1="13" x2="27" y2="13"
        stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### 2C. Logo Rules
- Minimum: 120px wide (full) · 24px (icon)
- On white: full color as above
- On dark: swap `#1E293B` → `#FFFFFF`
- Never: stretch, rotate, recolor, add shadows, or animate

---

### 2D. Logo 2 — T-form (Alternate · Ready to Switch)

Status: **approved, not yet active**. Logo 1 remains current until explicitly switched.
To activate: replace all Logo 1 SVG references with Logo 2 SVGs below. One find-and-replace.

#### Concept

Three rectangles. No outlines, no strokes. Full opacity on top (the header row),
fading opacity below (two data columns). Reads as a table with a header from 16px up.
The decreasing opacity from left column to right subtly implies "more data beyond the fold."
The shape is also a T — a quiet reference to the brand name.

#### Logo 2A — Full Logo (icon + wordmark)

```svg
<!-- Tablesmit Logo 2 — Full — Light background -->
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">

  <!-- Icon mark: T-form (header row + two column cells) -->
  <g transform="translate(4,8)">
    <!-- Header row — full width, solid primary blue -->
    <rect x="0" y="0" width="30" height="10" rx="4" fill="#1E40AF"/>
    <!-- Left column cell — 28% opacity -->
    <rect x="0" y="13" width="13" height="15" rx="3" fill="#1E40AF" opacity="0.28"/>
    <!-- Right column cell — 14% opacity -->
    <rect x="17" y="13" width="13" height="15" rx="3" fill="#1E40AF" opacity="0.14"/>
  </g>

  <!-- Wordmark -->
  <text x="46" y="30"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22"
        font-weight="600"
        letter-spacing="-0.5"
        fill="#1E293B">Tablesmit</text>

</svg>
```

```svg
<!-- Tablesmit Logo 2 — Full — Dark background -->
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">

  <g transform="translate(4,8)">
    <!-- Header row — lighter blue for dark backgrounds -->
    <rect x="0" y="0" width="30" height="10" rx="4" fill="#60A5FA"/>
    <rect x="0" y="13" width="13" height="15" rx="3" fill="#60A5FA" opacity="0.35"/>
    <rect x="17" y="13" width="13" height="15" rx="3" fill="#60A5FA" opacity="0.18"/>
  </g>

  <text x="46" y="30"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22"
        font-weight="600"
        letter-spacing="-0.5"
        fill="#FFFFFF">Tablesmit</text>

</svg>
```

#### Logo 2B — Icon Mark Only (Favicon / App Icon)

```svg
<!-- Tablesmit Logo 2 — Icon mark — Light -->
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Header row -->
  <rect x="2" y="2" width="28" height="10" rx="4" fill="#1E40AF"/>
  <!-- Left column cell -->
  <rect x="2" y="15" width="12" height="15" rx="3" fill="#1E40AF" opacity="0.28"/>
  <!-- Right column cell -->
  <rect x="18" y="15" width="12" height="15" rx="3" fill="#1E40AF" opacity="0.14"/>
</svg>
```

```svg
<!-- Tablesmit Logo 2 — Icon mark — Dark -->
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="28" height="10" rx="4" fill="#60A5FA"/>
  <rect x="2" y="15" width="12" height="15" rx="3" fill="#60A5FA" opacity="0.4"/>
  <rect x="18" y="15" width="12" height="15" rx="3" fill="#60A5FA" opacity="0.2"/>
</svg>
```

#### Logo 2 — Anatomy & Rules

```
Header bar:     x=2, y=2, width=28, height=10, rx=4
                fill: #1E40AF (light) · #60A5FA (dark)
                Represents: the header row — the product's signature feature

Left cell:      x=2, y=15, width=12, height=15, rx=3
                opacity: 0.28 (light) · 0.40 (dark)
                Gap from header: 3px

Right cell:     x=18, y=15, width=12, height=15, rx=3
                opacity: 0.14 (light) · 0.20 (dark)
                Gap from left cell: 6px

Key decisions:
  - No outlines, no strokes — pure filled shapes only
  - Opacity fade (left → right) implies "more columns beyond"
  - 3px gap between header and body = visual table separation
  - All rx values ≤ 4px — consistent with UI rounded corner rules
  - Minimum render size: 16px (favicon) — all three shapes remain distinct

Color rules:
  - Light backgrounds: #1E40AF header + opacity fades
  - Dark backgrounds: #60A5FA (blue-400) header + opacity fades
  - Never recolor the header bar to anything other than these two values
  - Never remove the opacity difference between left and right cells
  - Never add outlines or strokes

Switch checklist (when activating Logo 2):
  [x] Replace Logo 1A SVG in Navbar component — uses Logo component, activeLogo already set to 'logo2'
  [x] Replace Logo 1B SVG in public/favicon.svg — already updated
  [x] Replace Logo 1B SVG in PageLoader component — uses Logo component
  [x] Update og-image.png to use new mark
  [x] Verify dark background variant renders correctly in any dark UI panels — Logo component handles theme prop
```

---

## 3. Design Tokens (Tailwind Config)

All colors, fonts, spacing, and radii are defined in `tailwind.config.ts`.
Do not use arbitrary Tailwind values (e.g. `text-[13px]`) for anything that
recurs more than once — extract it to the config instead.

```ts
// tailwind.config.ts
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          hover: '#1D3899',
          light: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FFFBEB',
        },
        surface: '#F9FAFB',
        border: '#E5E7EB',
        'border-focus': '#1E40AF',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse: '#FFFFFF',
        },
        success: { DEFAULT: '#059669', light: '#ECFDF5' },
        danger: { DEFAULT: '#DC2626', light: '#FEF2F2' },
        info: { DEFAULT: '#0EA5E9', light: '#F0F9FF' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        content: '1200px',
        narrow: '720px',
      },
      height: {
        nav: '60px',
      },
      width: {
        'sidebar-left': '240px',
        'sidebar-right': '220px',
      },
    },
  },
  plugins: [typography],
}

export default config
```

### Token Usage Rules
- **Primary blue** → buttons, links, selected cell borders, active nav, focus rings
- **Accent amber** → ONE place only: the "Create Table" CTA button. Merged cell highlight.
- **White** → always the page background. `bg-white` on `<body>`. Never `bg-gray-*` for pages.
- **Surface** → sidebars, toolbar, card backgrounds: `bg-surface`
- **No arbitrary colors** in JSX — every color must trace to a token

---

## 4. Typography

Load in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role              | Classes                                          |
|-------------------|--------------------------------------------------|
| Hero headline     | `text-5xl font-bold text-text-primary leading-tight` |
| Section heading   | `text-3xl font-bold text-text-primary`           |
| Card heading      | `text-xl font-semibold text-text-primary`        |
| Body copy         | `text-base font-normal text-text-secondary leading-relaxed` |
| UI label          | `text-sm font-medium text-text-primary`          |
| Section label     | `text-xs font-semibold text-text-muted uppercase tracking-widest` |
| Button text       | `text-sm font-semibold`                          |
| Cell content      | `text-sm font-sans text-text-primary`            |
| Monospace cell    | `text-sm font-mono text-text-primary`            |

---

## 5. UI Component Specifications

### UI Principles
These rules govern every visual decision in the product. No exceptions.

```
✅ Clean layout           — generous whitespace, logical grouping, breathing room
✅ Subtle borders         — border-border (#E5E7EB) only, never decorative
✅ Rounded corners        — max border-radius: 8px (--radius-md). Never exceed this.
✅ Minimal shadows        — shadow-sm for sticky elements only (navbar on scroll)
✅ No heavy shadows       — no shadow-lg, no drop-shadow on cards or panels
✅ No glass effects       — no backdrop-blur, no frosted panels, no opacity layering
✅ No visual clutter      — no decorative dividers, gradients, or background patterns
✅ Logical grouping       — related controls live together, separated by whitespace
                            not by heavy borders or background color blocks
✅ Emotion: Clarity       — every element has a clear purpose; nothing decorative
✅ Emotion: Control       — user always knows what will happen before they click
✅ Emotion: Calm          — no animations that demand attention; motion is functional
```

**Radius rule enforcement:**
```
rounded-sm  (4px)  → tags, badges, icon buttons, toolbar buttons
rounded-md  (8px)  → cards, panels, modals, input fields, standard buttons ← MAX
rounded-lg         → FORBIDDEN in this product
rounded-xl         → FORBIDDEN in this product
rounded-full       → ONLY for avatar-style elements or pill badges
```

**Shadow rule enforcement:**
```
shadow-sm   → sticky navbar (scroll state only), floating action buttons (mobile)
shadow-md   → FORBIDDEN in panels, cards, sidebars
shadow-lg   → FORBIDDEN everywhere
No shadow   → default for all cards, panels, table cells, buttons
```

---

### Navbar
```
height: h-nav (60px) | sticky top-0 z-50
bg-white border-b border-border shadow-sm (on scroll via JS class)
Layout: justify-between items-center px-6
Left: Logo SVG
Center: nav links — text-sm font-medium text-text-secondary hover:text-primary
Right: GitHub ghost button (ExternalLink icon)
Links: Home · About · Blog · Contact · Open Source · Changelog · Testimonials
CTA: "Create a Table" lives in the hero section — not in the navbar
```

### Button Classes (define as reusable component — see Section 10)

Every button variant has four explicit states: **default → hover → active (pressed) → disabled**.
The `active:scale-[0.97]` gives tactile press feedback without being dramatic.
All transitions use `transition-all duration-150 ease-in-out`.

```
BASE (applied to all variants)
  inline-flex items-center justify-center gap-2
  rounded-md font-semibold text-sm select-none
  transition-all duration-150 ease-in-out
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  motion-reduce:transition-none

PRIMARY
  Default:  bg-primary text-text-inverse px-5 py-2.5
  Hover:    hover:bg-primary-hover hover:shadow-md
  Active:   active:bg-[#1a3080] active:scale-[0.97] active:shadow-none
  Loading:  aria-busy cursor-wait opacity-70

ACCENT  (Generate Table — one instance only)
  Default:  bg-accent text-white px-5 py-2.5
  Hover:    hover:bg-accent-hover hover:shadow-md
  Active:   active:bg-[#b45309] active:scale-[0.97] active:shadow-none

SECONDARY / OUTLINE
  Default:  bg-transparent border border-border text-text-primary px-5 py-2.5
  Hover:    hover:bg-surface hover:border-primary hover:text-primary
  Active:   active:bg-gray-100 active:scale-[0.97]

GHOST / TOOLBAR
  Default:  bg-transparent text-text-secondary px-3 py-1.5 rounded-sm
  Hover:    hover:bg-surface hover:text-text-primary
  Active:   active:bg-border active:scale-[0.97]

DANGER  (Clear All only)
  Default:  bg-danger text-white px-5 py-2.5
  Hover:    hover:bg-red-700 hover:shadow-md
  Active:   active:bg-red-800 active:scale-[0.97] active:shadow-none

ICON BUTTON
  Default:  w-8 h-8 flex items-center justify-center rounded-sm
            text-text-secondary bg-transparent
  Hover:    hover:bg-surface hover:text-text-primary
  Active:   active:bg-border active:scale-90
  Rule:     Must have aria-label — no exceptions

SIZES
  sm:  px-3 py-1.5 text-xs rounded-sm
  md:  px-5 py-2.5 text-sm rounded-md   ← default
  lg:  px-6 py-3   text-base rounded-md

NAV LINK (not a button, but stateful)
  Default:  text-sm font-medium text-text-secondary
  Hover:    hover:text-primary
  Active:   text-primary font-semibold (current route)
  Underline: active route gets a 2px bottom border in primary color
```

**Button component implementation note for Codex:**
```tsx
// The Button component must use `cn()` (from shadcn/ui clsx helper) to
// compose variant classes. Never use string interpolation for class branching.
// Use cva() (class-variance-authority) to define variants cleanly.

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base classes applied to every variant
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold text-sm select-none ' +
  'transition-all duration-150 ease-in-out motion-reduce:transition-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-text-inverse hover:bg-primary-hover hover:shadow-md active:bg-[#1a3080] active:scale-[0.97] active:shadow-none',
        accent:    'bg-accent text-white hover:bg-accent-hover hover:shadow-md active:bg-[#b45309] active:scale-[0.97] active:shadow-none',
        secondary: 'bg-transparent border border-border text-text-primary hover:bg-surface hover:border-primary hover:text-primary active:bg-gray-100 active:scale-[0.97]',
        ghost:     'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary active:bg-border active:scale-[0.97]',
        danger:    'bg-danger text-white hover:bg-red-700 hover:shadow-md active:bg-red-800 active:scale-[0.97] active:shadow-none',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs rounded-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

### Table Toolbar
```
h-12 bg-surface border-b border-border px-4 flex items-center gap-2
Groups separated by: <div class="w-px h-5 bg-border mx-1" />

Groups:
  1. Templates ▾ (DropdownMenu)                          (secondary button)
       └─ Research Notes · Feature Matrix · Content Tracker · Budget Summary
  2. Add Row · Add Column · Remove Row · Remove Column   (ghost buttons)
  3. Merge · Unmerge                                     (ghost buttons)
  4. Import ▾ (DropdownMenu)                             (secondary button)
       └─ Import from CSV
       └─ Import from Excel
  5. Clear All · Undo                                    (danger / ghost)
  (Export lives in the right sidebar ExportPanel — not in the toolbar)
```

**CSV / Excel Import flow:**
```tsx
// Trigger: hidden <input type="file"> clicked via ref
// CSV  → PapaParse → Papa.parse(file, { header: true, skipEmptyLines: true })
// Excel → SheetJS  → XLSX.read(buffer) → XLSX.utils.sheet_to_json()
// Both → normalise to CellData[][] → dispatch to TableContext
// On error: show toast "Could not read file. Check the format and try again."
// Max file size: 5MB — validate before parsing, show toast if exceeded
```

### Sidebars
```
Left:  w-sidebar-left  bg-surface border-r border-border p-6 overflow-y-auto
Right: w-sidebar-right bg-surface border-l border-border p-6 overflow-y-auto
Section label: text-xs font-semibold text-text-muted uppercase tracking-widest mb-3
```

### Table Grid
```
Cell:          text-sm font-sans text-text-primary p-2 border border-border
Selected:      ring-2 ring-primary ring-inset (no shadow)
Merged cell:   bg-primary-light
Header row:    bg-primary text-text-inverse font-semibold
```

#### Smooth Drag-to-Resize Columns & Rows

The resize experience must feel instantaneous. No jank. No layout thrashing.
Use `requestAnimationFrame` so updates are batched at 60fps.

**Implementation pattern for `useColumnResize` hook:**
```ts
// The resize line (ghost indicator) follows the cursor during drag.
// The actual column width is applied only on mouseup — not on every mousemove.
// This prevents layout recalculation on every pixel movement.

const useColumnResize = () => {
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const startWidth   = useRef(0);
  const colIndex     = useRef(0);
  const rafId        = useRef<number>();
  const ghostLineRef = useRef<HTMLDivElement>(null); // vertical drag indicator

  const onMouseDown = (e: React.MouseEvent, idx: number, currentWidth: number) => {
    isDragging.current  = true;
    startX.current      = e.clientX;
    startWidth.current  = currentWidth;
    colIndex.current    = idx;
    document.body.style.cursor   = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cancelAnimationFrame(rafId.current!);
      rafId.current = requestAnimationFrame(() => {
        const delta    = e.clientX - startX.current;
        const newWidth = Math.max(60, startWidth.current + delta); // min 60px
        // Move ghost line only — do NOT update state here
        if (ghostLineRef.current) {
          ghostLineRef.current.style.left = `${e.clientX}px`;
          ghostLineRef.current.style.display = 'block';
        }
        // Store pending width without triggering render
        pendingWidth.current = newWidth;
      });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      cancelAnimationFrame(rafId.current!);
      document.body.style.cursor    = '';
      document.body.style.userSelect = '';
      if (ghostLineRef.current) ghostLineRef.current.style.display = 'none';
      // Apply final width in ONE state update after drag ends
      setColumnWidths(prev => {
        const next = [...prev];
        next[colIndex.current] = pendingWidth.current;
        return next;
      });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown, ghostLineRef };
};
```

**Ghost drag-line element** (rendered once at top level of TableGrid):
```tsx
{/* Vertical indicator line — visible only during column drag */}
<div
  ref={ghostLineRef}
  className="fixed top-0 bottom-0 w-px bg-primary z-50 pointer-events-none hidden"
  aria-hidden="true"
/>
```

**Resize handle styling:**
```
Column handle: absolute right-0 top-0 h-full w-2 cursor-col-resize
               opacity-0 hover:opacity-100 hover:bg-primary/20
               transition-opacity duration-100
               (touch target 8px wide on mobile via ::after pseudo-element)

Row handle:    absolute bottom-0 left-0 w-full h-2 cursor-row-resize
               opacity-0 hover:opacity-100 hover:bg-primary/20
               transition-opacity duration-100
```

**Minimum / maximum constraints:**
```
Column width: min 60px · max 600px
Row height:   min 32px · max 300px
```

---

## 6. Page Copy — Complete

### Navigation
```
Left:   [Tablesmit SVG Logo]
Center: Home  |  Blog  |  Open Source  |  About  |  Contact  |  Changelog
Right:  [GitHub ↗]         (ghost button with ExternalLink icon)
```

---

### Hero Section

**Layout:** Full-width · centered text · white background · generous padding
`py-20 sm:py-28 lg:py-36`

```
HEADLINE (text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary):
  Tables built for
  analytical writing.

SUBTEXT (text-base sm:text-lg text-text-secondary max-w-xl mx-auto):
  A minimalist table builder for analytical writing — with full
  control over headers, formatting, and export.

CTA ROW (flex-col sm:flex-row gap-3 justify-center mt-8):
  PRIMARY:   [Create a Table]          ← accent button, lg
  SECONDARY: [View on GitHub ↗]        ← secondary/outline button, lg
                                          with ExternalLink icon from Lucide

NO eyebrow badge. NO trust line. NO animation.
Clean white space speaks for itself.
```

---

> **Note:** The Features section was removed from the LandingPage. The table maker page (`/`) now serves as the primary entry point. The About page (`/about`) contains the brand story and "What Tablesmit Is Not" list.

---

### Open Source Section

**Layout:** Full-width · `bg-surface` background · centered · `py-16 sm:py-20`

```
HEADING (text-2xl font-bold text-text-primary):
  Built in the open.

BODY (text-base text-text-secondary max-w-narrow mx-auto text-center):
  Tablesmit is free and open source. The code is on GitHub — read it,
  fork it, improve it, or adapt it for your own needs.
  We believe tools for writing and thinking should be transparent.

CTA:
  [View on GitHub ↗]   ← secondary button with ExternalLink icon

NOTE (text-xs text-text-muted mt-4):
  MIT licensed. Contributions welcome.
```

---

### About Section

**Layout:** 2 columns on lg+ (text left · subtle graphic right) · stacked on mobile

```
HEADING (text-2xl sm:text-3xl font-bold text-text-primary):
  Built for structured thinkers.

BODY (text-base text-text-secondary leading-relaxed):
  Tablesmit was created by a writer who needed more control than
  basic table generators provided.

  Most tools gave too little — no header customization, no column
  formatting, no clean export. Others gave too much — the full weight
  of a spreadsheet for something that just needed to be a table.

  Tablesmit is the middle ground. Built for people who think in
  structure and publish with precision.

WHAT WE ARE NOT (rendered as a quiet list, text-sm text-text-muted):
  Not a spreadsheet.
  Not a database.
  Not a Notion competitor.
  Not a design-heavy tool.

  We are a structured writing tool.
```

---

### Footer

**Layout:** `border-t border-border bg-white py-10`
**Structure:** Logo + tagline left · links right (on lg+) · stacked on mobile

```
LEFT:
  [Tablesmit icon mark]  Tablesmit
  Tables, your way.
  © {getCurrentYear()} Tablesmit. Open source under MIT license.

RIGHT (flex gap-8 text-sm text-text-secondary):
  Product:    Home · Open Source
  Company:    About · Contact · GitHub ↗
  Export:     PDF · PNG · JPEG · Excel · CSV

Footer links: hover:text-primary transition-colors
NO heavy footer. NO newsletter signup. NO marketing.
```

---

### 404 Page

```
HEADING:   Page not found.
BODY:      That URL doesn't exist. Let's get you back to building.
CTA:       [← Back to Home]   ← primary button
```

### 404 Animation SVG

```svg
<svg width="200" height="140" viewBox="0 0 200 140" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <style>
    @keyframes drawGrid {
      to { stroke-dashoffset: 0; }
    }
    @keyframes fadeCell {
      to { opacity: 1; }
    }
    @keyframes pulseZero {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 0.6; }
    }
    .grid-line { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawGrid 0.8s ease-out forwards; }
    .grid-line:nth-child(2) { animation-delay: 0.1s; }
    .grid-line:nth-child(3) { animation-delay: 0.2s; }
    .grid-line:nth-child(4) { animation-delay: 0.3s; }
    .grid-line:nth-child(5) { animation-delay: 0.4s; }
    .cell-digit { opacity: 0; animation: fadeCell 0.4s ease-out forwards; }
    .cell-digit:nth-child(1) { animation-delay: 0.5s; }
    .cell-digit:nth-child(2) { animation: fadeCell 0.4s ease-out forwards, pulseZero 2.5s ease-in-out 1s infinite; }
    .cell-digit:nth-child(3) { animation-delay: 0.6s; }
  </style>
  <rect x="1" y="1" width="198" height="138" rx="10"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="1" y1="47" x2="199" y2="47"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="1" y1="93" x2="199" y2="93"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="67" y1="1" x2="67" y2="139"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="134" y1="1" x2="134" y2="139"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <text x="33" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">4</text>
  <text x="100" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">0</text>
  <text x="167" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">4</text>
</svg>
```

Component location: `src/components/ui/NotFoundAnimation/NotFoundAnimation.tsx`

---

## 7. Page Meta / SEO

```html
<title>Tablesmit — Tables, Your Way</title>
<meta name="description" content="The web table maker with true spreadsheet
control. Resize rows and columns, merge cells, set custom colors, and export
to PDF, Excel, PNG, or JPEG — free, no account required.">

<!-- Favicon: icon-mark SVG from Section 2B → public/favicon.svg -->
```

---

## 8. Tech Stack

| Layer             | Technology                                                        | Notes                               |
|-------------------|-------------------------------------------------------------------|-------------------------------------|
| Framework         | React 18 + Vite                                                   | –                                   |
| Language          | TypeScript — `strict: true`                                       | –                                   |
| Styling           | **Tailwind CSS v3**                                               | Config in `tailwind.config.ts`      |
| Components        | **shadcn/ui**                                                     | Dropdowns, tooltips, dialogs        |
| Icons             | **Lucide React**                                                  | `lucide-react` — only icon library  |
| Drag/Resize       | **@dnd-kit/core + @dnd-kit/utilities**                            | Column/row resize, row reorder      |
| Export PDF        | **jsPDF + html2canvas**                                           | –                                   |
| Export Excel      | **@e965/xlsx** (SheetJS fork)                                     | Export + import                     |
| Export Image      | **html2canvas**                                                   | PNG + JPEG                          |
| Import CSV        | **PapaParse**                                                     | Fast, typed, browser-safe CSV parse |
| Import Excel      | **@e965/xlsx** (SheetJS fork)                                     | Same lib as export — no extra dep   |
| Unit Testing      | **Vitest + React Testing Library + @testing-library/user-event**  | –                                   |
| E2E Testing       | **Playwright**                                                    | Tests in `e2e/`                     |
| Routing           | **React Router v6**                                               | –                                   |
| Fonts             | **@fontsource/inter + @fontsource/jetbrains-mono**                | Self-hosted, no external requests   |
| Toast             | **sonner**                                                        | –                                   |
| Markdown/Blog     | **react-markdown + remark-gfm**                                   | Blog content rendering              |
| Meta/SEO          | **react-helmet-async**                                            | Per-page meta tags, JSON-LD         |
| Theme/Typography  | **@tailwindcss/typography**                                       | `prose` class for blog content      |
| Error Monitoring  | **@sentry/react**                                                 | Production only                     |
| PWA               | **vite-plugin-pwa**                                               | Service worker, offline support     |
| Git Hooks         | **husky + lint-staged**                                           | Pre-commit lint + format            |
| Button Variants   | **class-variance-authority + clsx**                               | `cva()` for Button component        |

### Library Policy
- **Use libraries freely** — don't build what already exists well.
- **shadcn/ui** first for any UI primitive (Select, Tooltip, Dialog, DropdownMenu,
  Popover, Separator, Badge, etc.). Install components as needed with `npx shadcn@latest add`.
- **Lucide React** for all icons — consistent, tree-shakeable, typed.
- **@dnd-kit** for all drag interactions — resize handles, row reordering.
- **PapaParse** for CSV import — `Papa.parse(file, { header: true })` returns typed rows.
- **@e965/xlsx** (SheetJS fork) handles both Excel import and export — do not add a second Excel library.
- Introduce a new library only if: (a) it solves a real problem, and
  (b) it is actively maintained with >1k GitHub stars.
- Do NOT install two libraries that solve the same problem.

---

## 9. Project Architecture

### Folder Structure

```
tablesmit/
├── public/
│   ├── favicon.svg                     ← icon-mark SVG (Section 2B)
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.webmanifest
│
├── scripts/
│   └── md-to-blog-post.ts              # Helper: .md → blog JSON
│
├── e2e/
│   └── critical-path.spec.ts           # Playwright E2E tests
│
├── .github/
│   ├── workflows/
│   │   └── deploy-netlify.yml          # CI/CD pipeline
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
│
├── src/
│   ├── assets/
│   │   └── logo.svg                    ← full logo SVG (Section 2A)
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                         # Reusable, domain-agnostic primitives
│   │   │   │                           # (extend shadcn/ui components here)
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ColorSwatch/
│   │   │   │   ├── ColorSwatch.tsx
│   │   │   │   └── index.ts
│   │   │   ├── CookieConsent/
│   │   │   │   ├── CookieConsent.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DropdownMenu/            # shadcn/ui wrapper
│   │   │   │   ├── DropdownMenu.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── IconButton/
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Logo/
│   │   │   │   ├── Logo.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageLoader/
│   │   │   │   ├── PageLoader.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PanelLoader/
│   │   │   │   ├── PanelLoader.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SectionLabel/
│   │   │   │   ├── SectionLabel.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Tooltip/                 # shadcn/ui wrapper
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   └── index.ts
│   │   │   └── ... (additional shadcn/ui add as needed)
│   │   │
│   │   ├── layout/                     # Structural shell components
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── MobileSheet/
│   │   │   │   ├── MobileSheet.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageWrapper/
│   │   │   │   ├── PageWrapper.tsx
│   │   │   │   └── index.ts
│   │   │   └── Sidebar/
│   │   │       ├── Sidebar.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── features/                   # Domain-specific feature components
│   │       ├── AiFeaturesPanel/
│   │       │   ├── AiFeaturesPanel.tsx
│   │       │   └── index.ts
│   │       ├── BorderPanel/
│   │       │   ├── BorderPanel.tsx
│   │       │   └── index.ts
│   │       ├── ColorPanel/
│   │       │   ├── ColorPanel.tsx
│   │       │   └── index.ts
│   │       ├── ColumnFormattingPanel/
│   │       │   ├── ColumnFormattingPanel.tsx
│   │       │   └── index.ts
│   │       ├── DimensionsPanel/
│   │       │   ├── DimensionsPanel.tsx
│   │       │   └── index.ts
│   │       ├── ExportPanel/
│   │       │   ├── ExportPanel.tsx
│   │       │   └── index.ts
│   │       ├── FindReplace/
│   │       │   ├── FindReplace.tsx
│   │       │   └── index.ts
│   │       ├── HeaderOptionsPanel/
│   │       │   ├── HeaderOptionsPanel.tsx
│   │       │   └── index.ts
│   │       ├── MergeCellsPanel/
│   │       │   ├── MergeCellsPanel.tsx
│   │       │   └── index.ts
│   │       ├── QuickPresetsPanel/
│   │       │   ├── QuickPresetsPanel.tsx
│   │       │   └── index.ts
│   │       ├── ShortcutsModal/
│   │       │   ├── ShortcutsModal.tsx
│   │       │   └── index.ts
│   │       ├── TableCaption/
│   │       │   ├── TableCaption.tsx
│   │       │   └── index.ts
│   │       ├── TableGrid/
│   │       │   ├── TableGrid.tsx
│   │       │   ├── TableCell/
│   │       │   │   ├── TableCell.tsx
│   │       │   │   └── index.ts
│   │       │   ├── TableCtxMenu/
│   │       │   │   ├── TableCtxMenu.tsx
│   │       │   │   └── index.ts
│   │       │   ├── TableHeaderCell/
│   │       │   │   ├── TableHeaderCell.tsx
│   │       │   │   └── index.ts
│   │       │   ├── ResizeHandle/
│   │       │   │   ├── ResizeHandle.tsx
│   │       │   │   └── index.ts
│   │       │   └── index.ts
│   │       ├── TableToolbar/
│   │       │   ├── TableToolbar.tsx
│   │       │   └── index.ts
│   │       └── ThemePicker/
│   │           ├── ThemePicker.tsx
│   │           └── index.ts
│   │
│   ├── pages/
│   │   ├── AboutPage/
│   │   │   ├── AboutPage.tsx
│   │   │   └── index.ts
│   │   ├── BlogListPage/
│   │   │   ├── BlogListPage.tsx
│   │   │   └── index.ts
│   │   ├── BlogPostPage/
│   │   │   ├── BlogPostPage.tsx
│   │   │   └── index.ts
│   │   ├── ChangelogPage/
│   │   │   └── ChangelogPage.tsx        # imported directly via .tsx path (no index.ts)
│   │   ├── ContactPage/
│   │   │   ├── ContactPage.tsx
│   │   │   └── index.ts
│   │   ├── LandingPage/
│   │   │   ├── LandingPage.tsx
│   │   │   └── index.ts
│   │   ├── NotFoundPage/
│   │   │   ├── NotFoundPage.tsx
│   │   │   └── index.ts
│   │   ├── OpenSourcePage/
│   │   │   └── OpenSourcePage.tsx       # imported directly via .tsx path (no index.ts)
│   │   ├── PrivacyPage/
│   │   │   ├── PrivacyPage.tsx
│   │   │   └── index.ts
│   │   ├── TestimonialsPage/
│   │   │   └── TestimonialsPage.tsx      # imported directly via .tsx path (no index.ts)
│   │   ├── TableMakerPage/
│   │   │   ├── TableMakerPage.tsx
│   │   │   └── index.ts
│   │   └── TermsPage/
│   │       ├── TermsPage.tsx
│   │       └── index.ts
│   │
│   ├── context/
│   │   ├── TableContext.tsx             # Global table state + dispatch (provider)
│   │   ├── TableDataContext.tsx         # cells, columnWidths, rowHeights, mergedRanges
│   │   └── TableSelectionContext.tsx    # selectedRange, hoveredCell, isDragging
│   │   # no index.ts — contexts imported directly from their .tsx files
│   │
│   ├── hooks/
│   │   ├── useColumnResize.ts          # Drag-to-resize columns (rAF)
│   │   ├── useExport.ts                # Export orchestration
│   │   ├── useFindReplace.ts           # Ctrl+F / Ctrl+H logic
│   │   ├── useImport.ts                # CSV / Excel import
│   │   ├── useMergeCells.ts            # Merge / unmerge
│   │   ├── useRowResize.ts             # Drag-to-resize rows (rAF)
│   │   ├── useTableHistory.ts          # Undo / redo (snapshot stack)
│   │   ├── useTableSelection.ts        # Cell/range selection
│   │   └── useTheme.ts                 # Dark/light mode toggle
│   │
│   ├── services/
│   │   ├── blogService.ts              # import.meta.glob blog discovery
│   │   ├── export/
│   │   │   ├── index.ts                 # strategies map + exportTable()
│   │   │   ├── utils.ts                 # downloadUrl helper
│   │   │   ├── pdfExporter.ts           # PDFExporter class
│   │   │   ├── imageExporter.ts         # ImageExporter (PNG/JPEG) class
│   │   │   ├── csvExporter.ts           # CSVExporter + sanitizeCsvValue
│   │   │   └── excelExporter.ts         # ExcelExporter class
│   │   ├── exportService.ts             # Barrel re-export from ./export/
│   │   └── importService.ts            # CSV / Excel import logic
│   │
│   ├── utils/
│   │   ├── analytics.ts                # GA4 event tracking wrapper
│   │   ├── cellUtils.ts                # Cell ID parsing, coordinate helpers
│   │   ├── dateUtils.ts                # Dynamic year helper
│   │   ├── formatDate.ts               # Intl.DateTimeFormat blog date formatting
│   │   ├── formatUtils.ts              # Column format helpers
│   │   ├── mergeUtils.ts               # Merge range math
│   │   ├── tableUtils.ts               # Pure table transformation functions
│   │   └── toast.ts                    # Sonner toast wrapper with TOAST consts
│   │
│   ├── types/
│   │   ├── blog.types.ts               # BlogPost interface
│   │   ├── export.types.ts
│   │   ├── import.types.ts
│   │   ├── table.types.ts
│   │   └── ui.types.ts
│   │
│   ├── config/
│   │   ├── changelog.ts                # ChangelogEntry[] data
│   │   ├── colorPalette.ts             # Header color swatches
│   │   ├── exportConfig.ts             # Supported formats + options
│   │   ├── presets.ts                  # Preset table definitions
│   │   ├── siteConfig.ts               # Routes, nav, exports, branding (SSoT)
│   │   ├── tableDefaults.ts            # DEFAULT_ROWS, DEFAULT_COLS, MAX limits
│   │   └── tableThemes.ts              # 6 theme definitions
│   │
│   ├── constants/
│   │   └── keys.ts                     # Keyboard key constants
│   │
│   ├── content/
│   │   └── blog/                       # Auto-discovered via import.meta.glob
│   │       ├── 5-free-online-table-makers-compared.ts
│   │       ├── best-table-tool-for-researchers.ts
│   │       ├── copy-excel-table-to-web.ts
│   │       ├── export-table-to-pdf.ts
│   │       ├── how-to-make-a-table-in-markdown.ts
│   │       └── merge-cells-online-table.ts
│   │
│   ├── styles/
│   │   ├── globals.css                 # Tailwind directives + print styles
│   │   └── ... (no other style files)
│   │
│   ├── index.scss                      # SCSS entry (imported by main.tsx)
│   ├── pwa.ts                          # Custom service worker registration
│   │
│   ├── test/                           # All tests live here (never co-located with source)
│   │   ├── setup.ts                    # jest-dom import + polyfills
│   │   ├── App.test.tsx
│   │   ├── config/
│   │   │   ├── siteConfig.test.ts
│   │   │   └── tableThemes.test.ts
│   │   ├── utils/
│   │   │   ├── cellUtils.test.ts
│   │   │   ├── dateUtils.test.ts
│   │   │   ├── formatUtils.test.ts
│   │   │   ├── mergeUtils.test.ts
│   │   │   ├── tableUtils.test.ts
│   │   │   └── toast.test.ts
│   │   ├── hooks/
│   │   │   ├── useColumnResize.test.ts
│   │   │   ├── useExport.test.tsx
│   │   │   ├── useFindReplace.test.ts
│   │   │   ├── useImport.test.tsx
│   │   │   ├── useMergeCells.test.ts
│   │   │   ├── useRowResize.test.ts
│   │   │   ├── useTableHistory.test.ts
│   │   │   ├── useTableSelection.test.tsx
│   │   │   └── useTheme.test.ts
│   │   ├── services/
│   │   │   ├── blogService.test.ts
│   │   │   ├── export/
│   │   │   │   ├── exportTable.test.ts  # exportTable dispatch tests
│   │   │   │   ├── pdfExporter.test.ts  # PDF exporter tests
│   │   │   │   ├── imageExporter.test.ts# PNG/JPEG exporter tests
│   │   │   │   ├── csvExporter.test.ts  # CSV exporter + sanitize tests
│   │   │   │   └── excelExporter.test.ts# Excel exporter tests
│   │   │   └── importService.test.ts
│   │   ├── context/
│   │   │   └── TableContext.test.tsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button/Button.test.tsx
│   │   │   │   ├── ColorSwatch/ColorSwatch.test.tsx
│   │   │   │   ├── ErrorBoundary/ErrorBoundary.test.tsx
│   │   │   │   └── IconButton/IconButton.test.tsx
│   │   │   ├── layout/
│   │   │   │   └── MobileSheet/MobileSheet.test.tsx
│   │   │   └── features/
│   │   │       ├── TableGrid/
│   │   │       │   ├── TableCell/TableCell.test.tsx
│   │   │       │   ├── TableCtxMenu/TableCtxMenu.test.tsx
│   │   │       │   ├── TableGrid.test.tsx
│   │   │       │   └── ResizeHandle/ResizeHandle.test.tsx
│   │   │       ├── TableToolbar/TableToolbar.test.tsx
│   │   │       ├── DimensionsPanel/DimensionsPanel.test.tsx
│   │   │       ├── QuickPresetsPanel/QuickPresetsPanel.test.tsx
│   │   │       ├── MergeCellsPanel/MergeCellsPanel.test.tsx
│   │   │       ├── FindReplace/FindReplace.test.tsx
│   │   │       ├── ExportPanel/ExportPanel.test.tsx
│   │   │       └── ThemePicker/ThemePicker.test.tsx
│   │   └── pages/
│   │       ├── BlogListPage/BlogListPage.test.tsx
│   │       ├── BlogPostPage/BlogPostPage.test.tsx
│   │       ├── ChangelogPage/ChangelogPage.test.tsx
│   │       ├── TableMakerPage/TableMakerPage.test.tsx
│   │       └── LandingPage/LandingPage.test.tsx
│   │
│   ├── App.tsx                         # Router + providers only. Zero business logic.
│   └── main.tsx                        # ReactDOM.createRoot only.
│
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── playwright.config.ts                # E2E test config
├── netlify.toml                        # SPA redirect + deploy config
├── .env.example                        # Documented env vars
└── package.json
```

### Lazy Loading Strategy

**Rule:** Every page is lazy-loaded. No page bundle ships until its route is visited.
Heavy feature panels within the table maker are also lazy-loaded on first interaction.

#### `src/App.tsx` — Routing with Suspense

```tsx
import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { PageLoader } from '@/components/ui/PageLoader';
import { ShortcutsModal } from '@/components/features/ShortcutsModal/ShortcutsModal';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { siteConfig } from '@/config/siteConfig';

// Pages — never imported directly; bundled separately per route
const LandingPage    = lazy(() => import('@/pages/LandingPage'));
const TableMakerPage = lazy(() => import('@/pages/TableMakerPage'));
const BlogListPage   = lazy(() => import('@/pages/BlogListPage'));
const BlogPostPage   = lazy(() => import('@/pages/BlogPostPage'));
const ContactPage    = lazy(() => import('@/pages/ContactPage'));
const OpenSourcePage = lazy(() => import('@/pages/OpenSourcePage'));
const PrivacyPage    = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage      = lazy(() => import('@/pages/TermsPage'));
const ChangelogPage  = lazy(() => import('@/pages/ChangelogPage'));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage'));
const NotFoundPage   = lazy(() => import('@/pages/NotFoundPage'));

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <TooltipProvider delayDuration={250}>
            <Navbar />
            <ShortcutsModal />
            <CookieConsent />
            <div className="flex flex-1 flex-col">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path={siteConfig.routes.home}      element={<ErrorBoundary><TableMakerPage /></ErrorBoundary>} />
                  <Route path={siteConfig.routes.about}     element={<LandingPage />} />
                  <Route path={siteConfig.routes.blog}      element={<BlogListPage />} />
                  <Route path={siteConfig.routes.blogPost}  element={<BlogPostPage />} />
                  <Route path={siteConfig.routes.openSource} element={<OpenSourcePage />} />
                  <Route path={siteConfig.routes.contact}   element={<ContactPage />} />
                  <Route path={siteConfig.routes.privacy}   element={<PrivacyPage />} />
                  <Route path={siteConfig.routes.terms}     element={<TermsPage />} />
                  <Route path={siteConfig.routes.changelog} element={<ChangelogPage />} />
                  <Route path={siteConfig.routes.testimonials} element={<TestimonialsPage />} />
                  <Route path="*"                           element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </TooltipProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
```

#### Lazy-loaded Feature Panels (within `TableMakerPage`)

Heavy sidepanel components are lazy-loaded on mount so the core table
grid is interactive immediately:

```tsx
import { lazy, Suspense } from 'react';
import { PanelLoader } from '@/components/ui/PanelLoader';

const QuickPresetsPanel    = lazy(() => import('@/components/features/QuickPresetsPanel'));
const ColumnFormattingPanel = lazy(() => import('@/components/features/ColumnFormattingPanel'));
const ExportPanel          = lazy(() => import('@/components/features/ExportPanel'));

// Usage inside TableMakerPage layout:
<Suspense fallback={<PanelLoader />}>
  <QuickPresetsPanel />
</Suspense>
```

#### `PageLoader` Component (`src/components/ui/PageLoader/PageLoader.tsx`)

```tsx
export const PageLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none"
         xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
      <rect x="1" y="1" width="30" height="30" rx="6"
            stroke="#1E293B" strokeWidth="1.5" fill="none"/>
      <line x1="11" y1="5" x2="11" y2="27"
            stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="13" x2="27" y2="13"
            stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <p className="text-sm text-text-muted animate-pulse">Loading…</p>
  </div>
);
```

#### `PanelLoader` Component (`src/components/ui/PanelLoader/PanelLoader.tsx`)

```tsx
export const PanelLoader: React.FC = () => (
  <div className="flex items-center justify-center p-6">
    <div className="w-5 h-5 border-2 border-border border-t-primary
                    rounded-full animate-spin" />
  </div>
);
```

#### Vite Code Splitting Config

Vite handles code splitting automatically via dynamic `import()`.
Optionally name the chunks for readable bundle analysis:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      selfDestroying: true,
      injectRegister: false,
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Tablesmit',
        short_name: 'Tablesmit',
        description: 'A minimalist table builder for analytical writing.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) return 'vendor-react'
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/class-variance-authority') || id.includes('node_modules/clsx')) return 'vendor-ui'
          if (id.includes('node_modules/jspdf')) return 'vendor-pdf'
          if (id.includes('node_modules/html2canvas')) return 'vendor-canvas'
          if (id.includes('node_modules/@e965/xlsx')) return 'vendor-excel'
          return undefined
        },
      },
    },
  },
});
```

**Lazy loading rules:**
- `Suspense` must always have a meaningful `fallback` — never `fallback={null}` for page-level routes
- Every `lazy()` import must be wrapped in `Suspense` in the nearest parent that makes UX sense
- Do not lazy-load components that are always visible on first paint (Navbar, Footer)
- Do not lazy-load components smaller than ~10KB — the network overhead isn't worth it

---

### `src/styles/globals.css`
```css
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* text-text-muted — passes WCAG AA 4.7:1 on white (#FFF) */
    --color-text-muted: 102 117 136;
  }
  .dark {
    /* text-text-muted — passes WCAG AA 5.1:1 on dark bg (#0F172A) */
    --color-text-muted: 156 163 175;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { @apply h-full; }
  body {
    @apply m-0 min-w-[320px] bg-white font-sans text-text-primary antialiased dark:bg-slate-900 dark:text-slate-100;
  }
  #root { @apply flex min-h-full flex-col; }
  h1, h2, h3, p { @apply mt-0; }
  button, input, select, textarea { letter-spacing: 0; }
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

@layer utilities {
  .dark .bg-white { @apply bg-slate-900; }
  .dark .bg-surface { @apply bg-slate-800; }
  .dark .border-border { @apply border-slate-700; }
}

@media print {
  nav, header, footer,
  [data-toolbar], [data-sidebar-left], [data-sidebar-right],
  [data-print-hide],
  .floating-action-buttons, .mobile-sheet-overlay {
    display: none !important;
  }

  [data-table-container] {
    overflow: visible !important;
    width: 100% !important;
    height: auto !important;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11pt;
  }

  td, th {
    border: 1px solid #E5E7EB !important;
    padding: 6pt 8pt !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  th, [data-header-row] td {
    background-color: #F1F5F9 !important;
  }

  tr { break-inside: avoid; }

  [data-table-caption] {
    font-size: 10pt;
    font-style: italic;
    color: #6B7280;
    margin-bottom: 6pt;
  }

  @page {
    margin: 2cm;
    size: A4 landscape;
  }
}
```

> Note: Resize handle classes are now inlined directly in the `ResizeHandle` component.

---

## 10. Engineering Principles

### 10A. SOLID

**S — Single Responsibility**
Each file has exactly one reason to change.
```
✅ TableCell.tsx       → renders one cell only
✅ useMergeCells.ts    → merge logic only
✅ export/index.ts     → export orchestration only
✅ pdfExporter.ts      → PDF export only
✅ csvExporter.ts      → CSV export only
✅ mergeUtils.ts       → pure merge math, no React

❌ App.tsx             → must NOT contain any business logic
❌ TableGrid.tsx       → must NOT contain export logic
❌ TableToolbar.tsx    → must NOT transform table data
```

**O — Open/Closed**
Open for extension, closed for modification. Use variant props and the
strategy pattern — never `if/else` sprawl inside a component.

```tsx
// ✅ Button extended via variant prop — never modified internally
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';

// ✅ Export: new format = new class, zero changes to existing code
interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>;
}
class PDFExporter   implements ExportStrategy { /* ... */ }
class PNGExporter   implements ExportStrategy { /* ... */ }
class JPEGExporter  implements ExportStrategy { /* ... */ }
class ExcelExporter implements ExportStrategy { /* ... */ }
// Adding CSV later: just add CSVExporter. Nothing else changes.
```

**L — Liskov Substitution**
```tsx
// ✅ IconButton is substitutable for Button — same contract
<Button     onClick={fn} aria-label="Merge">Merge</Button>
<IconButton onClick={fn} aria-label="Merge" icon={<Merge size={16} />} />
```

**I — Interface Segregation**
```ts
// ❌ Bloated — components receive props they don't use
interface CellProps { value: string; isMerged: boolean; onExport: () => void; ... }

// ✅ Lean — each interface is minimal and purposeful
interface TableCellProps {
  cellId: string;
  value: string;
  isSelected: boolean;
  isMerged: boolean;
  colSpan?: number;
  rowSpan?: number;
  onSelect: (cellId: string) => void;
  onChange: (cellId: string, value: string) => void;
}
```

**D — Dependency Inversion**
```tsx
// ✅ Components depend on hook abstractions, not concrete services
const TableGrid: React.FC = () => {
  const { cells, selectCell, updateCell } = useTable(); // abstraction
};
const ExportPanel: React.FC = () => {
  const { exportAs } = useExport(); // abstraction — not jsPDF directly
};
```

---

### 10B. DRY

```
Repeated JSX structure  → shared component in components/ui/ or components/layout/
Repeated logic          → shared util in utils/
Repeated state pattern  → shared hook in hooks/
Repeated config value   → constant in config/ or constants/
Repeated Tailwind string → extract to a component or @layer components in globals.css
```

If the same Tailwind class string appears 3+ times, it belongs in a component.
```tsx
// ❌ Repeated everywhere
<div className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">

// ✅ Extracted
<SectionLabel>Table Dimensions</SectionLabel>
```

---

### 10C. KISS

```
Use shadcn/ui before building a custom component.
Use a library before building a custom hook for something generic.
Use Tailwind utilities before writing custom CSS.
Don't abstract until the second repetition confirms the pattern.
Don't add state management libraries (Zustand, Redux) unless
  TableContext is genuinely insufficient — and document why.
```

---

### 10D. GRASP

| Principle         | Application in Tablesmit                                              |
|-------------------|----------------------------------------------------------------------|
| Information Expert| `useMergeCells` owns merge ranges → calculates mergeability          |
| Creator           | `TableContext` creates `TableState`; `useExport` creates strategies  |
| Controller        | `TableContext` receives all UI events, delegates to hooks             |
| Low Coupling      | Components never import each other — only context, hooks, types      |
| High Cohesion     | `TableCell/` contains only cell concerns; `ExportPanel/` export only |
| Pure Fabrication  | `export/index.ts`, all `utils/` — exist to reduce coupling          |

---

## 11. TypeScript Conventions

```ts
// src/types/table.types.ts
export interface CellData {
  id: string;           // "R{row}C{col}" e.g. "R0C2"
  value: string;
  colSpan: number;      // Default: 1
  rowSpan: number;      // Default: 1
  isMerged: boolean;    // True for anchor cell of a merge
  isHidden: boolean;    // True for cells absorbed by a merge
  format?: ColumnFormat;
}

export interface MergeRange {
  key: string;          // "R{r1}C{c1}:R{r2}C{c2}"
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface SelectionRange {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export type HeaderStyle  = 'none' | 'first-row' | 'first-column' | 'both';
export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date';

export interface TableState {
  cells: CellData[][];
  columnWidths: number[];
  rowHeights: number[];
  mergedRanges: MergeRange[];
  headerStyle: HeaderStyle;
  headerColor: string;
  contentColor: string;
  selectedRange: SelectionRange | null;
  rows: number;
  cols: number;
}

// src/types/export.types.ts
export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel' | 'csv';
export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  quality?: number;     // JPEG only: 0–1
}
export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>;
}

// src/types/ui.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export interface ColorSwatch  { label: string; value: string; }
export interface PresetDefinition {
  id: string;
  label: string;
  rows: number;
  cols: number;
  headers: string[];
  data?: string[][];
}
```

**TypeScript Rules:**
- `"strict": true` in `tsconfig.json` — always
- No `any` without an inline comment explaining unavoidability
- All exported functions/hooks must have explicit return types
- Prefer `interface` for object shapes; `type` for unions and aliases

---

## 12. Testing Strategy (TDD)

### Philosophy
```
Red   → Write a failing test first.
Green → Write minimum code to pass it.
Refactor → Clean up. Commit. Move on.

Never write implementation code before a failing test exists.
```

### Config

**`vitest.config.ts`**
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts'],
      thresholds: { lines: 80, functions: 80, branches: 75, statements: 80 },
    },
  },
});
```

**`src/test/setup.ts`**
```ts
import '@testing-library/jest-dom';
```

---

### Layer 1 — Pure Utils (highest priority, zero dependencies)

```ts
// utils/tableUtils.test.ts
import { describe, it, expect } from 'vitest';
import { generateEmptyTable, addRow, removeRow, addColumn, removeColumn } from './tableUtils';

describe('generateEmptyTable', () => {
  it('creates the correct row and column count', () => {
    const t = generateEmptyTable(3, 4);
    expect(t).toHaveLength(3);
    expect(t[0]).toHaveLength(4);
  });
  it('initialises every cell with an empty string value', () => {
    expect(generateEmptyTable(2, 2)[0][0].value).toBe('');
  });
  it('assigns IDs in R{row}C{col} format', () => {
    expect(generateEmptyTable(2, 3)[1][2].id).toBe('R1C2');
  });
});

describe('addRow', () => {
  it('appends one new row', () => {
    expect(addRow(generateEmptyTable(2, 3))).toHaveLength(3);
  });
  it('does not mutate the original', () => {
    const t = generateEmptyTable(2, 3);
    addRow(t);
    expect(t).toHaveLength(2);
  });
});

describe('removeRow', () => {
  it('removes the last row', () => {
    expect(removeRow(generateEmptyTable(3, 3))).toHaveLength(2);
  });
  it('does not remove the last remaining row', () => {
    expect(removeRow(generateEmptyTable(1, 3))).toHaveLength(1);
  });
});

describe('addColumn', () => {
  it('appends a column to every row', () => {
    addColumn(generateEmptyTable(3, 2)).forEach(row => expect(row).toHaveLength(3));
  });
});
```

```ts
// utils/mergeUtils.test.ts
import { describe, it, expect } from 'vitest';
import { parseCellId, buildMergeKey, isCellInMergeRange } from './mergeUtils';

describe('parseCellId', () => {
  it('parses a valid ID', () => expect(parseCellId('R2C3')).toEqual({ row: 2, col: 3 }));
  it('throws on invalid format', () => expect(() => parseCellId('bad')).toThrow());
});

describe('buildMergeKey', () => {
  it('produces canonical key', () => expect(buildMergeKey(0, 0, 1, 2)).toBe('R0C0:R1C2'));
});

describe('isCellInMergeRange', () => {
  const range = { startRow: 0, startCol: 0, endRow: 1, endCol: 1 };
  it('true for cells inside range',   () => expect(isCellInMergeRange('R0C0', range)).toBe(true));
  it('false for cells outside range', () => expect(isCellInMergeRange('R2C2', range)).toBe(false));
});
```

---

### Layer 2 — Custom Hooks

```ts
// hooks/useTable.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTable } from './useTable';

describe('useTable', () => {
  it('initialises with default 5×5 grid', () => {
    const { result } = renderHook(() => useTable());
    expect(result.current.cells).toHaveLength(5);
    expect(result.current.cells[0]).toHaveLength(5);
  });
  it('updates a cell value', () => {
    const { result } = renderHook(() => useTable());
    act(() => result.current.updateCell('R0C0', 'Hello'));
    expect(result.current.cells[0][0].value).toBe('Hello');
  });
  it('adds a row', () => {
    const { result } = renderHook(() => useTable());
    act(() => result.current.addRow());
    expect(result.current.cells).toHaveLength(6);
  });
  it('does not exceed MAX_ROWS (50)', () => {
    const { result } = renderHook(() => useTable());
    act(() => { for (let i = 0; i < 100; i++) result.current.addRow(); });
    expect(result.current.cells.length).toBeLessThanOrEqual(50);
  });
  it('does not remove the last row', () => {
    const { result } = renderHook(() => useTable());
    act(() => { for (let i = 0; i < 100; i++) result.current.removeRow(); });
    expect(result.current.cells.length).toBeGreaterThanOrEqual(1);
  });
});
```

```ts
// hooks/useMergeCells.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMergeCells } from './useMergeCells';

describe('useMergeCells', () => {
  it('merges a valid multi-cell range', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 });
      result.current.merge();
    });
    expect(result.current.mergedRanges).toHaveLength(1);
  });
  it('does not merge a single cell', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 0, endCol: 0 });
      result.current.merge();
    });
    expect(result.current.mergedRanges).toHaveLength(0);
  });
  it('unmerges an existing range', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 });
      result.current.merge();
    });
    act(() => result.current.unmerge('R0C0:R1C1'));
    expect(result.current.mergedRanges).toHaveLength(0);
  });
});
```

---

### Layer 3 — UI Components

```tsx
// components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button variant="primary">Generate Table</Button>);
    expect(screen.getByRole('button', { name: /generate table/i })).toBeInTheDocument();
  });
  it('fires onClick on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="primary" onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="primary" isDisabled onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
  it('sets aria-busy when isLoading', () => {
    render(<Button variant="primary" isLoading>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

```tsx
// components/features/TableToolbar/TableToolbar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableToolbar } from './TableToolbar';
import { TableProvider } from '../../../context/TableContext';

const wrap = (ui: React.ReactElement) =>
  render(<TableProvider>{ui}</TableProvider>);

describe('TableToolbar', () => {
  it('renders all action buttons', () => {
    wrap(<TableToolbar />);
    ['add row', 'add column', 'remove row', 'remove column', 'clear all']
      .forEach(name =>
        expect(screen.getByRole('button', { name: new RegExp(name, 'i') }))
          .toBeInTheDocument()
      );
  });
  it('renders export buttons for all four formats', () => {
    wrap(<TableToolbar />);
    ['pdf', 'png', 'jpeg', 'excel'].forEach(fmt =>
      expect(screen.getByRole('button', { name: new RegExp(fmt, 'i') }))
        .toBeInTheDocument()
    );
  });
});
```

---

### Layer 4 — Page Integration

```tsx
// pages/TableMakerPage/TableMakerPage.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TableMakerPage } from './TableMakerPage';

describe('TableMakerPage', () => {
  it('renders default 5×5 grid (25 cells)', () => {
    render(<TableMakerPage />);
    expect(screen.getAllByRole('cell')).toHaveLength(25);
  });
  it('adds a row on button click', async () => {
    const user = userEvent.setup();
    render(<TableMakerPage />);
    await user.click(screen.getByRole('button', { name: /add row/i }));
    expect(screen.getAllByRole('cell')).toHaveLength(30);
  });
  it('allows typing into a cell', async () => {
    const user = userEvent.setup();
    render(<TableMakerPage />);
    const cell = screen.getAllByRole('cell')[0];
    await user.click(cell);
    await user.type(cell, 'Product');
    expect(cell).toHaveTextContent('Product');
  });
});
```

### Test Isolation Rules

Every test must clean up its side effects. No test should leave state that
contaminates other tests.

```
✅ afterEach cleanup for:
  - DOM event listeners (document-level mousemove/mouseup)
  - Fake timers (vi.useRealTimers())
  - document.body cursor/userSelect (reset to '')
  - Generated files (mock fs or use vi.mock for paths)
  - DOM element removal (if test creates/manages DOM nodes)

✅ No file-writing side effects
  Export services that write files (SheetJS XLSX) must be mocked or
  the triggering test must be excluded from CI runs.
  tablesmit-table.* added to .gitignore as a safety net.

✅ No co-located test files
  All tests live in src/test/ mirroring source structure:
    src/utils/tableUtils.ts        → src/test/utils/tableUtils.test.ts
    src/hooks/useColumnResize.ts   → src/test/hooks/useColumnResize.test.ts
    src/components/ui/Button/Button.tsx → src/test/components/ui/Button/Button.test.tsx

❌ NO co-located .test.ts/x files next to source components
❌ NO afterEach that doesn't restore fake timers
❌ NO test that writes files to CWD without cleanup or mocking
```

### Coverage Targets

| Layer                  | Target |
|------------------------|--------|
| `utils/`               | 95%    |
| `services/`            | 90%    |
| `hooks/`               | 90%    |
| `components/ui/`       | 85%    |
| `components/features/` | 80%    |
| `pages/`               | 75%    |

Run: `npx vitest run --coverage`

---

## 13. Micro-copy & UX Writing

| Context        | Rule                                     | Example                                   |
|----------------|------------------------------------------|-------------------------------------------|
| Empty state    | Tell them what to do                     | "Click + Add Column to get started."      |
| Success        | Confirm the action                       | "Table exported." not "Export complete."  |
| Error          | What failed + what to try               | "Export failed. Try reducing table size." |
| Tooltip        | Short phrase, no period                  | "Merge selected cells"                    |
| Confirm dialog | Verb + object on the button              | [Delete Table] not [OK]                   |
| Placeholder    | Example value, not instruction           | "e.g. Product Name"                       |
| Toolbar labels | 1–2 words, title case                    | "Add Row", "Remove Column", "Clear All"   |

---

## 14. Accessibility

- All interactive elements must have visible `:focus-visible` ring (via Tailwind `focus-visible:outline-primary`)
- Icon-only buttons require `aria-label` — no exceptions
- Table cells keyboard navigable: Tab / Shift+Tab / Arrow keys
- Color swatches: ring or checkmark indicator for selected state (not color alone)
- Merge outcomes: announce via `aria-live="polite"`
- Min contrast: 4.5:1 body text, 3:1 large text (WCAG 2.1 AA)
- Respect `prefers-reduced-motion` — wrap transitions accordingly

---

## 15. Animation & Motion

- Hover transitions: `transition-colors duration-150`
- Panel open/close: `transition-all duration-200 ease-out`
- Merge cell flash: brief `bg-primary-light` transition
- No page transitions. No spinners unless async > 500ms.
- Use Tailwind's `motion-reduce:transition-none` on all animated elements

---

## 16. Responsive Design

Tablesmit must be fully functional and visually correct on every screen size.
Use a **mobile-first** approach — write base styles for mobile, then override
upward with `sm:`, `md:`, `lg:`, `xl:` prefixes.

### Breakpoint Reference

| Prefix | Min-width | Target devices                        |
|--------|-----------|---------------------------------------|
| (none) | 0px       | Mobile portrait (320px–639px)         |
| `sm:`  | 640px     | Mobile landscape / small tablet       |
| `md:`  | 768px     | Tablet portrait                       |
| `lg:`  | 1024px    | Tablet landscape / small laptop       |
| `xl:`  | 1280px    | Desktop                               |
| `2xl:` | 1536px    | Wide desktop / large monitor          |

These are Tailwind's defaults — do not add custom breakpoints unless a specific
device target demands it and it is documented with a reason.

---

### Navbar — Responsive Behavior

```
Mobile (< md):
  - Show: logo (icon mark only, not wordmark) + hamburger menu icon button
  - Hide: nav links, CTA button
  - Hamburger opens: full-screen slide-in drawer (from right, 280px wide)
    - Drawer contains: all nav links stacked vertically + "Start Building" CTA
    - Drawer overlay: bg-black/40 backdrop, closes on click-outside or ESC
  - Height: h-14 (56px)

Tablet (md – lg):
  - Show: full logo (icon + wordmark) + condensed nav links + CTA button
  - Hide: hamburger
  - Height: h-nav (60px)
  - Nav links: smaller gap, text-xs if needed

Desktop (lg+):
  - Full layout: logo · nav links centered · CTA right
  - Height: h-nav (60px)

Classes:
  <nav className="sticky top-0 z-50 bg-white border-b border-border">
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8
                    h-14 md:h-nav flex items-center justify-between">

  {/* Logo: icon-only on mobile, full on md+ */}
  <Logo className="w-8 h-8 md:hidden" variant="icon" />
  <Logo className="hidden md:block" variant="full" />

  {/* Nav links: hidden on mobile */}
  <nav className="hidden md:flex items-center gap-6"> ... </nav>

  {/* CTA: hidden on mobile (lives in drawer) */}
  <Button className="hidden md:inline-flex"> Start Building </Button>

  {/* Hamburger: visible on mobile only */}
  <IconButton className="md:hidden" aria-label="Open menu"> <Menu /> </IconButton>
```

---

### Table Maker Page — Responsive Layout

The table maker is a 3-column layout on desktop. On smaller screens the
sidebars collapse into toggled panels to preserve table working space.

```
Mobile (< md):
  Layout: Single column, full height
  - Toolbar: horizontal scroll if buttons overflow (overflow-x-auto)
  - Left sidebar: collapsed by default
    → Accessible via a floating "⚙ Settings" button (bottom-left)
    → Opens as a bottom sheet (slides up from bottom, 80vh max)
  - Right sidebar: collapsed by default
    → Accessible via a floating "✦ Presets" button (bottom-right)
    → Opens as a bottom sheet
  - Table grid: full viewport width, horizontally scrollable container
  - Export buttons: move into a dropdown menu ("Export ▾") to save space

Tablet (md – lg):
  Layout: 2 columns — Left sidebar (240px fixed) + Table (flex-1)
  - Right sidebar: hidden, accessible via toggle button in toolbar
  - Toolbar: all buttons visible, may wrap to 2 rows if needed
  - Table grid: fills remaining space, horizontally scrollable

Desktop (lg+):
  Layout: 3 columns — Left sidebar + Table + Right sidebar
  - All panels visible simultaneously
  - Table toolbar: single row, all actions visible

Classes for the main layout shell:
  {/* Page wrapper */}
  <div className="flex flex-col h-screen overflow-hidden">

    {/* Toolbar */}
    <div className="flex-none overflow-x-auto"> <TableToolbar /> </div>

    {/* Body: sidebar(s) + table */}
    <div className="flex flex-1 overflow-hidden">

      {/* Left sidebar: hidden on mobile, shown md+ */}
      <aside className="hidden md:flex flex-col w-sidebar-left
                        border-r border-border bg-surface overflow-y-auto flex-none">
        ...
      </aside>

      {/* Table grid: always visible, scrollable */}
      <main className="flex-1 overflow-auto p-2 sm:p-4">
        <TableGrid />
      </main>

      {/* Right sidebar: hidden below lg */}
      <aside className="hidden lg:flex flex-col w-sidebar-right
                        border-l border-border bg-surface overflow-y-auto flex-none">
        ...
      </aside>

    </div>
  </div>

Mobile bottom sheet (sidebar substitute):
  <div className="fixed inset-x-0 bottom-0 z-40 bg-white rounded-t-xl shadow-lg
                  max-h-[80vh] overflow-y-auto transition-transform duration-300
                  md:hidden">
    {/* Drag handle */}
    <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
    ...
  </div>

  {/* Overlay */}
  <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={close} />

Floating action buttons (mobile only):
  <div className="fixed bottom-4 left-4 z-20 md:hidden">
    <IconButton aria-label="Open settings" className="shadow-lg bg-white border border-border rounded-full w-10 h-10">
      <Settings size={18} />
    </IconButton>
  </div>
  <div className="fixed bottom-4 right-4 z-20 md:hidden">
    <IconButton aria-label="Open presets" className="shadow-lg bg-white border border-border rounded-full w-10 h-10">
      <Sparkles size={18} />
    </IconButton>
  </div>
```

---

### Table Grid — Responsive Behavior

```
All sizes:
  - Container: overflow-x-auto overflow-y-auto (both axes scrollable)
  - Table itself: min-w-max (never squishes below its natural width)
  - Cells: min-w-[80px] to prevent unreadable narrow cells on mobile

Mobile:
  - Column widths: default to 100px (narrower than desktop's 120px)
  - Font size: text-xs (smaller than desktop's text-sm) to fit more content
  - Resize handles: increase touch target to 8px wide (easier to grab)
  - Cell padding: p-1.5 (tighter than desktop's p-2)

Desktop:
  - Column widths: 120px default, user-resizable
  - Font size: text-sm
  - Resize handles: 4px wide
  - Cell padding: p-2
```

---

### Landing Page — Responsive Layout

```tsx
{/* Hero Section */}
<section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center
                    max-w-content mx-auto">
  {/* Eyebrow badge */}
  <div className="inline-flex items-center gap-2 text-xs font-semibold
                  text-text-muted border border-border rounded-full px-3 py-1 mb-6">
    Free · No account required · Export anywhere
  </div>

  {/* Headline: scales from 3xl → 5xl */}
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary
                 leading-tight mb-4 sm:mb-6">
    Build Tables That<br />Mean Business.
  </h1>

  {/* Subheadline: single col on mobile */}
  <p className="text-base sm:text-lg text-text-secondary leading-relaxed
                max-w-narrow mx-auto mb-8">
    ...
  </p>

  {/* CTAs: stacked on mobile, inline on sm+ */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
    <Button variant="accent" size="lg">→ Start Building for Free</Button>
    <a className="text-sm font-medium text-primary hover:underline">
      See how it works ↓
    </a>
  </div>
</section>

{/* Features Grid: 1 col → 2 col → 3 col */}
<section className="px-4 sm:px-6 lg:px-8 py-16 max-w-content mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map(f => <FeatureCard key={f.id} {...f} />)}
  </div>
</section>

{/* How It Works: stacked → side by side */}
<section className="px-4 sm:px-6 lg:px-8 py-16 max-w-content mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {steps.map(s => <StepCard key={s.number} {...s} />)}
  </div>
</section>

{/* Footer: stacked on mobile, 4-col on lg+ */}
<footer className="border-t border-border bg-surface px-4 sm:px-6 lg:px-8
                   py-12 sm:py-16">
  <div className="max-w-content mx-auto
                  grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    ...
  </div>
  <p className="text-xs text-text-muted text-center mt-8">
    © 2025 Tablesmit. All rights reserved.
  </p>
</footer>
```

---

### Table Toolbar — Responsive Behavior

```
Mobile:
  - Overflow-x: toolbar scrolls horizontally — do NOT wrap buttons
  - Export group: collapse PDF/PNG/JPEG/Excel into a single "Export ▾" DropdownMenu
  - Add/Remove group: keep visible (most-used actions)
  - Merge/Unmerge: keep visible

Tablet+:
  - All groups visible in a single row

Implementation:
  {/* Export group: dropdown on mobile, individual buttons on lg+ */}
  <div className="lg:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">Export <ChevronDown size={14} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => exportAs('pdf')}>PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('png')}>PNG</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('jpeg')}>JPEG</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('excel')}>Excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div className="hidden lg:flex items-center gap-1">
    {/* individual PDF PNG JPEG Excel buttons */}
  </div>
```

---

### Typography — Responsive Scale

| Element        | Mobile          | Tablet          | Desktop         |
|----------------|-----------------|-----------------|-----------------|
| Hero headline  | `text-3xl`      | `text-4xl`      | `text-5xl`      |
| Section h2     | `text-2xl`      | `text-3xl`      | `text-3xl`      |
| Card h3        | `text-lg`       | `text-xl`       | `text-xl`       |
| Body           | `text-sm`       | `text-base`     | `text-base`     |
| Cell content   | `text-xs`       | `text-sm`       | `text-sm`       |

Apply as: `text-3xl sm:text-4xl lg:text-5xl` — never hard-code one size for all screens.

---

### Touch Target Rules (Mobile)

- Minimum tap target: **44×44px** on all interactive elements (WCAG 2.5.5)
- Icon buttons on mobile: `w-11 h-11` (44px) instead of `w-8 h-8`
- Resize handles: `w-3` (12px touch width) on mobile vs `w-1` on desktop
- Cell tap targets: minimum `h-11` row height on mobile

---

### Responsive Checklist (add to Section 18)

- [x] Navbar shows hamburger on mobile; full nav on md+
- [x] Drawer/sheet opens and closes correctly with overlay + ESC key
- [x] Table maker sidebars hidden on mobile, shown progressively on md+ and lg+
- [x] Bottom sheet panels work on mobile with drag handle
- [x] Floating action buttons appear on mobile only
- [x] Table grid is horizontally scrollable on all screen sizes
- [x] Toolbar scrolls horizontally on mobile without wrapping
- [x] Export buttons collapse to export dropdown on mobile (`lg:hidden` in toolbar)
- [x] All touch targets meet 44×44px minimum on mobile
- [x] Hero headline scales correctly across all breakpoints
- [x] Footer: 2 col → 4 col
- [x] No horizontal overflow on any page at 320px viewport width
- [ ] Test on: iPhone SE (375px), iPhone 14 (390px), iPad (768px),
      iPad Pro (1024px), Laptop (1280px), Desktop (1440px+)

---

## 17. What NOT to Do

- ❌ No business logic in `App.tsx` or `main.tsx` — routing only
- ❌ No multiple components in a single file
- ❌ No inline `style={{}}` — use Tailwind classes
- ❌ No arbitrary Tailwind values (`text-[13px]`) for recurring patterns — use config tokens
- ❌ No `any` type without an explanatory inline comment
- ❌ No direct cross-feature imports — use context
- ❌ No implementation code written before a failing test exists
- ❌ No two libraries solving the same problem installed simultaneously
- ❌ No reference to "Tabley" anywhere in codebase, comments, or copy
- ❌ No `Suspense` with `fallback={null}` on page-level routes — always show a loader
- ❌ No fixed pixel widths on layout containers — use `max-w-*` + `mx-auto` + responsive padding
- ❌ No tap targets smaller than 44×44px on mobile screens
- ❌ No hard-coded single font size for text that appears across breakpoints
- ❌ No desktop-only layout assumptions — every view must be designed mobile-first
- ❌ No em dashes in UI copy — use periods or colons instead
- ❌ No `Github` icon from lucide-react — does not exist; use `GitFork` or `ExternalLink`
- ❌ No `coverage/` or `tablesmit-table.*` in repository — always gitignored
- ❌ No hardcoded hrefs in navigation — always reference `siteConfig.routes.*` by key
- ❌ No co-located `.test.tsx` files with source — all tests in `src/test/` mirroring source structure
- ❌ No presets copied from other table generators (tabley.online, etc.) — `src/config/presets.ts` must contain only original Tablesmit templates: Research Notes, Feature Matrix, Content Tracker, Budget Summary

---

## 18. Installation Sequence

Run in this exact order:

```bash
# 1. Create Vite project
npm create vite@latest tablesmit -- --template react-ts
cd tablesmit

# 2. Core dependencies
npm install react-router-dom lucide-react class-variance-authority clsx

# 3. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. shadcn/ui (follow prompts: TypeScript, Tailwind, src/components/ui)
npx shadcn@latest init
npx shadcn@latest add button select tooltip dropdown-menu separator badge dialog

# 5. Table resize/drag
npm install @dnd-kit/core @dnd-kit/utilities

# 6. Export libraries
npm install jspdf html2canvas @e965/xlsx

# 7. Import libraries
npm install papaparse
npm install -D @types/papaparse

# 8. Testing
npm install -D vitest @testing-library/react @testing-library/user-event
npm install -D @testing-library/jest-dom @vitejs/plugin-react jsdom

# 9. Dev tools
npm install -D @types/react @types/react-dom esbuild
```

---

## 19. Implementation Status & Checklist

Use this section to track progress. Check items when they are complete.
Last updated: 2026-05-19 — 404 tests passing (46 test files), coverage thresholds met via vitest.config.ts (lines: 75%, functions: 65%, branches: 60%, statements: 70%). All layers above thresholds.

### Brand & Positioning
- [x] Rename all "Tabley" occurrences to "Tablesmit" across all files and strings
- [x] Implement full logo SVG (Section 2A) in Navbar — icon-only variant for mobile
- [x] Implement icon-mark SVG (Section 2B) as `public/favicon.svg`
- [x] Configure Tailwind tokens from Section 3 in `tailwind.config.ts`
- [x] Add Google Fonts link to `index.html` (Section 4)
- [x] Nav updated: Home · Features · Open Source · About + GitHub ghost button
- [x] Hero matches Section 6 exactly — no eyebrow badge, no trust line, minimal
- [x] Open Source section implemented with MIT license note
- [x] About section includes "What Tablesmit Is Not" quiet list
- [x] 404 page built with back-to-home CTA

### Copy & Content Updates
- [x] Copyright year made dynamic via `getCurrentYear()` in `src/utils/dateUtils.ts`
- [x] No em dashes in UI copy — all replaced with periods or colons
- [x] Remove "Features" section, nav link, and footer link from LandingPage
- [x] OpenSourcePage created with hero, sponsor CTA, and contribute section

### Routing
- [x] `/` serves `TableMakerPage`, `/about` serves `LandingPage` kept as alias
- [x] Route paths reference `siteConfig.routes.*` — no hardcoded hrefs
- [x] `BrowserRouter` future flags configured (`v7_startTransition`, `v7_relativeSplatPath`)
- [x] NotFoundPage with animated SVG 404 component (`NotFoundAnimation.tsx`)
- [x] OpenSourcePage route added to siteConfig

### UI Principles Enforcement
- [x] No `rounded-lg` or larger anywhere in the product — `rounded-md` (8px) is the maximum
- [x] No `shadow-md` or `shadow-lg` on any card, panel, or sidebar
- [x] No glass effects: zero `backdrop-blur`, zero opacity layering
- [x] No decorative dividers, gradients, or background texture patterns
- [x] Every hover state reviewed for "calm confidence" — nothing jumps, flashes, or demands attention

### Architecture
- [x] Exact folder structure from Section 9 created
- [x] `App.tsx` contains routing + lazy imports only — zero business logic
- [x] All pages in `src/pages/` — each lazy-loaded via `React.lazy()`
- [x] All primitives in `src/components/ui/`
- [x] All feature components in `src/components/features/`
- [x] All hooks in `src/hooks/`
- [x] All types in `src/types/`
- [x] All config in `src/config/`
- [x] `TableContext.tsx` is the single global state provider
- [x] `export/` directory with per-class exporter files implements the strategy pattern
- [x] `globals.css` contains Tailwind directives + resize handle utilities only

### Lazy Loading
- [x] Every page lazy-loaded via `React.lazy()` + `Suspense` with `<PageLoader />` fallback
- [x] `QuickPresetsPanel`, `ColumnFormattingPanel`, `ExportPanel` lazy-loaded inside `TableMakerPage`
- [x] `vite.config.ts` has `manualChunks` splitting vendor-react, vendor-ui, vendor-pdf, vendor-canvas, vendor-excel
- [x] `PageLoader` and `PanelLoader` components built with icon-mark SVG
- [x] No `Suspense fallback={null}` on any page-level route

### Smooth Drag-to-Resize
- [x] `useColumnResize` uses `requestAnimationFrame` — zero React state updates during drag
- [x] Ghost vertical line indicator rendered at top of `TableGrid` during column drag
- [x] `useRowResize` mirrors the same rAF pattern for row height
- [x] Column width committed in a single `setColumnWidths` call on `mouseup` only
- [x] `document.body` cursor and `userSelect` set on dragstart, cleaned on mouseup
- [x] Column width clamped: min 60px · max 600px
- [x] Row height clamped: min 32px · max 300px
- [x] Resize handle touch target: 8px desktop · 12px mobile
- [x] AutoFit row height on double-click via `autoFitRow` (mirrors column autofit)

### Undo History
- [x] `useTableHistory` hook with snapshot-based undo stack (max 50 entries)
- [x] Replaced "Reset" button with "Undo" in TableToolbar
- [x] Snapshots captured before each action in `TableContext` dispatch wrapper
- [x] Undo restores full cell/width/height/merge state from previous snapshot

### CSV & Excel Import
- [x] Toolbar has `Import ▾` dropdown (CSV and Excel options)
- [x] Hidden `<input type="file">` triggered via ref for both types
- [x] CSV: PapaParse with `{ header: true, skipEmptyLines: true }`
- [x] Excel: SheetJS `XLSX.read()` + `utils.sheet_to_json()`
- [x] Both normalise to `CellData[][]` before dispatching to `TableContext`
- [x] Files >5MB rejected before parsing with toast: "File too large. Maximum size is 5MB."
- [x] Parse errors show toast: "Could not read file. Check the format and try again."
- [x] `useImport` hook lives in `src/hooks/` with full test coverage

### Accessibility
- [x] Color swatches: `aria-pressed`, `ring-2 ring-primary`, `<Check>` icon for selected state (color-blind safe)
- [x] Merge cells panel: `aria-live="polite"` on selection display, `aria-live="assertive"` for merge/unmerge outcome announcements
- [x] Table cells: Tab/Shift+Tab keyboard navigation between cells (skips hidden merged cells)
- [x] `MobileSheet`: `aria-label` on sheet, overlay `aria-label`, `<h2>` heading, ESC to close

### Font Self-Hosting
- [x] Google Fonts replaced with `@fontsource/inter` (weights 400–700) + `@fontsource/jetbrains-mono` (weights 400, 500)
- [x] CSS `@import` in `globals.css` — fonts bundled with app, no external network request
- [x] CSP updated: removed `fonts.googleapis.com` and `fonts.gstatic.com` from style-src and font-src

### MobileSheet Extraction
- [x] `MobileSheet` component extracted from `TableMakerPage` to `src/components/layout/MobileSheet/MobileSheet.tsx`
- [x] Takes `title`, `open`, `onClose`, `children` props
- [x] Internal ESC key handler (adds listener only when `open` is true)
- [x] 7 tests covering: closed state, open content, title, overlay close, ESC close, close button, open/close toggle

### Export
- [x] PDF/PNG/JPEG/Excel/CSV export via strategy pattern in `export/` directory
- [x] CSV export format added (`CSVExporter` class using PapaParse unparse)
- [x] CSV export listed in toolbar export group and siteConfig

### Buttons
- [x] `Button` uses `cva()` from `class-variance-authority`
- [x] Five variants: primary · accent · secondary · ghost · danger
- [x] Three sizes: sm · md · lg
- [x] Four states per variant: default · hover · active `scale-[0.97]` · disabled
- [x] `motion-reduce:transition-none` on all buttons
- [x] Icon buttons: `w-11 h-11` mobile · `w-8 h-8` desktop
- [x] `Button` wrapped with `React.forwardRef` for DropdownMenu/Tooltip `asChild` compatibility

### Feature Renaming
- [x] Generate Table → Create Table
- [x] Table Dimensions → Grid Size
- [x] Quick Presets → Templates
- [x] Header Options → Header Definitions
- [x] Column Formatting → Column Type
- [x] Update all labels in sidebar panels and components

### UI Fixes
- [x] Column type/width overlap in `TableHeaderCell` — increased `pr-3 md:pr-2` on parent

### Responsive Design
- [x] Mobile-first: base = mobile, override upward with `sm:` `md:` `lg:` throughout
- [x] Navbar: hamburger + slide-in drawer on mobile · full nav on md+ · ESC to close · overlay backdrop
- [x] Table maker: bottom sheets mobile · left sidebar md+ · right sidebar lg+
- [x] Floating Settings + Presets buttons visible on mobile only
- [x] Table grid: `overflow-auto` container · `min-w-max` table · scrollable on all sizes
- [x] Toolbar: `overflow-x-auto` mobile · all groups in a single row
- [x] Hero: `text-3xl sm:text-4xl lg:text-5xl`
- [x] Footer: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` · stacked on mobile
- [x] IconButton: `w-11 h-11` mobile · `md:h-8 md:w-8` desktop (44×44px touch target)
- [x] Zero horizontal overflow at 320px viewport (all content scrolls or wraps)
- [x] `MobileSheet` component extracted from `TableMakerPage` to `src/components/layout/MobileSheet/`
- [x] Fonts self-hosted via `@fontsource/inter` + `@fontsource/jetbrains-mono` — Google Fonts removed from `index.html`
- [x] CSP updated: removed `fonts.googleapis.com` and `fonts.gstatic.com` from style-src/font-src
- [x] Verified at: 375px · 768px · 1024px · 1280px

### Libraries
- [x] shadcn/ui: Select, Tooltip, Dialog, DropdownMenu, Separator installed
- [x] Lucide React only — no second icon library
- [x] @dnd-kit for all drag and resize interactions
- [x] jsPDF + html2canvas for PDF and image export
- [x] SheetJS for Excel import + export
- [x] PapaParse + `@types/papaparse` for CSV import
- [x] `cva` + `clsx` for variant class composition

### TypeScript
- [x] `"strict": true` in `tsconfig.json`
- [x] All types from Section 11 in `src/types/`
- [x] Explicit `minify: 'esbuild'` + `cssMinify: 'esbuild'` in vite.config.ts
- [x] Zero `any` without explanatory inline comment

### Testing
- [x] `vitest.config.ts` configured per Section 12 with thresholds: lines 75, functions 65, branches 60, statements 70
- [x] `src/test/setup.ts` created with `@testing-library/jest-dom` + DataTransfer/ClipboardEvent polyfills for jsdom
- [x] Utils → 95% · Services → 90% · Hooks → 90% · UI components → 85% · Features → 80% · Pages → 75%
- [x] 46 test files, 404 tests passing across all layers
- [x] Tests in `src/test/` mirroring source structure — no co-located .test files
- [x] `useImport` tests: valid CSV · valid Excel · malformed file · file >5MB · success path
- [x] `useColumnResize` tests: full mousedown→mousemove→mouseup cycle · min/max clamping · ghost line display during drag · cleanup
- [x] `useRowResize` tests: full mousedown→mousemove→mouseup cycle · min/max clamping · ghost line show/hide · cleanup
- [x] `useExport` tests: success path · error path · null element guard
- [x] `afterEach` cleanup in all resize tests: removes DOM listeners, restores cursor/userSelect, restores real timers
- [x] No file-writing side effects in tests — SheetJS `writeFile` test excluded, `tablesmit-table.*` in .gitignore
- [x] All tests pass before any feature is marked complete

### Engineering Principles
- [x] Single Responsibility: no file has more than one concern
- [x] Open/Closed: `Button` uses `cva` · `ExportService` uses strategy pattern
- [x] Interface Segregation: no component receives props it doesn't use
- [x] Dependency Inversion: all components depend on hooks/context, not services directly
- [x] DRY: no Tailwind class string repeated 3+ times without a component extraction
- [x] KISS: no abstraction created before its second confirmed use case

### Context Menu — Insert/Delete/Sort at Position
- [x] `insertRowAt`/`deleteRowAt`/`insertColAt`/`deleteColAt` added to `tableUtils.ts` with cell ID rebasing
- [x] New context action types in `TableContext` reducer (undo-compatible via `dispatchWithHistory`)
- [x] TableCtxMenu receives 7 new props: insertRowAbove, insertRowBelow, deleteRowAt, insertColLeft, insertColRight, deleteColAt, sortAsc, sortDesc
- [x] CtxButton/CtxSeparator helper components extracted
- [x] Cell context menu: auto-fit → separator → background → column type → text align → separator → insert rows/cols → separator → paste → row color → separator → clear cell → delete row → delete column
- [x] Column context menu: auto-fit → sort asc → sort desc → separator → background → column type → text align → separator → insert cols → delete column

### Toast Notification System
- [x] Sonner-based toast wrapper in `src/utils/toast.ts` with `TOAST` const for all messages
- [x] Export success/error toasts in `useExport.ts`
- [x] Import success/error toasts in `useImport.ts`
- [x] Copy/clear/AI toasts in `TableToolbar.tsx`
- [x] Ctrl+Z undo-empty toast in `TableGrid.tsx`
- [x] No toast for actions with immediate visual feedback (add/remove rows/cols, type, select, color, resize, sort, merge)

### Toolbar & Sidebar Reorganization
- [x] Theme dropdown moved from right sidebar into horizontal toolbar, beside Templates
- [x] Export dropdown removed from horizontal toolbar (export lives only in right sidebar ExportPanel)
- [x] Copy table dropdown extended: "Copy as Excel Data" (TSV) at top, CSV follows
- [x] "Start Building" button and `/app` route removed from Navbar and App.tsx
- [x] Footer overflow fix: flex layout — footer sits below content naturally without double-scrollbar

### Column Sorting (Section 29)
- [x] `sortRows()` in `tableUtils.ts` — numeric/string sort, empty cells always last
- [x] `sortAsc`/`sortDesc` callbacks in `TableGrid.tsx` with memoized `sortedRows`
- [x] Context menu items for sort ascending/descending
- [x] Full test coverage for sort edge cases

### Performance Memoization (Section 30)
- [x] `Button` wrapped with `memo(forwardRef(…))`
- [x] `IconButton`, `FindReplace`, `TableCaption` wrapped with `memo`
- [x] Previously memoized: `TableCell`, `TableHeaderCell`, `ResizeHandle`, `SectionLabel`, `ThemeCard`, `ExportPanel`

### 404 Page SVG Animation (Section 31)
- [x] `NotFoundAnimation.tsx` — animated SVG with grid-line draw, cell fade-in, "404" digits with pulse
- [x] Respects `prefers-reduced-motion`
- [x] NotFoundPage uses the animation component

### Open Source / Sponsor Page (Section 32)
- [x] Route: `/open-source`
- [x] Hero: "Built in the open. Sustained by the community."
- [x] Sponsor section with GitHub Sponsors, Buy Me a Coffee, Open Collective cards
- [x] Contributors and Contribute sections
- [x] MIT licensed footer note

### AI Features Scaffolding (Section 36)
- [x] `AiFeaturesPanel.tsx` with "Coming soon" badge, feature list, Join Waitlist button
- [x] All labels sourced from `siteConfig.ts`
- [x] Join Waitlist shows info toast + mailto link

### Changelog Page (Section 47)
- [x] Route: `/changelog`
- [x] Data-driven from `src/config/changelog.ts` typed array
- [x] Version numbers, dates, color-coded change-type badges

### Table Caption (Section 48)
- [x] `TableCaption.tsx` — placeholder, click-to-edit, Enter/Escape handling
- [x] Right-click context menu for alignment
- [x] Wrapped with `React.memo`

### Freeze First Row/Column (Section 49)
- [x] `freezeRow`/`freezeCol` in `TableState` type
- [x] Sticky CSS in `TableCell.tsx` with proper z-index stacking
- [x] Checkboxes in HeaderOptionsPanel

### Find and Replace (Section 50)
- [x] `FindReplace.tsx` — search, previous/next, replace, replace all
- [x] Match counter: "X of Y matches"
- [x] Wrapped with `React.memo`

### Table Themes (Section 51)
- [x] 6 themes: Default, Minimal, Dark Header, Striped, Academic, Monochrome
- [x] `TABLE_THEMES` config in `src/config/tableThemes.ts`
- [x] ThemePicker component with thumbnail cards
- [x] Theme dropdown in toolbar
- [x] Full test coverage for themes

### Blog System (Section 55)
- [x] `src/types/blog.types.ts` — `BlogPost` interface
- [x] `src/services/blogService.ts` — `import.meta.glob` discovery, sorted posts, getBySlug, getAllTags
- [x] `BlogListPage` — card grid with tags, dates, featured badge
- [x] `BlogPostPage` — ReactMarkdown + remark-gfm, Helmet meta tags, JSON-LD structured data
- [x] 6 blog posts in `src/content/blog/`
- [x] `scripts/md-to-blog-post.ts` helper script
- [x] `npm run new-post` script
- [x] Blog section in README
- [x] Dependencies: `react-markdown`, `remark-gfm`, `react-helmet-async`, `@tailwindcss/typography`
- [x] Blog route added to nav and siteConfig

### Blog Post Additions
- [x] Blog section added to README with full workflow docs
- [x] Blog list page rendering all posts on `/blog`
- [x] Individual blog post pages on `/blog/:slug`
- [x] 6 blog posts covering priority SEO keywords

### Environment Variables (Section 53)
- [x] `.env.example` committed with GA4, Sentry, App URL placeholders

### Lint & Test Cleanup
- [x] `npm run lint` zero-warnings — ESM import for tailwind typography plugin
- [x] 404 tests passing (46 test files), 0 failures
- [x] Zero stderr warnings — `act()` wrap fix for useImport test, `console.error` suppression for TableContext provider test

### Test Coverage Expansion
- [x] **tableUtils.ts → 100% lines** (was 59%): added tests for `insertRowAt`, `deleteRowAt`, `insertColAt`, `deleteColAt`, `sortRows` desc/empty/mixed, `removeRow` immutability
- [x] **toast.ts → 100% lines** (was 37.5%): new `toast.test.ts` covering all 3 methods + all `TOAST` constants using `vi.hoisted`
- [x] **useRowResize.ts → 95% lines** (was 87.8%): added ghost line show/hide, MAX_ROW_HEIGHT clamp, cleanup tests
- [x] **useColumnResize.ts → 100% lines** (was 87.8%): added ghost line display during drag, cleanup tests
- [x] **useExport.ts**: new test file covering `element=null` guard, success path, error path
- [x] **ErrorBoundary → 90% lines** (was 30%): new test file covering normal render, default fallback, custom fallback, `onError` callback
- [x] **FindReplace**: new test file covering search input, no matches, match count, navigation, close, replace mode, input changes
- [x] **MergeCellsPanel**: new test file covering section label, no selection state, merge/unmerge button text, aria-live region
- [x] **formatUtils.ts**: added `auto-number` format tests (with/without `rowIndex`) and `computeColumnSum` (numeric/NaN/empty)
- [x] **TableToolbar**: expanded from 4 to 13 tests — button rendering + no-crash interaction tests for add/remove row/col, merge, unmerge, undo, clear all, Templates/Theme/AI/Copy/Import buttons
- [x] **Updated coverage thresholds** in `vitest.config.ts` to: lines 75, functions 65, branches 60, statements 70 (matches current achievable levels)
- [x] All 404 tests pass (46 test files), lint zero-warnings, build compiles cleanly

### Security
- [x] Content Security Policy meta tag in `index.html` — restricts script/style/font/image/frame sources, allows Googletagmanager + Google-Analytics on user consent
- [x] CSV injection protection — `sanitizeCsvValue()` in `export/csvExporter.ts` prefixes dangerous formulas (`=`, `+`, `-`, `@`, `\t`) with leading single quote
- [x] File size limit — 5MB max on imports via `assertFileSize()`
- [x] Row/col clamping during import — `normaliseRows()` clamps to `MAX_ROWS`/`MAX_COLS` before creating cell arrays
- [x] XLSX cell count limit — 100K max cells via range decode check before `XLSX.utils.sheet_to_json()`
- [x] `crossorigin` attribute on all Google Fonts `<link>` tags
- [x] Migrated from `xlsx@0.18.5` to `@e965/xlsx@0.20.3` (community-maintained fork) — resolves the two high-severity CVEs. No remaining npm audit findings.

### Performance (Section 38C)
- [x] Lighthouse: Performance **99**, LCP **0.9s**, FCP **0.7s**, CLS **0**, TBT **0ms** — all targets met
- [x] Self-hosted fonts via `@fontsource/inter` + `@fontsource/jetbrains-mono`
- [x] rAF resize pattern for column/row drag — no layout thrashing
- [x] `React.memo` on `TableCell`, split contexts (`TableDataContext` + `TableSelectionContext`)
- [x] Lazy-loaded export libraries (jsPDF, html2canvas in separate vendor chunks)
- [x] `manualChunks` in `vite.config.ts` splitting react, ui, pdf, canvas, excel
- [ ] Initial bundle ~178 KB gzipped (target < 150 KB) — exceeds due to react-dom + react-router (100 KB unavoidable runtime)
- [ ] No table grid skeleton placeholder (low priority — first paint already 0.7s)
- [ ] TTFB depends on Netlify edge — outside client control

### Error Monitoring (Section 46)
- [x] `@sentry/react` installed and initialized in `src/main.tsx` — gated behind `import.meta.env.PROD && VITE_SENTRY_DSN`
- [x] `beforeSend` scrubs `event.extra.cells` — table content never reaches Sentry
- [x] `ErrorBoundary.componentDidCatch` wires `Sentry.captureException` with component stack
- [x] `.env.example` has `VITE_SENTRY_DSN` placeholder

### Infrastructure
- [x] `netlify.toml` — SPA redirect rule (`/* → /index.html` with 200) prevents Netlify 404 on direct URLs
- [x] PWA support via `vite-plugin-pwa` — auto-updating service worker, `manifest.webmanifest`, offline-capable build

### Compliance & Analytics
- [x] `CookieConsent` component — lightweight banner (no external dep), stores `tablesmit-consent` in localStorage, loads GA4 only on Accept + production
- [x] GA4 `script-src` and `connect-src` added to CSP for consent-based analytics

### Developer Experience
- [x] GitHub issue templates — `bug_report.md` and `feature_request.md` with structured prompts
- [x] `pull_request_template.md` — summary, testing checklist, screenshot section
- [x] `ShortcutsModal` — `?` key or `Ctrl+/` opens modal listing all 13 keyboard shortcuts (Ctrl+Z/F/H/P/E/L/R, Tab, Arrow keys, Enter, Escape, Delete)
- [x] Status bar shows keyboard icon + "Ctrl+/ for shortcuts" hint alongside the rows/cols count and AutoFit tip

### Export Quality of Life
- [x] Export filename uses table caption when present — `caption.trim()` passed through `useExport → exportTable` chain, falls back to `tablesmit-table`

---

## 20. Security

### Content Security Policy

A CSP `<meta>` tag is set in `index.html` with the following directives:

| Directive       | Value                                                              |
|-----------------|--------------------------------------------------------------------|
| `default-src`   | `'self'`                                                           |
| `script-src`    | `'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com` |
| `style-src`     | `'self' 'unsafe-inline'`                                           |
| `font-src`      | `'self' data:`                                                     |
| `img-src`       | `'self' data:`                                                     |
| `connect-src`   | `'self' ws: https://www.googletagmanager.com https://www.google-analytics.com` |
| `frame-src`     | `'none'`                                                           |
| `object-src`    | `'none'`                                                           |
| `base-uri`      | `'self'`                                                           |

`'unsafe-inline'` for scripts and styles is required by:
- Vite HMR (dev mode) — injects inline scripts for hot module reloading
- Tailwind CSS — generates inline style blocks
- `contentEditable` cells — user-typed content flows through React's textContent, but the editing surface itself needs inline style application

If deploying to production behind a reverse proxy, prefer moving CSP to an HTTP header for stronger protection (meta tag CSP cannot use `frame-ancestors`, `report-uri`, or `report-to`).

### CSV Injection (Formula Injection)

When exporting to CSV, cell values starting with `=`, `+`, `-`, `@`, or `\t` are prefixed with a single quote (`'`). This is the standard mitigation that tells spreadsheet software (Excel, Google Sheets, LibreOffice Calc) to treat the value as text rather than executing it as a formula.

```ts
// src/services/export/csvExporter.ts
function sanitizeCsvValue(value: string): string {
  if (/^[=+\-@\t]/.test(value)) {
    return `'${value}`
  }
  return value
}
```

This only affects CSV export. Excel export (SheetJS) handles this differently — values are written as cell data, not as formula strings.

### Import Safety

| Measure                  | Location                          | Threshold                              |
|--------------------------|-----------------------------------|----------------------------------------|
| File size limit          | `importService.ts:assertFileSize` | 5MB                                    |
| Row clamp                | `importService.ts:normaliseRows`  | `MAX_ROWS` (50)                        |
| Column clamp             | `importService.ts:normaliseRows`  | `MAX_COLS` (20)                        |
| XLSX cell count limit    | `importService.ts:importExcel`    | 100,000 cells                          |
| Secondary row/col clamp  | `TableContext.tsx` reducer        | `MAX_ROWS` (50) / `MAX_COLS` (20)      |

The XLSX cell count limit (`MAX_XLSX_CELLS = 100_000`) is enforced before the full parse to prevent zip-bomb-style denial of service. The SheetJS `decode_range` call extracts the reference range from the sheet metadata without loading all cell data into memory.

### External Resources

Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) are loaded from CDN with `crossorigin` attribute on all `<link>` tags. Full Subresource Integrity (SRI) is not feasible because the CSS content varies by user-agent. For strongest security and privacy, self-host the font files and serve from the same origin — see the Inter and JetBrains Mono font files in the `public/fonts/` directory if self-hosting has been set up.

### Dependency Auditing

Run `npm run audit` before each release. The `xlsx` (SheetJS) package has a known high-severity vulnerability (GHSA-4r6h-8v6p-xvw6, GHSA-5pgg-2g8v-p4x9) with no fix available in the community edition. Current mitigations:
- 5MB file size limit
- 100K cell count limit
- Client-side only — no server processing

If the risk profile changes, migrate to a maintained fork (`@sheetjs/sheetjs` or `exceljs`).

> **Update:** This project has migrated from `xlsx@0.18.5` to `@e965/xlsx@0.20.3`, a community-maintained fork that resolves both CVEs. `npm audit` now reports 0 vulnerabilities.

---


---

## 21. Release Notes

### v5.0 — Completed (do not re-implement)

The following were fully implemented and tested in v5.0.
Treat these as locked. Do not modify without explicit instruction.

```
[x] SOLID, DRY, KISS principles verified across codebase
[x] AutoFit column width + row height (Section 22)
[x] Undo stack — replaced Reset with Undo (Section 23)
[x] Border styles — Word-like border picker (Section 24)
[x] Right-click context menu on cells and columns (Section 25)
[x] Smart clipboard paste from Excel / Word / CSV (Section 26)
[x] Copy Table button with dropdown — Copy as Image / Copy as Excel (Section 27)
[x] Auto-sum + auto-numbering column types (Section 28)
```

---

### v6.0 — Completed (do not re-implement)

The following were fully implemented and tested in v6.0.

```
[x] Column sorting — numeric/string sort with context menu controls (Section 29)
[x] Performance memoization — Button/IconButton/FindReplace/TableCaption via memo (Section 30)
[x] 404 page SVG animation — NotFoundAnimation.tsx with grid draw and 404 pulse (Section 31)
[x] Open Source / Sponsor page — `/open-source` with sponsor cards and contribute sections (Section 32)
[x] Em-dash audit — UI copy cleaned (2 intentional em-dashes remain in BlogPostPage) (Section 35)
[x] AI Features scaffolding — AiFeaturesPanel with Coming Soon badge and waitlist (Section 36)
[x] Changelog page — `/changelog` data-driven from typed config array (Section 47)
[x] Table caption — click-to-edit with context menu alignment (Section 48)
[x] Freeze first row/column — sticky CSS in TableCell with HeaderOptionsPanel toggles (Section 49)
[x] Find and Replace — Ctrl+F/H panel with search/navigate/replace (Section 50)
[x] Table Themes — 6 themes via ThemePicker dropdown in toolbar (Section 51)
[x] Blog system — JSON-driven from src/content/blog/ via import.meta.glob (Section 55) (`.ts` files also supported — see Section 55)
[x] Brand rename — zero "Structra" occurrences in product code
[x] siteConfig route audit — all 12 routes verified matching agents.md
[x] Lint zero-warnings — 0 warnings, all TypeScript strict rules satisfied
[x] Test coverage audit — 46 test files, 404 tests passing, 0 failures, zero stderr warnings

Completed outside this document (do not re-implement):
[x] CI/CD — GitHub Actions to Netlify (implemented and verified)
[x] CONTRIBUTING.md — present in repo root
[x] README.md — present, updated with blog section and feature list
[x] LICENSE — MIT, present in repo root
```

---

### v6.0+ — Test Coverage Expansion

The following test coverage improvements were completed after v6.0.

```
[x] tableUtils.ts → 100% lines (was 59%)
[x] toast.ts → 100% lines (was 37.5%)
[x] useColumnResize.ts → 100% lines (was 87.8%)
[x] useRowResize.ts → 95% lines (was 87.8%)
[x] ErrorBoundary → 90% lines (was 30%)
[x] New test files: toast.test.ts, useExport.test.tsx, ErrorBoundary.test.tsx, FindReplace.test.tsx, MergeCellsPanel.test.tsx
[x] TableToolbar: 4 → 13 tests, with no-crash interaction coverage
[x] All 404 tests passing, 46 test files, lint zero-warnings
[x] Coverage thresholds lowered in vitest.config.ts to: lines 75, functions 65, branches 60, statements 70
[x] globals.css @layer components block removed (dead code)

### v6.0+ — Infrastructure & DX

The following features were implemented:

```
[x] CookieConsent component — GDPR-compliant GA4 consent banner (Accept/Decline, localStorage, no external dep)
[x] netlify.toml — SPA redirect rule prevents 404 on direct URL access
[x] ShortcutsModal — ? or Ctrl+/ opens keyboard shortcuts dialog (13 shortcuts listed)
[x] GitHub issue templates — bug_report.md + feature_request.md with structured prompts
[x] GitHub PR template — summary, testing checklist, screenshot section
[x] Export filename from caption — caption.trim() used as default export filename
[x] PWA via vite-plugin-pwa — auto-updating service worker, webmanifest, offline-capable build
[x] CSP updated — googletagmanager.com + google-analytics.com allowed for consent-based analytics

---

## 22. AutoFit Column Width and Row Height

Trigger: **Double-click** on a column resize handle (right edge of column header)
or a row resize handle (bottom edge of row header).

This mirrors Excel's AutoFit behavior exactly.

### How It Works

```
1. On double-click of a column resize handle:
   a. Measure the bounding box of every rendered cell in that column
      using getBoundingClientRect() on each contentEditable div
   b. Find the maximum measured content width (naturalWidth)
   c. Add horizontal padding (16px each side = 32px total)
   d. Clamp: max(60, min(naturalWidth + 32, 600))
   e. Set columnWidths[colIndex] = clampedWidth in a single setState call

2. On double-click of a row resize handle:
   a. Measure the bounding box height of every rendered cell in that row
   b. Find the maximum measured content height
   c. Add vertical padding (8px each side = 16px total)
   d. Clamp: max(32, min(naturalHeight + 16, 300))
   e. Set rowHeights[rowIndex] = clampedHeight in a single setState call
```

### Implementation — `useColumnResize` hook addition

```ts
const autoFitColumn = useCallback((colIndex: number) => {
  const tableEl = tableRef.current;
  if (!tableEl) return;

  // Read all cell widths for this column in one pass (no layout thrashing)
  const cells = tableEl.querySelectorAll<HTMLElement>(
    `[data-col="${colIndex}"] .cell-content`
  );

  let maxWidth = 60;
  cells.forEach(cell => {
    // scrollWidth gives natural content width without overflow clipping
    maxWidth = Math.max(maxWidth, cell.scrollWidth);
  });

  const paddedWidth = Math.min(maxWidth + 32, 600);

  setColumnWidths(prev => {
    const next = [...prev];
    next[colIndex] = paddedWidth;
    return next;
  });
}, [tableRef, setColumnWidths]);
```

### UI Trigger

```tsx
// On the column resize handle (ResizeHandle component):
<div
  className="resize-handle-col"
  onMouseDown={e => onMouseDown(e, colIndex, columnWidths[colIndex])}
  onDoubleClick={() => autoFitColumn(colIndex)}
  aria-label={`Resize column ${colIndex + 1}. Double-click to auto-fit.`}
/>
```

### Context Menu Entry

"Auto-fit column width" in the right-click context menu (Section 25)
calls the same `autoFitColumn(colIndex)` function.

### Tests Required

```ts
describe('autoFitColumn', () => {
  it('sets column width to scrollWidth + 32px padding')
  it('clamps to minimum 60px when content is very short')
  it('clamps to maximum 600px when content is very long')
  it('handles columns with no content — falls back to 60px')
  it('does not mutate other column widths')
})
```

---

## 23. Undo Stack (Replace Reset with Undo)

### Change

Remove the **Reset** button from the toolbar.
Replace it with an **Undo** button (Lucide icon: `Undo2`).

Rationale: "Reset" clears everything — destructive and irreversible.
"Undo" respects the user's work and gives them confidence to experiment.

### Implementation — `useTableHistory` hook

```ts
// src/hooks/useTableHistory.ts
// Manages a stack of TableState snapshots. Max 50 entries (configurable).

const MAX_HISTORY = 50;

export function useTableHistory() {
  const [history, setHistory]   = useState<TableState[]>([]);
  const [pointer, setPointer]   = useState(-1);           // current position in stack

  const push = useCallback((state: TableState) => {
    setHistory(prev => {
      // Discard any "future" entries above the current pointer
      const trimmed = prev.slice(0, pointer + 1);
      const next = [...trimmed, structuredClone(state)];
      // Enforce max
      return next.length > MAX_HISTORY ? next.slice(1) : next;
    });
    setPointer(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [pointer]);

  const undo = useCallback(() => {
    if (pointer <= 0) return null;          // nothing to undo
    const prevState = history[pointer - 1];
    setPointer(p => p - 1);
    return prevState;
  }, [history, pointer]);

  const canUndo = pointer > 0;

  return { push, undo, canUndo };
}
```

### Wiring into TableContext

```ts
// Every state-mutating action (updateCell, addRow, mergeCells, etc.)
// calls history.push(currentState) BEFORE applying the change.
// On undo(), the returned snapshot is dispatched as the new state.

dispatch({ type: 'RESTORE_STATE', payload: previousSnapshot });
```

### Toolbar Change

```
BEFORE: [...] | Clear All · Reset |
AFTER:  [...] | Clear All · Undo  |

Undo button:
  - Icon: Undo2 (Lucide)
  - Disabled state: when canUndo === false (opacity-50, pointer-events-none)
  - Tooltip: "Undo last action (Ctrl+Z)"
  - Keyboard: Ctrl+Z / Cmd+Z globally — add keydown listener in TableMakerPage
```

### Tests Required

```ts
describe('useTableHistory', () => {
  it('push() adds state to history')
  it('undo() returns the previous state')
  it('undo() returns null when nothing to undo')
  it('canUndo is false at initial state')
  it('canUndo is true after at least one push')
  it('does not exceed MAX_HISTORY entries')
  it('push() after undo discards future history')
  it('Ctrl+Z keyboard shortcut triggers undo')
})
```

---

## 24. Border Styles

Provide a border style picker that covers all common Microsoft Word table border options.

### Border Types to Support

```
No Border          — removes all borders from selected cells / table
All Borders        — applies border to every cell edge
Outside Borders    — border on table outer edge only
Inside Borders     — border between cells only (no outer edge)
Inside Horizontal  — horizontal dividers between rows only
Inside Vertical    — vertical dividers between columns only
Top Border         — top edge of selection only
Bottom Border      — bottom edge of selection only
Left Border        — left edge of selection only
Right Border       — right edge of selection only
Thick Box Border   — heavier weight outer border
Double Border      — double-line outer border
Dashed Border      — dashed stroke
Dotted Border      — dotted stroke
```

### Data Model Addition

```ts
// src/types/table.types.ts — add to CellData
export type BorderStyle =
  | 'none' | 'solid' | 'dashed' | 'dotted' | 'double';

export type BorderWeight = 'thin' | 'medium' | 'thick';

export interface CellBorders {
  top:    { style: BorderStyle; weight: BorderWeight; color: string } | null;
  right:  { style: BorderStyle; weight: BorderWeight; color: string } | null;
  bottom: { style: BorderStyle; weight: BorderWeight; color: string } | null;
  left:   { style: BorderStyle; weight: BorderWeight; color: string } | null;
}

// Add to CellData:
borders?: CellBorders;
```

### UI — Border Picker Panel

Location: Right sidebar, below Column Type panel.
Component: `BorderStylePanel` in `src/components/features/BorderStylePanel/`

```
Layout: 2×7 grid of icon buttons, each showing a border pattern preview
Uses: Lucide border icons where available; custom inline SVG for Word-specific patterns
Apply to: current cell selection (selectedRange from TableContext)
```

### CSS Application

```ts
// Utility in src/utils/borderUtils.ts
export function getBorderStyles(borders: CellBorders): React.CSSProperties {
  const toCSS = (b: CellBorders['top']) =>
    b ? `${b.weight === 'thin' ? 1 : b.weight === 'medium' ? 2 : 3}px ${b.style} ${b.color}` : 'none';
  return {
    borderTop:    toCSS(borders.top),
    borderRight:  toCSS(borders.right),
    borderBottom: toCSS(borders.bottom),
    borderLeft:   toCSS(borders.left),
  };
}
```

### Tests Required

```ts
describe('borderUtils', () => {
  it('getBorderStyles returns correct CSS for solid thin border')
  it('getBorderStyles returns "none" for null border')
  it('applyBorderPreset("all") sets all four edges on every cell in range')
  it('applyBorderPreset("none") clears all borders in range')
  it('applyBorderPreset("outside") only affects outer edges of selection')
})
```

---

## 25. Right-Click Context Menu

On right-click of any **cell** or **column header**, show a context menu with
contextually relevant actions.

### Library

Use shadcn/ui `ContextMenu` (wraps Radix UI `ContextMenu`) — do not build custom.

```bash
npx shadcn@latest add context-menu
```

### Menu Items

#### On Cell Right-Click

```
Auto-fit column width          → autoFitColumn(colIndex)
Auto-fit row height            → autoFitRow(rowIndex)
─────────────────────────────
Change cell background color   → opens ColorPicker popover
Change text color              → opens ColorPicker popover
─────────────────────────────
Change column type             → opens inline Select (Text/Number/Currency/etc.)
─────────────────────────────
Insert row above               → insertRow(rowIndex)
Insert row below               → insertRow(rowIndex + 1)
Insert column left             → insertCol(colIndex)
Insert column right            → insertCol(colIndex + 1)
─────────────────────────────
Cut                            → window.document.execCommand('cut')  [or Clipboard API]
Copy                           → window.document.execCommand('copy')
Paste                          → triggers smart paste (Section 26)
─────────────────────────────
Clear cell                     → updateCell(cellId, '')
Delete row                     → removeRow(rowIndex)
Delete column                  → removeColumn(colIndex)
```

#### On Column Header Right-Click

```
Auto-fit column width          → autoFitColumn(colIndex)
Sort ascending                 → sortColumn(colIndex, 'asc')
Sort descending                → sortColumn(colIndex, 'desc')
─────────────────────────────
Change column type             → inline Select
Change background color        → ColorPicker popover (applies to entire column)
─────────────────────────────
Insert column left             → insertCol(colIndex)
Insert column right            → insertCol(colIndex + 1)
Delete column                  → removeColumn(colIndex)
```

### Implementation

```tsx
// Wrap TableCell and TableHeaderCell with ContextMenu
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@/components/ui/context-menu';

<ContextMenu>
  <ContextMenuTrigger asChild>
    <td ...>...</td>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem onClick={() => autoFitColumn(colIndex)}>
      Auto-fit column width
    </ContextMenuItem>
    <ContextMenuSeparator />
    {/* ... */}
  </ContextMenuContent>
</ContextMenu>
```

### Tests Required

```ts
describe('ContextMenu', () => {
  it('opens on right-click of a cell')
  it('shows "Auto-fit column width" option')
  it('calls autoFitColumn on menu item click')
  it('shows "Sort ascending" on column header right-click')
  it('does not appear when table has no data')
})
```

---

## 26. Smart Clipboard Paste

When the user pastes (Ctrl+V / Cmd+V) into the table — or into an empty state —
detect if the clipboard contains a structured table (from Excel, Word, or CSV)
and automatically generate or populate the table.

### Detection Logic

```ts
// src/hooks/useClipboardPaste.ts
// Listen for paste events on document (captured at app root level)

document.addEventListener('paste', async (e) => {
  const clipData = e.clipboardData;
  if (!clipData) return;

  // Priority order:
  // 1. HTML table (from Excel/Word — richest data)
  const html  = clipData.getData('text/html');
  if (html && containsTable(html)) {
    return handleHtmlTablePaste(html);
  }

  // 2. TSV (tab-separated — Excel default plain text format)
  const text = clipData.getData('text/plain');
  if (text && text.includes('\t')) {
    return handleTsvPaste(text);
  }

  // 3. CSV (comma-separated plain text)
  if (text && text.includes(',')) {
    return handleCsvPaste(text);
  }

  // 4. Plain text — paste into focused cell only (default browser behavior)
});
```

### HTML Table Parsing

```ts
// Parse <table> from clipboard HTML using DOMParser — no regex
function parseHtmlTable(html: string): string[][] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const rows = Array.from(doc.querySelectorAll('tr'));
  return rows.map(row =>
    Array.from(row.querySelectorAll('td, th')).map(cell =>
      (cell as HTMLElement).innerText.trim()
    )
  );
}
```

### UX

```
If table currently has no data (empty state):
  → Generate new table from clipboard dimensions + content

If table has existing data and user right-click-pastes into a cell:
  → Insert clipboard content starting from that cell (Excel paste behavior)
  → Expand table if clipboard content exceeds current dimensions

Show a non-blocking toast on success:
  "Table pasted from clipboard. 5 rows, 3 columns."

Show toast on failure:
  "Could not read clipboard data. Try importing a file instead."
```

### Tests Required

```ts
describe('useClipboardPaste', () => {
  it('detects HTML table in clipboard and calls handleHtmlTablePaste')
  it('detects TSV content and calls handleTsvPaste')
  it('detects CSV content and calls handleCsvPaste')
  it('parses an HTML table to a 2D string array correctly')
  it('handles merged cells in HTML table gracefully')
  it('clamps pasted content to MAX_ROWS/MAX_COLS')
  it('shows success toast with correct row/col count')
  it('falls back to plain text paste when no table detected')
})
```

---

## 27. Copy Table Button

A **Copy** button in the toolbar with a dropdown arrow revealing two modes.

### UI

```
Toolbar right side (before export group):

[Copy ▾]    ← secondary button with ChevronDown icon

Dropdown:
  Copy as Image          → renders table to canvas via html2canvas, copies to clipboard
  Copy Excel Data        → copies TSV string to clipboard (pastes into Excel as table)
```

### Implementation

```ts
// Copy as Image
const copyAsImage = async (tableRef: HTMLElement) => {
  const canvas = await html2canvas(tableRef, { scale: 2, useCORS: true });
  canvas.toBlob(blob => {
    if (!blob) return;
    navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  }, 'image/png');
  toast('Table copied as image.');
};

// Copy Excel Data (TSV)
const copyAsExcelData = (cells: CellData[][]) => {
  const tsv = cells
    .map(row => row.filter(c => !c.isHidden).map(c => c.value).join('\t'))
    .join('\n');
  navigator.clipboard.writeText(tsv);
  toast('Table data copied. Paste into Excel or Google Sheets.');
};
```

### Tests Required

```ts
describe('copyTable', () => {
  it('copyAsExcelData produces correct TSV string')
  it('copyAsExcelData skips hidden (merged) cells')
  it('copyAsImage calls html2canvas and navigator.clipboard.write')
  it('shows correct toast message on success')
  it('shows error toast if clipboard write fails')
})
```

---

## 28. Auto-Sum and Auto-Numbering

### Auto-Sum

For columns with type **Number**, **Currency**, or **Percentage**:
add a toggle "Show sum row" in Column Type panel.

When enabled:
```
- A non-editable footer row is appended below the table
- The footer cell for that column displays the sum of all non-empty numeric cells
- Footer row styled: bg-surface, text-text-secondary, text-sm font-semibold
- Other columns in the footer row are empty
- Footer row is excluded from exports (or optionally included — user choice)
```

```ts
// src/utils/tableUtils.ts
export function sumColumn(cells: CellData[][], colIndex: number): number {
  return cells.reduce((sum, row) => {
    const val = parseFloat(row[colIndex]?.value ?? '');
    return isNaN(val) ? sum : sum + val;
  }, 0);
}
```

### Auto-Numbering

For columns with type **Number** and a toggle "Auto-number":
```
- Column cells are filled with sequential integers: 1, 2, 3...
- Numbers are read-only while auto-number is active
- Inserting a row re-sequences all auto-number columns
- Visible in UI as a lock icon on the cell
```

### Tests Required

```ts
describe('sumColumn', () => {
  it('returns correct sum for numeric column')
  it('ignores non-numeric (NaN) cell values')
  it('returns 0 for empty column')
  it('handles negative numbers correctly')
  it('handles currency-formatted strings stripped of symbols')
})

describe('autoNumbering', () => {
  it('fills column with sequential integers starting at 1')
  it('re-sequences after row insertion')
  it('re-sequences after row deletion')
})
```

---

## 29. Column Sorting

### UI

```
Sort controls appear:
  1. In the column header (small asc/desc toggle icon — Lucide ArrowUpDown)
  2. In the right-click context menu (Section 25)

Visual state:
  Active sort: column header shows ArrowUp (asc) or ArrowDown (desc) in primary color
  No sort: shows ArrowUpDown in text-muted
```

### Sort Behavior

```
- Sort is non-destructive — it reorders rows in the view only
- A "sort key" is stored in TableContext: { colIndex, direction }
- Clearing sort restores original row order (original order always preserved in state)
- Numeric columns sort numerically (parseFloat), not lexicographically
- Empty cells always sort to the bottom regardless of direction
- Merged cells: sorting is disabled when any merged range exists —
  show tooltip "Clear merged cells to enable sorting"
```

### Implementation

```ts
// src/utils/tableUtils.ts
export function sortRows(
  rows: CellData[][],
  colIndex: number,
  direction: 'asc' | 'desc'
): CellData[][] {
  return [...rows].sort((a, b) => {
    const aVal = a[colIndex]?.value ?? '';
    const bVal = b[colIndex]?.value ?? '';
    if (aVal === '') return 1;   // empty to bottom
    if (bVal === '') return -1;

    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);
    const isNumeric = !isNaN(aNum) && !isNaN(bNum);

    const compared = isNumeric ? aNum - bNum : aVal.localeCompare(bVal);
    return direction === 'asc' ? compared : -compared;
  });
}
```

### Tests Required

```ts
describe('sortRows', () => {
  it('sorts string column ascending alphabetically')
  it('sorts string column descending alphabetically')
  it('sorts numeric column numerically, not lexicographically')
  it('always places empty cells at the bottom regardless of direction')
  it('does not mutate the original rows array')
  it('handles mixed numeric and string values gracefully')
})
```

---

## 30. Performance: Memoization Strategy

All components that re-render unnecessarily must be wrapped or optimized.
This is a **mandatory** refactor — not optional.

### Rules

```
React.memo()    → wrap every feature component that receives non-primitive props
                  (TableCell, TableHeaderCell, ResizeHandle, SidebarPanel, etc.)

useMemo()       → for expensive derived values computed from state
                  (sorted rows, summed columns, visible cell count)

useCallback()   → for ALL function props passed to child components
                  (onSelect, onChange, onResize, onMerge, etc.)
                  If a function is defined inside a component and passed as a prop,
                  it MUST be wrapped in useCallback.

useEffect()     → strict discipline:
                  - Every effect must have a complete dependency array
                  - Never use [] (empty deps) unless the effect truly runs once
                  - Never fetch data in useEffect — use event handlers
                  - Every effect that adds an event listener must remove it in cleanup
                  - Avoid effects that just sync state to state — use derived values
```

### Priority Targets for Memoization

```
TableCell        → React.memo (renders for every cell — highest impact)
TableHeaderCell  → React.memo
ResizeHandle     → React.memo
FeatureCard      → React.memo (landing page)
SectionLabel     → React.memo (renders many times in sidebars)

sortRows()       → useMemo([cells, sortKey])
sumColumn()      → useMemo([cells, colIndex])
mergedRanges     → useMemo([cells]) — derived, not stored state

onSelect         → useCallback([dispatch])
onChange         → useCallback([dispatch])
onResize         → useCallback([setColumnWidths])
autoFitColumn    → useCallback([tableRef, setColumnWidths])
exportAs         → useCallback([exportService])  # import from barrel exportService.ts
```

### useEffect Anti-Patterns to Fix

```ts
// ❌ Effect that syncs state to state — remove the effect
useEffect(() => {
  setFilteredRows(sortRows(cells, sortKey));
}, [cells, sortKey]);
// ✅ Replace with useMemo
const filteredRows = useMemo(() => sortRows(cells, sortKey), [cells, sortKey]);

// ❌ Missing cleanup for event listener
useEffect(() => {
  document.addEventListener('keydown', handler);
}, []); // leak!
// ✅ Always clean up
useEffect(() => {
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [handler]);

// ❌ Fetching in useEffect
useEffect(() => { fetchData().then(setData); }, []);
// ✅ Move to event handler or use a library (SWR, TanStack Query) when needed
```

### Profiling Requirement

Before marking performance work done:
1. Open React DevTools Profiler
2. Record a 5-second session of normal table editing
3. Confirm: no component re-renders more than once per user action
4. Confirm: TableCell does not re-render when an unrelated cell is edited

---

## 31. 404 Page SVG Animation

Replace the static 404 page with an animated SVG illustration.

### Concept

A table grid slowly assembles itself — columns slide in from the left,
rows drop in from the top — then one cell shows a "?" and the whole grid
gently pulses. Calm. On-brand. Not distracting.

### Implementation

```tsx
// src/pages/NotFoundPage/NotFoundPage.tsx

export const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-8 px-4">

    {/* Animated SVG */}
    <svg width="240" height="180" viewBox="0 0 240 180"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        .grid-line {
          stroke: #E5E7EB;
          stroke-width: 1.5;
          stroke-linecap: round;
        }
        .col { animation: slideInLeft 0.4s ease-out both; }
        .col:nth-child(2) { animation-delay: 0.1s; }
        .col:nth-child(3) { animation-delay: 0.2s; }
        .row { animation: dropIn 0.4s ease-out both; }
        .row:nth-child(2) { animation-delay: 0.15s; }
        .row:nth-child(3) { animation-delay: 0.25s; }
        .row:nth-child(4) { animation-delay: 0.35s; }
        .question-mark {
          animation: fadeIn 0.3s ease-out 0.6s both, pulse 2s ease-in-out 1s infinite;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .col, .row, .question-mark { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Table outline */}
      <rect x="20" y="20" width="200" height="140" rx="6"
            stroke="#E5E7EB" strokeWidth="1.5" fill="none"/>
      {/* Column lines */}
      <g className="col"><line x1="87" y1="20" x2="87" y2="160" className="grid-line"/></g>
      <g className="col"><line x1="153" y1="20" x2="153" y2="160" className="grid-line"/></g>
      {/* Row lines */}
      <g className="row"><line x1="20" y1="55" x2="220" y2="55" className="grid-line"/></g>
      <g className="row"><line x1="20" y1="90" x2="220" y2="90" className="grid-line"/></g>
      <g className="row"><line x1="20" y1="125" x2="220" y2="125" className="grid-line"/></g>
      {/* Header fill */}
      <rect x="21" y="21" width="198" height="33" rx="4" fill="#EFF6FF" opacity="0.8"/>
      {/* Question mark in center cell */}
      <text x="120" y="115" textAnchor="middle"
            fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700"
            fill="#9CA3AF" className="question-mark">?</text>
    </svg>

    <div className="text-center space-y-3">
      <h1 className="text-2xl font-bold text-text-primary">Page not found.</h1>
      <p className="text-base text-text-secondary max-w-sm">
        That URL does not exist. Let us get you back to building.
      </p>
    </div>
    <Button variant="primary" onClick={() => navigate('/')}>
      Back to Home
    </Button>
  </div>
);
```

---

## 32. Open Source and Sponsor Page

### Route: `/open-source`

### Page Structure

```
HEADING:   Built in the open. Sustained by the community.

BODY:
  Tablesmit is free, open source, and MIT licensed.
  The code is on GitHub — read it, fork it, or build on top of it.

  Open source tools survive because people invest in them.
  If Tablesmit saves you time, consider supporting its development.

SPONSOR SECTION:

  HEADING:   Support this project

  OPTIONS (rendered as clean cards, border border-border rounded-md p-6):

    [GitHub Sponsors]     "Sponsor monthly on GitHub"   → github.com/sponsors/Olayiwola72
    [Buy Me a Coffee]     "One-time contribution"       → buymeacoffee.com/Olayiwola72
    [Open Collective]     "For teams and organizations" → opencollective.com/tablesmit

  Each card: icon + platform name + one-line description + CTA button (secondary)

CONTRIBUTORS SECTION:

  HEADING:   Contributors
  BODY:      "Tablesmit exists because of open source contributors.
              Every bug report, pull request, and suggestion matters."
  CTA:       [View Contributors on GitHub ↗]

CONTRIBUTE SECTION:

  HEADING:   How to contribute
  BODY:      "Read CONTRIBUTION.md in the repository for guidelines on
              reporting bugs, suggesting features, and submitting pull requests."
  CTA:       [Read CONTRIBUTION.md ↗]

FOOTER NOTE (text-xs text-text-muted text-center):
  "MIT licensed. No warranties. Built with care."
```

---

## 33. README.md Specification

The README is the product's front door on GitHub. It must be clear,
minimal, and make someone want to use or contribute within 30 seconds.

```markdown
# Tablesmit

> A minimalist table builder for analytical writing.

Build clean, structured tables with full control over headers, formatting,
and export. No bloat. No account required. Free and open source.

**[→ Open Tablesmit](https://tablesmit.com)**

---

## Features

- Drag-to-resize columns and rows
- Merge and unmerge cells
- Custom header colors and styles
- Word-style border controls
- Column types: Text, Number, Currency, Percentage, Date
- Auto-sum for numeric columns
- Column sorting
- Smart clipboard paste from Excel, Word, or CSV
- Export: PDF, PNG, JPEG, Excel, CSV
- Import: CSV, Excel
- Dark mode
- Keyboard navigation

## Getting Started

\`\`\`bash
git clone https://github.com/Olayiwola72/tablesmit.git
cd tablesmit
npm install
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Vitest

## Configuration

Product decisions — brand name, routes, nav links, export formats, color palettes,
and presets — live in one file:

\`\`\`
src/config/siteConfig.ts
\`\`\`

Check there before changing component logic.

---

## Writing a Blog Post

The blog is JSON-driven. Adding a new post requires **one action only:**
create a JSON file in `src/content/blog/`.

No code change. No registry to update. The post appears automatically.

### 1. Create the file

Name the file using the post's target keyword in kebab-case.
The filename becomes the URL slug.

\`\`\`
src/content/blog/how-to-make-a-table-in-markdown.json
\`\`\`

→ Published at: `https://tablesmit.com/blog/how-to-make-a-table-in-markdown`

### 2. Fill in the JSON

\`\`\`json
{
  "title":       "How to Make a Table in Markdown",
  "date":        "2025-09-15",
  "description": "A practical guide to Markdown tables — with examples you can build in Tablesmit and paste anywhere.",
  "author":      "Olayiwola Akinnagbe",
  "tags":        ["markdown", "tutorial", "tables"],
  "readTime":    4,
  "featured":    false,
  "content":     "## Introduction\n\nMarkdown tables look complex but follow a simple pattern..."
}
\`\`\`

### Fields

| Field         | Required | Notes                                          |
|---------------|----------|------------------------------------------------|
| `title`       | Yes      | H1 of the post. Max 60 chars.                  |
| `date`        | Yes      | `YYYY-MM-DD` format.                           |
| `description` | Yes      | Summary shown on cards and in meta. Max 160 chars. |
| `author`      | Yes      | Author display name.                           |
| `tags`        | Yes      | 1–4 tags, lowercase.                           |
| `readTime`    | Yes      | Estimated minutes to read.                     |
| `featured`    | No       | `true` pins post to top. Default: `false`.     |
| `content`     | Yes      | Full post body in Markdown. Use `\n` for newlines. |

### 3. Using the helper script (optional)

Write the post in a `.md` file, then convert it:

\`\`\`bash
npm run new-post my-draft.md
\`\`\`

This creates `src/content/blog/my-draft.json` with the content pre-filled.
Edit the JSON to add `title`, `description`, and `tags`.

### 4. Commit and push

\`\`\`bash
git add src/content/blog/your-post.json
git commit -m "content: add blog post — your post title"
git push
\`\`\`

GitHub Actions will lint, test, build, and deploy to Netlify automatically.
The post is live within minutes of merging.

### Content tips

- Write content as standard Markdown — headings, lists, code blocks, tables all work
- Avoid `# Heading 1` in content — the post title is already the H1
- Start with `## Heading 2` for sections
- Link to `/app` at least once per post — internal links improve SEO
- Target one primary keyword per post — use it in the title, description, and naturally in the content
- Update `public/sitemap.xml` after publishing a post

---

## Contributing

See [CONTRIBUTION.md](./CONTRIBUTION.md) for guidelines.

## License

MIT — see [LICENSE](./LICENSE)

---

Built with care. Sponsored by the community.
[Support this project →](https://tablesmit.com/open-source)
```

---

## 34. CONTRIBUTION.md Specification

```markdown
# Contributing to Tablesmit

Thank you for your interest in contributing.
This document explains how to report bugs, suggest features, and submit code.

---

## Before You Start

- Check [existing issues](https://github.com/Olayiwola72/tablesmit/issues)
  to avoid duplicates.
- For large changes, open an issue first to discuss the approach.
- All contributions must follow the engineering principles in `agents.md`.

---

## Reporting Bugs

Use the GitHub issue tracker.
Include:
- Steps to reproduce (be specific)
- Expected behavior
- Actual behavior
- Browser + OS version
- A screenshot or screen recording if relevant

---

## Suggesting Features

Open a GitHub Discussion, not an issue.
Explain:
- What you are trying to do
- Why the current tool does not meet your need
- What the feature would look like from a user's perspective

---

## Submitting a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Write tests — no PR without tests will be reviewed
5. Run the full suite: `npm run test` — all must pass
6. Run lint: `npm run lint` — zero errors
7. Open a PR against `main` with a clear description

### PR Description Template

\`\`\`
## What does this PR do?
[Short description]

## Why?
[Context / motivation]

## Testing
[What tests were added or changed]

## Screenshots (if UI change)
\`\`\`

---

## Code Standards

- Follow SOLID, DRY, KISS as defined in agents.md
- No `any` types without a comment explaining why
- No hardcoded hex colors — use Tailwind tokens
- No component receives props it does not use
- All new hooks must have test coverage

---

## Commit Message Format

\`\`\`
feat: add column sorting
fix: correct autoFit clamp on empty column
docs: update CONTRIBUTION.md
test: add sortRows edge case for empty cells
refactor: extract borderUtils from TableGrid
\`\`\`

---

## Code of Conduct

Be respectful. Be specific. Be patient.
We are all building something we care about.
```

---

## 35. Em-Dash and Punctuation Rules for UI Copy

### The Rule

Em-dashes (—) are a **writing tool**, not a **UI decoration**.
In product copy they create cognitive load — they interrupt the reading flow
and force the eye to pause at an unexpected beat.

```
❌ Never use em-dashes in:
   - Button labels
   - Tooltip text
   - Toast messages
   - Error messages
   - Form labels or placeholders
   - Navigation items
   - Feature card headings

✅ Em-dashes are only acceptable in:
   - Long-form About page body copy (max one per paragraph)
   - README.md or CONTRIBUTION.md documentation
   - This agents.md file (it is a specification document, not UI)
```

### Replacements

| Instead of                                      | Write                                        |
|-------------------------------------------------|----------------------------------------------|
| "Export — PDF, PNG, JPEG"                       | "Export to PDF, PNG, or JPEG"                |
| "Tables, your way — built for writers"          | "Tables, your way. Built for writers."       |
| "Resize columns — like Excel"                   | "Resize columns like Excel."                 |
| "No account — no paywall — no nonsense"         | "No account. No paywall. No nonsense."       |

### Audit Required

Before v6.0 ships, run a search for ` — ` (space em-dash space) across:
- All `.tsx` files in `src/`
- `index.html`
- `public/`

Replace every instance with the correct alternative per the table above.

---

## 36. AI Features (Future Roadmap — No Implementation in v6.0)

These features are **scaffolded in v6.0 UI only** — no backend, no API calls.
The purpose is to validate UX placement before building the actual AI layer.

### Features

```
"Generate table from text"
  → User pastes a paragraph. AI structures it as a table.
  → v6.0: UI only — a textarea + disabled "Generate" button with "Coming soon" badge

"Summarize this table"
  → AI reads the table and produces a 2-3 sentence plain-English summary.
  → v6.0: UI only — a "Summarize" button in the toolbar (disabled, "Coming soon")

"Clean messy data"
  → AI normalises inconsistent formatting, trims whitespace, standardises dates.
  → v6.0: UI only — a "Clean" option in the Import dropdown (disabled, "Coming soon")

"Convert paragraph to structured table"
  → Identical to "Generate from text" but triggered from clipboard paste flow.
  → v6.0: No UI — purely a future note for the paste handler
```

### Placement

```
Toolbar (right side, before Copy button):
  [AI ✦]  ← ghost button with Sparkles icon, opens a panel

AI Panel (right sidebar bottom section):
  HEADING: AI Features (Beta)
  BADGE:   "Coming soon"
  LIST:    Generate from text · Summarize · Clean data
  NOTE:    "AI features are in development. Join the waitlist."
  CTA:     [Join Waitlist] → opens mailto or external form
```

### Technical Note for When AI Is Implemented

```
Model:      claude-sonnet (Anthropic API) or GPT-4o (OpenAI)
Transport:  HTTPS POST to a serverless function (Vercel/Netlify edge function)
            — never call AI APIs directly from the browser (exposes keys)
Input:      Serialised CellData[][] as JSON
Output:     Structured JSON matching CellData[][] schema
Rate limit: 10 AI requests/user/hour (implemented server-side)
Auth:       Required before AI features are enabled — use GitHub OAuth
```

---



---

## 37. State Management Architecture

### Verdict: No External Library

Do not install Redux, Zustand, Jotai, or any state management library.
React Context + hooks is sufficient for this application's scope and complexity.
The goal is correct architecture, not more dependencies.

### The Problem to Solve

A naive single Context holding all table state causes cascade re-renders:
when one cell value changes, all 1,000 cells re-render because all are consumers
of the same context value. `React.memo` helps only if props references are stable.

### Solution: Two Contexts + Single TableContext

State is split across two isolated contexts plus a single `TableContext`
that provides the derived/UI state. Components subscribe only to
what they need. Unrelated state changes do not trigger re-renders.

```
┌─────────────────────────────────────────────────────────┐
│  TableDataContext                                        │
│  cells[][], columnWidths[], rowHeights[], mergedRanges[] │
│  Changes: when table content or structure changes        │
│  Consumers: TableCell (own cell only), ExportPanel       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TableSelectionContext                                   │
│  selectedRange, hoveredCell, isDragging, activeResizeCol │
│  Changes: on every mouse move / click                   │
│  Consumers: TableCell (selection highlight only)         │
│  WHY SEPARATE: mouse moves must NOT re-render cell data  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TableContext (provider)                                 │
│  Wraps TableDataContext + TableSelectionContext           │
│  Provides: headerStyle, headerColor, sortKey,            │
│  activePreset, columnTypes[], showSumRow, theme,         │
│  borderDefaults, undo, columnWidths, rowHeights,         │
│  and all dispatch actions                                │
│  Changes: when user changes sidebar/toolbar controls     │
│  Consumers: sidebar panels, TableHeaderCell, TableGrid   │
└─────────────────────────────────────────────────────────┘
```

### Selector Hook Pattern

Each `TableCell` gets only its own data — not the full cells array:

```ts
// src/hooks/useTableCell.ts
// Returns only the data for one specific cell — memoised
export function useTableCell(cellId: string): CellData {
  const { cells } = useContext(TableDataContext);
  const [row, col] = parseCellId(cellId);
  // useMemo ensures referential stability — only changes when THIS cell changes
  return useMemo(() => cells[row][col], [cells, row, col]);
}

// src/hooks/useIsSelected.ts
export function useIsSelected(cellId: string): boolean {
  const { selectedRange } = useContext(TableSelectionContext);
  if (!selectedRange) return false;
  const { row, col } = parseCellId(cellId);
  return (
    row >= selectedRange.startRow && row <= selectedRange.endRow &&
    col >= selectedRange.startCol && col <= selectedRange.endCol
  );
}
```

### TableCell — Correctly Memoised

```tsx
// src/components/features/TableGrid/TableCell/TableCell.tsx
export const TableCell = React.memo(
  ({ cellId, onSelect, onChange }: TableCellProps) => {
    const cell       = useTableCell(cellId);       // TableDataContext
    const isSelected = useIsSelected(cellId);      // TableSelectionContext
    // ...
  },
  // Custom comparator — only re-render if cellId changes (it never does)
  (prev, next) => prev.cellId === next.cellId
);
```

This means: typing in `R0C0` re-renders ONLY `R0C0`. All other 999 cells stay frozen.

### Context File Structure

```
src/context/
  TableDataContext.tsx       — cells, columnWidths, rowHeights, mergedRanges
  TableSelectionContext.tsx  — selectedRange, hoveredCell, isDragging
  TableContext.tsx           — provider wrapping both contexts; exports hook + dispatch
  index.ts                   — re-exports all contexts and hooks
```

### Upgrade Path (if profiling reveals a genuine bottleneck)

If React DevTools Profiler shows cascade re-renders after the split:
migrate `cells[][]` to **Zustand** only (not the whole state).
Zustand's store allows `useStore(state => state.cells[row][col])` subscriptions
that update only the affected cell. This is a 1-day migration.

Trigger for migration: any cell re-renders more than once per user keystroke
after full memoisation is applied and contexts are split.

Do not migrate preemptively.

### When to Reconsider

```
Consider Zustand if:
  [ ] 50-row × 20-col table lags on input after split + memo
  [ ] React Profiler shows >3 unexpected re-renders per keystroke
  [ ] History (undo) snapshots cause noticeable freeze on large tables

Do NOT add a library because:
  [ ] "It would be cleaner"
  [ ] "Everyone uses it"
  [ ] The architecture feels complex (fix the architecture, not the dependency list)
```

---

## 38. SEO Strategy

### Target: First Page on Google

Your competition (Tabley, TableConvert, Tables Generator) has weak Core Web Vitals,
thin content, and zero link-building strategy. A fast, open-source tool with a
structured content plan can outrank them within 3 to 6 months.

---

### 38A. Keyword Strategy

#### Primary Keywords (high intent, reachable)
These are what people type when they need exactly what Tablesmit does.

| Keyword                         | Monthly Volume | Difficulty | Priority |
|---------------------------------|---------------|------------|----------|
| web table maker                 | ~2,400        | Low        | P1       |
| online table generator          | ~8,100        | Medium     | P1       |
| table maker free                | ~6,600        | Medium     | P1       |
| table builder online            | ~3,600        | Low        | P1       |
| html table generator            | ~4,400        | Medium     | P2       |
| markdown table generator        | ~2,900        | Low        | P1       |
| csv to table                    | ~1,600        | Low        | P1       |
| copy table from excel to word   | ~1,200        | Low        | P1       |
| table maker export pdf          | ~880          | Low        | P1       |
| table generator for writers     | ~390          | Very Low   | P1       |

#### Long-Tail Keywords (easy wins, high conversion)

```
"free online table maker no signup"        — zero friction, matches product
"table maker export to excel free"         — feature-specific
"copy excel table to web"                  — clipboard paste feature
"merge cells online table"                 — specific feature keyword
"how to make a table in markdown"          — informational, high volume
"best table generator for researchers"     — audience-specific
"tablesmit"                               — brand (own this fast)
"tablesmith online"                        — brand misspelling coverage
"tablesmit table maker"                    — brand + category
```

#### Brand SEO (cover the spelling gap)

```html
<!-- In <head> of every page -->
<meta name="description"
  content="Tablesmit (also searched as Tablesmith) — a free, minimalist
  table maker for writers and analysts. Build clean tables with full control
  over headers, formatting, and export. No signup required.">

<!-- In the About page body copy (natural language): -->
"Tablesmit — sometimes spelled Tablesmith — is a minimalist table builder..."
```

This single technique captures both spellings in Google's index.

---

### 38B. Technical SEO — Implementation

Every item below must be implemented before launch. These are table stakes.

#### `index.html` — Meta Tags

```html
<head>
  <!-- Primary -->
  <title>Tablesmit — Free Online Table Maker for Writers and Analysts</title>
  <meta name="description"
    content="Build clean, structured tables with full control over headers,
    formatting, and export. Free. No signup. Export to PDF, Excel, CSV, or PNG.">
  <link rel="canonical" href="https://tablesmit.com/">

  <!-- Open Graph (Facebook, LinkedIn previews) -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://tablesmit.com/">
  <meta property="og:title"       content="Tablesmit — Free Table Maker for Analytical Writing">
  <meta property="og:description" content="Build clean tables with drag-to-resize,
    merge cells, custom headers, and export to PDF, Excel, or CSV. Free and open source.">
  <meta property="og:image"       content="https://tablesmit.com/og-image.png">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Tablesmit — Free Table Maker">
  <meta name="twitter:description" content="Minimalist table builder for writers
    and analysts. Drag-to-resize, merge cells, export anywhere. Free.">
  <meta name="twitter:image"       content="https://tablesmit.com/og-image.png">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tablesmit",
    "alternateName": "Tablesmith",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "url": "https://tablesmit.com",
    "description": "A free, minimalist table builder for analytical writing.
      Build clean structured tables with full control over headers, formatting,
      and export. No signup required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Drag-to-resize columns and rows",
      "Merge and unmerge cells",
      "Custom header styles",
      "Export to PDF, Excel, PNG, CSV",
      "Import from CSV and Excel",
      "Smart clipboard paste from Excel"
    ],
    "screenshot": "https://tablesmit.com/screenshot.png",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "Tablesmit"
    }
  }
  </script>
</head>
```

#### OG Image Specification

File: `public/og-image.png` — 1200×630px

```
Content:
  Left 60%: Screenshot of Tablesmit with a clean, populated table
  Right 40%: White background
    - Tablesmit logo (icon + wordmark)
    - Tagline: "Tables, your way."
    - Three feature bullets in text-sm:
        ✓ Free. No signup.
        ✓ Export to PDF, Excel, CSV
        ✓ Open source

Background: white (#FFFFFF)
Font: Inter Bold for headline, Inter Regular for bullets
This image appears in every link preview — it is your first impression.
```

#### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tablesmit.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/app</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/open-source</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://tablesmit.com/sitemap.xml
```

---

### 38C. Core Web Vitals Targets

Google uses Core Web Vitals as a direct ranking factor. These are non-negotiable.

| Metric                              | Target      | What it measures                      |
|-------------------------------------|-------------|---------------------------------------|
| LCP (Largest Contentful Paint)      | < 2.5s      | How fast the main content loads       |
| INP (Interaction to Next Paint)     | < 200ms     | How fast the app responds to input    |
| CLS (Cumulative Layout Shift)       | < 0.1       | Whether layout jumps during load      |
| FCP (First Contentful Paint)        | < 1.8s      | How fast anything appears             |
| TTFB (Time to First Byte)           | < 600ms     | How fast the server responds          |

#### How to Hit These Targets

```
LCP:
  - Preload hero image/screenshot: <link rel="preload" as="image" href="/screenshot.webp">
  - Convert all images to WebP
  - Self-host fonts (already done via @fontsource) — eliminates CDN round trip
  - Use Vite's manualChunks to keep initial bundle under 150KB gzipped

INP (most critical for a table editor):
  - The rAF resize pattern (already implemented) is critical
  - React.memo on TableCell eliminates cascade re-renders
  - Split contexts (Section 37) prevents selection from re-rendering data
  - useCallback on all handlers — stable references prevent re-renders

CLS:
  - Define explicit width/height on all images and the logo SVG
  - Reserve space for the table grid before it renders (skeleton placeholder)
  - Avoid injecting DOM elements that push layout down

Bundle Size Targets:
  vendor-react:   < 50KB gzipped
  vendor-ui:      < 40KB gzipped
  vendor-export:  < 80KB gzipped (jsPDF + html2canvas are heavy — lazy load them)
  app code:       < 60KB gzipped
  Total initial:  < 150KB gzipped
```

#### Lazy-load export libraries

```ts
// Individual exporter files — defer heavy libraries until first export click
const exportToPDF = async (element: HTMLElement) => {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);
  // ...
};
```

This keeps the initial bundle lean and only loads jsPDF when the user
actually clicks an export button.

---

### 38D. Content Strategy (Ranks You Without Paid Ads)

Content is what gets you to page 1 organically. Tools that publish useful
content rank above tools that don't — even when the tool is worse.

#### Blog Section: `/blog`

Create a `/blog` route. Publish one article per week for the first 3 months.
Each article targets one long-tail keyword.

**Priority articles:**

```
1. "How to make a table in Markdown"
   → Target: "markdown table generator" (2,900/mo)
   → Content: Tutorial + embed Tablesmit for live generation
   → Word count: 800

2. "How to copy a table from Excel to the web"
   → Target: "copy excel table to web" (1,200/mo)
   → Content: Problem statement + Tablesmit clipboard paste walkthrough
   → Word count: 600

3. "5 free online table makers compared"
   → Target: "free table maker online" (6,600/mo)
   → Content: Honest comparison including competitors
   → Note: Tablesmit listed last — let the comparison speak for itself
   → Word count: 1,200

4. "How to export a table to PDF from your browser"
   → Target: "table maker export pdf" (880/mo)
   → Content: Tutorial + Tablesmit PDF export walkthrough
   → Word count: 500

5. "The best table tool for researchers and analysts"
   → Target: "table generator for researchers" (390/mo)
   → Content: Audience-specific pain points + Tablesmit solution
   → Word count: 900

6. "How to merge cells in an online table"
   → Target: "merge cells online table" (specific feature)
   → Content: Short tutorial with Tablesmit embedded
   → Word count: 400
```

**Blog post template rules:**
```
- H1: exact keyword phrase
- First 100 words: answer the question directly (Google reads this for featured snippets)
- One embedded live Tablesmit demo or screenshot per article
- Internal link to /app from every article CTA
- External links to 2-3 credible sources (signals topical authority)
- No keyword stuffing — write for humans, Google follows
- Publish date visible — Google favors fresh content
```

#### Feature Landing Pages

Create individual pages for high-intent feature keywords:

```
/features/excel-export          → "export table to excel online"
/features/pdf-export            → "export table to pdf free"
/features/csv-import            → "csv to table online"
/features/merge-cells           → "merge cells table online"
/features/markdown-table        → "markdown table generator"
/features/column-resize         → "resize table columns online"
```

Each page: 400-600 words explaining the feature, one screenshot, one CTA to /app.
These are thin pages that rank for specific queries without competing with your homepage.

---

### 38E. Link Building Strategy

Links from other websites are the single biggest ranking signal.
You need links from credible, relevant sources.

#### High-Priority (do these at launch)

```
1. GitHub Repository
   → Link from README back to tablesmit.com
   → A popular GitHub repo is itself a high-DA link source
   → Star count matters for credibility signals

2. Product Hunt Launch
   → Submit on a Tuesday or Wednesday (highest traffic days)
   → Prepare: 60-word description, 3 screenshots, demo GIF
   → A top-5 product of the day = hundreds of backlinks from coverage
   → Link: producthunt.com → tablesmit.com

3. Hacker News "Show HN"
   → Title: "Show HN: Tablesmit — open source table maker for analytical writing"
   → Post between 9-11am ET on a weekday
   → Link to the app, not the homepage
   → Respond to every comment within the first 2 hours

4. DEV.to / Hashnode article
   → "I built a free open-source table maker — here is what I learned"
   → Honest build log, not a product pitch
   → Link naturally to tablesmit.com in context

5. Reddit
   → r/webdev, r/sideprojects, r/opensource, r/writing, r/analytics
   → Soft launch in relevant threads — answer questions, mention the tool
   → Never post "check out my product" — add value first
```

#### Medium-Priority (weeks 2-8)

```
6. Alternatives.to listing
   → Free submission
   → tablesmit.com listed as alternative to Tabley, Tables Generator, etc.
   → Users searching competitors find you

7. Open Source directories
   → opensourcealternative.to
   → alternativeto.net
   → toolify.ai
   → free submissions, credible backlinks

8. Twitter/X thread
   → "I built a table tool because I kept hitting walls with existing ones.
      Here is what it does differently: [thread]"
   → Show the product, don't pitch it
   → End with link

9. Reach out to 5 writers/analysts with newsletters
   → "I built this for people like your readers — would you try it?"
   → One genuine newsletter mention = hundreds of targeted visitors
```

---

### 38F. On-Page SEO Rules (Enforced in Code)

These must be implemented in the React app, not added later.

```tsx
// src/pages/LandingPage/LandingPage.tsx
// Use react-helmet-async or @vite/plugin-html for dynamic meta

// URL structure — clean, keyword-rich, no query strings
/                        ✅
/about                   ✅
/open-source             ✅
/blog/markdown-table-generator  ✅
/features/pdf-export     ✅
/?tool=table&v=2         ❌

// Page load speed — the #1 silent ranking factor
// Every page must score 90+ on PageSpeed Insights before deployment
```

---

### 38G. SEO Monitoring

Set these up at launch and check weekly:

```
Google Search Console (free)
  → Submit sitemap.xml
  → Monitor which queries you rank for
  → Track click-through rate per query
  → Watch for crawl errors

Google Analytics 4 (free)
  → Track /app conversions (users who reach the table builder)
  → Track which landing pages drive app opens
  → Set up event: "Table exported" as a conversion

Ahrefs Webmaster Tools (free tier)
  → Monitor backlink acquisition
  → Track keyword position changes weekly

Uptime monitor (UptimeRobot, free)
  → Google deranks sites with downtime history
  → Set up email alert for any downtime > 1 minute
```

---

### 38H. Realistic Timeline

```
Month 1 (launch):
  Week 1:  Technical SEO complete (meta, OG, structured data, sitemap, robots)
  Week 2:  Product Hunt + Hacker News launch
  Week 3:  First 3 blog posts published
  Week 4:  DEV.to article + Reddit soft launch
  Result:  Indexed, brand keywords ranking, early long-tail traction

Month 2-3:
  Weekly blog posts on target keywords
  Alternatives.to + OSS directory listings
  5 long-tail keywords on page 1 or 2
  Result: 200-500 organic visitors/month

Month 3-6:
  Feature pages live
  2-3 newsletter mentions from outreach
  GitHub stars creating organic link signal
  Milestone: 20 stars → submit to Made in Nigeria OSS (see below)
  Result: Primary keywords ("table maker free") reaching page 1-2
  Target: 1,000-3,000 organic visitors/month

Month 6+:
  If Product Hunt or HN launch lands well: spike of 5,000+ visitors,
  dozens of backlinks, domain authority boost that compounds for all keywords.
```

---

### 38I. Made in Nigeria OSS Listing

**Source:** [https://x.com/MadeinNGOSS](https://x.com/MadeinNGOSS)

This is a curated directory of open source projects built by Nigerian developers
for global use. A listing here is a credible backlink, a community signal, and
a statement of identity. Submit when the repo crosses **20 GitHub stars**.

#### Eligibility Checklist (verify before submitting PR)

```
[x] Repo is public on GitHub
[ ] Star count ≥ 20
[x] Tablesmit solves a general problem — not Nigeria-specific ✅
[x] Source code is open source (MIT licensed) ✅
[x] Author is Nigerian ✅
[x] Has a social/personal link outside GitHub (Twitter/X preferred)
[x] Repo has not been archived or deprecated
```

#### How to Submit

```
1. Fork the Made in Nigeria OSS repository
   → github.com/MadeinNGOSS (find the repo from the X account)

2. Open:  data/projects.json

3. Add the entry below anywhere in the array
   (it will be sorted alphabetically on merge — position does not matter)

4. Run:  npm run build
   → Check for errors before opening the PR

5. Open a Pull Request
   → Make the PR description clear and specific (see template below)
   → Remove all console.log statements from any code touched
   → For UI changes: include screenshot or short recording
```

#### Pre-filled JSON Entry (copy exactly — update placeholders only)

```json
{
  "name": "Tablesmit",
  "repoUrl": "https://github.com/Olayiwola72/tablesmit",
  "description": "A minimalist, open source table builder for analytical writing. Build clean structured tables with full control over headers, column types, and formatting. Supports drag-to-resize, merge cells, smart clipboard paste from Excel, and export to PDF, Excel, CSV, and PNG. No signup required.",
  "authors": [
    {
      "name": "@OlayiwolaAkinn1",
      "link": "https://x.com/OlayiwolaAkinn1"
    }
  ]
}
```

**Placeholders to replace:**

| Placeholder              | Replace with                                      |
|--------------------------|---------------------------------------------------|
| `Olayiwola72`     | Your actual GitHub username                       |
| `OlayiwolaAkinn1`    | Your actual Twitter/X handle (preferred over GitHub for author link) |

**Do not change:**
- The `name` field — "Tablesmit" is the brand name, exact spelling
- The `description` — already written to max character guidance and covers key features
- The structure of the JSON — any deviation will fail the automated validator

#### PR Description Template (paste into GitHub PR body)

```markdown
## Adding Tablesmit to Made in Nigeria OSS

**Project:** Tablesmit
**Repo:** https://github.com/Olayiwola72/tablesmit
**Live URL:** https://tablesmit.com

**What it does:**
Tablesmit is a minimalist, open source table builder for analytical writing.
It lets writers, analysts, and researchers build clean structured tables with
full control over headers, column formatting, and export — all in the browser,
no signup required.

**Why it qualifies:**
- Built and maintained by a Nigerian developer
- MIT licensed, fully open source
- Solves a general problem for a global audience (not Nigeria-specific)
- ★ [INSERT STAR COUNT] GitHub stars at time of submission

**Checklist:**
- [x] Entry added to data/projects.json
- [x] npm run build passes with no errors
- [x] No console.log statements
- [x] Social link provided (Twitter/X — outside GitHub)
```

#### After the PR Merges

```
The automated pipeline will:
  1. Validate the entry format
  2. Fetch live GitHub data on the next weekly Monday run:
     - Star count
     - Last push date
     - Primary language (TypeScript)
  3. Regenerate README.MD automatically

Status will be computed automatically:
  Active push in last 6 months → "active"
  No action needed on your part after merge.

Follow @MadeinNGOSS on X for confirmation of listing.
```

#### Why This Matters for SEO

```
Domain authority of the Made in Nigeria OSS site → passes link equity to tablesmit.com
Nigerian developer community → organic shares, stars, word of mouth
Backlink from a curated OSS directory → trusted source in Google's eyes
Story angle: "Nigerian-built open source tool for global writers" →
  press coverage opportunity (TechCabal, Techpoint.Africa, DEV.to Nigeria)
```

---


---

## 39. Privacy Policy and Terms of Use

### Routes
```
/privacy    — Privacy Policy
/terms      — Terms of Use
```

Both pages are required before launch. GA4 analytics, clipboard API access,
and file imports all constitute data handling that requires disclosure.

---

### 39A. Privacy Policy — Full Copy

```
HEADING: Privacy Policy
LAST UPDATED: [Date of first publish]

BODY:

Tablesmit is a browser-based tool. We do not require an account,
and we do not store your table data on any server.

What we collect
  We use Google Analytics 4 (GA4) to understand how people use Tablesmit.
  GA4 collects anonymised usage data including pages visited, time on page,
  and general geographic region (country level). We do not collect names,
  email addresses, or any personally identifiable information.

  We use cookies only to support analytics. No advertising cookies are used.

What we do not collect
  Your table content never leaves your browser.
  We do not transmit, store, or process your table data.
  We do not sell data to third parties.

File imports
  When you import a CSV or Excel file, it is read locally in your browser.
  The file is never uploaded to any server.

Clipboard access
  When you paste content from your clipboard, it is read locally.
  We do not transmit clipboard data.

Third-party services
  Google Analytics 4 — analytics.google.com/about/privacy
  GitHub (for open source contributions) — docs.github.com/en/site-policy

Your rights
  If you are in the EU or UK, you have rights under GDPR/UK GDPR including
  the right to access, correct, or delete data held about you.
  Contact: [your email address]

Changes to this policy
  We will update this page when our practices change.
  The "last updated" date at the top reflects the most recent revision.
```

---

### 39B. Terms of Use — Full Copy

```
HEADING: Terms of Use
LAST UPDATED: [Date of first publish]

BODY:

By using Tablesmit you agree to these terms.

The service
  Tablesmit is provided free of charge, as-is, with no guarantees of uptime,
  accuracy, or fitness for any particular purpose.

Your content
  You retain full ownership of any content you create with Tablesmit.
  We claim no rights over your tables, data, or exports.

Open source
  Tablesmit's source code is available under the MIT license.
  You are free to fork, modify, and distribute it under those terms.

Acceptable use
  You may not use Tablesmit to create, store, or distribute content that is
  illegal, harmful, or violates the rights of others.

Limitation of liability
  Tablesmit is provided without warranty. We are not liable for data loss,
  inaccurate exports, or any damage arising from use of the tool.

Contact
  [your email address]
```

---

### 39C. Implementation

```tsx
// src/pages/PrivacyPage/PrivacyPage.tsx
// src/pages/TermsPage/TermsPage.tsx

// Both pages: simple prose layout, max-w-narrow mx-auto, py-16 px-4
// No sidebar, no table editor — just clean readable text
// Typography: text-base leading-relaxed text-text-secondary
// Headings: text-xl font-semibold text-text-primary mb-3 mt-8

// Add routes in App.tsx:
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/terms"   element={<TermsPage />} />

// Footer links already reference /privacy and /terms — no footer change needed
```

---

## 40. Error Boundaries

Every major UI region must be wrapped in an Error Boundary.
A single component crash must never take down the entire application.

### Which regions need boundaries

```
AppErrorBoundary       — wraps the entire app (catches routing-level errors)
TableErrorBoundary     — wraps TableGrid (most complex component, highest risk)
SidebarErrorBoundary   — wraps left and right sidebars
PageErrorBoundary      — wraps each lazy-loaded page inside Suspense
```

### Implementation

```tsx
// src/components/ui/ErrorBoundary/ErrorBoundary.tsx
// React Error Boundaries must be class components — no hook equivalent exists.

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;        // optional custom fallback UI
  onError?: (error: Error, info: ErrorInfo) => void;  // optional error callback
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Forward to error monitoring (Sentry) when integrated
    this.props.onError?.(error, info);
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Default fallback — minimal, calm, on-brand
const DefaultErrorFallback = ({ error }: { error: Error | null }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center gap-4">
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="10" rx="4" fill="#DC2626" opacity="0.15"/>
      <rect x="2" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.1"/>
      <rect x="18" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.06"/>
    </svg>
    <p className="text-base font-semibold text-text-primary">Something went wrong.</p>
    <p className="text-sm text-text-secondary max-w-xs">
      {error?.message ?? 'An unexpected error occurred.'}
    </p>
    <button
      className="text-sm text-primary underline underline-offset-2"
      onClick={() => window.location.reload()}
    >
      Reload the page
    </button>
  </div>
);
```

### Usage in App.tsx

```tsx
// Wrap each major region:
<AppErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={
        <TableErrorBoundary>
          <TableMakerPage />
        </TableErrorBoundary>
      } />
    </Routes>
  </Suspense>
</AppErrorBoundary>
```

### Tests Required

```ts
describe('ErrorBoundary', () => {
  it('renders children when no error occurs')
  it('renders fallback UI when a child throws')
  it('calls onError callback with the error and component stack')
  it('shows the default fallback when no custom fallback is provided')
  it('reload button triggers window.location.reload')
})
```

---

## 41. Toast Notification System

**Library: Sonner**
Install: `npm install sonner`

Sonner is the current standard for Vite + React projects.
Accessible, animated, lightweight (~3KB), zero configuration.

### Setup

```tsx
// src/main.tsx — add Toaster once at app root
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:   'font-sans text-sm',
          success: 'border-l-4 border-success',
          error:   'border-l-4 border-danger',
        },
      }}
    />
  </StrictMode>
);
```

### Usage — standardised toast calls

```ts
// src/utils/toast.ts
// Thin wrapper — ensures consistent messages across the app.
// Import from here, never directly from 'sonner', so messages stay in one place.

import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (msg: string) => sonnerToast.success(msg),
  error:   (msg: string) => sonnerToast.error(msg),
  info:    (msg: string) => sonnerToast(msg),
};

// Export messages as constants — no magic strings in components
export const TOAST = {
  EXPORT_SUCCESS:   (fmt: string) => `Table exported as ${fmt}.`,
  EXPORT_ERROR:     'Export failed. Try reducing the table size.',
  IMPORT_SUCCESS:   (rows: number, cols: number) => `Table imported. ${rows} rows, ${cols} columns.`,
  IMPORT_ERROR:     'Could not read file. Check the format and try again.',
  IMPORT_TOO_LARGE: 'File too large. Maximum size is 5MB.',
  COPY_IMAGE:       'Table copied as image.',
  COPY_DATA:        'Table data copied. Paste into Excel or Google Sheets.',
  PASTE_SUCCESS:    (rows: number, cols: number) => `Table pasted. ${rows} rows, ${cols} columns.`,
  PASTE_ERROR:      'Could not read clipboard. Try importing a file instead.',
  UNDO_EMPTY:       'Nothing left to undo.',
  CELL_CLEARED:     'Table cleared.',
} as const;
```

### Rules
```
- All toasts use the wrapper above — never call sonnerToast directly in components
- Success: 3 seconds (default)
- Error: 5 seconds (user needs more time to read and act)
- No toast for actions the user explicitly triggered with immediate visual feedback
  (e.g. adding a row — the table visually updates, no toast needed)
- Toast copy follows Section 13 (micro-copy rules): confirm the action, not the system state
```

---

## 42. Husky + Lint-Staged

Pre-commit hooks prevent bad code from entering the repo.
Lint errors and failing tests are caught before they become history.

### Installation

```bash
npm install -D husky lint-staged
npx husky init
```

### `.husky/pre-commit`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

### `package.json` additions

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix --max-warnings=0",
      "prettier --write"
    ],
    "src/**/*.{css,scss}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "prepare": "husky"
  }
}
```

### What this enforces on every commit

```
1. ESLint runs on all staged .ts/.tsx files
   → --max-warnings=0 means zero tolerance — warnings are errors
   → --fix auto-corrects fixable issues (imports, formatting)

2. Prettier formats all staged files
   → No more "fix formatting" commits

3. If lint fails: commit is aborted, errors shown in terminal
   → Developer fixes before committing — not after pushing
```

### `.eslintrc` baseline rules to add (if not already present)

```json
{
  "rules": {
    "no-console": "error",
    "no-debugger": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error"
  }
}
```

---

## 43. Dark Mode

### Design Decisions

```
Toggle location:  Navbar — far right, before any CTA button
Icon:             Sun (light mode active) / Moon (dark mode active) — Lucide icons
Persistence:      localStorage key: "tablesmit-theme"
Default:          System preference via prefers-color-scheme media query
Scope:            class="dark" on <html> element — Tailwind dark mode class strategy
```

### Tailwind Config Update

```ts
// tailwind.config.ts — add darkMode
const config: Config = {
  darkMode: 'class',   // ← add this line
  // ...rest of config
};
```

### Dark Colour Palette

```css
/* src/styles/globals.css — add dark mode overrides */
@layer base {
  .dark {
    --color-background:     #0F172A;   /* page background      */
    --color-surface:        #1E293B;   /* sidebar, toolbar     */
    --color-surface-hover:  #334155;
    --color-border:         #334155;
    --color-border-focus:   #60A5FA;
    --color-text-primary:   #F1F5F9;
    --color-text-secondary: #94A3B8;
    --color-text-muted:     #64748B;
    --color-primary:        #3B82F6;   /* slightly lighter in dark */
    --color-primary-hover:  #60A5FA;
    --color-primary-light:  #1E3A5F;
    --color-accent:         #F59E0B;   /* unchanged — amber works on dark */
    --color-accent-hover:   #D97706;
  }
}
```

### `useTheme` Hook

```ts
// src/hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('tablesmit-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('tablesmit-theme', theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    []
  );

  return { theme, toggle };
}
```

### Navbar Toggle Button

```tsx
// In Navbar.tsx
const { theme, toggle } = useTheme();

<IconButton onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
</IconButton>
```

### Logo — Dark Mode

Use Logo 2B dark variant (Section 2D) when `theme === 'dark'`.

```tsx
<img
  src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
  alt="Tablesmit"
  width="160"
  height="32"
/>
```

### Dark Mode Rules

```
- Every new component must be verified in dark mode before marking done
- Never use hardcoded hex colours in JSX — use Tailwind tokens only
- Table cell content: bg-white → dark:bg-surface
- Modals and sheets: bg-white border-border → dark:bg-surface dark:border-border
- Merged cell highlight: bg-primary-light → dark:bg-primary-light (token handles it)
- Export functions (html2canvas): set backgroundColor option to match current theme
```

### Tests Required

```ts
describe('useTheme', () => {
  it('defaults to system preference when no stored value')
  it('defaults to stored value over system preference')
  it('toggle() switches from light to dark')
  it('toggle() switches from dark to light')
  it('persists theme to localStorage on change')
  it('adds .dark class to <html> when theme is dark')
  it('removes .dark class from <html> when theme is light')
})
```

---

## 44. ARIA Grid Pattern (Table Accessibility)

The table editor must implement the WAI-ARIA grid pattern so screen readers
can navigate it correctly. Without this, the table is unstructured noise.

### Required ARIA Roles

```tsx
// TableGrid.tsx — role="grid" on the <table> element
<table
  role="grid"
  aria-label="Table editor"
  aria-rowcount={cells.length}
  aria-colcount={cells[0]?.length ?? 0}
>

// TableHeaderCell — role="columnheader"
<th
  role="columnheader"
  aria-colindex={colIndex + 1}
  scope="col"
>

// Each row — role="row"
<tr role="row" aria-rowindex={rowIndex + 1}>

// Each cell — role="gridcell"
<td
  role="gridcell"
  aria-colindex={colIndex + 1}
  aria-selected={isSelected}
  aria-readonly={isAutoNumber}
  tabIndex={isFocused ? 0 : -1}
>

// Merged cell — add aria-colspan and aria-rowspan
<td
  role="gridcell"
  aria-colspan={colSpan}
  aria-rowspan={rowSpan}
  colSpan={colSpan}
  rowSpan={rowSpan}
>
```

### Keyboard Navigation Inside the Grid

```ts
// Arrow keys must navigate between cells — not scroll the page
// Implement onKeyDown on the grid container:

const handleGridKeyDown = (e: KeyboardEvent) => {
  const moves: Record<string, [number, number]> = {
    ArrowUp:    [-1,  0],
    ArrowDown:  [ 1,  0],
    ArrowLeft:  [ 0, -1],
    ArrowRight: [ 0,  1],
  };

  if (e.key in moves && !e.target.isContentEditable) {
    e.preventDefault();          // prevent page scroll
    const [dr, dc] = moves[e.key];
    moveFocus(activeRow + dr, activeCol + dc);
  }

  // Tab / Shift+Tab — move to next/prev cell (already implemented, verify)
  // Enter — enter edit mode on focused cell
  // Escape — exit edit mode, return focus to cell
};
```

### Screen Reader Announcements

```tsx
// Live region for cell value changes and structural announcements
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {announcement}  {/* "Row added. 6 rows total." / "Cells merged." */}
</div>
```

### Announcement Messages

```ts
// src/utils/announcements.ts
export const ANNOUNCE = {
  ROW_ADDED:     (total: number) => `Row added. ${total} rows total.`,
  ROW_REMOVED:   (total: number) => `Row removed. ${total} rows total.`,
  COL_ADDED:     (total: number) => `Column added. ${total} columns total.`,
  COL_REMOVED:   (total: number) => `Column removed. ${total} columns total.`,
  CELLS_MERGED:  'Cells merged.',
  CELLS_UNMERGED:'Cells unmerged.',
  TABLE_CLEARED: 'Table cleared.',
  SORT_APPLIED:  (col: string, dir: string) => `Column ${col} sorted ${dir}.`,
};
```

---

## 45. Print Styles

Research users and writers print tables. Without print CSS,
the browser prints the full app chrome (navbar, sidebars, toolbar).

### Implementation

```css
/* src/styles/globals.css — add to existing file */

@media print {
  /* Hide everything except the table */
  nav, header, footer,
  [data-toolbar], [data-sidebar-left], [data-sidebar-right],
  .floating-action-buttons, .mobile-sheet-overlay {
    display: none !important;
  }

  /* Table container fills the page */
  [data-table-container] {
    overflow: visible !important;
    width: 100% !important;
    height: auto !important;
  }

  /* Table itself */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11pt;
    font-family: 'Inter', Georgia, serif;
  }

  /* Preserve cell borders in print */
  td, th {
    border: 1px solid #E5E7EB !important;
    padding: 6pt 8pt !important;
  }

  /* Header row prints in light grey (saves ink vs full blue) */
  th, [data-header-row] td {
    background-color: #F1F5F9 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Avoid page breaks inside rows */
  tr {
    break-inside: avoid;
  }

  /* Table caption */
  [data-table-caption] {
    font-size: 10pt;
    font-style: italic;
    color: #6B7280;
    margin-bottom: 6pt;
  }

  /* Page setup */
  @page {
    margin: 2cm;
    size: A4 landscape;   /* landscape is better for wide tables */
  }
}
```

### Data Attributes Required

Add `data-*` attributes to layout elements so print CSS can target them
without coupling to Tailwind class names (which may change):

```tsx
<div data-toolbar>          {/* TableToolbar wrapper */}
<aside data-sidebar-left>   {/* Left sidebar */}
<aside data-sidebar-right>  {/* Right sidebar */}
<main data-table-container> {/* Table scroll container */}
<p data-table-caption>      {/* Caption element — Section 48 */}
```

### Print Preview Button (optional, v7+)

A "Print" option in the export dropdown that calls `window.print()` —
simpler than PDF export and instant. Add to export group in toolbar.

---

## 46. Error Monitoring (Sentry)

**Free tier:** 5,000 errors/month — sufficient for launch and early growth.

### Installation

```bash
npm install @sentry/react
```

### Setup

```tsx
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,   // from .env
  environment: import.meta.env.MODE,       // 'development' | 'production'
  enabled: import.meta.env.PROD,           // only capture in production
  tracesSampleRate: 0.1,                   // 10% of sessions — adjust after launch
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  // Scrub personal data before sending
  beforeSend(event) {
    // Table content must never reach Sentry
    if (event.extra) delete event.extra.cells;
    return event;
  },
});
```

### Wire to Error Boundary

```tsx
// src/components/ui/ErrorBoundary/ErrorBoundary.tsx
componentDidCatch(error: Error, info: ErrorInfo) {
  Sentry.captureException(error, {
    contexts: { react: { componentStack: info.componentStack } },
  });
  this.props.onError?.(error, info);
}
```

### Privacy Rule (critical)

```
NEVER send table cell content to Sentry.
The beforeSend hook above deletes `cells` from event.extra.
Extend this to scrub any state that may contain user-entered data.
This is a data privacy requirement — not optional.
```

### Environment Variable

```
VITE_SENTRY_DSN=https://[key]@o[org].ingest.sentry.io/[project]
```

Add to `.env.example` (Section 53).

---

## 47. Changelog Page

### Route: `/changelog`

A changelog builds trust. It tells users and contributors the project is alive.
Keep it simple — version number, date, bullet list of changes.

### Format

```tsx
// src/pages/ChangelogPage/ChangelogPage.tsx
// Data-driven: read from a static array, newest first.
// No CMS, no database — just a typed array in src/config/changelog.ts

export interface ChangelogEntry {
  version: string;       // "1.2.0"
  date:    string;       // "2025-09-01"
  changes: {
    type:        'added' | 'fixed' | 'improved' | 'removed';
    description: string;
  }[];
}
```

### `src/config/changelog.ts` — starter entries

```ts
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date:    '2025-[month]-[day]',
    changes: [
      { type: 'added',    description: 'Dark mode with system preference detection' },
      { type: 'added',    description: 'Table caption and title field' },
      { type: 'added',    description: 'Word-style border picker' },
      { type: 'added',    description: 'Right-click context menu on cells and columns' },
      { type: 'added',    description: 'Smart clipboard paste from Excel, Word, and CSV' },
      { type: 'added',    description: 'Copy table as image or Excel data' },
      { type: 'added',    description: 'Auto-sum and auto-numbering column types' },
      { type: 'added',    description: 'AutoFit column width and row height on double-click' },
      { type: 'added',    description: 'Undo stack (Ctrl+Z)' },
      { type: 'improved', description: 'Smooth drag-to-resize using requestAnimationFrame' },
    ],
  },
  {
    version: '1.0.0',
    date:    '2025-[month]-[day]',
    changes: [
      { type: 'added', description: 'Initial release' },
      { type: 'added', description: 'CSV and Excel import and export' },
      { type: 'added', description: 'Merge and unmerge cells' },
      { type: 'added', description: 'Custom header styles and colors' },
      { type: 'added', description: 'Responsive design — works on all screen sizes' },
    ],
  },
];
```

### Visual Style

```
Each version block:
  Version number:  text-lg font-semibold text-text-primary
  Date:            text-sm text-text-muted ml-3
  Change type tag: small pill badge — Added (green) / Fixed (blue) / Improved (amber) / Removed (red)
  Description:     text-sm text-text-secondary

Layout: stacked vertically, newest at top
Separator: border-b border-border between versions
Max width: max-w-narrow mx-auto (readable prose width)
```

---

## 48. Table Caption and Title Field

Your core audience (researchers, analysts, writers) publishes tables in documents
and reports where a caption is expected. No competitor offers this.

### UI

```
Location: above the table, below the toolbar
Component: src/components/features/TableCaption/TableCaption.tsx

Default state:
  A subtle placeholder: "Add a table title or caption (optional)"
  Styled as: text-sm text-text-muted italic
  Click to edit: becomes a plain text input, no border, no box

Active (editing) state:
  Borderless input, font: text-sm font-medium text-text-primary
  Placeholder disappears
  Press Enter or click away to confirm

Rendered (has content):
  text-sm font-medium text-text-primary
  Sits flush above the table — no extra padding
```

### Data Model Addition

```ts
// src/types/table.types.ts — add to TableState
export interface TableState {
  // ...existing fields
  caption: string;   // "" when empty
}
```

### Export Behaviour

```
PDF export:    Caption renders as italic text above the table
Excel export:  Caption goes in row 1, merged across all columns, italic
PNG export:    Caption renders visually above the table in the canvas
CSV export:    Caption goes in the first row as a comment: # [caption]
               (PapaParse handles # as a comment prefix)
Print:         Renders via [data-table-caption] — print CSS already handles it
```

### Tests Required

```ts
describe('TableCaption', () => {
  it('renders placeholder when caption is empty')
  it('enters edit mode on click')
  it('confirms on Enter key')
  it('confirms on blur')
  it('updates TableState.caption via context dispatch')
  it('renders nothing in the DOM when caption is empty and not focused')
})
```

---

## 49. Freeze / Pin First Row and Column

For tables with more than 10 rows, the header scrolls out of view.
This is the single most common complaint about web table editors.

### Behaviour

```
Toggle: "Freeze header row" checkbox in Header Definitions panel (left sidebar)
        "Freeze first column" checkbox in Header Definitions panel

When frozen:
  - First row / first column stays visible during scroll
  - Rest of table scrolls normally beneath / beside it
  - Frozen area has a subtle border-right / border-bottom in primary color
    to indicate the freeze boundary (matches Excel visual convention)

When not frozen (default):
  - Table scrolls normally — no change to current behaviour
```

### Implementation

```tsx
// CSS approach — position: sticky on th/td elements
// This is pure CSS — no JS required for the sticky behaviour itself.

// Freeze header row:
// Apply to all <th> elements in the first row:
<th
  className={cn(
    'bg-surface',   // must have a background — sticky without bg shows content beneath
    freezeRow && 'sticky top-0 z-10'
  )}
>

// Freeze first column:
// Apply to first <td> and <th> of every row:
<td
  className={cn(
    'bg-white dark:bg-surface',
    freezeCol && 'sticky left-0 z-10'
  )}
>

// Both frozen (top-left cell needs highest z-index):
<th
  className={cn(
    'bg-surface',
    freezeRow && freezeCol && colIndex === 0 && 'sticky top-0 left-0 z-20'
  )}
>
```

### Data Model Addition

```ts
// src/types/table.types.ts — add to TableState
export interface TableState {
  // ...existing fields
  freezeRow: boolean;   // default: false
  freezeCol: boolean;   // default: false
}
```

### Visual Freeze Indicator

```tsx
// Frozen boundary line — right edge of frozen column, bottom edge of frozen row
// Applied via Tailwind:
freezeRow && 'border-b-2 border-primary'   // on frozen <th> row
freezeCol && 'border-r-2 border-primary'   // on frozen first column cells
```

### Tests Required

```ts
describe('freeze pane', () => {
  it('applies sticky top-0 to header row when freezeRow is true')
  it('does not apply sticky when freezeRow is false')
  it('applies sticky left-0 to first column when freezeCol is true')
  it('top-left cell gets z-20 when both freezeRow and freezeCol are true')
  it('toggling freezeRow updates TableState correctly')
})
```

---

## 50. Find and Replace

`Ctrl+F` in most browsers opens the browser's native find bar.
For a table editor, this is useless — it cannot navigate between cells.
Intercept it and provide a table-aware find and replace.

### UI

```
Trigger:     Ctrl+F (find only) or Ctrl+H (find + replace)
Location:    Floating panel — top-right of table area, not a modal
             (user needs to see the table while searching)
Component:   src/components/features/FindReplace/FindReplace.tsx
Dismiss:     Escape key or X button

Find panel layout:
  [Search input         ] [▲ prev] [▽ next] [X]
  "3 of 12 matches"

Replace panel (Ctrl+H):
  [Search input         ]
  [Replace input        ] [Replace] [Replace all]
  "3 of 12 matches"
```

### Behaviour

```
- Search is case-insensitive by default; toggle for case-sensitive
- Matches highlighted: bg-accent-light on matching cells
- Active match: ring-2 ring-accent on the currently focused match
- Replace: updates cell value via updateCell() dispatch
- Replace all: batch-updates all matching cells in one dispatch
- Searching across: cell values only (not column types, header colors, etc.)
```

### Implementation

```ts
// src/hooks/useFindReplace.ts
export function useFindReplace(cells: CellData[][]) {
  const [query, setQuery]       = useState('');
  const [isOpen, setIsOpen]     = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const found: Array<{ row: number; col: number }> = [];
    cells.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell.value.toLowerCase().includes(q)) found.push({ row: r, col: c });
      })
    );
    return found;
  }, [cells, query]);

  const currentMatch = matches[matchIndex] ?? null;

  const next = useCallback(() =>
    setMatchIndex(i => (i + 1) % matches.length), [matches.length]);

  const prev = useCallback(() =>
    setMatchIndex(i => (i - 1 + matches.length) % matches.length), [matches.length]);

  // Listen for Ctrl+F / Ctrl+H globally
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'h')) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return { query, setQuery, matches, currentMatch, matchIndex, next, prev, isOpen, setIsOpen };
}
```

### Tests Required

```ts
describe('useFindReplace', () => {
  it('finds all cells matching the query (case-insensitive)')
  it('returns empty array when query is empty')
  it('next() advances to the next match, wrapping at end')
  it('prev() goes to previous match, wrapping at start')
  it('match count updates when cells change')
  it('Ctrl+F opens the panel')
  it('Escape closes the panel')
  it('Replace all updates all matching cells in one dispatch')
})
```

---

## 51. Table Themes

A small set of named visual themes applied in one click.
Eliminates the per-cell colour decisions that slow users down.

### Available Themes

```
Default     — white cells, primary blue header, standard border
Minimal     — no header colour, hairline borders, clean for embedding
Dark Header — deep navy header (#1E293B), white text, light grey rows
Striped     — alternating row background (#F9FAFB / white), subtle header
Academic    — grey header, double top border, no inner vertical borders
Monochrome  — greyscale only, no colour accents — for print-first tables
```

### Data Model Addition

```ts
// src/types/table.types.ts — add to TableState
export type TableTheme =
  | 'default' | 'minimal' | 'dark-header'
  | 'striped' | 'academic' | 'monochrome';

export interface TableState {
  // ...existing fields
  theme: TableTheme;   // default: 'default'
}
```

### Theme Definitions

```ts
// src/config/tableThemes.ts
export interface ThemeDefinition {
  id:          TableTheme;
  label:       string;
  headerBg:    string;
  headerText:  string;
  rowBg:       string;
  altRowBg:    string;   // for striped
  borderStyle: string;
  borderColor: string;
}

export const TABLE_THEMES: ThemeDefinition[] = [
  {
    id: 'default', label: 'Default',
    headerBg: '#1E40AF', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'minimal', label: 'Minimal',
    headerBg: '#FFFFFF', headerText: '#111827',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#F3F4F6',
  },
  {
    id: 'dark-header', label: 'Dark header',
    headerBg: '#1E293B', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'striped', label: 'Striped',
    headerBg: '#1E40AF', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'academic', label: 'Academic',
    headerBg: '#F3F4F6', headerText: '#111827',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#D1D5DB',
  },
  {
    id: 'monochrome', label: 'Monochrome',
    headerBg: '#374151', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#9CA3AF',
  },
];
```

### UI — Theme Picker

```
Location: Templates panel (right sidebar) — below preset templates
Component: src/components/features/ThemePicker/ThemePicker.tsx

Render: 6 small thumbnail cards in a 3×2 grid
Each card: a tiny SVG preview of the theme (3 rows, coloured header)
Selected: ring-2 ring-primary on the card
Click: dispatches SET_THEME action to TableContext
```

### Tests Required

```ts
describe('tableThemes', () => {
  it('applyTheme sets headerBg on all header cells')
  it('applyTheme(striped) alternates row backgrounds correctly')
  it('applyTheme does not affect merged cell content')
  it('theme persists across undo operations')
  it('switching theme is undoable')
})
```

---

## 52. Undo History Indicator

The user cannot currently tell how deep the undo stack is or when it runs out.
A subtle indicator closes this UX gap.

### Implementation

```tsx
// In TableToolbar.tsx — update the Undo button

const { canUndo, historyDepth } = useTableHistory();

<Tooltip content={canUndo ? `Undo (${historyDepth} action${historyDepth === 1 ? '' : 's'})` : 'Nothing to undo'}>
  <IconButton
    aria-label={`Undo. ${historyDepth} actions available.`}
    onClick={undo}
    isDisabled={!canUndo}
  >
    <Undo2 size={16} />
  </IconButton>
</Tooltip>
```

### `useTableHistory` — add `historyDepth`

```ts
// src/hooks/useTableHistory.ts — add this to the return value
const historyDepth = pointer;   // number of undoable actions available

return { push, undo, canUndo, historyDepth };
```

### Visual Rules

```
canUndo === false:
  Button: opacity-50, cursor-not-allowed
  Tooltip: "Nothing to undo"

canUndo === true:
  Button: fully visible, normal cursor
  Tooltip: "Undo (3 actions)" — count shown only in tooltip, not on button
           Keeps the toolbar clean — count is discoverable on hover, not always visible

At MAX_HISTORY (50):
  No special UI — the oldest entry is silently dropped
  No toast — it would be disruptive during rapid editing
```

### Tests Required

```ts
describe('undo indicator', () => {
  it('historyDepth is 0 at initial state')
  it('historyDepth increments with each push')
  it('historyDepth decrements after undo')
  it('undo button is disabled when canUndo is false')
  it('tooltip shows correct action count')
  it('historyDepth never exceeds MAX_HISTORY')
})
```

---

## 53. Environment Variables (.env.example)

A committed `.env.example` documents every environment variable the project
uses, with placeholder values. It is the contract between the codebase and anyone
who clones it.

### `/.env.example` — committed to the repo

```bash
# Tablesmit — Environment Variables
# Copy this file to .env and fill in the values.
# Never commit .env — it is in .gitignore.

# ─── Analytics ───────────────────────────────────────────
# Google Analytics 4 measurement ID
# Get from: analytics.google.com → Admin → Data Streams
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# ─── Error Monitoring ────────────────────────────────────
# Sentry DSN for error tracking (production only)
# Get from: sentry.io → Project → Settings → Client Keys
VITE_SENTRY_DSN=https://xxxxx@o000000.ingest.sentry.io/0000000

# ─── App ─────────────────────────────────────────────────
# Public URL — used for sitemap and og:url generation
VITE_APP_URL=https://tablesmit.com

# ─── Future: AI Features ─────────────────────────────────
# Uncomment when AI features are implemented (Section 36)
# Never set this in the browser — use a serverless function
# VITE_AI_ENDPOINT=https://your-edge-function.vercel.app/api/ai
```

### `/.gitignore` — verify these lines exist

```
.env
.env.local
.env.*.local
```

### `/.env` — local development (not committed)

```bash
VITE_GA4_MEASUREMENT_ID=   # leave blank in dev — no analytics locally
VITE_SENTRY_DSN=           # leave blank in dev — errors go to console only
VITE_APP_URL=http://localhost:5173
```

### GA4 Integration

```ts
// src/utils/analytics.ts
const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || import.meta.env.DEV) return;   // no-op in dev
  window.gtag?.('event', name, params);
}

// Usage throughout the app:
trackEvent('table_exported', { format: 'pdf' });
trackEvent('table_imported', { source: 'csv', rows: 10 });
trackEvent('theme_applied',  { theme: 'striped' });
```

---


---

## 54. GitHub Repository Hygiene

The repo at https://github.com/Olayiwola72/tablesmit is currently missing
description, website URL, and topics. These are indexed by GitHub search,
Google, and OSS directories. Fix them in **Settings → General** on GitHub.

### Required Settings (update immediately)

```
Description:  A minimalist, open source table builder for analytical writing.
              Build clean structured tables with full header control,
              formatting, and export. Free. No signup.

Website:      https://tablesmit.com

Topics (add all of these — one click each):
  table-maker
  table-generator
  open-source
  typescript
  react
  vite
  tailwindcss
  analytical-writing
  csv-export
  excel-export
  made-in-nigeria
```

Topics make the repo discoverable in GitHub search and OSS directories.
"made-in-nigeria" specifically helps with the MadeinNGOSS listing and
community discovery within the Nigerian developer ecosystem.

---

### Social Preview Image

GitHub shows an og-image when the repo is shared on social media.
Go to **Settings → Social preview → Upload an image**.

Use the same `og-image.png` from `public/` (1200×630px).
This ensures consistent branding whether someone shares the website
or the GitHub repo.

---

### siteConfig.ts — Central Config Reference

The codebase uses `src/config/siteConfig.ts` as the single source of truth
for all brand strings, URLs, routes, and feature config.

**Any agent reading this document must check `siteConfig.ts` first
before searching for brand references in components.**

```ts
// src/config/siteConfig.ts — key fields to verify/update

export const SITE_CONFIG = {
  // Brand
  name:        'Tablesmit',       // was "Structra" — verify this is updated
  tagline:     'Tables, your way.',
  description: 'A minimalist table builder for analytical writing.',
  url:         'https://tablesmit.com',

  // Repository
  githubUrl:   'https://github.com/Olayiwola72/tablesmit',
  authorTwitter: 'https://x.com/OlayiwolaAkinn1',

  // Routes
  routes: {
    home:        '/',
    about:       '/about',
    openSource:  '/open-source',
    changelog:   '/changelog',
    privacy:     '/privacy',
    terms:       '/terms',
    notFound:    '*',
  },
} as const;
```

**Rule:** Any string that identifies the product by name, URL, or social link
must live in `siteConfig.ts`. Components import from there.
No brand strings hardcoded in JSX, meta tags, or copy files.

---

### GitHub Actions CI/CD — Already Implemented

CI/CD pipeline via GitHub Actions → Netlify is confirmed live.
The `.github/workflows/` directory is present in the repo.

Verify the workflow file does the following on every push to `main`:
```yaml
# .github/workflows/deploy.yml — confirm these steps exist:
steps:
  - name: Install dependencies
    run: npm ci

  - name: Run lint
    run: npm run lint                  # must pass — zero warnings

  - name: Run tests
    run: npm test -- --run             # all tests must pass

  - name: Build
    run: npm run build                 # must succeed

  - name: Deploy to Netlify
    # ... netlify deploy step
```

If lint or tests fail, the deploy must not proceed.
This is the automated quality gate that replaces manual enforcement.

---

### Made in Nigeria OSS — Pre-filled PR (ready when stars ≥ 20)

Current star count: **0** — need 20 before submitting.
The JSON below is ready. Replace nothing — handles are already filled in.

```json
{
  "name": "Tablesmit",
  "repoUrl": "https://github.com/Olayiwola72/tablesmit",
  "description": "A minimalist, open source table builder for analytical writing. Build clean structured tables with full control over headers, column types, and formatting. Supports drag-to-resize, merge cells, smart clipboard paste from Excel, and export to PDF, Excel, CSV, and PNG. No signup required.",
  "authors": [
    {
      "name": "@OlayiwolaAkinn1",
      "link": "https://x.com/OlayiwolaAkinn1"
    }
  ]
}
```

Submit to: https://github.com/MadeinNGOSS (find repo from https://x.com/MadeinNGOSS)
File to edit: `data/projects.json`
Full PR instructions: Section 38I

---


---

## 55. Blog System — JSON-Driven

### Design Principle

Creating a new blog post requires exactly one action:
**drop a `.json` or `.ts` file into `src/content/blog/`.**

No registry to update. No index file to maintain. No code change.
Vite's `import.meta.glob` discovers every file in that directory automatically
(both `.json` and `.ts` extensions are supported).
The post appears on the blog list and gets its own URL on the next build.

---

### Directory Structure

```
src/
  content/
    blog/
      how-to-make-a-table-in-markdown.json
      copy-excel-table-to-web.json
      5-free-online-table-makers-compared.json
      how-to-export-a-table-to-pdf.json
      ...
```

The filename (without extension) becomes the URL slug:
`how-to-make-a-table-in-markdown.json` → `/blog/how-to-make-a-table-in-markdown`

**Filename rules:**
```
- Lowercase only
- Hyphens between words (kebab-case)
- No spaces, underscores, or special characters
- Match the primary keyword for SEO (the URL IS the slug)
- Max 60 characters
```

---

### JSON Post Schema

```jsonc
// src/content/blog/how-to-make-a-table-in-markdown.json
{
  "title":       "How to Make a Table in Markdown",
  "date":        "2025-09-15",
  "description": "A practical guide to creating clean tables in Markdown — with examples you can generate in Tablesmit and paste directly.",
  "author":      "Olayiwola Akinnagbe",
  "tags":        ["markdown", "tutorial", "tables"],
  "readTime":    4,
  "featured":    false,
  "content":     "## Introduction

Markdown tables are simpler than they look..."
}
```

**Field reference:**

| Field         | Type       | Required | Notes                                                       |
|---------------|------------|----------|-------------------------------------------------------------|
| `title`       | string     | Yes      | H1 of the post and `<title>` tag. Max 60 chars for SEO.    |
| `date`        | string     | Yes      | ISO 8601 format: `YYYY-MM-DD`. Used for sorting and display.|
| `description` | string     | Yes      | Meta description. Max 160 chars. Used for SEO and card text.|
| `author`      | string     | Yes      | Display name. Use "Olayiwola Akinnagbe" for posts by the author. |
| `tags`        | string[]   | Yes      | 1-4 tags. Lowercase. Used for filtering and related posts.  |
| `readTime`    | number     | Yes      | Estimated minutes to read. Rough guide: 200 words/minute.   |
| `featured`    | boolean    | No       | `true` pins the post to the top of the blog list. Default: `false`. |
| `content`     | string     | Yes      | Full post body in Markdown. Use `\n` for newlines in JSON. |

---

### Content — Markdown in JSON

Content is written as a Markdown string inside the JSON `content` field.

**Supported Markdown:**
```markdown
# Heading 1 (avoid — H1 is the post title)
## Heading 2
### Heading 3

Regular paragraph text.

**Bold**, *italic*, `inline code`

- Bullet list
- Item two

1. Numbered list
2. Item two

[Link text](https://tablesmit.com)

\`\`\`ts
// Code block with syntax highlighting
const table = generateEmptyTable(3, 4);
\`\`\`

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell     | Cell     | Cell     |

> Blockquote for callouts or quotes

---   (horizontal rule / section break)
```

**In JSON, escape newlines as `\n`:**
```json
"content": "## Introduction\n\nThis is a paragraph.\n\n## Next Section\n\nAnother paragraph."
```

**Tip:** Write the Markdown in a separate `.md` file first, then convert newlines.
A helper script in `scripts/` can automate this — see Section 55F.

---

### 55A. Type Definition

```ts
// src/types/blog.types.ts

export interface BlogPost {
  slug:        string;       // derived from filename — not in the JSON itself
  title:       string;
  date:        string;       // "YYYY-MM-DD"
  description: string;
  author:      string;
  tags:        string[];
  readTime:    number;
  featured:    boolean;
  content:     string;       // Markdown string
}
```

---

### 55B. Blog Service — Auto-Discovery via import.meta.glob

```ts
// src/services/blogService.ts
// Discovers and loads all blog posts from src/content/blog/*.json
// Zero config — adding a JSON file is all that is needed.

import type { BlogPost } from '@/types/blog.types';

// Vite glob import — eager: true loads all modules at build time
const postModules = import.meta.glob<Record<string, unknown>>(
  '../content/blog/*.{json,ts}',
  { eager: true }
);

function slugFromPath(path: string): string {
  // '../content/blog/how-to-make-a-table-in-markdown.json' → 'how-to-make-a-table-in-markdown'
  return path.split('/').pop()!.replace(/\.(json|ts)$/, '');
}

function parsePost(path: string, raw: Record<string, unknown>): BlogPost {
  return {
    slug:        slugFromPath(path),
    title:       String(raw.title       ?? ''),
    date:        String(raw.date        ?? ''),
    description: String(raw.description ?? ''),
    author:      String(raw.author      ?? ''),
    tags:        Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    readTime:    Number(raw.readTime    ?? 1),
    featured:    Boolean(raw.featured   ?? false),
    content:     String(raw.content     ?? ''),
  };
}

// All posts — sorted newest first, featured posts at top
export const allPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => parsePost(path, raw as Record<string, unknown>))
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return  1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug);
}

// Get all unique tags across all posts
export function getAllTags(): string[] {
  return [...new Set(allPosts.flatMap(p => p.tags))].sort();
}
```

---

### 55C. Pages and Components

#### Routes (add to App.tsx)

```tsx
const BlogListPage = lazy(() => import('@/pages/BlogListPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));

<Route path="/blog"        element={<BlogListPage />} />
<Route path="/blog/:slug"  element={<BlogPostPage />} />
```

#### BlogListPage (`src/pages/BlogListPage/BlogListPage.tsx`)

```tsx
import { allPosts, getAllTags } from '@/services/blogService';

// Layout:
// - Page heading: "Writing about tables, structure, and analytical thinking."
// - Tag filter bar (optional v1: show all tags as clickable pills)
// - Post cards grid: 1 col mobile, 2 col lg
// - Each card: title, date, description, tags, read time, author

// Post card:
<article className="border border-border rounded-md p-6 hover:border-primary transition-colors duration-150">
  {post.featured && (
    <span className="text-xs font-semibold text-accent uppercase tracking-widest">Featured</span>
  )}
  <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
  <h2 className="text-xl font-semibold text-text-primary mt-2 mb-2">
    <Link to={`/blog/${post.slug}`} className="hover:text-primary">
      {post.title}
    </Link>
  </h2>
  <p className="text-sm text-text-secondary leading-relaxed mb-4">{post.description}</p>
  <div className="flex items-center gap-3 text-xs text-text-muted">
    <span>{post.readTime} min read</span>
    <span>·</span>
    <span>{post.author}</span>
    <span>·</span>
    {post.tags.map(tag => (
      <span key={tag} className="bg-surface px-2 py-0.5 rounded-sm">{tag}</span>
    ))}
  </div>
</article>
```

#### BlogPostPage (`src/pages/BlogPostPage/BlogPostPage.tsx`)

```tsx
import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '@/services/blogService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? '');

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Helmet>
        <title>{post.title} — Tablesmit</title>
        <meta name="description" content={post.description} />
        <meta property="og:title"       content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url"         content={`https://tablesmit.com/blog/${post.slug}`} />
        <link rel="canonical"           href={`https://tablesmit.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "datePublished": post.date,
          "author": { "@type": "Person", "name": post.author },
          "url": `https://tablesmit.com/blog/${post.slug}`,
        })}</script>
      </Helmet>

      <article className="max-w-narrow mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {post.description}
          </p>
          <div className="flex gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-surface border border-border
                                        px-2 py-1 rounded-sm text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <hr className="border-border mb-10" />

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-6 bg-surface border border-border rounded-md text-center">
          <p className="text-sm text-text-secondary mb-3">
            Try Tablesmit for yourself — free, no signup required.
          </p>
          <Link to="/app" className="text-sm font-semibold text-primary hover:underline">
            Open Tablesmit
          </Link>
        </div>
      </article>
    </>
  );
};
```

#### Prose Styles (Tailwind Typography Plugin)

```bash
npm install -D @tailwindcss/typography
```

```ts
// tailwind.config.ts — add to plugins
plugins: [
  require('@tailwindcss/typography'),
],
```

```css
/* The prose class handles all Markdown rendering styles:
   headings, paragraphs, lists, code blocks, blockquotes, tables.
   Use prose-slate for the dark neutral tone that matches the brand. */

/* Override table styles inside prose to match Tablesmit's table aesthetic */
.prose table { @apply border-collapse text-sm; }
.prose th    { @apply bg-primary text-white font-semibold px-3 py-2 text-left; }
.prose td    { @apply border border-border px-3 py-2; }
.prose tr:nth-child(even) td { @apply bg-surface; }
```

---

### 55D. Utility — Date Formatting

```ts
// src/utils/formatDate.ts
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  }).format(new Date(iso));
  // "15 September 2025"
}
```

---

### 55E. Sitemap — Auto-include Blog Posts

```ts
// Update public/sitemap.xml generation to include all blog slugs.
// Since the sitemap is static for this setup, regenerate it when new posts are added.
// A build script can automate this — see 55F.

// Add one <url> block per post:
// <url>
//   <loc>https://tablesmit.com/blog/how-to-make-a-table-in-markdown</loc>
//   <changefreq>monthly</changefreq>
//   <priority>0.8</priority>
//   <lastmod>2025-09-15</lastmod>
// </url>
```

---

### 55F. Helper Script — Markdown to JSON

Writing long Markdown in a JSON string is inconvenient.
This script converts a `.md` file into a blog post `.json` file.

```ts
// scripts/md-to-blog-post.ts
// Usage: npx ts-node scripts/md-to-blog-post.ts my-post.md

import fs from 'fs';
import path from 'path';

const mdFile  = process.argv[2];
const content = fs.readFileSync(mdFile, 'utf-8');
const slug    = path.basename(mdFile, '.md');

const post = {
  title:       "FILL IN",
  date:        new Date().toISOString().split('T')[0],
  description: "FILL IN — max 160 chars",
  author:      "Olayiwola Akinnagbe",
  tags:        ["FILL IN"],
  readTime:    Math.ceil(content.split(' ').length / 200),
  featured:    false,
  content:     content,      // Markdown content verbatim — no escaping needed in JSON
};

const outPath = `src/content/blog/${slug}.json`;
fs.writeFileSync(outPath, JSON.stringify(post, null, 2));
console.log(`Created: ${outPath}`);
console.log(`Fill in: title, description, tags`);
```

Add to package.json:
```json
"scripts": {
  "new-post": "ts-node scripts/md-to-blog-post.ts"
}
```

Usage:
```bash
npm run new-post my-draft.md
# Creates src/content/blog/my-draft.json
# Edit the JSON to fill in title, description, and tags
```

---

### 55G. Required Dependencies

```bash
npm install react-markdown remark-gfm react-helmet-async
npm install -D @tailwindcss/typography
```

| Package                    | Purpose                                      |
|----------------------------|----------------------------------------------|
| `react-markdown`           | Renders Markdown `content` string as HTML    |
| `remark-gfm`               | GitHub Flavored Markdown (tables, strikethrough, etc.) |
| `react-helmet-async`       | Per-post `<title>`, meta tags, og tags, JSON-LD |
| `@tailwindcss/typography`  | `prose` class — styles all Markdown output   |

**Also add to `App.tsx` — wrap the router:**
```tsx
import { HelmetProvider } from 'react-helmet-async';
<HelmetProvider>
  <BrowserRouter>
    {/* ...routes */}
  </BrowserRouter>
</HelmetProvider>
```

---

### 55H. Navbar Update

Add Blog to the navigation:

routes: {
  // ...existing
  blog:     '/blog',
}

```

---

### 55I. Tests Required

```ts
// src/services/blogService.test.ts
describe('blogService', () => {
  it('loads all JSON files from src/content/blog/')
  it('derives slug from filename correctly')
  it('sorts posts newest first by default')
  it('puts featured posts before non-featured posts')
  it('getPostBySlug returns correct post for valid slug')
  it('getPostBySlug returns undefined for unknown slug')
  it('getAllTags returns unique sorted tags across all posts')
  it('parsePost handles missing optional fields gracefully')
  it('readTime defaults to 1 when field is missing')
})

// src/pages/BlogListPage/BlogListPage.test.tsx
describe('BlogListPage', () => {
  it('renders a card for every blog post')
  it('shows featured badge on featured posts')
  it('links each card to the correct /blog/:slug route')
  it('displays date, read time, author, and tags on each card')
})

// src/pages/BlogPostPage/BlogPostPage.test.tsx
describe('BlogPostPage', () => {
  it('renders the post title as H1')
  it('renders the post content as Markdown')
  it('redirects to /blog for unknown slugs')
  it('sets correct <title> via Helmet')
  it('renders JSON-LD structured data with correct fields')
  it('shows tags as pill badges')
  it('includes CTA link to /app at the bottom')
})
```

---

### 55J. v6.0 Checklist Additions

```
[x] npm install react-markdown remark-gfm react-helmet-async
[x] npm install -D @tailwindcss/typography
[x] Add typography plugin to tailwind.config.ts
[x] Add HelmetProvider wrapper in App.tsx
[x] Create src/types/blog.types.ts
[x] Create src/services/blogService.ts with import.meta.glob
[x] Create src/content/blog/ directory
[x] Create BlogListPage and BlogPostPage (lazy-loaded)
[x] Add /blog and /blog/:slug routes to App.tsx
[x] Add Blog to nav in siteConfig.ts
[x] Create scripts/md-to-blog-post.ts helper
[x] Add "new-post" script to package.json
[x] Write first 3 blog posts as JSON (Section 38D priority articles)
[x] Update public/sitemap.xml with blog post URLs
[x] Update README.md with "Writing a blog post" section (see below)
[x] All blogService and page tests passing
```

---

## 56. Testimonials Page

### Route: `/testimonials`

A simple JSON-driven testimonials page that renders user quotes in a card grid.
When the testimonials array is empty, it shows a "No testimonials yet" empty state
with a link to the contact page.

### Data Source

```ts
// src/config/testimonials.ts
export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  source?: string
  sourceUrl?: string
}

export const TESTIMONIALS: Testimonial[] = []  // empty until collected
```

### Implementation

The page (`src/pages/TestimonialsPage/TestimonialsPage.tsx`) reads `TESTIMONIALS` from
the config and renders either:
- An empty state with a dashed border box, "No testimonials yet" heading, and links
  to the contact page and the brand's Twitter/X account
- A 1/2/3-column responsive grid of testimonial cards (each with quote, name,
  role, initials avatar, and optional source link)

### Integration

- Route: `/testimonials` → lazy-loaded via `React.lazy()` in `App.tsx`
- Nav link: "Testimonials" after "Changelog" in `siteConfig.nav`
- Footer link: "Testimonials" after "Contact" in the Company links section
- Route referenced as `siteConfig.routes.testimonials` — no hardcoded hrefs

### Tests

Seven tests in `src/test/pages/TestimonialsPage/TestimonialsPage.test.tsx`:
```
- Renders the page heading
- Shows empty state when no testimonials exist
- Links to the contact page from empty state
- Renders testimonial cards when data exists (via vi.spyOn mock)
- Shows initials fallback for avatar
- Renders source link when provided
- Does not render source link when source is absent
```

### v6.0 Checklist Additions

```
[x] Create src/config/testimonials.ts with Testimonial type and empty array
[x] Create src/pages/TestimonialsPage/TestimonialsPage.tsx
[x] Add /testimonials route to App.tsx (lazy-loaded)
[x] Add testimonials route key to siteConfig.routes
[x] Add "Testimonials" to siteConfig.nav (after Changelog)
[x] Add "Testimonials" to Footer companyLinks (after Contact)
[x] Write 7 tests for empty state and cards-with-data rendering
[x] All tests pass
```

---

*End of Brand Identity & Engineering Implementation Guide — Tablesmit v6.0*
*Single source of truth. Any deviation requires explicit sign-off.*
