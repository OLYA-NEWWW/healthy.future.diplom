import type React from "react"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-2xl bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

GradientButton.displayName = "GradientButton"
