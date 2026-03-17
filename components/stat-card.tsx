import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  className?: string
}

export function StatCard({ icon: Icon, label, value, unit, className }: StatCardProps) {
  return (
    <Card className={cn("p-6 rounded-3xl border-primary/10 bg-gradient-to-br from-white to-primary/5", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  )
}
