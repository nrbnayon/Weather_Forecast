"use client"

import { useState, useEffect, useCallback } from "react"
import { useGeolocation } from "./useGeolocation"

interface AutoLocationState {
  isLoading: boolean
  error: string | null
  detectedCity: string | null
  detectionMethod: 'geolocation' | 'timezone' | null
}

// Timezone to city mapping for major cities
const TIMEZONE_CITY_MAP: Record<string, string> = {
  'Asia/Dhaka': 'Dhaka',
  'Asia/Kolkata': 'Kolkata',
  'Asia/Karachi': 'Karachi',
  'Asia/Dubai': 'Dubai',
  'Asia/Tokyo': 'Tokyo',
  'Asia/Shanghai': 'Shanghai',
  'Asia/Singapore': 'Singapore',
  'Asia/Bangkok': 'Bangkok',
  'Asia/Jakarta': 'Jakarta',
  'Asia/Manila': 'Manila',
  'Europe/London': 'London',
  'Europe/Paris': 'Paris',
  'Europe/Berlin': 'Berlin',
  'Europe/Rome': 'Rome',
  'Europe/Madrid': 'Madrid',
  'Europe/Amsterdam': 'Amsterdam',
  'Europe/Stockholm': 'Stockholm',
  'Europe/Moscow': 'Moscow',
  'America/New_York': 'New York',
  'America/Los_Angeles': 'Los Angeles',
  'America/Chicago': 'Chicago',
  'America/Toronto': 'Toronto',
  'America/Vancouver': 'Vancouver',
  'America/Mexico_City': 'Mexico City',
  'America/Sao_Paulo': 'São Paulo',
  'America/Buenos_Aires': 'Buenos Aires',
  'Australia/Sydney': 'Sydney',
  'Australia/Melbourne': 'Melbourne',
  'Australia/Perth': 'Perth',
  'Africa/Cairo': 'Cairo',
  'Africa/Lagos': 'Lagos',
  'Africa/Johannesburg': 'Johannesburg',
}

export function useAutoLocation() {
  const [state, setState] = useState<AutoLocationState>({
    isLoading: false,
    error: null,
    detectedCity: null,
    detectionMethod: null,
  })

  const { getCurrentLocation, position, error: geoError, isLoading: geoLoading } = useGeolocation()

  // Function to get city from timezone
  const getCityFromTimezone = useCallback((): string | null => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      return TIMEZONE_CITY_MAP[timezone] || null
    } catch (error) {
      console.warn('Failed to get timezone:', error)
      return null
    }
  }, [])

  // Function to get city name from coordinates using reverse geocoding
  const getCityFromCoordinates = useCallback(async (lat: number, lon: number): Promise<string | null> => {
    try {
      // Using a simple reverse geocoding approach
      // In a real app, you might want to use a proper geocoding service
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error('Reverse geocoding failed')
      }
      
      const data = await response.json()
      if (data && data.length > 0) {
        return data[0].name
      }
      
      return null
    } catch (error) {
      console.warn('Reverse geocoding failed:', error)
      return null
    }
  }, [])

  // Main function to detect location
  const detectLocation = useCallback(async (): Promise<string | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // First, try geolocation
      getCurrentLocation()
      
      // Wait a bit for geolocation to complete
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (position && !geoError) {
        const city = await getCityFromCoordinates(position.coords.latitude, position.coords.longitude)
        if (city) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            detectedCity: city,
            detectionMethod: 'geolocation'
          }))
          return city
        }
      }

      // Fallback to timezone-based detection
      const timezoneCity = getCityFromTimezone()
      if (timezoneCity) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          detectedCity: timezoneCity,
          detectionMethod: 'timezone'
        }))
        return timezoneCity
      }

      // If all fails, return null
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Could not detect your location automatically'
      }))
      return null

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect location'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return null
    }
  }, [getCurrentLocation, position, geoError, getCityFromCoordinates, getCityFromTimezone])

  // Auto-detect on mount
  useEffect(() => {
    detectLocation()
  }, []) // Only run once on mount

  return {
    // State
    isLoading: state.isLoading || geoLoading,
    error: state.error,
    detectedCity: state.detectedCity,
    detectionMethod: state.detectionMethod,

    // Actions
    detectLocation,
  }
}