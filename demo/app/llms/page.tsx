import fs from 'fs'
import path from 'path'
import { LlmsContent } from './_content'

export default function LlmsPage() {
  const content = fs.readFileSync(
    path.join(process.cwd(), '..', 'llms-full.txt'),
    'utf-8'
  )
  return <LlmsContent content={content} />
}
