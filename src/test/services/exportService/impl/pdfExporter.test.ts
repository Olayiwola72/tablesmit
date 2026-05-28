import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { PDFExporter } from '../../../../services/exportService/impl/pdfExporter'

const mockCanvas = vi.hoisted(() => ({
  toDataURL: vi.fn(() => 'data:image/jpeg;base64,fakedata'),
  width: 800,
  height: 600,
}))
const mockHtml2canvas = vi.hoisted(() => vi.fn().mockResolvedValue(mockCanvas))
vi.mock('html2canvas', () => ({ default: mockHtml2canvas }))

const mockPdfInstance = vi.hoisted(() => ({
  internal: {
    pageSize: { getWidth: vi.fn(() => 595.28), getHeight: vi.fn(() => 841.89) },
  },
  addImage: vi.fn(),
  save: vi.fn(),
}))
const mockJspdf = vi.hoisted(() => {
  const spy = vi.fn().mockReturnValue(mockPdfInstance)
  return new Proxy(spy, {
    construct(target, args) {
      target(...args)
      return mockPdfInstance
    },
  })
})
vi.mock('jspdf', () => ({ default: mockJspdf }))

function el(): HTMLElement {
  return document.createElement('div')
}

describe('PDFExporter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHtml2canvas.mockReset()
    mockHtml2canvas.mockResolvedValue(mockCanvas)
    mockCanvas.width = 800
    mockCanvas.height = 600
    mockCanvas.toDataURL.mockReturnValue('data:image/jpeg;base64,fakedata')
    mockPdfInstance.internal.pageSize.getWidth.mockReturnValue(595.28)
    mockPdfInstance.internal.pageSize.getHeight.mockReturnValue(841.89)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls html2canvas with correct options', async () => {
    const element = el()
    await new PDFExporter().export(element, { format: 'pdf' })
    expect(mockHtml2canvas).toHaveBeenCalledWith(element, expect.objectContaining({
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    }))
    const [, opts] = mockHtml2canvas.mock.calls[0]
    expect(typeof opts.onclone).toBe('function')
  })

  it('uses provided scale option', async () => {
    await new PDFExporter().export(el(), { format: 'pdf', scale: 1 })
    expect(mockHtml2canvas).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ scale: 1 }),
    )
  })

  it('falls back to lower scale when html2canvas fails', async () => {
    mockHtml2canvas
      .mockRejectedValueOnce(new Error('canvas too large'))
      .mockResolvedValueOnce(mockCanvas)
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockHtml2canvas).toHaveBeenCalledTimes(2)
    expect(mockHtml2canvas.mock.calls[0][1].scale).toBe(2)
    expect(mockHtml2canvas.mock.calls[1][1].scale).toBe(1.5)
    expect(mockPdfInstance.save).toHaveBeenCalled()
  })

  it('re-throws when all scales fail', async () => {
    mockHtml2canvas.mockRejectedValue(new Error('canvas error'))
    await expect(new PDFExporter().export(el(), { format: 'pdf' })).rejects.toThrow('canvas error')
    expect(mockHtml2canvas).toHaveBeenCalledTimes(3)
  })

  it('renders canvas as JPEG with default high quality when quality not provided', async () => {
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.92)
  })

  it('renders canvas as JPEG with provided quality', async () => {
    await new PDFExporter().export(el(), { format: 'pdf', quality: 0.8 })
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.8)
  })

  it('creates jsPDF with landscape for wide canvas', async () => {
    mockCanvas.width = 1000
    mockCanvas.height = 600
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockJspdf).toHaveBeenCalledWith({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    })
  })

  it('creates jsPDF with portrait for tall canvas', async () => {
    mockCanvas.width = 600
    mockCanvas.height = 1000
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockJspdf).toHaveBeenCalledWith({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    })
  })

  it('creates jsPDF with portrait when canvas is square', async () => {
    mockCanvas.width = 800
    mockCanvas.height = 800
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockJspdf).toHaveBeenCalledWith({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    })
  })

  it('adds image to pdf', async () => {
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockPdfInstance.addImage).toHaveBeenCalled()
  })

  it('passes correct arguments to addImage using JPEG format', async () => {
    mockCanvas.width = 800
    mockCanvas.height = 600
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockPdfInstance.addImage).toHaveBeenCalledWith(
      'data:image/jpeg;base64,fakedata',
      'JPEG',
      expect.any(Number),
      32,
      expect.any(Number),
      expect.any(Number),
    )
  })

  it('saves with default filename', async () => {
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockPdfInstance.save).toHaveBeenCalledWith('tablesmit-table.pdf')
  })

  it('saves with custom filename', async () => {
    await new PDFExporter().export(el(), { format: 'pdf', filename: 'my-document' })
    expect(mockPdfInstance.save).toHaveBeenCalledWith('my-document.pdf')
  })
})
