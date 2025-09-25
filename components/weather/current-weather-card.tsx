"use client"

import { WeatherCard } from "@/components/ui/weather-card"
import { WeatherIcon } from "@/components/ui/weather-icon"
import { convertTemperature, formatDate } from "@/utils/weather"
import type { WeatherData, TemperatureUnit } from "@/types/weather"
import { cn } from "@/lib/utils"

interface CurrentWeatherCardProps {
  weather: WeatherData
  temperatureUnit: TemperatureUnit
  className?: string
}

export function CurrentWeatherCard({ weather, temperatureUnit, className }: CurrentWeatherCardProps) {
  const temperature = convertTemperature(weather.main.temp, temperatureUnit)
  const unitSymbol = temperatureUnit === "celsius" ? "°C" : "°F"

  return (
    <WeatherCard variant="gradient" className={cn("relative overflow-hidden", className)}>
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-weather-orange"></div>
      <div className="absolute bottom-16 right-16 w-1 h-1 rounded-full bg-white opacity-60"></div>
      <div className="absolute bottom-8 left-1/3 w-1 h-1 rounded-full bg-weather-orange"></div>

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-weather-white mb-2 text-balance">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-weather-white/80 text-pretty">{formatDate(weather.dt)}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <WeatherIcon iconCode={weather.weather[0].icon} size={64} />
            <span className="text-weather-white/80 text-sm mt-1 capitalize">{weather.weather[0].description}</span>
          </div>
          <div className="text-6xl font-bold text-weather-white">
            {temperature}
            <span className="text-3xl">{unitSymbol}</span>
          </div>
        </div>
      </div>
    </WeatherCard>
  )
}
