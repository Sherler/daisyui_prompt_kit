'use client'

import { cn } from '@/utils/cn'
import { memo } from 'react'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock, CodeBlockCode } from './code-block'

export type MarkdownProps = {
  children: string
  id?: string
  className?: string
  components?: Partial<Components>
}

function extractLanguage(className?: string): string {
  if (!className) return 'plaintext'
  const match = className.match(/language-(\w+)/)
  return match ? match[1] : 'plaintext'
}

const INITIAL_COMPONENTS: Partial<Components> = {
  code: function CodeComponent({ className, children, ...props }) {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line

    if (isInline) {
      return (
        <span
          className={cn(
            'bg-base-200 rounded-sm px-1 font-mono text-sm',
            className
          )}
          {...props}
        >
          {children}
        </span>
      )
    }

    const language = extractLanguage(className)

    return (
      <CodeBlock className={className}>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    )
  },
  pre: function PreComponent({ children }) {
    return <>{children}</>
  },
}

const DEFAULT_PROSE_CLASSES =
  'prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs max-w-none'

const MarkdownComponent = ({
  children,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) => {
  return (
    <div className={cn(DEFAULT_PROSE_CLASSES, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

const Markdown = memo(MarkdownComponent)
Markdown.displayName = 'Markdown'

export { Markdown }
