import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  className?: string;
  variant?: "weather" | "forecast" | "hourly";
  index?: number;
}

const stats = [
  {
    label: "Feels Like",
    value: "--",
  },
  {
    label: "Humidity",
    value: "--",
  },
  {
    label: "Wind",
    value: "--",
  },
  {
    label: "Precipitation",
    value: "--",
  },
];

export function SkeletonCard({
  className,
  variant = "weather",
  index,
}: SkeletonCardProps & { index?: number }) {
  if (variant === "weather") {
    const stat = stats[index || 0];
    return (
      <div
        className={cn(
          "border border-weather-medium-purple bg-weather-dark-purple rounded-xl p-5",
          className
        )}
      >
        <div className='space-y-4'>
          <h3 className='text-weather-light-gray text-base font-medium'>
            {stat.label}
          </h3>
          <div className='text-weather-light-gray text-md font-bold'>
            {stat.value}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "forecast") {
    return (
      <div
        className={cn(
          "border border-weather-medium-purple bg-weather-dark-purple rounded-xl p-3 text-center",
          className
        )}
      >
        <Skeleton className='h-4 w-8 mx-auto mb-3 bg-weather-dark-purple-gray' />
        <Skeleton className='h-8 w-8 mx-auto mb-3 bg-weather-dark-purple-gray' />
        <div className='flex justify-between items-center gap-4'>
          <Skeleton className='h-5 w-8 mx-auto bg-weather-dark-purple-gray' />
          <Skeleton className='h-4 w-8 mx-auto bg-weather-dark-purple-gray' />
        </div>
      </div>
    );
  }

  if (variant === "hourly") {
    return (
      <div
        className={cn(
          "border border-weather-medium-purple bg-weather-dark-purple-gray rounded-md p-4 flex items-center justify-between",
          className
        )}
      >
        <div className='flex items-center gap-3'>
          <Skeleton className='h-5 w-5 bg-weather-dark-purple-gray' />
          <Skeleton className='h-5 w-12 bg-weather-dark-purple-gray' />
        </div>
        <Skeleton className='h-5 w-8 bg-weather-dark-purple-gray' />
      </div>
    );
  }

  return null;
}
