"use client"

import { Server, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ApiErrorProps {
  errorCode?: number
  onRetry?: () => void
  className?: string
}

export function ApiError({ errorCode, onRetry, className }: ApiErrorProps) {
  const getErrorMessage = () => {
    switch (errorCode) {
      case 401:
        return "API authentication failed. Please contact support."
      case 403:
        return "Access to weather data is currently restricted."
      case 429:
        return "Too many requests. Please wait a moment and try again."
      case 500:
      case 502:
      case 503:
        return "Weather service is temporarily unavailable. Please try again later."
      default:
        return "Unable to fetch weather data from the server. Please try again."
    }
  }

  const getErrorTitle = () => {
    switch (errorCode) {
      case 401:
      case 403:
        return "Access Denied"
      case 429:
        return "Rate Limit Exceeded"
      case 500:
      case 502:
      case 503:
        return "Service Unavailable"
      default:
        return "Server Error"
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className="w-20 h-20 rounded-full bg-weather-medium-purple flex items-center justify-center mb-6">
        <Server className="w-10 h-10 text-destructive" />
      </div>

      <h3 className="text-3xl font-bold text-weather-white mb-4 text-balance">{getErrorTitle()}</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-pretty leading-relaxed">{getErrorMessage()}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && errorCode !== 401 && errorCode !== 403 && (
          <Button onClick={onRetry} className="bg-weather-blue hover:bg-weather-blue/90 text-weather-white px-6">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}

        <Button
          onClick={() => window.open("https://openweathermap.org/api", "_blank")}
          variant="outline"
          className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent px-6"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Service Status
        </Button>
      </div>
    </div>
  )
}
