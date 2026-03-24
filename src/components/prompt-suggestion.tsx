'use client'

import { cn } from '@/utils/cn'

export type PromptSuggestionProps = {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  highlight?: string
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function PromptSuggestion({
  children,
  variant = 'outline',
  size = 'md',
  highlight,
  className,
  ...props
}: PromptSuggestionProps) {
  const sizeClasses = {
    sm: 'btn-sm text-xs',
    md: 'text-sm',
    lg: 'btn-lg text-base',
  }

  const variantClasses = {
    default: 'btn',
    outline: 'btn btn-outline border-base-300',
    ghost: 'btn btn-ghost',
  }

  // Highlight mode
  if (highlight) {
    const text = children as string
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

    return (
      <button
        type="button"
        className={cn(
          'btn btn-ghost btn-sm justify-start text-left h-auto py-2 px-3',
          className
        )}
        {...props}
      >
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-primary font-medium">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        'rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { PromptSuggestion }
