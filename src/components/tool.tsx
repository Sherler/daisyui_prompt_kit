'use client'

import { cn } from '@/utils/cn'
import { useState } from 'react'

export type ToolPart = {
  type: string
  state:
    | 'input-streaming'
    | 'input-available'
    | 'output-available'
    | 'output-error'
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  toolCallId?: string
  errorText?: string
}

export type ToolProps = {
  toolPart: ToolPart
  defaultOpen?: boolean
  className?: string
}

function Tool({ toolPart, defaultOpen = false, className }: ToolProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const { state, input, output, toolCallId } = toolPart

  const getStateIcon = () => {
    switch (state) {
      case 'input-streaming':
        return <span className="icon-[lucide--loader-circle] h-4 w-4 animate-spin text-info" aria-hidden="true" />
      case 'input-available':
        return <span className="icon-[lucide--settings-2] h-4 w-4 text-warning" aria-hidden="true" />
      case 'output-available':
        return <span className="icon-[lucide--circle-check-big] h-4 w-4 text-success" aria-hidden="true" />
      case 'output-error':
        return <span className="icon-[lucide--circle-x] h-4 w-4 text-error" aria-hidden="true" />
      default:
        return <span className="icon-[lucide--settings-2] h-4 w-4 text-base-content/60" aria-hidden="true" />
    }
  }

  const getStateBadge = () => {
    const baseClasses = 'rounded-full px-2 py-1 text-xs font-medium'

    switch (state) {
      case 'input-streaming':
        return <span className={cn(baseClasses, 'bg-info/10 text-info')}>Processing</span>
      case 'input-available':
        return <span className={cn(baseClasses, 'bg-warning/10 text-warning')}>Ready</span>
      case 'output-available':
        return <span className={cn(baseClasses, 'bg-success/10 text-success')}>Completed</span>
      case 'output-error':
        return <span className={cn(baseClasses, 'bg-error/10 text-error')}>Error</span>
      default:
        return <span className={cn(baseClasses, 'bg-base-200 text-base-content/60')}>Pending</span>
    }
  }

  const formatValue = (value: unknown): string => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'string') return value
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    return String(value)
  }

  return (
    <div className={cn('mt-3 overflow-hidden rounded-lg border border-base-300', className)}>
      <button
        type="button"
        className="h-auto w-full rounded-none rounded-t-lg bg-base-100 px-3 py-2 text-left font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {getStateIcon()}
            <span className="font-mono text-sm font-medium">{toolPart.type}</span>
            {getStateBadge()}
          </div>
          <span
            className={cn('icon-[lucide--chevron-down] h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-base-300 bg-base-100 p-3">
          <div className="space-y-3">
            {input && Object.keys(input).length > 0 ? (
              <div>
                <h4 className="mb-2 text-sm font-medium text-base-content/70">Input</h4>
                <div className="rounded border border-base-300 bg-base-100 p-2 font-mono text-sm">
                  {Object.entries(input).map(([key, value]) => (
                    <div key={key} className="mb-1 last:mb-0">
                      <span className="text-base-content/60">{key}:</span>{' '}
                      <span>{formatValue(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {output ? (
              <div>
                <h4 className="mb-2 text-sm font-medium text-base-content/70">Output</h4>
                <div className="max-h-60 overflow-auto rounded border border-base-300 bg-base-100 p-2 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{formatValue(output)}</pre>
                </div>
              </div>
            ) : null}

            {state === 'output-error' && toolPart.errorText ? (
              <div>
                <h4 className="mb-2 text-sm font-medium text-error">Error</h4>
                <div className="rounded border border-error/30 bg-error/10 p-2 text-sm text-error">
                  {toolPart.errorText}
                </div>
              </div>
            ) : null}

            {state === 'input-streaming' ? (
              <div className="text-sm text-base-content/60">Processing tool call...</div>
            ) : null}

            {toolCallId ? (
              <div className="border-t border-base-300 pt-2 text-xs text-base-content/60">
                <span className="font-mono">Call ID: {toolCallId}</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { Tool }
