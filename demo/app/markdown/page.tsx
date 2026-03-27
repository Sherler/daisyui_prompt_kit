'use client'

import { Markdown } from '@daisyui/prompt-kit'
import { PageShell } from '@/app/components/page-shell'

const markdownContent = `
# Markdown Example

This is a **bold text** and this is an *italic text*.

## Lists

### Unordered List
- Item 1
  - Nested item A
  - Nested item B
- Item 2
  - Nested item C
- Item 3

### Ordered List
1. First item
   1. Nested step 1
   2. Nested step 2
2. Second item
3. Third item

### Task List
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Table

| Feature | Description | Status |
|:--------|:------------|:------:|
| Tables | Support for GFM tables | ✅ |
| Math | KaTeX math rendering | ✅ |
| Code | Syntax highlighting | ✅ |
| Lists | Nested lists & task lists | ✅ |

## Math Equations

### Inline Math
The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.

Einstein's mass-energy equivalence: $E = mc^2$

### Block Math

**Quadratic Formula:**
$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

**Summation:**
$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$

**Matrix:**
$$
\\mathbf{A} = \\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{bmatrix}
$$

**Integral:**
$$
\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)
$$

**Fraction:**
$$
\\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2} = 0
$$

## Links and Images

[Visit DaisyUI](https://daisyui.com)

## Code

Inline \`code\` example.

\`\`\`javascript
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`\`\`python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`
`

export default function MarkdownPage() {
  return (
    <PageShell
      title="Markdown"
      description="Renders markdown content with support for GFM, math equations, and code blocks."
    >
      <div className="w-full max-w-3xl">
        <Markdown>{markdownContent}</Markdown>
      </div>
    </PageShell>
  )
}
