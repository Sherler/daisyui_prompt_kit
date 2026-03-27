export type MenuItem = {
  id: string
  label: string
  href: string
}

export type MenuGroup = {
  group: string
  items: MenuItem[]
}

export const MENU: MenuGroup[] = [
  {
    group: 'Input',
    items: [
      { id: 'prompt-input', label: 'Prompt Input', href: '/prompt-input' },
      { id: 'prompt-suggestion', label: 'Prompt Suggestion', href: '/prompt-suggestion' },
      { id: 'file-upload', label: 'File Upload', href: '/file-upload' },
    ],
  },
  {
    group: 'Message',
    items: [
      { id: 'message', label: 'Message', href: '/message' },
      { id: 'chat-container', label: 'Chat Container', href: '/chat-container' },
      { id: 'scroll-button', label: 'Scroll Button', href: '/scroll-button' },
      { id: 'response-stream', label: 'Response Stream', href: '/response-stream' },
      { id: 'markdown', label: 'Markdown', href: '/markdown' },
      { id: 'code-block', label: 'Code Block', href: '/code-block' },
      { id: 'image', label: 'Image', href: '/image' },
      { id: 'jsx-preview', label: 'JSX Preview', href: '/jsx-preview' },
    ],
  },
  {
    group: 'Agent',
    items: [
      { id: 'reasoning', label: 'Reasoning', href: '/reasoning' },
      { id: 'chain-of-thought', label: 'Chain of Thought', href: '/chain-of-thought' },
      { id: 'steps', label: 'Steps', href: '/steps' },
      { id: 'tool', label: 'Tool', href: '/tool' },
      { id: 'source', label: 'Source', href: '/source' },
    ],
  },
  {
    group: 'Feedback',
    items: [
      { id: 'feedback-bar', label: 'Feedback Bar', href: '/feedback-bar' },
      { id: 'system-message', label: 'System Message', href: '/system-message' },
    ],
  },
  {
    group: 'Effect',
    items: [
      { id: 'loader', label: 'Loader', href: '/loader' },
      { id: 'text-shimmer', label: 'Text Shimmer', href: '/text-shimmer' },
      { id: 'thinking-bar', label: 'Thinking Bar', href: '/thinking-bar' },
    ],
  },
  {
    group: 'Docs',
    items: [
      { id: 'llms', label: 'LLM Documentation', href: '/llms' },
    ],
  },
]

export function findMenuItem(pathname: string) {
  for (const group of MENU) {
    for (const item of group.items) {
      if (item.href === pathname) return item
    }
  }
  return null
}
