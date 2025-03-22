"use client"

import Link from 'next/link'
import { Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useComparison } from '@/context/comparison-context'

export function ComparisonFloatingButton() {
  const { comparisonList } = useComparison()

  if (comparisonList.length === 0) return null

  return (
    <Link href="/comparison">
      <Button
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        size="lg"
      >
        <Scale className="mr-2 h-4 w-4" />
        Compare ({comparisonList.length})
      </Button>
    </Link>
  )
}
