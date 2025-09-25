import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "loading-dots",
        size === "sm" && "w-10 h-10",
        size === "md" && "w-20 h-20",
        size === "lg" && "w-32 h-32",
        className,
      )}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
