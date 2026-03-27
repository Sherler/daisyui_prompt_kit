'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'
import { Markdown } from './markdown'

const TOOLTIP_SIDE_CLASSES = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
} as const

export type MessageProps = {
  children: React.ReactNode
  className?: string
  variant?: 'user' | 'assistant'
} & React.HTMLProps<HTMLDivElement>

const Message = ({ children, className, variant, ...props }: MessageProps) => (
  <div
    className={cn(
      'flex gap-3',
      variant === 'user' && 'justify-end',
      variant === 'assistant' && 'justify-start',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export type MessageAvatarProps = {
  src?: string
  alt?: string
  fallback?: string
  delayMs?: number
  className?: string
}

const MessageAvatar = ({
  src,
  alt,
  fallback,
  className,
}: MessageAvatarProps) => {
  return (
    <div className={cn('avatar shrink-0', className)}>
      <div className="w-8 h-8 rounded-full">
        {src ? (
          <img src={src} alt={alt || 'Avatar'} />
        ) : (
          <div className="bg-primary text-primary-content flex h-full w-full items-center justify-center text-sm font-medium">
            {fallback || alt?.[0] || '?'}
          </div>
        )}
      </div>
    </div>
  )
}

export type MessageContentProps = {
  children: React.ReactNode
  markdown?: boolean
  className?: string
  variant?: 'user' | 'assistant'
} & React.ComponentProps<typeof Markdown> &
  React.HTMLProps<HTMLDivElement>

const MessageContent = ({
  children,
  markdown = false,
  className,
  variant,
  ...props
}: MessageContentProps) => {
  const classNames = cn(
    'prose prose-sm max-w-none rounded-lg text-base-content break-words whitespace-normal',
    variant === 'user' ? 'bg-secondary p-2' : variant === 'assistant' ? 'bg-transparent p-0' : 'bg-secondary p-2',
    className
  )

  return markdown ? (
    <Markdown className={classNames} {...props}>
      {children as string}
    </Markdown>
  ) : (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}

export type MessageActionsProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

const MessageActions = ({ children, className, ...props }: MessageActionsProps) => (
  <div
    className={cn('text-base-content/60 flex items-center gap-2', className)}
    {...props}
  >
    {children}
  </div>
)

export type MessageActionProps = {
  className?: string
  tooltip: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
} & React.HTMLAttributes<HTMLDivElement>

const MessageAction = ({
  tooltip,
  children,
  className,
  side = 'top',
  ...props
}: MessageActionProps) => {
  const actionChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          if (typeof children.props.onClick === 'function') {
            children.props.onClick(event)
          }
        },
      })
    : children

  return (
    <div className="group relative inline-flex" {...props}>
      {actionChild}
      <div
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-10 max-w-xs rounded-md bg-neutral px-2 py-1 text-xs text-neutral-content opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
          TOOLTIP_SIDE_CLASSES[side],
          className
        )}
      >
        {tooltip}
      </div>
    </div>
  )
}

export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction }
