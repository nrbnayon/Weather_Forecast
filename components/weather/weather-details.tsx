"use client"

import { Eye, Sunrise, Sunset, Gauge, Droplets, Thermometer } from "lucide-react"
import { WeatherCard } from "@/components/ui/weather-card"
import { convertTemperature, formatTime } from "@/utils/weather"
import type { WeatherData, WeatherSettings } from "@/types/weather"

interface WeatherDetailsProps {
  weather: WeatherData
  settings: WeatherSettings
  className?: string
}

export function WeatherDetails({ weather, settings, className }: WeatherDetailsProps) {
  const visibility = Math.round(weather.visibility / 1000) // Convert to km
  const uvIndex = 0 // Not available in current API response
  const dewPoint = convertTemperature(weather.main.temp - (100 - weather.main.humidity) / 5, settings.temperatureUnit)

  const tempUnit = settings.temperatureUnit === "celsius" ? "°C" : "°F"

  const details = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${visibility} km`,
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(weather.sys.sunrise),
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(weather.sys.sunset),
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: Droplets,
      label: "Dew Point",
      value: `${dewPoint}${tempUnit}`,
    },
    {
      icon: Thermometer,
      label: "Min/Max",
      value: `${convertTemperature(weather.main.temp_min, settings.temperatureUnit)}°/${convertTemperature(weather.main.temp_max, settings.temperatureUnit)}°`,
    },
  ]

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-weather-white mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {details.map((detail) => (
          <WeatherCard key={detail.label} className="flex items-center gap-3 p-4">
            <detail.icon className="w-5 h-5 text-weather-blue flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-weather-light-gray text-sm">{detail.label}</p>
              <p className="text-weather-white font-semibold truncate">{detail.value}</p>
            </div>
          </WeatherCard>
        ))}
      </div>
    </div>
  )
}
