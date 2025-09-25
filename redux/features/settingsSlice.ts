import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WeatherSettings, TemperatureUnit, WindSpeedUnit, PrecipitationUnit } from "@/types/weather"

const initialState: WeatherSettings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  precipitationUnit: "mm",
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload
    },
    setWindSpeedUnit: (state, action: PayloadAction<WindSpeedUnit>) => {
      state.windSpeedUnit = action.payload
    },
    setPrecipitationUnit: (state, action: PayloadAction<PrecipitationUnit>) => {
      state.precipitationUnit = action.payload
    },
    resetSettings: (state) => {
      state.temperatureUnit = "celsius"
      state.windSpeedUnit = "kmh"
      state.precipitationUnit = "mm"
    },
  },
})

export const { setTemperatureUnit, setWindSpeedUnit, setPrecipitationUnit, resetSettings } = settingsSlice.actions

export default settingsSlice.reducer
