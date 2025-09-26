"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchSuggestions } from "./search-suggestions";
import { cn } from "@/lib/utils";
import { useWeatherSearch } from "@/hooks/useWeatherSearch";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function WeatherSearch({
  onSearch,
  isLoading = false,
  className,
}: WeatherSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    searchQuery,
    searchResults,
    isSearching,
    isSearchOpen,
    handleSearchChange,
    handleSuggestionSelect,
    closeSearch,
  } = useWeatherSearch();

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      closeSearch();
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    handleSuggestionSelect(suggestion);
    onSearch(`${suggestion.name}, ${suggestion.country}`);
  };

  const showSearchInProgress = isLoading && searchQuery.trim();

  return (
    <div
      className={cn("relative max-w-2xl mx-auto", className)}
      ref={searchRef}
    >
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1 relative'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-weather-light-gray' />
            <Input
              ref={inputRef}
              type='text'
              placeholder='Search for a place...'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className={cn(
                "pl-12 h-12 text-weather-white placeholder-weather-light-gray border-0 !bg-weather-dark-purple",
                "focus:ring-2 focus:ring-weather-blue focus:bg-weather-dark-purple-gray",
                "transition-all duration-200"
              )}
              disabled={isLoading}
            />

            {/* Search in progress indicator */}
            {showSearchInProgress && (
              <div className='absolute inset-0 bg-weather-medium-purple rounded-lg flex items-center justify-center mt-4'>
                <div className='flex items-center gap-2 text-weather-white'>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span className='text-sm'>Search in progress</span>
                </div>
              </div>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {isSearchOpen && !showSearchInProgress && (
            <SearchSuggestions
              results={searchResults}
              isLoading={isSearching}
              onSelect={handleSuggestionClick}
              query={searchQuery}
            />
          )}
        </div>

        <Button
          type='submit'
          className='h-12 px-8 text-weather-white font-medium bg-weather-blue hover:bg-weather-blue/90 transition-colors w-full sm:w-auto'
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </form>
    </div>
  );
}
  