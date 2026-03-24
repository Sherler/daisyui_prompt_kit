'use client'

import { cn } from '@/utils/cn'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  hideMarker = false,
  ...props
}: ChainOfThoughtTriggerProps & { hideMarker?: boolean }) => {
  const { isOpen, onOpenChange } = useChainOfThoughtStepContext()

  return (
    <button
      type="button"
      className={cn(
        'flex w-full cursor-pointer items-center justify-start gap-1 text-left text-sm font-normal leading-6 text-base-content/60 transition-colors hover:text-base-content/80',
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
        {!hideMarker
          ? leftIcon ? (
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
            )
          : null}
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
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const element = contentRef.current

    if (!element) {
      return
    }

    const updateHeight = () => {
      setContentHeight(element.scrollHeight)
    }

    updateHeight()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(() => {
      updateHeight()
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [children, isOpen])

  return (
    <div
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out data-[state=closed]:pointer-events-none',
        className,
      )}
      data-state={isOpen ? 'open' : 'closed'}
      style={{
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        opacity: isOpen ? 1 : 0,
      }}
      {...props}
    >
      <div
        ref={contentRef}
        className="min-h-0 overflow-hidden transition-[max-height] duration-200 ease-out"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px',
        }}
      >
        <div className="mt-1.5 min-w-0 space-y-2">{children}</div>
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
    <ul className={cn('steps steps-vertical !grid !w-full !overflow-visible', className)}>
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
    </ul>
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

  const childrenArray = React.Children.toArray(children)
  const triggerChild = childrenArray.find(
    (child): child is React.ReactElement<ChainOfThoughtTriggerProps> =>
      React.isValidElement(child) && child.type === ChainOfThoughtTrigger,
  )

  const renderedChildren = childrenArray.map((child) => {
    if (React.isValidElement(child) && child.type === ChainOfThoughtTrigger) {
      return React.cloneElement(child as React.ReactElement<ChainOfThoughtTriggerProps>, {
        hideMarker: true,
      })
    }

    return child
  })

  const marker = triggerChild?.props.leftIcon ? (
    <span className="relative inline-flex size-4 items-center justify-center text-base-content/60">
      <span
        className={cn(
          'inline-flex size-4 items-center justify-center transition-opacity',
          triggerChild.props.swapIconOnHover !== false && 'group-hover:opacity-0',
        )}
      >
        {triggerChild.props.leftIcon}
      </span>
      {triggerChild.props.swapIconOnHover !== false ? (
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
    <span className="inline-block size-2.5 shrink-0 rounded-full bg-base-content/60" />
  )

  return (
    <ChainOfThoughtStepContext.Provider value={value}>
      <li
        className={cn(
          'step !min-h-0 !w-full !grid-cols-[40px_minmax(0,1fr)] !justify-items-start !gap-x-3 !gap-y-0 text-left [--step-bg:var(--color-base-300)] [--step-fg:var(--color-base-content)] before:!w-px before:!border-0 before:!bg-base-300 before:!translate-x-0 before:!translate-y-[-50%] first:before:!content-none',
          className,
        )}
        data-last={isLast}
      >
        <span
          className="step-icon !mt-1 !size-4 !min-h-4 !min-w-4 !place-self-start !bg-transparent !border-0 !p-0"
          aria-hidden="true"
        >
          {marker}
        </span>
        <div className="min-w-0 w-full">{renderedChildren}</div>
      </li>
    </ChainOfThoughtStepContext.Provider>
  )
}
