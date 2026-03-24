'use client'

import { cn } from '@/utils/cn'

export type ThinkingBarProps = {
  isThinking?: boolean
  text?: string
  className?: string
}

function ThinkingBar({
  isThinking = true,
  text = 'Thinking...',
  className,
}: ThinkingBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        'bg-primary/10 text-primary',
        'transition-all duration-300',
        isThinking ? 'opacity-100' : 'opacity-0 h-0 py-0 overflow-hidden',
        className
      )}
    >
      {isThinking ? (
        <>
          <span className="icon-[lucide--loader-circle] h-4 w-4 animate-spin" aria-hidden="true" />
          <span className="text-sm font-medium">{text}</span>
        </>
      ) : (
        <>
          <span className="icon-[lucide--brain] h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-medium">Done</span>
        </>
      )}
    </div>
  )
}

export { ThinkingBar }
