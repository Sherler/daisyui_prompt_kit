'use client'

import { Markdown } from '@daisyui/prompt-kit'

export function LlmsContent({ content }: { content: string }) {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-base-content text-2xl font-bold tracking-tight lg:text-3xl">
            LLM Documentation
          </h1>
          <p className="text-base-content/60 text-sm">
            Full component reference for AI coding assistants (llms-full.txt).
          </p>
        </div>
        <a href="/api/llms" className="btn btn-primary btn-sm shrink-0">
          <span className="icon-[lucide--download] size-4" />
          Download
        </a>
      </div>
      <article className="card card-border bg-base-100 overflow-hidden">
        <div className="p-6 lg:p-8">
          <Markdown>{content}</Markdown>
        </div>
      </article>
    </div>
  )
}
