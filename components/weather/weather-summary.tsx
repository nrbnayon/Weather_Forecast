"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { WeatherCard } from "@/components/ui/weather-card"
import { convertTemperature } from "@/utils/weather"
import type { WeatherData, ForecastData, TemperatureUnit } from "@/types/weather"
import { cn } from "@/lib/utils"

interface WeatherSummaryProps {
  weather: WeatherData
  forecast?: ForecastData
  temperatureUnit: TemperatureUnit
  className?: string
}

export function WeatherSummary({ weather, forecast, temperatureUnit, className }: WeatherSummaryProps) {
  // Calculate temperature trend from forecast
  const getTempTrend = () => {
    if (!forecast || forecast.list.length < 2) return null

    const currentTemp = weather.main.temp
    const nextTemp = forecast.list[1].main.temp
    const diff = nextTemp - currentTemp

    if (Math.abs(diff) < 1) return { trend: "stable", icon: Minus }
    if (diff > 0) return { trend: "rising", icon: TrendingUp }
    return { trend: "falling", icon: TrendingDown }
  }

  const tempTrend = getTempTrend()
  const currentTemp = convertTemperature(weather.main.temp, temperatureUnit)
  const feelsLike = convertTemperature(weather.main.feels_like, temperatureUnit)
  const unitSymbol = temperatureUnit === "celsius" ? "°C" : "°F"

  // Generate weather summary text
  const getWeatherSummary = () => {
    const condition = weather.weather[0].main.toLowerCase()
    const temp = currentTemp
    const humidity = weather.main.humidity

    let summary = `Currently ${temp}${unitSymbol} with ${weather.weather[0].description}.`

    if (feelsLike !== currentTemp) {
      summary += ` Feels like ${feelsLike}${unitSymbol}.`
    }

    if (humidity > 80) {
      summary += " High humidity levels."
    } else if (humidity < 30) {
      summary += " Low humidity levels."
    }

    if (weather.wind.speed > 10) {
      summary += " Windy conditions."
    }

    return summary
  }

  return (
    <WeatherCard className={cn("", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-weather-white">Weather Summary</h3>
          {tempTrend && (
            <div className="flex items-center gap-1 text-weather-light-gray">
              <tempTrend.icon className="w-4 h-4" />
              <span className="text-sm capitalize">{tempTrend.trend}</span>
            </div>
          )}
        </div>

        <p className="text-weather-light-gray leading-relaxed text-pretty">{getWeatherSummary()}</p>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-weather-dark-purple-gray">
          <div>
            <p className="text-weather-light-gray text-sm">Condition</p>
            <p className="text-weather-white font-medium capitalize">{weather.weather[0].description}</p>
          </div>
          <div>
            <p className="text-weather-light-gray text-sm">Cloud Cover</p>
            <p className="text-weather-white font-medium">{weather.clouds.all}%</p>
          </div>
        </div>
      </div>
    </WeatherCard>
  )
}
