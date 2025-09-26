"use client";

import { useState } from "react";
import { Settings, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setTemperatureUnit,
  setWindSpeedUnit,
  setPrecipitationUnit,
} from "@/redux/features/settingsSlice";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/types/weather";
import { cn } from "@/lib/utils";

interface UnitsDropdownProps {
  className?: string;
}

export function UnitsDropdown({ className }: UnitsDropdownProps) {
  const dispatch = useAppDispatch();
  const { temperatureUnit, windSpeedUnit, precipitationUnit } = useAppSelector(
    (state) => state.settings
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleTemperatureChange = (unit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(unit));
  };

  const handleWindSpeedChange = (unit: WindSpeedUnit) => {
    dispatch(setWindSpeedUnit(unit));
  };

  const handlePrecipitationChange = (unit: PrecipitationUnit) => {
    dispatch(setPrecipitationUnit(unit));
  };

  const switchToImperial = () => {
    dispatch(setTemperatureUnit("fahrenheit"));
    dispatch(setWindSpeedUnit("mph"));
    dispatch(setPrecipitationUnit("inches"));
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center justify-center gap-2 w-[119px] h-[43px] rounded-lg text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-weather-dark-purple",
            className
          )}
        >
          <Settings className="w-4 h-4" />
          <span>Units</span>
          <ChevronDown className="w-5 h-5 font-bold" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-weather-dark-purple border border-weather-medium-purple rounded-lg p-2 space-y-1"
        align="end"
        sideOffset={8}
      >
        {/* Quick Switch to Imperial */}
        <DropdownMenuItem
          onClick={switchToImperial}
          className="text-weather-white p-2 font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray rounded-custom mb-0"
        >
          Switch to Imperial
        </DropdownMenuItem>

        {/* Temperature */}
        <DropdownMenuLabel className="text-[#ACACB7] text-sm font-medium pt-0">
          Temperature
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleTemperatureChange("celsius")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between ",
            temperatureUnit === "celsius" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>Celsius (°C)</span>
          {temperatureUnit === "celsius" && (
            <Check className="w-5 h-5 text-weather-white" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleTemperatureChange("fahrenheit")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between",
            temperatureUnit === "fahrenheit" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>Fahrenheit (°F)</span>
          {temperatureUnit === "fahrenheit" && (
            <Check className="w-5 h-5 text-weather-white" />
          )}
        </DropdownMenuItem>

        <div className="py-0">
          <DropdownMenuSeparator className="bg-weather-dark-purple-gray" />
        </div>

        {/* Wind Speed */}
        <DropdownMenuLabel className="text-[#ACACB7] text-sm font-medium">
          Wind Speed
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleWindSpeedChange("kmh")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between ",
            windSpeedUnit === "kmh" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>km/h</span>
          {windSpeedUnit === "kmh" && (
            <Check className="w-4 h-4 text-weather-white" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleWindSpeedChange("mph")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between",
            windSpeedUnit === "mph" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>mph</span>
          {windSpeedUnit === "mph" && (
            <Check className="w-4 h-4 text-weather-white" />
          )}
        </DropdownMenuItem>

        <div className="py-0">
          <DropdownMenuSeparator className="bg-weather-dark-purple-gray" />
        </div>

        {/* Precipitation */}
        <DropdownMenuLabel className="text-[#ACACB7] text-sm font-medium">
          Precipitation
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handlePrecipitationChange("mm")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between",
            precipitationUnit === "mm" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>Millimeters (mm)</span>
          {precipitationUnit === "mm" && (
            <Check className="w-4 h-4 text-weather-white" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handlePrecipitationChange("inches")}
          className={cn(
            "text-weather-white px-2 py-3 rounded-custom font-medium text-base hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between",
            precipitationUnit === "inches" && "bg-weather-dark-purple-gray"
          )}
        >
          <span>Inches (in)</span>
          {precipitationUnit === "inches" && (
            <Check className="w-4 h-4 text-weather-white" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
