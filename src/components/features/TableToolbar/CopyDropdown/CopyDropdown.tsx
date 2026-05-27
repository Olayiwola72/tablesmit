import { ChevronDown, Code, Copy, FileText, Image, Loader2, Table2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { CopyDropdownProps } from './CopyDropdown.types'
import { Button } from '../../../ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../ui/DropdownMenu/DropdownMenu'

export function CopyDropdown({ onCopyExcelData, onCopyCsv, onCopyMarkdown, onCopyLatex, onCopyImage, onCopyHtml, isCopyingImage }: CopyDropdownProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <Copy size={14} aria-hidden="true" /> {t('toolbar.copy')} <ChevronDown size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopyExcelData}><Table2 size={14} className="text-emerald-600" aria-hidden="true" /> {t('toolbar.copyExcel')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyCsv}><FileText size={14} className="text-cyan-600" aria-hidden="true" /> {t('toolbar.copyCsv', 'Copy as CSV')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyMarkdown}><Code size={14} className="text-info" aria-hidden="true" /> {t('toolbar.copyMarkdown', 'Copy as Markdown')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyLatex}><Code size={14} className="text-primary" aria-hidden="true" /> {t('toolbar.copyLatex', 'Copy as LaTeX')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyImage} disabled={isCopyingImage}>
          {isCopyingImage ? <Loader2 size={14} className="animate-spin text-rose-600" aria-hidden="true" /> : <Image size={14} className="text-rose-600" aria-hidden="true" />}
          {t('toolbar.copyImage')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyHtml}><Code size={14} className="text-text-muted" aria-hidden="true" /> {t('toolbar.copyHtml', 'Copy as HTML')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
