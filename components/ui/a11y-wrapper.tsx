import React from 'react'

interface A11yWrapperProps {
  label: string
  description?: string
  children: React.ReactNode
}

export function A11yWrapper({ label, description, children }: A11yWrapperProps) {
  return (
    <div role="region" aria-label={label} aria-description={description}>
      {children}
    </div>
  )
}
