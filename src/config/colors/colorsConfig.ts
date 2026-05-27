import { headerColorSwatches, contentColorSwatches } from '../colorPalette/colorPalette'

export const colors = {
  defaultHeader: '#ffffff',
  defaultContent: '#111827',
  header: headerColorSwatches,
  content: contentColorSwatches,
  contrastText: {
    threshold: 145,
    lightBackgroundText: '#111827',
    darkBackgroundText: '#ffffff',
  } as const,
} as const
