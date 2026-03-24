'use client'

import { cn } from '@/utils/cn'
import { useStickToBottomContext } from 'use-stick-to-bottom'
import { ChevronDown } from 'lucide-react'

export type ScrollButtonProps = {
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'xs' | 'sm' | 'md'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function ScrollButton({
  className,
  variant = 'ghost',
  size = 'sm',
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
      onClick={() => scrollToBottom()}
      {...props}
    >
      <ChevronDown className="h-5 w-5" />
    </button>
  )
}

export { ScrollButton }
