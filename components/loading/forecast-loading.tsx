"use client"

import { SkeletonCard } from "@/components/ui/skeleton-card"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react";

interface ForecastLoadingProps {
  className?: string
}

export function ForecastLoading({ className }: ForecastLoadingProps) {
  return (
    <div
      className={cn(
        "space-y-4 bg-weather-dark-purple p-6 rounded-xl mb-5 md:mb-20",
        className
      )}
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-weather-medium-purple-gray'>
          Hourly forecast
        </p>
        <div className='h-8 w-20 flex items-center justify-end p-2 bg-weather-medium-purple rounded'>
         - <ChevronDown className='w-4 h-4' />
        </div>
      </div>

      {/* Hourly forecast items */}
      <div className='space-y-3'>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} variant='hourly' />
        ))}
      </div>
    </div>
  );
}
