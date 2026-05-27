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

import { toast } from '../../../utils/toast/toast'

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
