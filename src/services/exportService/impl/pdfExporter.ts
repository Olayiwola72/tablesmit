import type { ExportOptions, ExportStrategy } from '../export.types'
import { EXPORT_QUALITY_PRESETS, exportFileBaseName } from '@/config/export/exportConfig'
import { filenameWithExtension, fixTableBordersForExport } from '../utils'

export class PDFExporter implements ExportStrategy {
  async export(element: HTMLElement, options: ExportOptions): Promise<void> {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ])

    const targetScale = options.scale ?? EXPORT_QUALITY_PRESETS.high.scale
    const scales = targetScale >= 2 ? [targetScale, 1.5, 1] : [targetScale, 1]
    let canvas: HTMLCanvasElement | null = null

    for (const scale of scales) {
      try {
        canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale,
          useCORS: true,
          onclone: (clonedDoc: Document): void => {
            clonedDoc.querySelectorAll('[data-export-hide]').forEach(el => el.remove())
            fixTableBordersForExport(clonedDoc)
            const style = clonedDoc.createElement('style')
            style.textContent = '[class*="hover\\:"] { transition: none !important; }'
            clonedDoc.head.appendChild(style)
            const captionEl = clonedDoc.querySelector('[data-table-caption]')
            if (captionEl) {
              const textEl = captionEl.querySelector('p')
              if (textEl && !(textEl as HTMLElement).style.color) {
                ;(textEl as HTMLElement).style.color = '#000000'
              }
              ;(captionEl as HTMLElement).style.marginBottom = '16px'
            }
          },
        })
        break
      } catch (err) {
        if (scale === scales[scales.length - 1]) throw err
      }
    }

    const quality = options.quality ?? EXPORT_QUALITY_PRESETS.high.jpegQuality
    const image = canvas!.toDataURL('image/jpeg', quality)
    const orientation = canvas!.width > canvas!.height ? 'landscape' : 'portrait'
    const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / canvas!.width, pageHeight / canvas!.height)
    const width = canvas!.width * ratio
    const height = canvas!.height * ratio
    pdf.addImage(image, 'JPEG', (pageWidth - width) / 2, 32, width, Math.min(height, pageHeight - 64))
    pdf.save(filenameWithExtension(options.filename, exportFileBaseName, 'pdf'))
  }
}
