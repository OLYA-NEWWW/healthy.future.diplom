"use client"

interface HealthRingProps {
  value: number
  label: string
  color?: string
  size?: number
}

export function HealthRing({ value, label, color = "#7C5CFF", size = 120 }: HealthRingProps) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r="45" stroke="#f0f0f0" strokeWidth="8" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center">{label}</p>
    </div>
  )
}
