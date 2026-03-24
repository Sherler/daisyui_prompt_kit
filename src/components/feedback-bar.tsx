'use client'

import { cn } from '@/utils/cn'
import { ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react'

export type FeedbackBarProps = {
  onCopy?: () => void
  onRegenerate?: () => void
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  className?: string
}

function FeedbackBar({
  onCopy,
  onRegenerate,
  onThumbsUp,
  onThumbsDown,
  className,
}: FeedbackBarProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Copy"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      )}
      {onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Regenerate"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
      <div className="w-px h-4 bg-base-300 mx-1" />
      {onThumbsUp && (
        <button
          type="button"
          onClick={onThumbsUp}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Helpful"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
      )}
      {onThumbsDown && (
        <button
          type="button"
          onClick={onThumbsDown}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Not helpful"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}

export { FeedbackBar }
