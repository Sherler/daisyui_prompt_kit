'use client'

import { cn } from '@/utils/cn'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Markdown } from './markdown'

type ReasoningContextType = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const ReasoningContext = createContext<ReasoningContextType | undefined>(undefined)

function useReasoningContext() {
  const context = useContext(ReasoningContext)
  if (!context) {
    throw new Error('useReasoningContext must be used within a Reasoning provider')
  }
  return context
}

export type ReasoningProps = {
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isStreaming?: boolean
}

function Reasoning({ children, className, open, onOpenChange, isStreaming }: ReasoningProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [wasAutoOpened, setWasAutoOpened] = useState(false)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  useEffect(() => {
    if (isStreaming && !wasAutoOpened) {
      if (!isControlled) setInternalOpen(true)
      setWasAutoOpened(true)
    }

    if (!isStreaming && wasAutoOpened) {
      if (!isControlled) setInternalOpen(false)
      setWasAutoOpened(false)
    }
  }, [isStreaming, wasAutoOpened, isControlled])

  return (
    <ReasoningContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      <div className={className}>{children}</div>
    </ReasoningContext.Provider>
  )
}

export type ReasoningTriggerProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLButtonElement>

function ReasoningTrigger({ children, className, ...props }: ReasoningTriggerProps) {
  const { isOpen, onOpenChange } = useReasoningContext()

  return (
    <button
      type="button"
      className={cn('flex cursor-pointer items-center gap-2', className)}
      onClick={() => onOpenChange(!isOpen)}
      {...props}
    >
      <span className="text-primary">{children}</span>
      <div className={cn('transform transition-transform', isOpen ? 'rotate-180' : '')}>
        <span className="icon-[lucide--chevron-down] h-4 w-4" aria-hidden="true" />
      </div>
    </button>
  )
}

export type ReasoningContentProps = {
  children: React.ReactNode
  className?: string
  markdown?: boolean
  contentClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

function ReasoningContent({
  children,
  className,
  contentClassName,
  markdown = false,
  ...props
}: ReasoningContentProps) {
  const { isOpen } = useReasoningContext()

  const content = markdown ? <Markdown>{children as string}</Markdown> : children

  return (
    <div
      className={cn('grid transition-[grid-template-rows] duration-300 ease-in-out', className)}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn('text-base-content/70 prose prose-sm max-w-none', contentClassName)}>
          {content}
        </div>
      </div>
    </div>
  )
}

export { Reasoning, ReasoningTrigger, ReasoningContent }
