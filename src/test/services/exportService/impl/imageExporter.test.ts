import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ImageExporter } from '../../../../services/exportService/impl/imageExporter'

const mockCanvas = vi.hoisted(() => ({
  toDataURL: vi.fn(() => 'data:image/png;base64,fakedata'),
  width: 800,
  height: 600,
}))
const mockHtml2canvas = vi.hoisted(() => vi.fn().mockResolvedValue(mockCanvas))
vi.mock('html2canvas', () => ({ default: mockHtml2canvas }))

function el(): HTMLElement {
  return document.createElement('div')
}

describe('ImageExporter', () => {
  let mockAnchor: HTMLAnchorElement
  let click: ReturnType<typeof vi.fn>
  let createElementSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockCanvas.toDataURL.mockReturnValue('data:image/png;base64,fakedata')
    mockAnchor = document.createElement('a')
    click = vi.fn()
    mockAnchor.click = click as unknown as HTMLAnchorElement['click']
    const originalCreateElement = document.createElement.bind(document)
    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') return mockAnchor
      return originalCreateElement(tag)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('PNG calls html2canvas with default high scale when no scale provided', async () => {
    const element = el()
    await new ImageExporter('image/png').export(element, { format: 'png' })
    expect(mockHtml2canvas).toHaveBeenCalledWith(element, expect.objectContaining({
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    }))
    const [, opts] = mockHtml2canvas.mock.calls[0]
    expect(typeof opts.onclone).toBe('function')
  })

  it('PNG uses provided scale option', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png', scale: 1 })
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ scale: 1 }),
    )
  })

  it('PNG uses image/png mime type', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png' })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png', 0.92)
  })

  it('JPEG uses image/jpeg mime type with custom quality', async () => {
    await new ImageExporter('image/jpeg').export(el(), { format: 'jpeg', quality: 0.5 })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.5)
  })

  it('JPEG defaults quality to high preset (0.92) when not provided', async () => {
    await new ImageExporter('image/jpeg').export(el(), { format: 'jpeg' })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.92)
  })

  it('PNG uses default filename tablesmit-table.png', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png' })
    expect(mockAnchor.download).toBe('tablesmit-table.png')
  })

  it('JPEG uses default filename tablesmit-table.jpeg', async () => {
    await new ImageExporter('image/jpeg').export(el(), { format: 'jpeg' })
    expect(mockAnchor.download).toBe('tablesmit-table.jpeg')
  })

  it('PNG sets href from canvas data URL', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png' })
    expect(mockAnchor.href).toBe('data:image/png;base64,fakedata')
  })

  it('uses custom filename with correct extension for PNG', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png', filename: 'chart' })
    expect(mockAnchor.download).toBe('chart.png')
  })

  it('uses custom filename with correct extension for JPEG', async () => {
    await new ImageExporter('image/jpeg').export(el(), { format: 'jpeg', filename: 'photo' })
    expect(mockAnchor.download).toBe('photo.jpeg')
  })

  it('creates an anchor element and calls click', async () => {
    await new ImageExporter('image/png').export(el(), { format: 'png' })
    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(click).toHaveBeenCalledOnce()
  })
})
