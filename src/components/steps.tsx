'use client'

import { cn } from '@/utils/cn'
import { Check, Loader2 } from 'lucide-react'

export type StepStatus = 'pending' | 'loading' | 'completed' | 'error'

export type Step = {
  id: string
  title: string
  description?: string
  status: StepStatus
}

export type StepsProps = {
  steps: Step[]
  className?: string
}

function Steps({ steps, className }: StepsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <StepIcon status={step.status} />
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-0.5 h-full min-h-[24px] mt-1',
                  step.status === 'completed' ? 'bg-success' : 'bg-base-300'
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div
              className={cn(
                'font-medium text-sm',
                step.status === 'completed' && 'text-success',
                step.status === 'loading' && 'text-primary',
                step.status === 'error' && 'text-error'
              )}
            >
              {step.title}
            </div>
            {step.description && (
              <div className="text-sm text-base-content/70 mt-0.5">{step.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function StepIcon({ status }: { status: StepStatus }) {
  const config = {
    pending: { bg: 'bg-base-300', text: 'text-base-content/50', icon: null },
    loading: { bg: 'bg-primary/20', text: 'text-primary', icon: Loader2 },
    completed: { bg: 'bg-success/20', text: 'text-success', icon: Check },
    error: { bg: 'bg-error/20', text: 'text-error', icon: null },
  }

  const { bg, text, icon: Icon } = config[status]

  return (
    <div
      className={cn(
        'w-6 h-6 rounded-full flex items-center justify-center',
        bg,
        text,
        status === 'loading' && 'animate-pulse'
      )}
    >
      {Icon ? (
        <Icon className={cn('w-3.5 h-3.5', status === 'loading' && 'animate-spin')} />
      ) : status === 'error' ? (
        <span className="text-xs font-bold">!</span>
      ) : (
        <span className="w-2 h-2 rounded-full bg-current opacity-50" />
      )}
    </div>
  )
}

export { Steps }
