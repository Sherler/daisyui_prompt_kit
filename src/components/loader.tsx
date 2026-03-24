'use client'

import { cn } from '@/utils/cn'
import React from 'react'

export interface LoaderProps {
  variant?: 'circular' | 'classic' | 'pulse' | 'pulse-dot' | 'dots' | 'typing' | 'wave' | 'bars' | 'terminal' | 'text-blink' | 'text-shimmer' | 'loading-dots'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function CircularLoader({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-4 h-4 border-2', md: 'w-5 h-5 border-2', lg: 'w-6 h-6 border-[3px]' }
  return (
    <div className={cn('border-primary rounded-full border-t-transparent animate-spin', sizeClasses[size], className)}>
      <span className="sr-only">Loading</span>
    </div>
  )
}

export function DotsLoader({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const dotSizes = { sm: 'h-1.5 w-1.5', md: 'h-2 w-2', lg: 'h-2.5 w-2.5' }
  const containerSizes = { sm: 'h-4', md: 'h-5', lg: 'h-6' }
  return (
    <div className={cn('flex items-center space-x-1', containerSizes[size], className)}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={cn('bg-primary animate-bounce-dots rounded-full', dotSizes[size])} style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </div>
  )
}

export function TypingLoader({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const dotSizes = { sm: 'h-1 w-1', md: 'h-1.5 w-1.5', lg: 'h-2 w-2' }
  const containerSizes = { sm: 'h-4', md: 'h-5', lg: 'h-6' }
  return (
    <div className={cn('flex items-center space-x-1', containerSizes[size], className)}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={cn('bg-primary animate-typing rounded-full', dotSizes[size])} style={{ animationDelay: `${i * 250}ms` }} />
      ))}
    </div>
  )
}

export function WaveLoader({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const barWidths = { sm: 'w-0.5', md: 'w-0.5', lg: 'w-1' }
  const containerSizes = { sm: 'h-4', md: 'h-5', lg: 'h-6' }
  const heights = { sm: ['6px', '9px', '12px', '9px', '6px'], md: ['8px', '12px', '16px', '12px', '8px'], lg: ['10px', '15px', '20px', '15px', '10px'] }
  return (
    <div className={cn('flex items-center gap-0.5', containerSizes[size], className)}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={cn('bg-primary animate-wave rounded-full', barWidths[size])} style={{ animationDelay: `${i * 100}ms`, height: heights[size][i] }} />
      ))}
    </div>
  )
}

function Loader({ variant = 'circular', size = 'md', text, className }: LoaderProps) {
  switch (variant) {
    case 'circular': return <CircularLoader size={size} className={className} />
    case 'dots': return <DotsLoader size={size} className={className} />
    case 'typing': return <TypingLoader size={size} className={className} />
    case 'wave': return <WaveLoader size={size} className={className} />
    default: return <CircularLoader size={size} className={className} />
  }
}

export { Loader }
