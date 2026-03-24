'use client'

import { useTextStream, type TextStreamMode } from '@/hooks/useTextStream'
import { useEffect } from 'react'

export type ResponseStreamProps = {
  textStream: string | AsyncIterable<string>
  mode?: TextStreamMode
  speed?: number
  className?: string
  onComplete?: () => void
  fadeDuration?: number
  segmentDelay?: number
  characterChunkSize?: number
}

function ResponseStream({
  textStream,
  mode = 'typewriter',
  speed = 20,
  className,
  onComplete,
  fadeDuration,
  segmentDelay,
  characterChunkSize,
}: ResponseStreamProps) {
  const { displayedText, segments, startStreaming } = useTextStream({
    textStream,
    speed,
    mode,
    onComplete,
    fadeDuration,
    segmentDelay,
    characterChunkSize,
  })

  useEffect(() => {
    startStreaming()
  }, [startStreaming])

  if (mode === 'fade') {
    return (
      <div className={className}>
        {segments.map((segment, index) => (
          <span
            key={index}
            className="inline-block animate-fade-in"
            style={{
              animationDelay: `${index * (segmentDelay || 50)}ms`,
              animationFillMode: 'both',
            }}
          >
            {segment.text}
          </span>
        ))}
      </div>
    )
  }

  return <div className={className}>{displayedText}</div>
}

export { ResponseStream }
