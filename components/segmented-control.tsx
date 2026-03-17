"use client"

import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={cn("inline-flex rounded-2xl bg-muted p-1", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-xl px-6 py-2 text-sm font-medium transition-all",
            value === option ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
