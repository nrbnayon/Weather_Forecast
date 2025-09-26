import type { WeatherData, ForecastData, CitySearchResult } from "@/types/weather"

const API_KEY =process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ""
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5"
const GEO_URL = process.env.NEXT_PUBLIC_OPENWEATHER_GEO_URL || "https://api.openweathermap.org/geo/1.0"

export class WeatherService {
  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling and try again.")
        }
        if (response.status === 401) {
          throw new Error("API key is invalid. Please contact support.")
        }
        if (response.status >= 500) {
          throw new Error("Weather service is temporarily unavailable. Please try again later.")
        }
        throw new Error(`Weather data unavailable (${response.status}). Please try again.`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Network error. Please check your connection and try again.")
    }
  }

  static async getCurrentWeather(city: string): Promise<WeatherData> {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    return this.fetchWithErrorHandling<WeatherData>(url)
  }

  static async getForecast(city: string): Promise<ForecastData> {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    return this.fetchWithErrorHandling<ForecastData>(url)
  }

  static async searchCities(query: string): Promise<CitySearchResult[]> {
    if (query.length < 2) return []

    const url = `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    return this.fetchWithErrorHandling<CitySearchResult[]>(url)
  }

  static async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    return this.fetchWithErrorHandling<WeatherData>(url)
  }

  static async getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    return this.fetchWithErrorHandling<ForecastData>(url)
  }
}
