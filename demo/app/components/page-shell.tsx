'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockCopyButton,
  CodeBlockGroup,
} from '@daisyui/prompt-kit'

export function PageShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [source, setSource] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const slug = pathname.slice(1)

  const handleViewCode = async () => {
    setTab('code')
    if (!source) {
      setLoading(true)
      try {
        const res = await fetch(`/api/source/${encodeURIComponent(slug)}`)
        if (res.ok) {
          const data = await res.json()
          setSource(data.source)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col items-start space-y-1">
        <h1 className="text-base-content text-2xl font-bold tracking-tight lg:text-3xl">
          {title}
        </h1>
        <p className="text-base-content/60 max-w-lg text-sm">{description}</p>
      </div>

      <div className="card card-border bg-base-100">
        <div className="bg-base-200/30 border-base-300 flex items-center gap-1 border-b px-4 py-2">
          <button
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === 'preview'
                ? 'bg-base-100 text-base-content shadow-sm'
                : 'text-base-content/50 hover:text-base-content'
            }`}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
          <button
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === 'code'
                ? 'bg-base-100 text-base-content shadow-sm'
                : 'text-base-content/50 hover:text-base-content'
            }`}
            onClick={handleViewCode}
          >
            Code
          </button>
        </div>

        {tab === 'preview' ? (
          <div className="flex flex-col gap-4 p-6">{children}</div>
        ) : loading ? (
          <div className="flex items-center justify-center p-12">
            <span className="loading loading-spinner loading-md" />
          </div>
        ) : source ? (
          <div className="max-h-[600px] overflow-auto">
            <CodeBlock className="rounded-none border-0">
              <CodeBlockGroup>
                <span className="text-base-content/50 text-xs">page.tsx</span>
                <CodeBlockCopyButton code={source} />
              </CodeBlockGroup>
              <CodeBlockCode code={source} language="tsx" />
            </CodeBlock>
          </div>
        ) : (
          <div className="p-6 text-sm text-base-content/50">
            Source code unavailable.
          </div>
        )}
      </div>
    </div>
  )
}
