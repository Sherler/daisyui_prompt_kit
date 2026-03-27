'use client'

import { cn } from '@/utils/cn'

const SHIMMER_KEYFRAMES = `
@keyframes dpk-shimmer{0%{background-position:200% 50%}100%{background-position:-200% 50%}}
`

export type TextShimmerProps = {
  as?: string
  duration?: number
  spread?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

function TextShimmer({
  as = 'span',
  className,
  duration = 4,
  spread = 20,
  children,
  ...props
}: TextShimmerProps) {
  const dynamicSpread = Math.min(Math.max(spread, 5), 45)
  const Component = as as React.ElementType

  return (
    <>
      <style href="dpk-shimmer-keyframes" precedence="default">{SHIMMER_KEYFRAMES}</style>
      <Component
        className={cn(
          'bg-[length:200%_auto] bg-clip-text font-medium text-transparent',
          className
        )}
        style={{
          animation: `dpk-shimmer ${duration}s infinite linear`,
          backgroundImage: `linear-gradient(to right, rgb(from var(--color-base-content) r g b / 0.45) ${50 - dynamicSpread}%, var(--color-primary) 50%, rgb(from var(--color-base-content) r g b / 0.45) ${50 + dynamicSpread}%)`,
        }}
        {...props}
      >
        {children}
      </Component>
    </>
  )
}

export { TextShimmer }
