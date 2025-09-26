import type React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "glass";
  style?: React.CSSProperties;
}

export function WeatherCard({
  children,
  className,
  variant = "default",
  style,
}: WeatherCardProps) {
  return (
    <Card
      className={cn(
        "border-0 text-weather-white",
        variant === "default" && "bg-weather-medium-purple",
        variant === "gradient" && "weather-gradient",
        variant === "glass" && "glass-effect",
        className
      )}
      style={style}
    >
      <CardContent className="p-0 h-full">{children}</CardContent>
    </Card>
  );
}
