'use client'

import { cn } from '@/utils/cn'
import { Markdown } from './markdown'

export type MessageProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

const Message = ({ children, className, ...props }: MessageProps) => (
  <div className={cn('flex gap-3', className)} {...props}>
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
  delayMs,
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
} & React.ComponentProps<typeof Markdown> &
  React.HTMLProps<HTMLDivElement>

const MessageContent = ({
  children,
  markdown = false,
  className,
  ...props
}: MessageContentProps) => {
  const classNames = cn(
    'bg-base-200 rounded-lg p-3 text-base-content prose prose-sm max-w-none break-words whitespace-normal',
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
  tooltip?: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
} & React.ComponentProps<'button'>

const MessageAction = ({
  tooltip,
  children,
  className,
  side = 'top',
  ...props
}: MessageActionProps) => {
  return (
    <div className="tooltip" data-tip={tooltip}>
      <button
        type="button"
        className={cn(
          'btn btn-xs btn-square btn-ghost opacity-60 hover:opacity-100',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction }
