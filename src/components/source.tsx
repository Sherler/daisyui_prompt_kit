'use client'

import { cn } from '@/utils/cn'

export type SourceProps = {
  href: string
  children: React.ReactNode
  className?: string
}

function Source({ href, children, className }: SourceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('group relative inline-block', className)}
    >
      {children}
    </a>
  )
}

export type SourceTriggerProps = {
  label: string
  showFavicon?: boolean
  className?: string
}

function SourceTrigger({ label, showFavicon = false, className }: SourceTriggerProps) {
  const domain = label.startsWith('http') ? new URL(label).hostname : label

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-base-200 hover:bg-base-300 transition-colors',
        'text-sm text-base-content/80',
        className
      )}
    >
      {showFavicon && (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
          alt=""
          className="w-4 h-4"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <span className="truncate max-w-[200px]">{domain}</span>
    </div>
  )
}

export type SourceContentProps = {
  title: string
  description?: string
  className?: string
}

function SourceContent({ title, description, className }: SourceContentProps) {
  return (
    <div
      className={cn(
        'absolute z-50 w-64 p-3 rounded-lg shadow-lg',
        'bg-base-100 border border-base-300',
        'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
        'transition-all duration-200',
        'bottom-full mb-2 left-1/2 -translate-x-1/2',
        className
      )}
    >
      <div className="font-medium text-sm mb-1 line-clamp-2">{title}</div>
      {description && (
        <div className="text-xs text-base-content/70 line-clamp-3">{description}</div>
      )}
    </div>
  )
}

export { Source, SourceTrigger, SourceContent }
