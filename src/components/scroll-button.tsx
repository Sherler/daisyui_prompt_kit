'use client'

import { cn } from '@/utils/cn'
import { useStickToBottomContext } from 'use-stick-to-bottom'

export type ScrollButtonProps = {
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'xs' | 'sm' | 'md'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function ScrollButton({
  className,
  variant = 'ghost',
  size = 'sm',
  onClick,
  ...props
}: ScrollButtonProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
  }

  const variantClasses = {
    default: 'btn',
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-ghost',
  }

  return (
    <button
      type="button"
      className={cn(
        'btn-circle transition-all duration-150 ease-out shadow-lg',
        sizeClasses[size],
        variantClasses[variant],
        !isAtBottom
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-95 opacity-0',
        className
      )}
      onClick={(event) => {
        scrollToBottom()
        onClick?.(event)
      }}
      {...props}
    >
      <span className="icon-[lucide--chevron-down] h-5 w-5" aria-hidden="true" />
    </button>
  )
}

export { ScrollButton }
