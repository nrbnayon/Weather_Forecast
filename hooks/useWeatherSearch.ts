"use client"

import { useState, useCallback } from "react"
import { useDebounce } from "./useDebounce"
import { CitySearchResult } from "@/types/weather"
import { useSearchCitiesQuery } from "@/redux/api/weatherApi"

export function useWeatherSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<CitySearchResult | null>(null)

  // Debounce search query to avoid too many API calls
  const debouncedQuery = useDebounce(searchQuery, 300)

  // Search cities query
  const {
    data: searchResults = [],
    isLoading: isSearching,
    error: searchError,
  } = useSearchCitiesQuery(
    { query: debouncedQuery },
    {
      skip: debouncedQuery.length < 2,
      refetchOnMountOrArgChange: true,
    },
  )

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
    setIsSearchOpen(query.length >= 2)
    setSelectedSuggestion(null)
  }, [])

  const handleSuggestionSelect = useCallback((suggestion: CitySearchResult) => {
    setSelectedSuggestion(suggestion)
    setSearchQuery(`${suggestion.name}, ${suggestion.country}`)
    setIsSearchOpen(false)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setIsSearchOpen(false)
    setSelectedSuggestion(null)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  return {
    // State
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    isSearchOpen,
    selectedSuggestion,

    // Actions
    handleSearchChange,
    handleSuggestionSelect,
    clearSearch,
    closeSearch,
    setIsSearchOpen,
  }
}
