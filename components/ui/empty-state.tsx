import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  message?: string
  className?: string
}

export function EmptyState({
  title = "No search result found!",
  message = "Try searching for a different city or check your spelling.",
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-weather-medium-purple flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-weather-white" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-weather-white mb-3 text-balance">{title}</h3>

      <p className="text-weather-light-gray max-w-md text-pretty">{message}</p>
    </div>
  )
}
