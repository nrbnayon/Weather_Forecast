"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't connect to the server (API error). Please try again in a few moments.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-weather-medium-purple flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-weather-white" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-weather-white mb-3 text-balance">{title}</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-pretty">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-weather-medium-purple hover:bg-weather-dark-purple-gray text-weather-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  )
}
