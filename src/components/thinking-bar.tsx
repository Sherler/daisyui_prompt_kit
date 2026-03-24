'use client'

import { cn } from '@/utils/cn'
import { Loader2, Brain } from 'lucide-react'

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
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">{text}</span>
        </>
      ) : (
        <>
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">Done</span>
        </>
      )}
    </div>
  )
}

export { ThinkingBar }
