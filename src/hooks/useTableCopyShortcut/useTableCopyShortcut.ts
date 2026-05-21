import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { CaptionAlignment } from '../../components/features/TableCaption/TableCaption.types'
import { isTableEmpty } from '../../utils/tableUtils/tableUtils'
import { toast } from '../../utils/toast/toast'
import type { CellData } from '../../context/table.types'

export function useTableCopyShortcut(
  cells: CellData[][],
  tableRef: React.RefObject<HTMLDivElement | null>,
  setCaptionAlignment: (align: CaptionAlignment) => void,
) {
  const { t } = useTranslation()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl && (e.key === 'e' || e.key === 'l' || e.key === 'r')) {
        e.preventDefault()
        if (e.key === 'e') setCaptionAlignment('center')
        else if (e.key === 'l') setCaptionAlignment('left')
        else if (e.key === 'r') setCaptionAlignment('right')
      }

      if (isCtrl && e.key === 'c') {
        const target = e.target as HTMLElement
        const tag = target.tagName.toLowerCase()
        if (target.closest('[contenteditable]') || tag === 'input' || tag === 'textarea' || tag === 'select') return
        e.preventDefault()

        if (isTableEmpty(cells)) return

        const el = tableRef.current?.querySelector('table')
        if (!el) return

        import('html2canvas').then(({ default: html2canvas }) => {
          html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true }).then(
            (canvas) => {
              canvas.toBlob((blob) => {
                if (!blob) return
                navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(
                  () => { toast.success(t('toast.copyImage')) },
                  () => { toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.')) },
                )
              }, 'image/png')
            },
            () => { toast.error(t('toast.clipboardError', 'Could not copy to clipboard. Try again.')) },
          )
        })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [tableRef, cells, t, setCaptionAlignment])
}
