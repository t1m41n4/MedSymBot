import { Loader2 } from "lucide-react"

interface LoadingProps {
  message?: string
  className?: string
}

export function Loading({ message = "Loading...", className = "" }: LoadingProps) {
  return (
    <div
      role="alert"
      aria-busy="true"
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}
