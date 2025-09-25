"use client"

import { useState, useEffect } from "react"
import { Clock, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cn } from "@/lib/utils"

interface SearchHistoryItem {
  city: string
  timestamp: number
  country?: string
}

interface SearchHistoryProps {
  onSelect: (city: string) => void
  className?: string
}

export function SearchHistory({ onSelect, className }: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistoryItem[]>("weather-search-history", [])
  const [isVisible, setIsVisible] = useState(false)

  // Add city to search history
  const addToHistory = (city: string, country?: string) => {
    const newItem: SearchHistoryItem = {
      city,
      country,
      timestamp: Date.now(),
    }

    setSearchHistory((prev) => {
      // Remove existing entry if it exists
      const filtered = prev.filter((item) => item.city.toLowerCase() !== city.toLowerCase())
      // Add new item to the beginning and limit to 10 items
      return [newItem, ...filtered].slice(0, 10)
    })
  }

  // Remove item from history
  const removeFromHistory = (city: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.city.toLowerCase() !== city.toLowerCase()))
  }

  // Clear all history
  const clearHistory = () => {
    setSearchHistory([])
  }

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(timestamp).toLocaleDateString()
  }

  // Expose addToHistory function
  useEffect(() => {
    // This could be used by parent components
    ;(window as any).addToWeatherHistory = addToHistory
  }, []) // Removed addToHistory from dependency array

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <div className={cn("", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="text-weather-light-gray hover:text-weather-white hover:bg-weather-medium-purple"
      >
        <Clock className="w-4 h-4 mr-2" />
        Recent searches
      </Button>

      {isVisible && (
        <div className="mt-2 bg-weather-medium-purple rounded-lg border border-weather-dark-purple-gray shadow-lg">
          <div className="p-3 border-b border-weather-dark-purple-gray flex items-center justify-between">
            <span className="text-weather-white font-medium text-sm">Recent searches</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-weather-light-gray hover:text-weather-white h-auto p-1"
            >
              Clear all
            </Button>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {searchHistory.map((item, index) => (
              <div
                key={`${item.city}-${item.timestamp}`}
                className="flex items-center gap-3 p-3 hover:bg-weather-dark-purple-gray transition-colors group"
              >
                <MapPin className="w-4 h-4 text-weather-light-gray flex-shrink-0" />

                <button onClick={() => onSelect(item.city)} className="flex-1 text-left min-w-0">
                  <div className="font-medium text-weather-white truncate">{item.city}</div>
                  <div className="text-xs text-weather-light-gray">{formatTimestamp(item.timestamp)}</div>
                </button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromHistory(item.city)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-weather-light-gray hover:text-weather-white h-auto p-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
