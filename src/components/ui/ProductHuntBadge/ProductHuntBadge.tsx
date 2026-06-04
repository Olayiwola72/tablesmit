import { ExternalLink } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { usePageTranslation } from '@/hooks/usePageTranslation/usePageTranslation'
import { cn } from '@/lib/utils'
import { brand } from '@/config/brand/brandConfig'
import { productHunt } from '@/config/productHunt/productHuntConfig'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import type { ProductHuntBadgeProps } from './ProductHuntBadge.types'

function CardVariant({ className }: { className?: string }): ReactNode {
  const { t } = usePageTranslation()

  return (
    <div
      className={cn(
        'max-w-sm rounded-md border border-border bg-white p-5',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <Logo
          variant="icon"
          className="h-10 w-10 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-text-primary">
            {brand.name}
          </h3>
          <p className="truncate text-xs text-text-secondary">
            {t('productHunt.description')}
          </p>
        </div>
      </div>
      <Button asChild variant="accent" size="md" className="w-full">
        <a
          href={productHunt.embedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('productHunt.checkItOut')} <ExternalLink size={14} aria-hidden="true" />
        </a>
      </Button>
    </div>
  )
}

function BadgeVariant({ theme }: { theme: 'light' | 'dark' }): ReactNode {
  const { t } = usePageTranslation()
  const postId = productHunt.postId
  if (!postId) return null

  const imgSrc = `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=${theme}`

  return (
    <a
      href={productHunt.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imgSrc}
        alt={`${brand.name} - ${t('productHunt.description')} | Product Hunt`}
        width="250"
        height="54"
        className="h-[54px] w-[250px]"
      />
    </a>
  )
}

function ProductHuntBadgeInner({ variant = 'card', theme = 'light', className }: ProductHuntBadgeProps): ReactNode {
  if (variant === 'badge') {
    return <BadgeVariant theme={theme} />
  }

  return <CardVariant className={className} />
}

export const ProductHuntBadge = memo(ProductHuntBadgeInner)
