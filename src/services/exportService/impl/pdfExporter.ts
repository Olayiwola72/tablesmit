import type { ExportOptions, ExportStrategy } from '../export.types'
import { siteConfig } from '../../../config/siteConfig'
import { filenameWithExtension } from '../utils'

export class PDFExporter implements ExportStrategy {
  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ])
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 3,
      useCORS: true,
      onclone: (clonedDoc: Document): void => {
        clonedDoc.querySelectorAll('[data-export-hide]').forEach(el => el.remove())
        const style = clonedDoc.createElement('style')
        style.textContent = '[class*="hover\\:"] { transition: none !important; }'
        clonedDoc.head.appendChild(style)
      },
    })
    const image = canvas.toDataURL('image/png')
    const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait'
    const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const width = canvas.width * ratio
    const height = canvas.height * ratio
    pdf.addImage(image, 'PNG', (pageWidth - width) / 2, 32, width, Math.min(height, pageHeight - 64))
    pdf.save(filenameWithExtension(options.filename, siteConfig.exportFileBaseName, 'pdf'))
  }
}
