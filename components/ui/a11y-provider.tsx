"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

interface A11yContextType {
  isReducedMotion: boolean
  isHighContrast: boolean
  isScreenReader: boolean
}

const A11yContext = createContext<A11yContextType>({} as A11yContextType)

export function A11yProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)')
  const isScreenReader = useMediaQuery('(forced-colors: active)')

  return (
    <A11yContext.Provider
      value={{
        isReducedMotion: prefersReducedMotion,
        isHighContrast: prefersHighContrast,
        isScreenReader: isScreenReader
      }}
    >
      {children}
    </A11yContext.Provider>
  )
}

export const useA11y = () => useContext(A11yContext)
