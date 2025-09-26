import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SunDim, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind } from "lucide-react"

interface WeatherIconProps {
  iconCode: string
  className?: string
  size?: number
}

const iconMap: Record<string, React.ComponentType<any>> = {
  "01d": SunDim,
  "01n": SunDim,
  "02d": Cloud,
  "02n": Cloud,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": Wind,
  "50n": Wind,
}

const imageMap: Record<string, string> = {
  "01d": "/sun.png",
  "01n": "/sun.png",
  "02d": "/partly_cloudy.png",
  "02n": "/partly_cloudy.png",
  "03d": "/partly_cloudy.png",
  "03n": "/partly_cloudy.png",
  "04d": "/partly_cloudy.png",
  "04n": "/partly_cloudy.png",
  "09d": "/drizzle.png",
  "09n": "/drizzle.png",
  "10d": "/rain.png",
  "10n": "/rain.png",
  "11d": "/thunderstorms.png",
  "11n": "/thunderstorms.png",
  "13d": "/snow.png",
  "13n": "/snow.png",
  "50d": "/fog.png",
  "50n": "/fog.png",
}

export function WeatherIcon({ iconCode, className, size = 24 }: WeatherIconProps) {
  const [imageError, setImageError] = useState(false)
  const IconComponent = iconMap[iconCode] || Cloud
  const imageSrc = imageMap[iconCode]

  const handleImageError = () => {
    setImageError(true)
  }

  if (imageSrc && !imageError) {
    return (
      <Image
        src={imageSrc}
        alt={`Weather icon ${iconCode}`}
        width={size}
        height={size}
        className={cn("object-contain", className)}
        onError={handleImageError}
        priority
      />
    )
  }

  return (
    <IconComponent
      className={cn(
        "text-weather-white",
        iconCode.includes("01") && "text-yellow-400",
        iconCode.includes("10") && "text-blue-400",
        iconCode.includes("11") && "text-purple-400",
        iconCode.includes("13") && "text-gray-200",
        className,
      )}
      size={size}
    />
  )
}