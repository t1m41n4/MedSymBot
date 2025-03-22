"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/types/product"

interface ComparisonContextType {
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Product[]>([])

  const addToComparison = (product: Product) => {
    if (comparisonList.length < 4 && !isInComparison(product.id)) {
      setComparisonList([...comparisonList, product])
    }
  }

  const removeFromComparison = (productId: number) => {
    setComparisonList(comparisonList.filter(p => p.id !== productId))
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  const isInComparison = (productId: number) => {
    return comparisonList.some(p => p.id === productId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
