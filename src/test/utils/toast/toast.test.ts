import { describe, expect, it, vi } from 'vitest'

const mockModule = vi.hoisted(() => {
  const mockFn = vi.fn() as unknown as Record<string, ReturnType<typeof vi.fn>>
  mockFn.success = vi.fn()
  mockFn.error = vi.fn()
  mockFn.info = vi.fn()
  mockFn.warning = vi.fn()
  return { mockFn }
})

vi.mock('sonner', () => ({ toast: mockModule.mockFn }))

import { toast, TOAST } from '../../../utils/toast/toast'

describe('toast', () => {
  it('success calls sonner.success with the message', () => {
    toast.success('It worked!')
    expect(mockModule.mockFn.success).toHaveBeenCalledWith('It worked!')
  })

  it('error calls sonner.error with the message', () => {
    toast.error('Something broke.')
    expect(mockModule.mockFn.error).toHaveBeenCalledWith('Something broke.')
  })

  it('info calls sonner.info with the message', () => {
    toast.info('Heads up.')
    expect(mockModule.mockFn.info).toHaveBeenCalledWith('Heads up.')
  })

  it('warning calls sonner.warning with the message', () => {
    toast.warning('Careful.')
    expect(mockModule.mockFn.warning).toHaveBeenCalledWith('Careful.')
  })
})

describe('TOAST', () => {
  it('EXPORT_SUCCESS formats correctly', () => {
    expect(TOAST.EXPORT_SUCCESS('pdf')).toBe('Table exported as pdf.')
  })

  it('EXPORT_ERROR is a static string', () => {
    expect(TOAST.EXPORT_ERROR).toBe('Export failed. Try reducing the table size.')
  })

  it('IMPORT_SUCCESS formats correctly', () => {
    expect(TOAST.IMPORT_SUCCESS(5, 3)).toBe('Table imported. 5 rows, 3 columns.')
  })

  it('IMPORT_ERROR is a static string', () => {
    expect(TOAST.IMPORT_ERROR).toBe('Could not read file. Check the format and try again.')
  })

  it('IMPORT_TOO_LARGE is a static string', () => {
    expect(TOAST.IMPORT_TOO_LARGE).toBe('File too large. Maximum size is 5MB.')
  })

  it('COPY_IMAGE is a static string', () => {
    expect(TOAST.COPY_IMAGE).toBe('Table copied as image.')
  })

  it('COPY_DATA is a static string', () => {
    expect(TOAST.COPY_DATA).toBe('Table data copied. Paste into Excel or Google Sheets.')
  })

  it('COPY_CSV is a static string', () => {
    expect(TOAST.COPY_CSV).toBe('Table data copied as CSV.')
  })

  it('COPY_MARKDOWN is a static string', () => {
    expect(TOAST.COPY_MARKDOWN).toBe('Table copied as Markdown.')
  })

  it('CLIPBOARD_ERROR is a static string', () => {
    expect(TOAST.CLIPBOARD_ERROR).toBe('Could not copy to clipboard. Try again.')
  })

  it('PASTE_SUCCESS formats correctly', () => {
    expect(TOAST.PASTE_SUCCESS(3, 4)).toBe('Table pasted. 3 rows, 4 columns.')
  })

  it('PASTE_ERROR is a static string', () => {
    expect(TOAST.PASTE_ERROR).toBe('Could not read clipboard. Try importing a file instead.')
  })

  it('UNDO_EMPTY is a static string', () => {
    expect(TOAST.UNDO_EMPTY).toBe('Nothing left to undo.')
  })

  it('CELL_CLEARED is a static string', () => {
    expect(TOAST.CELL_CLEARED).toBe('Table cleared.')
  })

  it('AI_COMING_SOON is a static string', () => {
    expect(TOAST.AI_COMING_SOON).toBe('AI features coming soon. Join the waitlist.')
  })
})
