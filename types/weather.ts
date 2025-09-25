export interface WeatherData {
    id: number
    name: string
    country: string
    coord: {
      lat: number
      lon: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    wind: {
      speed: number
      deg: number
    }
    clouds: {
      all: number
    }
    dt: number
    sys: {
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    visibility: number
  }
  
  export interface ForecastData {
    list: Array<{
      dt: number
      main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
      }
      weather: Array<{
        id: number
        main: string
        description: string
        icon: string
      }>
      clouds: {
        all: number
      }
      wind: {
        speed: number
        deg: number
      }
      visibility: number
      pop: number
      dt_txt: string
    }>
    city: {
      id: number
      name: string
      coord: {
        lat: number
        lon: number
      }
      country: string
      population: number
      timezone: number
      sunrise: number
      sunset: number
    }
  }
  
  export interface CitySearchResult {
    name: string
    local_names?: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
  }
  
  export type TemperatureUnit = "celsius" | "fahrenheit"
  export type WindSpeedUnit = "kmh" | "mph"
  export type PrecipitationUnit = "mm" | "inches"
  
  export interface WeatherSettings {
    temperatureUnit: TemperatureUnit
    windSpeedUnit: WindSpeedUnit
    precipitationUnit: PrecipitationUnit
  }
  