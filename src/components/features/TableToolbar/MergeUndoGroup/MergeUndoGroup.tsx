import { Merge, Undo2, Ungroup } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { MergeUndoGroupProps } from './MergeUndoGroup.types'
import { Button } from '@/components/ui/Button/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip/Tooltip'

export function MergeUndoGroup({ canMerge, canUndo, historyDepth, onMerge, onUnmerge, onUndo }: MergeUndoGroupProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={canMerge ? 'bg-surface text-text-primary' : ''}
            onClick={onMerge}
          >
            <Merge size={14} aria-hidden="true" /> {t('toolbar.merge')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('aria.mergeButton')}</TooltipContent>
      </Tooltip>
      <Button variant="ghost" size="sm" onClick={onUnmerge}>
        <Ungroup size={14} aria-hidden="true" /> {t('toolbar.unmerge')}
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo}>
            <Undo2 size={14} aria-hidden="true" /> {t('toolbar.undo')}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {canUndo
            ? t('toolbar.undoActions', { count: historyDepth })
            : t('toolbar.nothingToUndo')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
