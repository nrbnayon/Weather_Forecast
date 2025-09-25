"use client"

import { WeatherCard } from "@/components/ui/weather-card"
import { WeatherIcon } from "@/components/ui/weather-icon"
import { convertTemperature, getDayName } from "@/utils/weather"
import type { ForecastData, TemperatureUnit } from "@/types/weather"

interface DailyForecastProps {
  forecast: ForecastData
  temperatureUnit: TemperatureUnit
  className?: string
}

interface DailyData {
  date: string
  day: string
  icon: string
  high: number
  low: number
  description: string
}

export function DailyForecast({ forecast, temperatureUnit, className }: DailyForecastProps) {
  // Group forecast data by day and calculate daily highs/lows
  const dailyData = forecast.list.reduce((acc: Record<string, any>, item) => {
    const date = new Date(item.dt * 1000).toDateString()
    const temp = item.main.temp

    if (!acc[date]) {
      acc[date] = {
        date,
        day: getDayName(item.dt),
        icon: item.weather[0].icon,
        high: temp,
        low: temp,
        description: item.weather[0].description,
        dt: item.dt,
      }
    } else {
      acc[date].high = Math.max(acc[date].high, temp)
      acc[date].low = Math.min(acc[date].low, temp)
    }

    return acc
  }, {})

  // Convert to array and take first 7 days
  const dailyForecast: DailyData[] = Object.values(dailyData)
    .slice(0, 7)
    .map((day: any) => ({
      ...day,
      high: convertTemperature(day.high, temperatureUnit),
      low: convertTemperature(day.low, temperatureUnit),
    }))

  const unitSymbol = temperatureUnit === "celsius" ? "°" : "°"

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-weather-white mb-4">Daily forecast</h3>
      <div className="grid grid-cols-7 gap-3">
        {dailyForecast.map((day, index) => (
          <WeatherCard key={day.date} className="text-center p-4">
            <p className="text-weather-light-gray text-sm mb-3">{day.day}</p>
            <div className="flex justify-center mb-3">
              <WeatherIcon iconCode={day.icon} size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-weather-white font-semibold">
                {day.high}
                {unitSymbol}
              </p>
              <p className="text-weather-light-gray text-sm">
                {day.low}
                {unitSymbol}
              </p>
            </div>
          </WeatherCard>
        ))}
      </div>
    </div>
  )
}
