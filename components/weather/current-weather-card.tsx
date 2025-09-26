"use client";

import { WeatherCard } from "@/components/ui/weather-card";
import { WeatherIcon } from "@/components/ui/weather-icon";
import { convertTemperature, formatDate } from "@/utils/weather";
import type { WeatherData, TemperatureUnit } from "@/types/weather";
import { cn } from "@/lib/utils";

interface CurrentWeatherCardProps {
  weather: WeatherData;
  temperatureUnit: TemperatureUnit;
  className?: string;
}

export function CurrentWeatherCard({
  weather,
  temperatureUnit,
  className,
}: CurrentWeatherCardProps) {
  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const unitSymbol = temperatureUnit === "celsius" ? "°C" : "°F";

  return (
    <WeatherCard
      className={cn(
        "relative overflow-hidden bg-cover bg-center bg-no-repeat h-[286px]",
        className
      )}
      style={{ backgroundImage: "url('/weatherbg.png')" }}
    >
      <div className="flex justify-between items-center h-full px-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-weather-white mb-2 text-balance">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-weather-white/80 text-pretty">
            {formatDate(weather.dt)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <WeatherIcon iconCode={weather.weather[0].icon} size={120} />
            {/* <span className="text-weather-white/80 text-sm mt-1 capitalize">
              {weather.weather[0].description}
            </span> */}
          </div>
          <div className="text-6xl font-bold italic text-weather-white">
            {temperature}
            <span className="text-3xl">{unitSymbol}</span>
          </div>
        </div>
      </div>
    </WeatherCard>
  );
}