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
  variant,
  size,
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

  const isHighlightMode = highlight !== undefined && highlight.trim() !== ''
  const content = typeof children === 'string' ? children : ''

  if (!isHighlightMode) {
    return (
      <button
        type="button"
        className={cn(
          'rounded-full',
          variantClasses[variant || 'outline'],
          sizeClasses[size || 'lg'],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (!content) {
    return (
      <button
        type="button"
        className={cn(
          'btn btn-ghost btn-sm h-auto w-full cursor-pointer justify-start rounded-xl py-2 text-left hover:bg-base-200',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }

  const trimmedHighlight = highlight.trim()
  const contentLower = content.toLowerCase()
  const highlightLower = trimmedHighlight.toLowerCase()
  const shouldHighlight = contentLower.includes(highlightLower)

  return (
    <button
      type="button"
      className={cn(
        'btn btn-ghost btn-sm h-auto w-full cursor-pointer justify-start gap-0 rounded-xl py-2 text-left hover:bg-base-200',
        className
      )}
      {...props}
    >
      {shouldHighlight ? (
        (() => {
          const index = contentLower.indexOf(highlightLower)

          if (index === -1) {
            return (
              <span className="text-base-content/70 whitespace-pre-wrap">
                {content}
              </span>
            )
          }

          const actualHighlightedText = content.substring(
            index,
            index + highlightLower.length
          )

          const before = content.substring(0, index)
          const after = content.substring(index + actualHighlightedText.length)

          return (
            <>
              {before && (
                <span className="text-base-content/70 whitespace-pre-wrap">
                  {before}
                </span>
              )}
              <span className="text-primary font-medium whitespace-pre-wrap">
                {actualHighlightedText}
              </span>
              {after && (
                <span className="text-base-content/70 whitespace-pre-wrap">
                  {after}
                </span>
              )}
            </>
          )
        })()
      ) : (
        <span className="text-base-content/70 whitespace-pre-wrap">
          {content}
        </span>
      )}
    </button>
  )
}

export { PromptSuggestion }
