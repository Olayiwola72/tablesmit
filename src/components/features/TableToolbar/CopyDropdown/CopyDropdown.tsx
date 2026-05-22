import { ChevronDown, Copy } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { CopyDropdownProps } from './CopyDropdown.types'
import { Button } from '../../../ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../ui/DropdownMenu/DropdownMenu'

export function CopyDropdown({ onCopyExcelData, onCopyCsv, onCopyMarkdown, onCopyLatex, onCopyImage }: CopyDropdownProps): ReactNode {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <Copy size={14} aria-hidden="true" /> {t('toolbar.copy')} <ChevronDown size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopyExcelData}>{t('toolbar.copyExcel')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyCsv}>{t('toolbar.copyCsv', 'Copy as CSV')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyMarkdown}>{t('toolbar.copyMarkdown', 'Copy as Markdown')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyLatex}>{t('toolbar.copyLatex', 'Copy as LaTeX')}</DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyImage}>{t('toolbar.copyImage')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
