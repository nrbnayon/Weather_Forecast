"use client"

import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastQuery,
} from "@/redux/api/weatherApi"
import { setSelectedCity, setError, clearWeatherData, setIsSearching } from "@/redux/features/weatherSlice"

export function useWeatherData() {
  const dispatch = useAppDispatch()
  const { selectedCity, error, isSearching } = useAppSelector((state) => state.weather)
  const { temperatureUnit, windSpeedUnit, precipitationUnit } = useAppSelector((state) => state.settings)

  // Lazy queries for manual triggering
  const [triggerWeatherQuery, weatherResult] = useLazyGetCurrentWeatherQuery()
  const [triggerForecastQuery, forecastResult] = useLazyGetForecastQuery()

  // Auto queries for selected city
  const currentWeatherQuery = useGetCurrentWeatherQuery({ city: selectedCity }, { skip: !selectedCity })

  const forecastQuery = useGetForecastQuery({ city: selectedCity }, { skip: !selectedCity })

  const searchWeather = useCallback(
    async (city: string) => {
      if (!city.trim()) return

      dispatch(setIsSearching(true))
      dispatch(setError(null))
      dispatch(setSelectedCity(city))

      try {
        // Trigger both queries
        const [weatherPromise, forecastPromise] = await Promise.allSettled([
          triggerWeatherQuery({ city }).unwrap(),
          triggerForecastQuery({ city }).unwrap(),
        ])

        // Handle results
        if (weatherPromise.status === "rejected") {
          throw new Error(weatherPromise.reason?.message || "Failed to fetch weather data")
        }

        if (forecastPromise.status === "rejected") {
          console.warn("Forecast data unavailable:", forecastPromise.reason)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
        dispatch(setError(errorMessage))
        dispatch(clearWeatherData())
      } finally {
        dispatch(setIsSearching(false))
      }
    },
    [dispatch, triggerWeatherQuery, triggerForecastQuery],
  )

  const clearSearch = useCallback(() => {
    dispatch(clearWeatherData())
    dispatch(setSelectedCity(""))
    dispatch(setError(null))
    dispatch(setIsSearching(false))
  }, [dispatch])

  const retrySearch = useCallback(() => {
    if (selectedCity) {
      searchWeather(selectedCity)
    }
  }, [selectedCity, searchWeather])

  // Combine data from both auto and manual queries
  const currentWeather = currentWeatherQuery.data || weatherResult.data
  const forecast = forecastQuery.data || forecastResult.data

  const isLoading =
    currentWeatherQuery.isLoading ||
    forecastQuery.isLoading ||
    weatherResult.isLoading ||
    forecastResult.isLoading ||
    isSearching

  const hasError =
    currentWeatherQuery.error || forecastQuery.error || weatherResult.error || forecastResult.error || error

  return {
    // Data
    currentWeather,
    forecast,
    selectedCity,

    // State
    isLoading,
    hasError,
    error: hasError ? error || "Failed to load weather data" : null,

    // Settings
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,

    // Actions
    searchWeather,
    clearSearch,
    retrySearch,
  }
}
