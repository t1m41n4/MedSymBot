import { useState, useEffect } from 'react'

export function useDebouncedState<T>(initialValue: T, delay: number = 500) {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return [debouncedValue, setValue] as const
}
