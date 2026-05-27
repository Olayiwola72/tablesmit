import type { ReactNode } from 'react'
import type { TableSkeletonProps } from './TableSkeleton.types'

export function TableSkeleton({ rows, cols, visible }: TableSkeletonProps): ReactNode {
  return (
    <div
      data-testid="table-skeleton"
      className="absolute inset-0 z-30 flex flex-col gap-2 bg-white p-2 transition-opacity duration-300 ease-out dark:bg-slate-900 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {Array.from({ length: rows }, (_, ri) => (
        <div key={ri} className="flex gap-2">
          {Array.from({ length: cols }, (_, ci) => (
            <div
              key={ci}
              className={`h-9 flex-1 rounded-sm bg-gradient-to-r from-border/40 via-border/60 to-border/40 bg-[length:200%_100%] animate-pulse ${ri === 0 ? 'from-primary/15 via-primary/25 to-primary/15' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
