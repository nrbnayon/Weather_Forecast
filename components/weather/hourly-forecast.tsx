"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/ui/weather-card"
import { WeatherIcon } from "@/components/ui/weather-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { convertTemperature, formatTime, getDayName } from "@/utils/weather"
import type { ForecastData, TemperatureUnit } from "@/types/weather"
import { cn } from "@/lib/utils"

interface HourlyForecastProps {
  forecast: ForecastData
  temperatureUnit: TemperatureUnit
  className?: string
}

export function HourlyForecast({ forecast, temperatureUnit, className }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState<string>("")

  // Group forecast by day
  const forecastByDay = forecast.list.reduce((acc: Record<string, any[]>, item) => {
    const dayName = getDayName(item.dt)
    if (!acc[dayName]) {
      acc[dayName] = []
    }
    acc[dayName].push(item)
    return acc
  }, {})

  // Get available days
  const availableDays = Object.keys(forecastByDay)
  const currentSelectedDay = selectedDay || availableDays[0] || "Today"

  // Get hourly data for selected day (limit to 8 hours)
  const hourlyData = (forecastByDay[currentSelectedDay] || []).slice(0, 8).map((item) => ({
    time: formatTime(item.dt),
    icon: item.weather[0].icon,
    temp: convertTemperature(item.main.temp, temperatureUnit),
    description: item.weather[0].description,
  }))

  const unitSymbol = temperatureUnit === "celsius" ? "°" : "°"

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-weather-white">Hourly forecast</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-weather-medium-purple"
            >
              {currentSelectedDay}
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-weather-medium-purple border-weather-dark-purple-gray">
            {availableDays.map((day) => (
              <DropdownMenuItem
                key={day}
                onClick={() => setSelectedDay(day)}
                className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray"
              >
                {day}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        {hourlyData.map((hour, index) => (
          <WeatherCard key={`${hour.time}-${index}`} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <WeatherIcon iconCode={hour.icon} size={20} />
              <span className="text-weather-white">{hour.time}</span>
            </div>
            <span className="text-weather-white font-semibold">
              {hour.temp}
              {unitSymbol}
            </span>
          </WeatherCard>
        ))}
      </div>
    </div>
  )
}
