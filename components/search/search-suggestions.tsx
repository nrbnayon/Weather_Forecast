"use client"

import { MapPin, Loader2 } from "lucide-react"
import type { CitySearchResult } from "@/types/weather"
import { cn } from "@/lib/utils"

interface SearchSuggestionsProps {
  results: CitySearchResult[]
  isLoading: boolean
  onSelect: (result: CitySearchResult) => void
  query: string
}

export function SearchSuggestions({ results, isLoading, onSelect, query }: SearchSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-weather-medium-purple rounded-lg border border-weather-dark-purple-gray shadow-lg z-50">
        <div className="p-4 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin text-weather-white mr-2" />
          <span className="text-weather-white text-sm">Searching cities...</span>
        </div>
      </div>
    )
  }

  if (results.length === 0 && query.length >= 2) {
    return (
      <div className="absolute top-full left-0 right-0 mt-4 bg-weather-dark-purple rounded-lg border border-weather-dark-purple-gray shadow-lg z-50">
        <div className="p-4 text-center">
          <span className="text-weather-light-gray text-sm">No cities found for "{query}"</span>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-4 bg-weather-dark-purple rounded-lg border border-weather-dark-purple-gray shadow-lg z-50 max-h-64 overflow-y-auto">
      {results.map((result, index) => (
        <button
          key={`${result.name}-${result.country}-${result.lat}-${result.lon}`}
          onClick={() => onSelect(result)}
          className={cn(
            "w-full px-4 py-3 text-left hover:bg-weather-dark-purple-gray transition-colors",
            "flex items-center gap-3 text-weather-white",
            index === 0 && "rounded-t-lg",
            index === results.length - 1 && "rounded-b-lg",
          )}
        >
          <MapPin className="w-4 h-4 text-weather-light-gray flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">
              {result.name}
              {result.state && `, ${result.state}`}
            </div>
            <div className="text-sm text-weather-light-gray truncate">{result.country}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
