'use client'

import { cn } from '@/utils/cn'
import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

type FileUploadContextValue = {
  isDragging: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  multiple?: boolean
  disabled?: boolean
}

const FileUploadContext = createContext<FileUploadContextValue | null>(null)

export type FileUploadProps = {
  onFilesAdded: (files: File[]) => void
  children: React.ReactNode
  multiple?: boolean
  accept?: string
  disabled?: boolean
}

function FileUpload({
  onFilesAdded,
  children,
  multiple = true,
  accept,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)

  const handleFiles = useCallback(
    (files: FileList) => {
      const newFiles = Array.from(files)
      if (multiple) {
        onFilesAdded(newFiles)
      } else {
        onFilesAdded(newFiles.slice(0, 1))
      }
    },
    [multiple, onFilesAdded],
  )

  useEffect(() => {
    if (disabled) {
      return undefined
    }

    const handleDrag = (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    const handleDragIn = (event: DragEvent) => {
      handleDrag(event)
      dragCounter.current += 1
      if (event.dataTransfer?.items.length) setIsDragging(true)
    }

    const handleDragOut = (event: DragEvent) => {
      handleDrag(event)
      dragCounter.current -= 1
      if (dragCounter.current === 0) setIsDragging(false)
    }

    const handleDrop = (event: DragEvent) => {
      handleDrag(event)
      setIsDragging(false)
      dragCounter.current = 0
      if (event.dataTransfer?.files.length) {
        handleFiles(event.dataTransfer.files)
      }
    }

    window.addEventListener('dragenter', handleDragIn)
    window.addEventListener('dragleave', handleDragOut)
    window.addEventListener('dragover', handleDrag)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragIn)
      window.removeEventListener('dragleave', handleDragOut)
      window.removeEventListener('dragover', handleDrag)
      window.removeEventListener('drop', handleDrop)
    }
  }, [disabled, handleFiles])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      handleFiles(event.target.files)
      event.target.value = ''
    }
  }

  return (
    <FileUploadContext.Provider value={{ isDragging, inputRef, multiple, disabled }}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple={multiple}
        accept={accept}
        aria-hidden
        disabled={disabled}
      />
      {children}
    </FileUploadContext.Provider>
  )
}

export type FileUploadTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean
}

function FileUploadTrigger({
  asChild = false,
  className,
  children,
  ...props
}: FileUploadTriggerProps) {
  const context = useContext(FileUploadContext)

  const handleClick = () => {
    if (!context?.disabled) {
      context?.inputRef.current?.click()
    }
  }

  if (asChild) {
    const child = Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    return cloneElement(child, {
      ...props,
      role: 'button',
      className: cn(className, child.props.className),
      onClick: (event: React.MouseEvent) => {
        event.stopPropagation()
        handleClick()
        child.props.onClick?.(event as React.MouseEvent<HTMLElement>)
      },
    })
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={context?.disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export type FileUploadContentProps = React.HTMLAttributes<HTMLDivElement>

function FileUploadContent({ className, ...props }: FileUploadContentProps) {
  const context = useContext(FileUploadContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!context?.isDragging || !mounted || context.disabled) {
    return null
  }

  return createPortal(
    <>
      <style href="dpk-fade-in-keyframes" precedence="default">{`@keyframes dpk-fade-in{from{opacity:0;transform:translateY(0.125rem)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-sm',
          className,
        )}
        style={{ animation: 'dpk-fade-in 180ms ease-out' }}
        {...props}
      />
    </>,
    document.body,
  )
}

export { FileUpload, FileUploadTrigger, FileUploadContent }
