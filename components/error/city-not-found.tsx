"use client"

import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CityNotFoundProps {
  searchQuery?: string
  onNewSearch?: () => void
  onLocationSearch?: () => void
  className?: string
}

export function CityNotFound({ searchQuery, onNewSearch, onLocationSearch, className }: CityNotFoundProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className="w-20 h-20 rounded-full bg-weather-medium-purple flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-weather-white" />
      </div>

      <h3 className="text-3xl font-bold text-weather-white mb-4 text-balance">No search result found!</h3>

      <p className="text-weather-light-gray mb-8 max-w-md text-pretty leading-relaxed">
        {searchQuery
          ? `We couldn't find weather data for "${searchQuery}". Please check the spelling or try a different city name.`
          : "We couldn't find weather data for your search. Please try a different city name."}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onNewSearch && (
          <Button onClick={onNewSearch} className="bg-weather-blue hover:bg-weather-blue/90 text-weather-white px-6">
            <Search className="w-4 h-4 mr-2" />
            Try Different City
          </Button>
        )}

        {onLocationSearch && (
          <Button
            onClick={onLocationSearch}
            variant="outline"
            className="text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-transparent px-6"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use My Location
          </Button>
        )}
      </div>
    </div>
  )
}
