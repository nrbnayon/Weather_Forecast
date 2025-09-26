"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherCard } from "@/components/ui/weather-card";
import { WeatherIcon } from "@/components/ui/weather-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertTemperature, formatTime } from "@/utils/weather";
import type { ForecastData, TemperatureUnit } from "@/types/weather";
import { cn } from "@/lib/utils";

interface HourlyForecastProps {
  forecast: ForecastData;
  temperatureUnit: TemperatureUnit;
  className?: string;
}

// Helper function to get full day name
const getFullDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return dayNames[date.getDay()];
  }
};

export function HourlyForecast({
  forecast,
  temperatureUnit,
  className,
}: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");

  // Group forecast by day with full day names
  const forecastByDay = forecast.list.reduce(
    (acc: Record<string, any[]>, item) => {
      const dayName = getFullDayName(item.dt);
      if (!acc[dayName]) {
        acc[dayName] = [];
      }
      acc[dayName].push(item);
      return acc;
    },
    {}
  );

  // Get available days
  const availableDays = Object.keys(forecastByDay);
  const currentSelectedDay = selectedDay || availableDays[0] || "Today";

  // Get hourly data for selected day (limit to 8 hours)
  const hourlyData = (forecastByDay[currentSelectedDay] || [])
    .slice(0, 8)
    .map((item) => ({
      time: formatTime(item.dt),
      icon: item.weather[0].icon,
      temp: convertTemperature(item.main.temp, temperatureUnit),
      description: item.weather[0].description,
    }));

  const unitSymbol = temperatureUnit === "celsius" ? "°" : "°";

  return (
    <div
      className={cn(
        "space-y-4 bg-weather-dark-purple p-6 rounded-xl mb-20",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-weather-white">
          Hourly forecast
        </h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "flex items-center justify-center gap-2 text-weather-white border border-weather-medium-purple hover:bg-weather-medium-purple dark:bg-[#3C3B5E] ",
                className
              )}
            >
              {currentSelectedDay}
              <ChevronDown className="w-5 h-5 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-weather-medium-purple border-weather-dark-purple-gray rounded-lg">
            {availableDays.map((day) => (
              <DropdownMenuItem
                key={day}
                onClick={() => setSelectedDay(day)}
                className="text-weather-white p-2 hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray rounded-custom"
              >
                {day}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        {hourlyData.map((hour, index) => (
          <WeatherCard
            key={`${hour.time}-${index}`}
            className="p-4 bg-weather-dark-purple-gray border border-weather-medium-purple rounded-md"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <WeatherIcon iconCode={hour.icon} size={40} />
                <span className="text-weather-white">{hour.time}</span>
              </div>
              <span className="text-weather-white font-semibold">
                {hour.temp}
                {unitSymbol}
              </span>
            </div>
          </WeatherCard>
        ))}
      </div>
    </div>
  );
}
