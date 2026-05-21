import { toast as sonnerToast } from 'sonner'

export const toast = {
  success: (message: string): void => {
    sonnerToast.success(message)
  },
  error: (message: string): void => {
    sonnerToast.error(message)
  },
  info: (message: string): void => {
    sonnerToast(message)
  },
}

export const TOAST = {
  EXPORT_SUCCESS: (format: string): string => `Table exported as ${format}.`,
  EXPORT_ERROR: 'Export failed. Try reducing the table size.',
  IMPORT_SUCCESS: (rows: number, cols: number): string =>
    `Table imported. ${rows} rows, ${cols} columns.`,
  IMPORT_ERROR: 'Could not read file. Check the format and try again.',
  IMPORT_TOO_LARGE: 'File too large. Maximum size is 5MB.',
  COPY_IMAGE: 'Table copied as image.',
  COPY_DATA: 'Table data copied. Paste into Excel or Google Sheets.',
  COPY_CSV: 'Table data copied as CSV.',
  COPY_MARKDOWN: 'Table copied as Markdown.',
  CLIPBOARD_ERROR: 'Could not copy to clipboard. Try again.',
  PASTE_SUCCESS: (rows: number, cols: number): string =>
    `Table pasted. ${rows} rows, ${cols} columns.`,
  PASTE_ERROR: 'Could not read clipboard. Try importing a file instead.',
  UNDO_EMPTY: 'Nothing left to undo.',
  CELL_CLEARED: 'Table cleared.',
  AI_COMING_SOON: 'AI features coming soon. Join the waitlist.',
} as const
