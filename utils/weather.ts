import type { TemperatureUnit, WindSpeedUnit, PrecipitationUnit } from "@/types/weather"

export const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32)
  }
  return Math.round(temp)
}

export const convertWindSpeed = (speed: number, unit: WindSpeedUnit): number => {
  if (unit === "mph") {
    return Math.round(speed * 0.621371)
  }
  return Math.round(speed)
}

export const convertPrecipitation = (amount: number, unit: PrecipitationUnit): number => {
  if (unit === "inches") {
    return Math.round(amount * 0.0393701 * 100) / 100
  }
  return amount
}

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", { weekday: "short" })
}
