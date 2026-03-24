'use client'

import { cn } from '@/utils/cn'

export type TextShimmerProps = {
  text: string
  className?: string
  duration?: number
  spread?: number
}

function TextShimmer({
  text,
  className,
  duration = 4,
  spread = 2,
}: TextShimmerProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-base-content/40 via-primary to-base-content/40 bg-clip-text text-transparent',
        'bg-[length:200%_auto] animate-shimmer',
        className
      )}
      style={{
        animationDuration: `${duration}s`,
        backgroundSize: `${spread * 100}% 100%`,
      }}
    >
      {text}
    </span>
  )
}

export { TextShimmer }
