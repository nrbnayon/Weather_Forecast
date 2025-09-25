import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  className?: string
  variant?: "weather" | "forecast" | "hourly"
}

export function SkeletonCard({ className, variant = "weather" }: SkeletonCardProps) {
  if (variant === "weather") {
    return (
      <div className={cn("bg-weather-medium-purple rounded-2xl p-8", className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 bg-weather-dark-purple-gray" />
            <Skeleton className="h-5 w-32 bg-weather-dark-purple-gray" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full bg-weather-dark-purple-gray" />
            <Skeleton className="h-20 w-24 bg-weather-dark-purple-gray" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "forecast") {
    return (
      <div className={cn("bg-weather-medium-purple rounded-xl p-4 text-center", className)}>
        <Skeleton className="h-4 w-8 mx-auto mb-3 bg-weather-dark-purple-gray" />
        <Skeleton className="h-8 w-8 mx-auto mb-3 bg-weather-dark-purple-gray" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-8 mx-auto bg-weather-dark-purple-gray" />
          <Skeleton className="h-4 w-8 mx-auto bg-weather-dark-purple-gray" />
        </div>
      </div>
    )
  }

  if (variant === "hourly") {
    return (
      <div className={cn("bg-weather-medium-purple rounded-xl p-4 flex items-center justify-between", className)}>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 bg-weather-dark-purple-gray" />
          <Skeleton className="h-5 w-12 bg-weather-dark-purple-gray" />
        </div>
        <Skeleton className="h-5 w-8 bg-weather-dark-purple-gray" />
      </div>
    )
  }

  return null
}
