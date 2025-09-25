"use client"

import { useState } from "react"
import { Settings, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { setTemperatureUnit, setWindSpeedUnit, setPrecipitationUnit } from "@/redux/features/settingsSlice"
import type { TemperatureUnit, WindSpeedUnit, PrecipitationUnit } from "@/types/weather"
import { cn } from "@/lib/utils"

interface UnitsDropdownProps {
  className?: string
}

export function UnitsDropdown({ className }: UnitsDropdownProps) {
  const dispatch = useAppDispatch()
  const { temperatureUnit, windSpeedUnit, precipitationUnit } = useAppSelector((state) => state.settings)
  const [isOpen, setIsOpen] = useState(false)

  const handleTemperatureChange = (unit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(unit))
  }

  const handleWindSpeedChange = (unit: WindSpeedUnit) => {
    dispatch(setWindSpeedUnit(unit))
  }

  const handlePrecipitationChange = (unit: PrecipitationUnit) => {
    dispatch(setPrecipitationUnit(unit))
  }

  const switchToImperial = () => {
    dispatch(setTemperatureUnit("fahrenheit"))
    dispatch(setWindSpeedUnit("mph"))
    dispatch(setPrecipitationUnit("inches"))
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 text-weather-white border-weather-medium-purple hover:bg-weather-medium-purple bg-weather-medium-purple",
            className,
          )}
        >
          <Settings className="w-4 h-4" />
          Units
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-weather-medium-purple border-weather-dark-purple-gray"
        align="end"
        sideOffset={8}
      >
        {/* Quick Switch to Imperial */}
        <DropdownMenuItem
          onClick={switchToImperial}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray"
        >
          Switch to Imperial
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-weather-dark-purple-gray" />

        {/* Temperature */}
        <DropdownMenuLabel className="text-weather-light-gray text-xs font-medium">Temperature</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleTemperatureChange("celsius")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>Celsius (°C)</span>
          {temperatureUnit === "celsius" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleTemperatureChange("fahrenheit")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>Fahrenheit (°F)</span>
          {temperatureUnit === "fahrenheit" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-weather-dark-purple-gray" />

        {/* Wind Speed */}
        <DropdownMenuLabel className="text-weather-light-gray text-xs font-medium">Wind Speed</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleWindSpeedChange("kmh")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>km/h</span>
          {windSpeedUnit === "kmh" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleWindSpeedChange("mph")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>mph</span>
          {windSpeedUnit === "mph" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-weather-dark-purple-gray" />

        {/* Precipitation */}
        <DropdownMenuLabel className="text-weather-light-gray text-xs font-medium">Precipitation</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handlePrecipitationChange("mm")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>Millimeters (mm)</span>
          {precipitationUnit === "mm" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handlePrecipitationChange("inches")}
          className="text-weather-white hover:bg-weather-dark-purple-gray focus:bg-weather-dark-purple-gray flex items-center justify-between"
        >
          <span>Inches (in)</span>
          {precipitationUnit === "inches" && <Check className="w-4 h-4 text-weather-blue" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
