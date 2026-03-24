'use client'

import { cn } from '@/utils/cn'
import { ChevronDown, Loader2, Check, X, Wrench } from 'lucide-react'
import { useState } from 'react'

export type ToolPart = {
  type: string
  state: 'pending' | 'running' | 'completed' | 'error'
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  toolCallId: string
  errorText?: string
}

export type ToolProps = {
  toolPart: ToolPart
  defaultOpen?: boolean
  className?: string
}

function Tool({ toolPart, defaultOpen = false, className }: ToolProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const statusConfig = {
    pending: { icon: Loader2, color: 'text-warning', bg: 'bg-warning/10', animate: 'animate-spin' },
    running: { icon: Loader2, color: 'text-primary', bg: 'bg-primary/10', animate: 'animate-spin' },
    completed: { icon: Check, color: 'text-success', bg: 'bg-success/10', animate: '' },
    error: { icon: X, color: 'text-error', bg: 'bg-error/10', animate: '' },
  }

  const config = statusConfig[toolPart.state]
  const StatusIcon = config.icon

  return (
    <div className={cn('card card-border bg-base-100 overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <div className={cn('rounded-full p-1.5', config.bg)}>
          <StatusIcon className={cn('w-4 h-4', config.color, config.animate)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{toolPart.type}</div>
          <div className="text-xs text-base-content/60 capitalize">{toolPart.state}</div>
        </div>
        <ChevronDown
          className={cn('w-4 h-4 text-base-content/60 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="border-t border-base-300 px-3 pb-3">
          {toolPart.input && (
            <div className="mt-3">
              <div className="text-xs font-medium text-base-content/70 mb-1">Input</div>
              <pre className="bg-base-200 rounded p-2 text-xs overflow-x-auto">
                {JSON.stringify(toolPart.input, null, 2)}
              </pre>
            </div>
          )}

          {toolPart.state === 'completed' && toolPart.output && (
            <div className="mt-3">
              <div className="text-xs font-medium text-base-content/70 mb-1">Output</div>
              <pre className="bg-base-200 rounded p-2 text-xs overflow-x-auto">
                {JSON.stringify(toolPart.output, null, 2)}
              </pre>
            </div>
          )}

          {toolPart.state === 'error' && toolPart.errorText && (
            <div className="mt-3">
              <div className="text-xs font-medium text-error mb-1">Error</div>
              <div className="bg-error/10 text-error rounded p-2 text-xs">{toolPart.errorText}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { Tool }
