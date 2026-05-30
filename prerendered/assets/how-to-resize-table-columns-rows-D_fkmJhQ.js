var e={slug:"how-to-resize-table-columns-rows",title:"How to Resize Table Columns and Rows Online",date:"2026-05-24",description:"Drag-to-resize columns and rows in {{BRAND_NAME}} — just like a desktop application. Smooth, instant, and precise. Double-click to auto-fit.",author:"Olayiwola Akinnagbe",tags:["resize","columns","rows","tutorial","tables"],readTime:4,featured:!1,content:`## The drag-to-resize experience

Spreadsheet users expect to be able to drag column edges to resize them. It is one of those interactions that feels obvious once you have used it — and frustrating when it is missing.

Tablesmit implements drag-to-resize for both columns and rows, with the same smooth, immediate feel as a desktop application.

## How column resize works

Hover over the right edge of any column header. A resize handle appears — a thin vertical zone about 8px wide (12px on mobile for touch targets). Click and drag.

A ghost line follows your cursor as you drag, showing exactly where the column edge will land. The actual column width only updates when you release the mouse button — this prevents layout recalculation on every pixel of movement.

**Constraints:**
- Minimum column width: 60px
- Maximum column width: 600px
- The cursor changes to \`col-resize\` during drag

## How row resize works

Same concept, vertical direction. Hover over the bottom edge of any row. A handle appears. Drag up or down to resize.

**Constraints:**
- Minimum row height: 32px
- Maximum row height: 300px

## Auto-fit on double-click

Double-click any resize handle and the column or row automatically adjusts to fit its content. Tablesmit measures the widest (or tallest) cell in that column (or row), adds padding, and sets the size in one step.

Auto-fit is also available from the right-click context menu: right-click a cell and choose "Auto-fit column width" or "Auto-fit row height".

## Why this matters for writing

Analytical writing is iterative. You draft content, review it, and refine it. As you edit, cells grow and shrink. Being able to resize columns by dragging — without switching tools or counting characters — keeps you in your flow.

A column of short product codes should be narrow. A column of paragraph-length descriptions should be wide. Drag to make it so. Two seconds, no menus.

## Touch and mobile

On mobile devices, the resize handles are wider (12px) to meet the 44×44px accessibility minimum for touch targets. The ghost line is still visible during drag. Auto-fit on double-tap works the same way.

## Performance

Resize uses \`requestAnimationFrame\` to batch visual updates. The ghost line moves every frame, but the actual column width change happens once on mouseup. This means zero layout thrashing — the table stays responsive even with many columns.`,relatedFeature:"drag-to-resize"};export{e as default};
