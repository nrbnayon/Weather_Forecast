"use client"

import { AlertCircle, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WeatherErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
  onNewSearch?: () => void
  className?: string
}

export function WeatherError({
  title = "Something went wrong",
  message = "We couldn't connect to the server (API error). Please try again in a few moments.",
  onRetry,
  onNewSearch,
  className,
}: WeatherErrorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className="w-20 h-20 rounded-full bg-weather-medium-purple flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>

      <h3 className="text-3xl font-bold text-weather-white mb-4 text-balance">{title}</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-pretty leading-relaxed">{message}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button onClick={onRetry} className="bg-weather-blue hover:bg-weather-blue/90 text-weather-white px-6">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}

        {onNewSearch && (
          <Button
            onClick={onNewSearch}
            variant="outline"
            className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent px-6"
          >
            <Search className="w-4 h-4 mr-2" />
            New Search
          </Button>
        )}
      </div>
    </div>
  )
}
