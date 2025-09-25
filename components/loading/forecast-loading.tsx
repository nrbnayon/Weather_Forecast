"use client"

import { SkeletonCard } from "@/components/ui/skeleton-card"
import { cn } from "@/lib/utils"

interface ForecastLoadingProps {
  className?: string
}

export function ForecastLoading({ className }: ForecastLoadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-weather-medium-purple rounded"></div>
        <div className="h-8 w-20 bg-weather-medium-purple rounded"></div>
      </div>

      {/* Hourly forecast items */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} variant="hourly" />
        ))}
      </div>
    </div>
  )
}
