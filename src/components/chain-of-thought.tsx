'use client'

import { cn } from '@/utils/cn'
import { ChevronDown, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export type ChainOfThoughtProps = {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
  title?: string
}

function ChainOfThought({
  children,
  className,
  defaultOpen = false,
  title = 'Chain of Thought',
}: ChainOfThoughtProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn('card card-border bg-base-100 overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 p-3 text-left"
      >
        <Lightbulb className="w-4 h-4 text-warning" />
        <span className="font-medium text-sm flex-1">{title}</span>
        <ChevronDown
          className={cn('w-4 h-4 text-base-content/60 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="border-t border-base-300 px-3 pb-3">
          <div className="mt-3 space-y-2 text-sm text-base-content/80">{children}</div>
        </div>
      )}
    </div>
  )
}

export { ChainOfThought }
