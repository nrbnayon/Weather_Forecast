import { WeatherApp } from "@/components/landing/weather-app"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weather Now - Current Weather & Forecast",
  description:
    "Get real-time weather information and accurate forecasts for any city worldwide. Features current conditions, hourly and daily forecasts, and detailed weather data.",
}

export default function Home() {
  return <WeatherApp />
}
