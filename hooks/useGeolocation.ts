"use client"

import { useState, useCallback } from "react"
import { WeatherService } from "@/services/weatherService"
import type { WeatherData, ForecastData } from "@/types/weather"

interface GeolocationState {
  isLoading: boolean
  error: string | null
  position: GeolocationPosition | null
}

interface GeolocationWeatherData {
  weather: WeatherData | null
  forecast: ForecastData | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    isLoading: false,
    error: null,
    position: null,
  })

  const [weatherData, setWeatherData] = useState<GeolocationWeatherData>({
    weather: null,
    forecast: null,
  })

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser.",
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          position,
          error: null,
        }))
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location."

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }, [])

  const getWeatherByLocation = useCallback(async () => {
    if (!state.position) {
      setState((prev) => ({
        ...prev,
        error: "No location available. Please get your location first.",
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { latitude, longitude } = state.position.coords

      const [weather, forecast] = await Promise.allSettled([
        WeatherService.getCurrentWeatherByCoords(latitude, longitude),
        WeatherService.getForecastByCoords(latitude, longitude),
      ])

      const weatherData: GeolocationWeatherData = {
        weather: weather.status === "fulfilled" ? weather.value : null,
        forecast: forecast.status === "fulfilled" ? forecast.value : null,
      }

      if (weather.status === "rejected") {
        throw new Error(weather.reason?.message || "Failed to fetch weather data")
      }

      setWeatherData(weatherData)
      setState((prev) => ({ ...prev, isLoading: false }))

      return weatherData
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [state.position])

  const getCurrentLocationWeather = useCallback(async () => {
    getCurrentLocation()

    // Wait for location to be available
    return new Promise<GeolocationWeatherData>((resolve, reject) => {
      const checkLocation = () => {
        if (state.position) {
          getWeatherByLocation().then((data) => resolve(data!)).catch(reject)
        } else if (state.error) {
          reject(new Error(state.error))
        } else if (!state.isLoading) {
          // Location request completed but no position
          reject(new Error("Unable to get location"))
        } else {
          // Still loading, check again
          setTimeout(checkLocation, 100)
        }
      }
      checkLocation()
    })
  }, [getCurrentLocation, getWeatherByLocation, state])

  return {
    // State
    isLoading: state.isLoading,
    error: state.error,
    position: state.position,
    weatherData,

    // Actions
    getCurrentLocation,
    getWeatherByLocation,
    getCurrentLocationWeather,
  }
}
