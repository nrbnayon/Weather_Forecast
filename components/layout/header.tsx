"use client"

import { Sun } from "lucide-react"
import { UnitsDropdown } from "@/components/settings/units-dropdown"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("flex items-center justify-between p-6", className)}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-weather-orange flex items-center justify-center">
          <Sun className="w-5 h-5 text-weather-white" />
        </div>
        <h1 className="text-xl font-semibold text-weather-white">Weather Now</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UnitsDropdown />
      </div>
    </header>
  )
}
