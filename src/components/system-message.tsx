'use client'

import { cn } from '@/utils/cn'

export type SystemMessageVariant = 'info' | 'success' | 'warning' | 'error'

export type SystemMessageProps = {
  children: React.ReactNode
  variant?: SystemMessageVariant
  className?: string
  icon?: React.ReactNode
}

function SystemMessage({
  children,
  variant = 'info',
  className,
  icon,
}: SystemMessageProps) {
  const config = {
    info: {
      bg: 'bg-info/10',
      border: 'border-info/20',
      text: 'text-info',
      icon: <span className="icon-[lucide--info] h-4 w-4" aria-hidden="true" />,
    },
    success: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      icon: <span className="icon-[lucide--circle-check-big] h-4 w-4" aria-hidden="true" />,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: <span className="icon-[lucide--triangle-alert] h-4 w-4" aria-hidden="true" />,
    },
    error: {
      bg: 'bg-error/10',
      border: 'border-error/20',
      text: 'text-error',
      icon: <span className="icon-[lucide--circle-alert] h-4 w-4" aria-hidden="true" />,
    },
  }

  const { bg, border, text, icon: defaultIcon } = config[variant]
  const iconNode = icon || defaultIcon

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border',
        bg,
        border,
        className
      )}
    >
      <div className={cn('shrink-0 mt-0.5', text)}>{iconNode}</div>
      <div className={cn('text-sm flex-1', text)}>{children}</div>
    </div>
  )
}

export { SystemMessage }
