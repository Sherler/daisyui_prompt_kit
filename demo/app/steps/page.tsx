'use client'

import {
  Source,
  SourceContent,
  SourceTrigger,
  Steps,
  StepsBar,
  StepsContent,
  StepsItem,
  StepsTrigger,
  TextShimmerLoader,
} from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

export default function StepsPage() {
  return (
    <PageShell
      title="Steps"
      description="Displays a sequence of operations in a collapsible layout. Each step can include details and an optional vertical bar. Useful for showing AI steps like reasoning traces, tool calls, or process logs."
    >
      {/* Steps basic */}
      <p className="text-base-content/50 text-xs font-medium">Steps basic</p>
      <Steps defaultOpen>
        <StepsTrigger>Agent run: Summarize repository</StepsTrigger>
        <StepsContent>
          <div className="space-y-1">
            <StepsItem>Searching files in repo...</StepsItem>
            <StepsItem>Found 12 files (src, docs)</StepsItem>
            <StepsItem>Parsing markdown and code blocks</StepsItem>
            <StepsItem>Selecting tool: summarize</StepsItem>
            <StepsItem>Running summarize(tool) with top 5 files</StepsItem>
            <StepsItem className="text-base-content">Summary generated</StepsItem>
          </div>
        </StepsContent>
      </Steps>

      {/* Steps with sources */}
      <p className="text-base-content/50 text-xs font-medium">Steps with sources</p>
      <Steps defaultOpen>
        <StepsTrigger>Web search: modern LLM UI patterns</StepsTrigger>
        <StepsContent>
          <div className="space-y-2">
            <StepsItem>Searching across curated sources...</StepsItem>
            <StepsItem>Top matches</StepsItem>
            <div className="flex flex-wrap gap-1.5">
              <Source href="https://prompt-kit.com/docs">
                <SourceTrigger label="prompt-kit.com/docs" showFavicon />
                <SourceContent
                  title="Prompt Kit Docs"
                  description="High-quality, accessible, and customizable components for AI interfaces."
                />
              </Source>
              <Source href="https://github.com/ibelick/prompt-kit">
                <SourceTrigger label="github.com/ibelick/prompt-kit" showFavicon />
                <SourceContent
                  title="prompt-kit on GitHub"
                  description="Source code and issues for Prompt Kit."
                />
              </Source>
            </div>
            <StepsItem>Extracting key sections and summarizing…</StepsItem>
          </div>
        </StepsContent>
      </Steps>

      {/* Steps with custom icon swap and bar */}
      <p className="text-base-content/50 text-xs font-medium">Steps with custom icon swap and bar</p>
      <Steps defaultOpen>
        <StepsTrigger
          leftIcon={
            <span className="icon-[lucide--hammer] size-4" aria-hidden="true" />
          }
        >
          Tool run: build index
        </StepsTrigger>
        <StepsContent bar={<StepsBar className="mr-2 ml-1.5" />}>
          <div className="space-y-1">
            <StepsItem>Initializing build context</StepsItem>
            <StepsItem>Scanning 25 markdown files</StepsItem>
            <StepsItem>Generating embeddings (chunk size: 1,024)</StepsItem>
            <StepsItem className="text-base-content">Index created</StepsItem>
          </div>
        </StepsContent>
      </Steps>

      {/* Steps with Text Shimmer Loader */}
      <p className="text-base-content/50 text-xs font-medium">Steps with Text Shimmer Loader</p>
      <Steps defaultOpen>
        <StepsTrigger>
          <TextShimmerLoader text="Ensuring all files are included" size="md" />
        </StepsTrigger>
        <StepsContent>
          <div className="space-y-1">
            <StepsItem>Planning next actions…</StepsItem>
            <StepsItem>Searching repository files…</StepsItem>
            <StepsItem>Parsing and extracting key sections…</StepsItem>
            <StepsItem className="text-base-content">Ready to respond</StepsItem>
          </div>
        </StepsContent>
      </Steps>

      {/* Multiple steps */}
      <p className="text-base-content/50 text-xs font-medium">Multiple steps</p>
      <div className="flex flex-col gap-2">
        <Steps defaultOpen>
          <StepsTrigger>Analyzing repository structure</StepsTrigger>
          <StepsContent>
            <div className="space-y-1">
              <StepsItem>Found 12 component files in src/components/</StepsItem>
              <StepsItem>Detected TypeScript configuration</StepsItem>
            </div>
          </StepsContent>
        </Steps>
        <Steps defaultOpen={false}>
          <StepsTrigger>Applying code changes</StepsTrigger>
          <StepsContent>
            <div className="space-y-1">
              <StepsItem>Updated 3 files with new imports</StepsItem>
              <StepsItem>Refactored utility functions</StepsItem>
              <StepsItem>Added unit tests for new features</StepsItem>
            </div>
          </StepsContent>
        </Steps>
        <Steps defaultOpen={false}>
          <StepsTrigger>Running verification</StepsTrigger>
          <StepsContent>
            <div className="space-y-1">
              <StepsItem>All 42 tests passed</StepsItem>
              <StepsItem className="text-base-content">Build completed successfully</StepsItem>
            </div>
          </StepsContent>
        </Steps>
      </div>
    </PageShell>
  )
}
