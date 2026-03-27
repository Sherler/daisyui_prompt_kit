'use client'

import { cn } from '@/utils/cn'
import React, {
  createContext,
  useContext,
  useState,
} from 'react'

type ChainOfThoughtStepContextValue = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const ChainOfThoughtStepContext = createContext<ChainOfThoughtStepContextValue | null>(null)

function useChainOfThoughtStepContext() {
  const context = useContext(ChainOfThoughtStepContext)

  if (!context) {
    throw new Error('ChainOfThought subcomponents must be used within ChainOfThoughtStep')
  }

  return context
}

export type ChainOfThoughtItemProps = React.ComponentProps<'div'>

export const ChainOfThoughtItem = ({
  children,
  className,
  ...props
}: ChainOfThoughtItemProps) => (
  <div
    className={cn(
      'min-w-0 text-sm leading-7 font-normal text-base-content/60',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export type ChainOfThoughtTriggerProps = React.ComponentProps<'button'> & {
  leftIcon?: React.ReactNode
  swapIconOnHover?: boolean
}

export const ChainOfThoughtTrigger = ({
  children,
  className,
  leftIcon,
  swapIconOnHover = true,
  onClick,
  ...props
}: ChainOfThoughtTriggerProps) => {
  const { isOpen, onOpenChange } = useChainOfThoughtStepContext()

  return (
    <button
      type="button"
      className={cn(
        'group flex w-full cursor-pointer items-center justify-start gap-1 text-left text-sm font-normal leading-6 text-base-content/60 transition-colors hover:text-base-content/80',
        className,
      )}
      data-state={isOpen ? 'open' : 'closed'}
      onClick={(event) => {
        onOpenChange(!isOpen)
        onClick?.(event)
      }}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        {leftIcon ? (
          <span className="relative inline-flex size-4 items-center justify-center">
            <span
              className={cn(
                'inline-flex size-4 items-center justify-center transition-opacity',
                swapIconOnHover && 'group-hover:opacity-0',
              )}
            >
              {leftIcon}
            </span>
            {swapIconOnHover ? (
              <span
                className={cn(
                  'icon-[lucide--chevron-down] absolute inline-block size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            ) : null}
          </span>
        ) : (
          <span className="relative inline-flex size-4 items-center justify-center">
            <span className="inline-block size-2.5 shrink-0 rounded-full bg-current" />
          </span>
        )}
        <span className="min-w-0">{children}</span>
      </div>
      {!leftIcon ? (
        <span
          className={cn(
            'icon-[lucide--chevron-down] inline-block size-4 shrink-0 transition-transform',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}

export type ChainOfThoughtContentProps = React.ComponentProps<'div'>

export const ChainOfThoughtContent = ({
  children,
  className,
  ...props
}: ChainOfThoughtContentProps) => {
  const { isOpen } = useChainOfThoughtStepContext()

  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-in-out',
        className,
      )}
      data-state={isOpen ? 'open' : 'closed'}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="grid grid-cols-[min-content_minmax(0,1fr)] gap-x-4">
          <div className="ml-[7px] h-full w-px bg-primary/20 group-data-[last=true]:hidden" />
          <div className="ml-[7px] h-full w-px bg-transparent group-data-[last=false]:hidden" />
          <div className="mt-2 min-w-0 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export type ChainOfThoughtProps = {
  children: React.ReactNode
  className?: string
}

export function ChainOfThought({ children, className }: ChainOfThoughtProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={cn('space-y-0', className)}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ isLast?: boolean }>,
                {
                  isLast: index === childrenArray.length - 1,
                },
              )
            : child}
        </React.Fragment>
      ))}
    </div>
  )
}

export type ChainOfThoughtStepProps = {
  children: React.ReactNode
  className?: string
  isLast?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ChainOfThoughtStep = ({
  children,
  className,
  isLast = false,
  defaultOpen = false,
  open,
  onOpenChange,
}: ChainOfThoughtStepProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const value: ChainOfThoughtStepContextValue = {
    isOpen,
    onOpenChange: (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
  }

  return (
    <ChainOfThoughtStepContext.Provider value={value}>
      <div className={cn('group', className)} data-last={isLast}>
        {children}
        <div className="flex justify-start group-data-[last=true]:hidden">
          <div className="ml-[7px] h-4 w-px bg-primary/20" />
        </div>
      </div>
    </ChainOfThoughtStepContext.Provider>
  )
}
