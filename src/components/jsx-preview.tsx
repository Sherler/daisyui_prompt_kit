'use client'

import { cn } from '@/utils/cn'
import JsxParser from 'react-jsx-parser'

export type JSXPreviewProps = {
  jsx: string
  isStreaming?: boolean
  className?: string
}

function completeJsxTags(jsx: string): string {
  // Simple tag completion for streaming content
  const openTags: string[] = []
  const tagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*?\/?>/g
  let match

  while ((match = tagRegex.exec(jsx)) !== null) {
    const [fullMatch, isClosing, tagName] = match
    const isSelfClosing = fullMatch.endsWith('/>')

    if (isSelfClosing) continue

    if (isClosing) {
      const lastIndex = openTags.lastIndexOf(tagName)
      if (lastIndex !== -1) {
        openTags.splice(lastIndex, 1)
      }
    } else {
      openTags.push(tagName)
    }
  }

  // Close remaining open tags in reverse order
  const closingTags = openTags
    .slice()
    .reverse()
    .map((tag) => `</${tag}>`)
    .join('')

  return jsx + closingTags
}

function JSXPreview({ jsx, isStreaming = false, className }: JSXPreviewProps) {
  const processedJsx = isStreaming ? completeJsxTags(jsx) : jsx

  return (
    <div className={cn('jsx-preview', className)}>
      <JsxParser jsx={processedJsx} />
    </div>
  )
}

export { JSXPreview }
