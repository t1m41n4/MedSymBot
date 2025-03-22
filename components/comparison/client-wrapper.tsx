"use client"

import { ErrorBoundary } from '@/components/error-boundary'

export function ClientComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
