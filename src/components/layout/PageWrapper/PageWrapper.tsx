import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PageWrapper({ children, className }: { children: ReactNode; className?: string }): ReactNode {
  return <main className={cn('bg-white dark:bg-slate-900', className)}>{children}</main>
}
