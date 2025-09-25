"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchLoadingProps {
  message?: string
  className?: string
}

export function SearchLoading({ message = "Searching...", className }: SearchLoadingProps) {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="flex items-center gap-3 text-weather-white">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  )
}
