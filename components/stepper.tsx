import { cn } from "@/lib/utils"

interface StepperProps {
  steps: number
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: steps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "h-3 w-3 rounded-full transition-all",
              index < currentStep ? "bg-primary" : index === currentStep ? "bg-primary w-8" : "bg-primary/20",
            )}
          />
          {index < steps - 1 && (
            <div className={cn("h-0.5 w-8 mx-1", index < currentStep ? "bg-primary" : "bg-primary/20")} />
          )}
        </div>
      ))}
    </div>
  )
}
