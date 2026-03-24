'use client'

import { cn } from '@/utils/cn'

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
          <span className="icon-[lucide--copy] h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
      {onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Regenerate"
        >
          <span className="icon-[lucide--rotate-ccw] h-3.5 w-3.5" aria-hidden="true" />
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
          <span className="icon-[lucide--thumbs-up] h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
      {onThumbsDown && (
        <button
          type="button"
          onClick={onThumbsDown}
          className="btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100"
          title="Not helpful"
        >
          <span className="icon-[lucide--thumbs-down] h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { FeedbackBar }
