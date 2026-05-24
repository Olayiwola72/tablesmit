import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-use-table-templates',
  title: 'How to Use Table Templates to Start Faster',
  date: '2026-03-30',
  description:
    'A blank table forces you to decide everything from scratch. Templates give you a starting structure with preset headers, rows, and columns.',
  author: 'Olayiwola Akinnagbe',
  tags: ['table templates', 'presets', 'tutorial'],
  readTime: 4,
  featured: false,
  content: `## The blank page problem

A new table with five rows and five columns of empty cells presents a decision: what goes in each column? How many rows do you need? What should the headers say?

These decisions are not difficult, but they add up. When you build tables frequently, starting from a blank grid every time wastes a few minutes per table. Over a week of regular work, the overhead is measurable.

Templates solve this by giving you a preconfigured starting point — headers already set, columns already named, rows already sized for the type of data you are entering.

## Templates available in Tablesmit

Tablesmit ships with five built-in templates. Each one targets a common use case.

### Research Notes

Four columns: Topic, Source, Key Findings, Status. Designed for collecting notes from multiple sources during the research phase of a project. The Status column helps you track which sources have been fully reviewed.

### Feature Matrix

Five columns: Feature, Priority, Status, Notes, Timeline. A product management staple for comparing features or tracking implementation progress. The Priority column is set to the Number format for easy sorting.

### Content Tracker

Four columns: Page Title, Status, Author, Due Date. Useful for editorial planning. The Due Date column uses the Date format so dates display consistently.

### Budget Summary

Five columns: Category, Budgeted, Actual, Variance, Notes. Built for financial tracking. The Budgeted and Actual columns use the Currency format. The Variance column is set to auto-sum so totals update as you enter data.

### Q1 Performance

Five columns: Metric, Q1 Target, Q1 Actual, Variance, Status. A quarterly review template suitable for team or department performance tracking.

## How to apply a template

1. Open [Tablesmit](/).
2. In the toolbar, click the **Templates** dropdown button.
3. Select a template from the list.
4. The table populates with the preset headers, rows, and columns.
5. Replace the example data with your own.

The template overwrites the current table. If you have unsaved work, export it first or copy the data before applying the template.

## When to use a template

Templates are most useful when you are starting a new piece of work and the structure is predictable. A research notes template saves little time if your research method is unusual. But if you take research notes the same way every time, it saves minutes per project.

For one-off tables where the structure is unique to the content, starting from a blank grid is often faster than adapting a template.

## Customising a template after applying it

Once applied, a template is just a normal table. You can:
- Add or remove rows and columns
- Change headers by clicking on them
- Resize columns by dragging
- Change column types from the right sidebar
- Apply a different theme or colour scheme
- Merge cells

The template is a starting point, not a constraint.

## Building your own templates

Templates are loaded from a configuration file and are not yet user-editable within the UI. If you have a recurring table structure, you can duplicate an existing table by exporting it and re-importing it as a starting point for the next one.

Open [Tablesmit](/), click the Templates button, and pick the one that fits your next table.`,
}

export default post
