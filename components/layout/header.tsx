"use client";

import { UnitsDropdown } from "@/components/settings/units-dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between py-3 md:py-6 lg:py-12",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full  flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Weather Now Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-semibold text-weather-white font-display">
          Weather Now
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UnitsDropdown />
      </div>
    </header>
  );
}
