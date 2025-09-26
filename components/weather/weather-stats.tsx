"use client"

import { WeatherCard } from "@/components/ui/weather-card"
import { convertTemperature, convertWindSpeed } from "@/utils/weather"
import type { WeatherData, WeatherSettings } from "@/types/weather"
import { cn } from "@/lib/utils"

interface WeatherStatsProps {
  weather: WeatherData
  settings: WeatherSettings
  className?: string
}

export function WeatherStats({ weather, settings, className }: WeatherStatsProps) {
  const feelsLike = convertTemperature(weather.main.feels_like, settings.temperatureUnit)
  const windSpeed = convertWindSpeed(weather.wind.speed, settings.windSpeedUnit)
  const pressure = weather.main.pressure 
  const humidity = weather.main.humidity

  const tempUnit = settings.temperatureUnit === "celsius" ? "°C" : "°F"
  const windUnit = settings.windSpeedUnit === "kmh" ? "km/h" : "mph"

  const stats = [
    {
      label: "Feels Like",
      value: `${feelsLike}${tempUnit}`,
    },
    {
      label: "Humidity",
      value: `${humidity}%`,
    },
    {
      label: "Wind",
      value: `${windSpeed} ${windUnit}`,
    },
    {
      label: "Pressure",
      value: `${pressure} hPa`,
    },
  ]

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6", className)}>
      {stats.map((stat) => (
        <WeatherCard key={stat.label} className="text-center bg-weather-dark-purple border border-weather-medium-purple p-5">
          <p className="text-weather-light-gray text-start text-sm mb-5">{stat.label}</p>
          <p className="text-3xl font-normal text-start text-weather-white">{stat.value}</p>
        </WeatherCard>
      ))}
    </div>
  )
}
