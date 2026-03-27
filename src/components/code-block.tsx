'use client'

import { cn } from '@/utils/cn'
import React, { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

function getPreferredCodeTheme() {
  if (typeof window === 'undefined') {
    return 'github-light'
  }

  const root = document.documentElement
  const explicitTheme = root.getAttribute('data-theme')
  const colorScheme = getComputedStyle(root).colorScheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark = explicitTheme === 'dark' || colorScheme === 'dark' || prefersDark

  return isDark ? 'github-dark' : 'github-light'
}

export type CodeBlockProps = {
  children?: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'not-prose flex w-full flex-col overflow-clip rounded-xl border border-base-300 bg-base-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
  code,
  language = 'tsx',
  theme,
  className,
  ...props
}: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const [resolvedTheme, setResolvedTheme] = useState(theme ?? 'github-light')

  useEffect(() => {
    if (theme) {
      setResolvedTheme(theme)
      return undefined
    }

    const updateTheme = () => {
      setResolvedTheme(getPreferredCodeTheme())
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class', 'style'],
    })

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener?.('change', updateTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener?.('change', updateTheme)
    }
  }, [theme])

  useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml('<pre><code></code></pre>')
        return
      }

      const html = await codeToHtml(code, {
        lang: language,
        theme: resolvedTheme,
      })
      setHighlightedHtml(html)
    }
    highlight()
  }, [code, language, resolvedTheme])

  const classNames = cn(
    'w-full overflow-x-auto text-[13px] [&>pre]:m-0 [&>pre]:px-4 [&>pre]:py-4 [&_.shiki]:m-0 [&_.shiki]:min-w-full',
    className
  )

  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({ children, className, ...props }: CodeBlockGroupProps) {
  return (
    <div
      className={cn('flex items-center justify-between px-4 py-2 border-b border-base-300', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockCopyButtonProps = {
  code: string
  copiedTimeout?: number
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

function CodeBlockCopyButton({
  code,
  copiedTimeout = 2000,
  className,
  ...props
}: CodeBlockCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), copiedTimeout)
  }

  return (
    <button
      type="button"
      className={cn('btn btn-ghost btn-xs', className)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      {...props}
    >
      {copied ? (
        <span className="icon-[lucide--check] size-3.5 text-success" aria-hidden="true" />
      ) : (
        <span className="icon-[lucide--copy] size-3.5" aria-hidden="true" />
      )}
    </button>
  )
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock, CodeBlockCopyButton }
