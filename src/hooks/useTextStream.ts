'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type TextStreamMode = 'typewriter' | 'fade'

export interface UseTextStreamOptions {
  textStream: string | AsyncIterable<string>
  speed?: number
  mode?: TextStreamMode
  onComplete?: () => void
  fadeDuration?: number
  segmentDelay?: number
  characterChunkSize?: number
  onError?: (error: unknown) => void
}

export interface UseTextStreamReturn {
  displayedText: string
  isComplete: boolean
  segments: { text: string; index: number }[]
  getFadeDuration: () => number
  getSegmentDelay: () => number
  reset: () => void
  startStreaming: () => void
  pause: () => void
  resume: () => void
}

export function useTextStream({
  textStream,
  speed = 20,
  mode = 'typewriter',
  onComplete,
  fadeDuration,
  segmentDelay,
  characterChunkSize,
  onError,
}: UseTextStreamOptions): UseTextStreamReturn {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [segments, setSegments] = useState<{ text: string; index: number }[]>([])
  const [isPaused, setIsPaused] = useState(false)
  
  const animationRef = useRef<number>()
  const textRef = useRef('')
  const currentIndexRef = useRef(0)

  const calculatedChunkSize = characterChunkSize ?? Math.max(1, Math.floor(speed / 5))
  const calculatedFadeDuration = fadeDuration ?? Math.max(200, 1000 - speed * 8)
  const calculatedSegmentDelay = segmentDelay ?? Math.max(50, 300 - speed * 2)

  const getFadeDuration = useCallback(() => calculatedFadeDuration, [calculatedFadeDuration])
  const getSegmentDelay = useCallback(() => calculatedSegmentDelay, [calculatedSegmentDelay])

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setDisplayedText('')
    setIsComplete(false)
    setSegments([])
    textRef.current = ''
    currentIndexRef.current = 0
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const startStreaming = useCallback(async () => {
    reset()
    
    try {
      let fullText = ''
      
      if (typeof textStream === 'string') {
        fullText = textStream
      } else {
        for await (const chunk of textStream) {
          fullText += chunk
          if (!isPaused) {
            textRef.current = fullText
          }
        }
      }
      
      textRef.current = fullText
      
      if (mode === 'typewriter') {
        const animate = () => {
          if (isPaused) {
            animationRef.current = requestAnimationFrame(animate)
            return
          }
          
          const remaining = textRef.current.slice(currentIndexRef.current)
          const chunk = remaining.slice(0, calculatedChunkSize)
          
          if (chunk) {
            currentIndexRef.current += chunk.length
            setDisplayedText(textRef.current.slice(0, currentIndexRef.current))
            animationRef.current = requestAnimationFrame(animate)
          } else {
            setIsComplete(true)
            onComplete?.()
          }
        }
        
        animationRef.current = requestAnimationFrame(animate)
      } else if (mode === 'fade') {
        // For fade mode, split into words/segments
        const words = fullText.split(/(\s+)/)
        const newSegments = words.map((text, index) => ({ text, index }))
        setSegments(newSegments)
        
        let currentSegment = 0
        const showNextSegment = () => {
          if (isPaused) {
            setTimeout(showNextSegment, calculatedSegmentDelay)
            return
          }
          
          if (currentSegment < newSegments.length) {
            setDisplayedText(prev => prev + newSegments[currentSegment].text)
            currentSegment++
            setTimeout(showNextSegment, calculatedSegmentDelay)
          } else {
            setIsComplete(true)
            onComplete?.()
          }
        }
        
        showNextSegment()
      }
    } catch (error) {
      onError?.(error)
    }
  }, [textStream, mode, calculatedChunkSize, calculatedSegmentDelay, isPaused, onComplete, onError, reset])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    displayedText,
    isComplete,
    segments,
    getFadeDuration,
    getSegmentDelay,
    reset,
    startStreaming,
    pause,
    resume,
  }
}
