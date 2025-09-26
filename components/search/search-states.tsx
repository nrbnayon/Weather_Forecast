"use client"

import { Search, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

interface SearchLoadingStateProps {
  className?: string
}

export function SearchLoadingState({ className }: SearchLoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <LoadingSpinner size="lg" className="mb-6" />
      <h3 className="text-xl font-semibold text-weather-white mb-2">Loading weather data...</h3>
      <p className="text-weather-light-gray text-center max-w-md">
        Please wait while we fetch the latest weather information for your location.
      </p>
    </div>
  )
}

interface SearchEmptyStateProps {
  onLocationSearch?: () => void
  className?: string
}

export function SearchEmptyState({ onLocationSearch, className }: SearchEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-6 md:py-12", className)}>
      <div className="w-16 h-16 rounded-full bg-weather-medium-purple flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-weather-white" />
      </div>

      <h3 className="text-2xl font-bold text-center text-weather-white mb-3 text-balance">Search for weather information</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-center text-pretty">
        Enter a city name to get current weather conditions and forecasts.
      </p>

      {onLocationSearch && (
        <Button
          onClick={onLocationSearch}
          variant="outline"
          className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use current location
        </Button>
      )}
    </div>
  )
}

interface SearchErrorStateProps {
  error: string
  onRetry?: () => void
  onClear?: () => void
  className?: string
}

export function SearchErrorState({ error, onRetry, onClear, className }: SearchErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="w-16 h-16 rounded-full bg-weather-medium-purple flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>

      <h3 className="text-2xl font-bold text-weather-white mb-3 text-balance">Unable to load weather data</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-center text-pretty">{error}</p>

      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} className="bg-weather-blue hover:bg-weather-blue/90 text-weather-white">
            Try again
          </Button>
        )}

        {onClear && (
          <Button
            onClick={onClear}
            variant="outline"
            className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent"
          >
            Search different city
          </Button>
        )}
      </div>
    </div>
  )
}
