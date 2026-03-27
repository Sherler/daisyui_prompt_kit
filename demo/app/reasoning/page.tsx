'use client'

import { useState } from 'react'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

const reasoningText = `I calculated the best color balance for the image:

1. First, I analyzed the color of the car - a deep blue metallic finish
2. Then, I examined the color of the sky - overcast with neutral tones
3. Next, I considered the color of the grass - vibrant green in the foreground
4. I calculated the optimal white balance to enhance all elements
5. Applied selective color adjustments to maintain natural appearance
6. Final result: improved contrast and color harmony`

export default function ReasoningPage() {
  const [text, setText] = useState('')
  const [markdownText, setMarkdownText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isMarkdownStreaming, setIsMarkdownStreaming] = useState(false)

  const handleGenerate = async () => {
    setIsStreaming(true)
    setText('')
    for (let i = 0; i <= reasoningText.length; i++) {
      setText(reasoningText.slice(0, i))
      await new Promise((r) => setTimeout(r, 20))
    }
    setIsStreaming(false)
  }

  const markdownReasoning = `# Solving: Square Root of 144

## Step 1: Problem Analysis
I need to find a number that, when **multiplied by itself**, equals 144.

## Step 2: Testing Values
- \`10² = 100\` ❌ (too small)
- \`13² = 169\` ❌ (too large)
- \`12² = 144\` ✅ (perfect!)

## Step 3: Verification
\`\`\`
12 × 12 = 144 ✓
\`\`\`

> **Answer:** The square root of 144 is **12**.`

  const handleGenerateMarkdown = async () => {
    setIsMarkdownStreaming(true)
    setMarkdownText('')
    for (let i = 0; i <= markdownReasoning.length; i++) {
      setMarkdownText(markdownReasoning.slice(0, i))
      await new Promise((r) => setTimeout(r, 20))
    }
    setIsMarkdownStreaming(false)
  }

  return (
    <PageShell
      title="Reasoning"
      description="A collapsible reasoning trace display with markdown support."
    >
      <div className="space-y-4">
        <p className="text-sm font-medium text-base-content/70">Basic reasoning</p>
        <button className="btn btn-sm btn-outline w-fit" onClick={handleGenerate} disabled={isStreaming}>
          {isStreaming ? 'Generating...' : 'Generate Reasoning'}
        </button>

        <Reasoning isStreaming={isStreaming}>
          <ReasoningTrigger>Show reasoning</ReasoningTrigger>
          <ReasoningContent>
            {text}
          </ReasoningContent>
        </Reasoning>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-base-content/70">Markdown reasoning</p>
        <button
          className="btn btn-sm btn-outline w-fit"
          onClick={handleGenerateMarkdown}
          disabled={isMarkdownStreaming}
        >
          {isMarkdownStreaming ? 'Thinking...' : 'Generate Reasoning'}
        </button>

        <Reasoning isStreaming={isMarkdownStreaming}>
          <ReasoningTrigger>Show AI reasoning</ReasoningTrigger>
          <ReasoningContent markdown>
            {markdownText}
          </ReasoningContent>
        </Reasoning>
      </div>
    </PageShell>
  )
}
