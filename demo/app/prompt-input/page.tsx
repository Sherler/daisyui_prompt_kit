'use client'

import { useRef, useState } from 'react'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

export default function PromptInputPage() {
  const [basicValue, setBasicValue] = useState('')
  const [basicLoading, setBasicLoading] = useState(false)
  const [advancedValue, setAdvancedValue] = useState('')
  const [advancedLoading, setAdvancedLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const uploadInputRef = useRef<HTMLInputElement>(null)

  const handleBasicSubmit = () => {
    if (!basicValue.trim()) return
    setBasicLoading(true)
    setTimeout(() => {
      setBasicLoading(false)
      setBasicValue('')
    }, 2000)
  }

  const handleAdvancedSubmit = () => {
    if (!advancedValue.trim() && files.length === 0) return
    setAdvancedLoading(true)
    setTimeout(() => {
      setAdvancedLoading(false)
      setAdvancedValue('')
      setFiles([])
    }, 2000)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    setFiles((current) => [...current, ...Array.from(files)])
  }

  const handleRemoveFile = (index: number) => {
    setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))
    if (uploadInputRef.current) {
      uploadInputRef.current.value = ''
    }
  }

  return (
    <PageShell
      title="Prompt Input"
      description="An AI input that allows users to enter and submit text to an AI model."
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-base-content/70">Prompt Input basic</p>
        <PromptInput
          value={basicValue}
          onValueChange={setBasicValue}
          isLoading={basicLoading}
          onSubmit={handleBasicSubmit}
          className="w-full max-w-(--breakpoint-md)"
        >
          <PromptInputTextarea placeholder="Ask me anything..." />
          <PromptInputActions className="justify-end pt-2">
            <PromptInputAction tooltip={basicLoading ? 'Stop generation' : 'Send message'}>
              <button
                type="button"
                className="btn btn-primary btn-sm h-8 w-8 rounded-full p-0"
                onClick={handleBasicSubmit}
              >
                {basicLoading ? (
                  <span className="icon-[lucide--square] size-4 fill-current" />
                ) : (
                  <span className="icon-[lucide--arrow-up] size-4" />
                )}
              </button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-base-content/70">Prompt Input with actions</p>
        <PromptInput
          value={advancedValue}
          onValueChange={setAdvancedValue}
          isLoading={advancedLoading}
          onSubmit={handleAdvancedSubmit}
          className="w-full max-w-(--breakpoint-md)"
        >
          {files.length > 0 ? (
            <div className="flex flex-wrap gap-2 pb-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-content"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span className="icon-[lucide--paperclip] size-4" />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <button
                    type="button"
                    className="rounded-full p-1 transition-colors hover:bg-secondary-content/10"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <span className="icon-[lucide--x] size-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <PromptInputTextarea placeholder="Ask me anything..." />

          <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
            <PromptInputAction tooltip="Attach files">
              <label
                htmlFor="prompt-input-upload"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl transition-colors hover:bg-base-200"
              >
                <input
                  id="prompt-input-upload"
                  ref={uploadInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="icon-[lucide--paperclip] size-5 text-primary" />
              </label>
            </PromptInputAction>

            <PromptInputAction tooltip={advancedLoading ? 'Stop generation' : 'Send message'}>
              <button
                type="button"
                className="btn btn-primary btn-sm h-8 w-8 rounded-full p-0"
                onClick={handleAdvancedSubmit}
              >
                {advancedLoading ? (
                  <span className="icon-[lucide--square] size-4 fill-current" />
                ) : (
                  <span className="icon-[lucide--arrow-up] size-4" />
                )}
              </button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </PageShell>
  )
}
