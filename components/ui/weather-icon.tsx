import type React from "react"
import { cn } from "@/lib/utils"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind } from "lucide-react"

interface WeatherIconProps {
  iconCode: string
  className?: string
  size?: number
}

const iconMap: Record<string, React.ComponentType<any>> = {
  "01d": Sun,
  "01n": Sun,
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

export function WeatherIcon({ iconCode, className, size = 24 }: WeatherIconProps) {
  const IconComponent = iconMap[iconCode] || Cloud

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
