import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "gradient" | "glass"
}

export function WeatherCard({ children, className, variant = "default" }: WeatherCardProps) {
  return (
    <Card
      className={cn(
        "border-0 text-weather-white",
        variant === "default" && "bg-weather-medium-purple",
        variant === "gradient" && "weather-gradient",
        variant === "glass" && "glass-effect",
        className,
      )}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}
