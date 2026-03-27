import fs from 'fs'
import path from 'path'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  // Validate slug to prevent path traversal
  if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'app', slug, 'page.tsx')

  try {
    const source = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ source })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
