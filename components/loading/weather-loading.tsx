"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import { cn } from "@/lib/utils"

interface WeatherLoadingProps {
  className?: string
}

export function WeatherLoading({ className }: WeatherLoadingProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Main weather card loading */}
      <div className='bg-weather-dark-purple rounded-2xl p-8 relative overflow-hidden'>
        <div className='flex items-center justify-center h-32'>
          <div className='flex flex-col items-center'>
            <LoadingSpinner size='md' />
            <p className='text-weather-light-gray md:-mt-6 text-lg font-medium'>
              Loading...
            </p>
          </div>
        </div>
      </div>

      {/* Weather stats loading */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} className='h-28' />
        ))}
      </div>

      {/* Daily forecast loading */}
      <div>
        <div className='h-6 w-32 bg-weather-dark-purple rounded mb-4'></div>
        <div className='grid grid-cols-7 gap-3'>
          {Array.from({ length: 7 }).map((_, index) => (
            <SkeletonCard key={index} variant='forecast' />
          ))}
        </div>
      </div>
    </div>
  );
}
