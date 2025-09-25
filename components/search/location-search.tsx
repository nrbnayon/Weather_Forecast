"use client"

import { useState } from "react"
import { MapPin, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/useGeolocation"
import { cn } from "@/lib/utils"

interface LocationSearchProps {
  onLocationFound: (city: string, weather: any) => void
  className?: string
}

export function LocationSearch({ onLocationFound, className }: LocationSearchProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const { getCurrentLocationWeather, error } = useGeolocation()

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true)

    try {
      const weatherData = await getCurrentLocationWeather()
      if (weatherData.weather) {
        const cityName = `${weatherData.weather.name}, ${weatherData.weather.sys.country}`
        onLocationFound(cityName, weatherData)
      }
    } catch (error) {
      console.error("Failed to get location weather:", error)
    } finally {
      setIsGettingLocation(false)
    }
  }

  return (
    <div className={cn("", className)}>
      <Button
        variant="outline"
        onClick={handleGetCurrentLocation}
        disabled={isGettingLocation}
        className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent"
      >
        {isGettingLocation ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Getting location...
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4 mr-2" />
            Use current location
          </>
        )}
      </Button>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
