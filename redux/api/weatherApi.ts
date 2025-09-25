import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { WeatherData, ForecastData, CitySearchResult } from "@/types/weather"

const API_KEY = "9d729cfd40c256defac28e6a8266b774"
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Weather", "Forecast"],
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<WeatherData, { city: string }>({
      query: ({ city }) => ({
        url: "/weather",
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }),
      providesTags: ["Weather"],
    }),
    getForecast: builder.query<ForecastData, { city: string }>({
      query: ({ city }) => ({
        url: "/forecast",
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }),
      providesTags: ["Forecast"],
    }),
    searchCities: builder.query<CitySearchResult[], { query: string }>({
      query: ({ query }) => ({
        url: `${GEO_URL}/direct`,
        params: {
          q: query,
          limit: 5,
          appid: API_KEY,
        },
      }),
      transformResponse: (response: CitySearchResult[]) => response,
    }),
  }),
})

export const {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
  useSearchCitiesQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastQuery,
  useLazySearchCitiesQuery,
} = weatherApi
