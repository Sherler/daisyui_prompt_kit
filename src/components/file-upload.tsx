'use client'

import { cn } from '@/utils/cn'
import React, { createContext, useContext, useRef, useState } from 'react'

type FileUploadContextType = {
  isDragging: boolean
  setIsDragging: (value: boolean) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

const FileUploadContext = createContext<FileUploadContextType>({
  isDragging: false,
  setIsDragging: () => {},
  inputRef: { current: null },
})

function useFileUpload() {
  return useContext(FileUploadContext)
}

export type FileUploadProps = {
  onFilesAdded: (files: File[]) => void
  children: React.ReactNode
  multiple?: boolean
  accept?: string
  className?: string
}

function FileUpload({
  onFilesAdded,
  children,
  multiple = true,
  accept,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFilesAdded(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onFilesAdded(files)
    }
    e.target.value = ''
  }

  return (
    <FileUploadContext.Provider value={{ isDragging, setIsDragging, inputRef }}>
      <div
        className={cn('relative', className)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
        />
        {children}
      </div>
    </FileUploadContext.Provider>
  )
}

export type FileUploadTriggerProps = {
  asChild?: boolean
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

function FileUploadTrigger({
  asChild,
  className,
  children,
  onClick,
  ...props
}: FileUploadTriggerProps) {
  const { inputRef } = useFileUpload()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.click()
    onClick?.(e)
  }

  if (asChild) {
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }

  return (
    <button type="button" className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export type FileUploadContentProps = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

function FileUploadContent({ className, children, ...props }: FileUploadContentProps) {
  const { isDragging } = useFileUpload()

  return (
    <div
      className={cn(
        'transition-all duration-200',
        isDragging && 'bg-primary/10 border-primary border-2 border-dashed rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { FileUpload, FileUploadTrigger, FileUploadContent }
