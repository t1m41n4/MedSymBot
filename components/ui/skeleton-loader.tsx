import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  count?: number
}

export function SkeletonCard({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg border bg-card p-4 space-y-3 animate-pulse",
            className
          )}
        >
          <div className="h-32 bg-muted rounded-md" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-8 w-1/3 bg-muted rounded" />
        </div>
      ))}
    </>
  )
}
