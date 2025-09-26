"use client";

import { useEffect } from "react";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useAutoLocation } from "@/hooks/useAutoLocation";
import { Header } from "@/components/layout/header";
import { WeatherSearch } from "@/components/search/weather-search";
import { CurrentWeatherCard } from "@/components/weather/current-weather-card";
import { WeatherStats } from "@/components/weather/weather-stats";
import { DailyForecast } from "@/components/weather/daily-forecast";
import { HourlyForecast } from "@/components/weather/hourly-forecast";
// import { WeatherDetails } from "@/components/weather/weather-details";
// import { WeatherSummary } from "@/components/weather/weather-summary";
import { WeatherLoading } from "@/components/loading/weather-loading";
import { ForecastLoading } from "@/components/loading/forecast-loading";
import { WeatherError } from "@/components/error/weather-error";
import { CityNotFound } from "@/components/error/city-not-found";
import { SearchEmptyState, SearchErrorState } from "@/components/search/search-states";
import { ErrorBoundary } from "@/components/error/error-boundary";

export function WeatherApp() {
  const {
    currentWeather,
    forecast,
    selectedCity,
    isLoading,
    hasError,
    error,
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,
    searchWeather,
    clearSearch,
    retrySearch,
  } = useWeatherData();

  const { detectedCity, isLoading: isDetectingLocation, error: locationError } = useAutoLocation();

  const settings = { temperatureUnit, windSpeedUnit, precipitationUnit };

  // Auto-load weather data when location is detected and no city is selected
  useEffect(() => {
    if (detectedCity && !selectedCity && !isLoading && !currentWeather) {
      searchWeather(detectedCity);
    }
  }, [detectedCity, selectedCity, isLoading, currentWeather, searchWeather]);

  const handleSearch = (city: string) => {
    searchWeather(city);
  };

  const handleRetry = () => {
    retrySearch();
  };

  const handleNewSearch = () => {
    clearSearch();
  };

  const renderContent = () => {
    // Location detection error (when auto-location fails)
    if (locationError && !selectedCity && !currentWeather) {
      return (
        <SearchErrorState
          error={`${locationError}. Please search for a city manually.`}
          onClear={() => {
            // Clear any location errors and show search interface
          }}
          className='min-h-[400px]'
        />
      );
    }

    // Weather data error states
    if (hasError && error) {
      if (error.includes("not found") || error.includes("404")) {
        return (
          <CityNotFound
            searchQuery={selectedCity}
            onNewSearch={handleNewSearch}
            className='min-h-[400px]'
          />
        );
      }

      return (
        <WeatherError
          message={error}
          onRetry={handleRetry}
          onNewSearch={handleNewSearch}
          className='min-h-[400px]'
        />
      );
    }

    // Loading state
    if (isLoading || isDetectingLocation) {
      return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <WeatherLoading />
          </div>
          <div className='space-y-4'>
            <ForecastLoading />
          </div>
        </div>
      );
    }

    // Empty state (no search yet and no auto-detected location)
    if (!currentWeather && !selectedCity && !detectedCity) {
      return <SearchEmptyState className='min-h-[200px] md:min-h-[400px]' />;
    }

    // Weather data available
    if (currentWeather) {
      return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Main Weather */}
          <div className='lg:col-span-2 space-y-8 mb-20'>
            <CurrentWeatherCard
              weather={currentWeather}
              temperatureUnit={temperatureUnit}
            />

            <WeatherStats weather={currentWeather} settings={settings} />

            {forecast && (
              <DailyForecast
                forecast={forecast}
                temperatureUnit={temperatureUnit}
              />
            )}
          </div>

          {/* Right Column - Hourly Forecast */}
          <div className='space-y-4'>
            {forecast ? (
              <HourlyForecast
                forecast={forecast}
                temperatureUnit={temperatureUnit}
              />
            ) : (
              <ForecastLoading />
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ErrorBoundary>
      <div className='min-h-screen bg-weather-navy px-4 sm:px-6 md:px-6 lg:px-28 max-w-[1440px] mx-auto'>
        <Header />

        <div className='px-0 md:px-6'>
          {/* Main Title */}
          <div className='text-center mb-8 md:mb-12'>
            <h2 className='text-[52px] font-bold text-foreground my-8 md:mb-16 text-balance font-display leading-tight'>
              How's the sky looking today?
            </h2>

            {/* Search Bar */}
            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>
      </div>
    </ErrorBoundary>
  );
}
