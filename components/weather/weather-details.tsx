"use client";

import {
  Eye,
  Sunrise,
  Sunset,
  Gauge,
  Droplets,
  Thermometer,
} from "lucide-react";
import { WeatherCard } from "@/components/ui/weather-card";
import { convertTemperature, formatTime } from "@/utils/weather";
import type { WeatherData, WeatherSettings } from "@/types/weather";

interface WeatherDetailsProps {
  weather: WeatherData;
  settings: WeatherSettings;
  className?: string;
}

export function WeatherDetails({
  weather,
  settings,
  className,
}: WeatherDetailsProps) {
  const visibility = Math.round(weather.visibility / 1000);
  const dewPoint = convertTemperature(
    weather.main.temp - (100 - weather.main.humidity) / 5,
    settings.temperatureUnit
  );

  const tempUnit = settings.temperatureUnit === "celsius" ? "°C" : "°F";

  const details = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${visibility} km`,
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(weather.sys.sunrise),
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(weather.sys.sunset),
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: Droplets,
      label: "Dew Point",
      value: `${dewPoint}${tempUnit}`,
    },
    {
      icon: Thermometer,
      label: "Min/Max",
      value: `${convertTemperature(
        weather.main.temp_min,
        settings.temperatureUnit
      )}°/${convertTemperature(
        weather.main.temp_max,
        settings.temperatureUnit
      )}°`,
    },
  ];

  return (
    <div className={className}>
      <h3 className='text-xl font-semibold text-weather-white mb-4'>
        Weather Details
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {details.map((detail) => (
          <div
            key={detail.label}
            className='w-full flex justify-between items-center gap-3 p-4 bg-weather-dark-purple p-5 border border-weather-medium-purple rounded-md'
          >
            <div className='space-y-1'>
              <detail.icon className='w-5 h-5 text-weather-blue flex-shrink-0' />
              <p className='text-weather-light-gray text-sm'>{detail.label}</p>
            </div>
            <div className='min-w-0'>
              <p className='text-weather-white font-semibold truncate'>
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
