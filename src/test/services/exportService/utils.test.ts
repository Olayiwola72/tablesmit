import { describe, it, expect, vi } from 'vitest'
import { downloadUrl } from '../../../services/exportService/utils'

describe('downloadUrl', () => {
  it('creates a temporary link and clicks it', () => {
    const click = vi.fn()
    const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(
      Object.assign(document.createElement('a'), { click }),
    )

    downloadUrl('data:,hello', 'test.txt')

    expect(createSpy).toHaveBeenCalledWith('a')
    expect(click).toHaveBeenCalled()
    createSpy.mockRestore()
  })

  it('sets href and download attributes', () => {
    const link = document.createElement('a')
    const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(link)

    downloadUrl('data:,world', 'out.csv')

    const el = createSpy.mock.results[0].value
    expect(el.href).toBe('data:,world')
    expect(el.download).toBe('out.csv')
    createSpy.mockRestore()
  })

  it('does not append or remove the link from DOM', () => {
    const append = vi.spyOn(document.body, 'appendChild')
    const remove = vi.spyOn(document.body, 'removeChild')

    downloadUrl('blob:test', 'doc.pdf')

    expect(append).not.toHaveBeenCalled()
    expect(remove).not.toHaveBeenCalled()
    append.mockRestore()
    remove.mockRestore()
  })
})
