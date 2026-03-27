'use client'

import { useState } from 'react'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageContent,
} from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

export default function MessagePage() {
  const [liked, setLiked] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      'I can help with a variety of tasks:\n\n- Answering questions\n- Providing information\n- Assisting with coding\n- Generating creative content\n\nWhat would you like help with today?'
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageShell
      title="Message"
      description="A component for displaying messages with avatars, markdown content, and interactive actions."
    >
      <div className="flex flex-col gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-base-content/70">Message basic</p>
          <div className="flex flex-col gap-8">
            <Message variant="user">
              <MessageContent variant="user">Hello! How can I help you today?</MessageContent>
            </Message>

            <Message variant="assistant">
              <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
              <MessageContent variant="assistant" markdown>
                I can help with a variety of tasks: answering questions, providing information,
                assisting with coding, generating creative content. What would you like help
                with today?
              </MessageContent>
            </Message>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-base-content/70">Message with actions</p>
          <div className="flex flex-col gap-8">
            <Message variant="user">
              <MessageContent variant="user">Hello! How can I help you today?</MessageContent>
            </Message>

            <Message variant="assistant">
              <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
              <div className="flex w-full flex-col gap-2">
                <MessageContent variant="assistant" markdown>
                  I can help with a variety of tasks: - Answering questions - Providing
                  information - Assisting with coding - Generating creative content What would
                  you like help with today?
                </MessageContent>
                <MessageActions className="self-end">
                  <MessageAction tooltip="Copy to clipboard">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm h-8 w-8 rounded-full p-0"
                      onClick={handleCopy}
                    >
                      <span
                        className={`icon-[lucide--copy] size-4 ${copied ? 'text-success' : ''}`}
                      />
                    </button>
                  </MessageAction>
                  <MessageAction tooltip="Helpful">
                    <button
                      type="button"
                      className={`btn btn-ghost btn-sm h-8 w-8 rounded-full p-0 ${liked === true ? 'bg-success/10 text-success' : ''}`}
                      onClick={() => setLiked(true)}
                    >
                      <span className="icon-[lucide--thumbs-up] size-4" />
                    </button>
                  </MessageAction>
                  <MessageAction tooltip="Not helpful">
                    <button
                      type="button"
                      className={`btn btn-ghost btn-sm h-8 w-8 rounded-full p-0 ${liked === false ? 'bg-error/10 text-error' : ''}`}
                      onClick={() => setLiked(false)}
                    >
                      <span className="icon-[lucide--thumbs-down] size-4" />
                    </button>
                  </MessageAction>
                </MessageActions>
              </div>
            </Message>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-base-content/70">Message with markdown</p>
          <Message>
            <MessageAvatar src="https://github.com/ibelick.png" alt="Ibelick" />
            <MessageContent markdown className="prose-h2:mt-0 prose-h2:scroll-m-0">
              {`## Hello World!

This message supports **bold text**, *italics*, and other Markdown features:

- Bullet points
- Code blocks
- [Links](https://example.com)

\`\`\`js
// Even code with syntax highlighting
function hello() {
  return "world";
}
\`\`\`
`}
            </MessageContent>
          </Message>
        </div>
      </div>
    </PageShell>
  )
}
