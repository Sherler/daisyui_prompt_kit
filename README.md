# @daisyui/prompt-kit

A DaisyUI-native React component library for building AI chat interfaces.

Based on [prompt-kit](https://github.com/ibelick/prompt-kit) by [@ibelick](https://github.com/ibelick), rebuilt with [DaisyUI 5](https://daisyui.com) and Tailwind CSS 4.

## Why

The original prompt-kit uses shadcn/ui and Radix primitives. This version provides the same components using DaisyUI classes and Tailwind utilities, so DaisyUI users can integrate AI chat UI without introducing a second design system.

## Installation

```bash
npm install @daisyui/prompt-kit
# or
pnpm add @daisyui/prompt-kit
```

### Peer Dependencies

**Required** (standard DaisyUI project):

```bash
npm install react react-dom tailwindcss daisyui
```

**Recommended** (for icons and markdown rendering):

```bash
npm install -D @tailwindcss/typography @iconify/tailwind4 @iconify-json/lucide
```

### CSS Setup

Add the necessary plugins to your global CSS file:

```css
@import "tailwindcss";
@plugin "@iconify/tailwind4";
@plugin "@tailwindcss/typography";
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

**Tailwind CSS 4 source scanning:** If some library classes appear missing, add:

```css
@source "../node_modules/@daisyui/prompt-kit/dist/**/*.js";
```

### Usage

```tsx
import {
  ChatContainerRoot,
  ChatContainerContent,
  Message,
  MessageContent,
  PromptInput,
  PromptInputTextarea,
} from '@daisyui/prompt-kit'
```

The package auto-imports its styles (including KaTeX CSS). If your bundler tree-shakes CSS side effects:

```tsx
import '@daisyui/prompt-kit/styles'
```

## Components

21 components for AI chat interfaces:

| Category | Components |
|----------|-----------|
| Input | PromptInput, PromptSuggestion, FileUpload |
| Message | Message, ChatContainer, ScrollButton, ResponseStream, Markdown, CodeBlock, Image, JSXPreview |
| Agent | Reasoning, ChainOfThought, Steps, Tool, Source |
| Feedback | FeedbackBar, SystemMessage |
| Effect | Loader, TextShimmer, ThinkingBar |

## Demo

Run the interactive demo to preview all components:

```bash
cd demo
pnpm install
pnpm dev
```

Opens at [http://localhost:3005](http://localhost:3005).

Each component page has a **Preview / Code** toggle so you can inspect the source directly.

## LLM Documentation

A comprehensive component reference is provided for AI coding assistants:

- **File:** [`llms-full.txt`](./llms-full.txt)
- **In demo:** Navigate to **Docs → LLM Documentation** in the sidebar (includes rendered view and download)

This file describes every exported component, its props, built-in styling, dependency requirements, and integration examples. Feed it to your AI assistant for accurate code generation.

## Credits

- Original [prompt-kit](https://github.com/ibelick/prompt-kit) by [Julien Thibeaut (@ibelick)](https://github.com/ibelick)
- DaisyUI adaptation for the DaisyUI ecosystem
