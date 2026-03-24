'use client'

import { cn } from '@/utils/cn'
import React, { createContext, useContext, useMemo, useState } from 'react'

type StepsContextValue = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const StepsContext = createContext<StepsContextValue | null>(null)

function useStepsContext() {
  const context = useContext(StepsContext)

  if (!context) {
    throw new Error('Steps components must be used within Steps')
  }

  return context
}

export type StepsItemProps = React.ComponentProps<'div'>

export const StepsItem = ({
  children,
  className,
  ...props
}: StepsItemProps) => (
  <div className={cn('text-base-content/70 text-sm', className)} {...props}>
    {children}
  </div>
)

export type StepsTriggerProps = React.ComponentProps<'button'> & {
  leftIcon?: React.ReactNode
  swapIconOnHover?: boolean
}

export const StepsTrigger = ({
  children,
  className,
  leftIcon,
  swapIconOnHover = true,
  onClick,
  ...props
}: StepsTriggerProps) => {
  const { isOpen, onOpenChange } = useStepsContext()

  return (
    <button
      type="button"
      className={cn(
        'group flex w-full cursor-pointer items-center justify-start gap-1 text-sm text-base-content/70 transition-colors hover:text-base-content',
        className,
      )}
      data-state={isOpen ? 'open' : 'closed'}
      onClick={(event) => {
        onOpenChange(!isOpen)
        onClick?.(event)
      }}
      {...props}
    >
      <div className="flex items-center gap-2">
        {leftIcon ? (
          <span className="relative inline-flex size-4 items-center justify-center">
            <span
              className={cn(
                'transition-opacity',
                swapIconOnHover && 'group-hover:opacity-0',
              )}
            >
              {leftIcon}
            </span>
            {swapIconOnHover ? (
              <span
                className={cn(
                  'icon-[lucide--chevron-down] absolute size-4 opacity-0 transition-all group-hover:opacity-100',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            ) : null}
          </span>
        ) : null}
        <span>{children}</span>
      </div>
      {!leftIcon ? (
        <span
          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}

export type StepsContentProps = React.ComponentProps<'div'> & {
  bar?: React.ReactNode
}

export const StepsContent = ({
  children,
  className,
  bar,
  ...props
}: StepsContentProps) => {
  const { isOpen } = useStepsContext()

  return (
    <div
      className={cn('overflow-hidden', !isOpen && 'hidden', className)}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <div className="mt-3 grid min-w-0 max-w-full grid-cols-[min-content_minmax(0,1fr)] items-start gap-x-3">
        <div className="min-w-0 self-stretch">{bar ?? <StepsBar />}</div>
        <div className="min-w-0 space-y-2">{children}</div>
      </div>
    </div>
  )
}

export type StepsBarProps = React.HTMLAttributes<HTMLDivElement>

export const StepsBar = ({ className, ...props }: StepsBarProps) => (
  <div
    className={cn('h-full w-[2px] bg-base-300', className)}
    aria-hidden
    {...props}
  />
)

export type StepsProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Steps({
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: StepsProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const value = useMemo(
    () => ({
      isOpen,
      onOpenChange: (nextOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
      },
    }),
    [isControlled, isOpen, onOpenChange],
  )

  return (
    <StepsContext.Provider value={value}>
      <div className={cn(className)} data-state={isOpen ? 'open' : 'closed'} {...props}>
        {children}
      </div>
    </StepsContext.Provider>
  )
}
