'use client'

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockCopyButton,
  CodeBlockGroup,
} from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

const basicCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
greet("World");`

const reactCode = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`

export default function CodeBlockPage() {
  return (
    <PageShell
      title="Code Block"
      description="A component for displaying code snippets with syntax highlighting and customizable styling."
    >
      <p className="text-base-content/50 text-xs font-medium">Basic</p>
      <CodeBlock>
        <CodeBlockCode code={basicCode} language="javascript" />
      </CodeBlock>

      <p className="text-base-content/50 text-xs font-medium">With Header</p>
      <CodeBlock>
        <CodeBlockGroup>
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-box px-2 py-0.5 text-xs font-medium">
              React
            </span>
            <span className="text-base-content/50 text-sm">counter.tsx</span>
          </div>
          <CodeBlockCopyButton code={reactCode} />
        </CodeBlockGroup>
        <CodeBlockCode code={reactCode} language="tsx" />
      </CodeBlock>
    </PageShell>
  )
}
