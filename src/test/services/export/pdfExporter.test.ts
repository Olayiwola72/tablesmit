import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { PDFExporter } from '../../../services/exportService/impl/pdfExporter'

const mockCanvas = vi.hoisted(() => ({
  toDataURL: vi.fn(() => 'data:image/png;base64,fakedata'),
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
    mockCanvas.width = 800
    mockCanvas.height = 600
    mockCanvas.toDataURL.mockReturnValue('data:image/png;base64,fakedata')
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
      scale: 3,
      useCORS: true,
    }))
    const [, opts] = mockHtml2canvas.mock.calls[0]
    expect(typeof opts.onclone).toBe('function')
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

  it('passes correct arguments to addImage', async () => {
    mockCanvas.width = 800
    mockCanvas.height = 600
    await new PDFExporter().export(el(), { format: 'pdf' })
    expect(mockPdfInstance.addImage).toHaveBeenCalledWith(
      'data:image/png;base64,fakedata',
      'PNG',
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
