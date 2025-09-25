import { configureStore } from "@reduxjs/toolkit"
import { weatherApi } from "./api/weatherApi"
import weatherReducer from "./features/weatherSlice"
import settingsReducer from "./features/settingsSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
