import { useState, useEffect } from 'react'
import type { Product } from '@/types/product'

export function useProductCache<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cached = sessionStorage.getItem(key)
    if (cached) {
      setData(JSON.parse(cached))
      setIsLoading(false)
      return
    }

    fetcher().then((result) => {
      sessionStorage.setItem(key, JSON.stringify(result))
      setData(result)
      setIsLoading(false)
    })
  }, [key])

  return { data, isLoading }
}
