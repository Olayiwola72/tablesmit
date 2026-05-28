import type { ShortcutDef } from './shortcutsConfig.types'

export const SHORTCUTS: ShortcutDef[] = [
  { keys: 'Ctrl+Z', labelKey: 'shortcuts.undo' },
  { keys: 'Ctrl+F', labelKey: 'shortcuts.find' },
  { keys: 'Ctrl+H', labelKey: 'shortcuts.findAndReplace_short' },
  { keys: 'Ctrl+P', labelKey: 'shortcuts.exportPdf' },
  { keys: 'Ctrl+Shift+X', labelKey: 'shortcuts.exportExcel' },
  { id: 'captionAlignLeft', keys: 'Ctrl+L', labelKey: 'shortcuts.captionAlignLeft' },
  { id: 'captionAlignCenter', keys: 'Ctrl+E', labelKey: 'shortcuts.captionAlignCenter' },
  { id: 'captionAlignRight', keys: 'Ctrl+R', labelKey: 'shortcuts.captionAlignRight' },
  { keys: 'Tab / Shift+Tab', labelKey: 'shortcuts.moveBetweenCells' },
  { keys: 'Arrow keys', labelKey: 'shortcuts.moveBetweenCells' },
  { keys: 'Enter', labelKey: 'shortcuts.editCell' },
  { keys: 'Escape', labelKey: 'shortcuts.cancelEdit' },
  { keys: 'Delete', labelKey: 'shortcuts.deleteContent' },
  { keys: 'Ctrl+/', labelKey: 'shortcuts.shortcutsModal' },
]
