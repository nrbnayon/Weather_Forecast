import { WeatherData, ForecastData } from "@/types/weather"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WeatherState {
  currentWeather: WeatherData | null
  forecast: ForecastData | null
  selectedCity: string
  searchQuery: string
  isSearching: boolean
  error: string | null
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  selectedCity: "",
  searchQuery: "",
  isSearching: false,
  error: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearWeatherData: (state) => {
      state.currentWeather = null
      state.forecast = null
      state.error = null
    },
  },
})

export const { setSelectedCity, setSearchQuery, setIsSearching, setError, clearWeatherData } = weatherSlice.actions

export default weatherSlice.reducer
