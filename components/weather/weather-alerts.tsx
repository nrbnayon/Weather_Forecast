"use client"

import { AlertTriangle, Info, AlertCircle } from "lucide-react"
import { WeatherCard } from "@/components/ui/weather-card"
import { cn } from "@/lib/utils"

interface WeatherAlert {
  id: string
  title: string
  description: string
  severity: "minor" | "moderate" | "severe" | "extreme"
  start: number
  end: number
}

interface WeatherAlertsProps {
  alerts?: WeatherAlert[]
  className?: string
}

export function WeatherAlerts({ alerts = [], className }: WeatherAlertsProps) {
  if (alerts.length === 0) {
    return null
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "extreme":
      case "severe":
        return AlertTriangle
      case "moderate":
        return AlertCircle
      default:
        return Info
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "text-red-500"
      case "severe":
        return "text-orange-500"
      case "moderate":
        return "text-yellow-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-weather-white mb-4">Weather Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getSeverityIcon(alert.severity)
          const colorClass = getSeverityColor(alert.severity)

          return (
            <WeatherCard key={alert.id} className="p-4">
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", colorClass)} />
                <div className="min-w-0">
                  <h4 className="text-weather-white font-semibold mb-1">{alert.title}</h4>
                  <p className="text-weather-light-gray text-sm leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-weather-light-gray">
                    <span>From: {new Date(alert.start * 1000).toLocaleString()}</span>
                    <span>Until: {new Date(alert.end * 1000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </WeatherCard>
          )
        })}
      </div>
    </div>
  )
}
