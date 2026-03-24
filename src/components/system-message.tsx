'use client'

import { cn } from '@/utils/cn'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

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
      icon: Info,
    },
    success: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      text: 'text-success',
      icon: CheckCircle,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      text: 'text-warning',
      icon: AlertTriangle,
    },
    error: {
      bg: 'bg-error/10',
      border: 'border-error/20',
      text: 'text-error',
      icon: AlertCircle,
    },
  }

  const { bg, border, text, icon: DefaultIcon } = config[variant]
  const IconComponent = icon || <DefaultIcon className="w-4 h-4" />

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border',
        bg,
        border,
        className
      )}
    >
      <div className={cn('shrink-0 mt-0.5', text)}>{IconComponent}</div>
      <div className={cn('text-sm flex-1', text)}>{children}</div>
    </div>
  )
}

export { SystemMessage }
