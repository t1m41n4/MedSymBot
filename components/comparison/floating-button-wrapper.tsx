'use client'

import dynamic from 'next/dynamic'

const ComparisonFloatingButton = dynamic(
  () => import('./floating-button').then(mod => mod.ComparisonFloatingButton),
  { ssr: false }
)

export function ComparisonFloatingButtonWrapper() {
  return <ComparisonFloatingButton />
}
