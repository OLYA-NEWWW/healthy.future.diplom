import Link from "next/link"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DoctorCardProps {
  id: string
  name: string
  specialty: string
  experience?: number
  rating?: number
}

export function DoctorCard({ id, name, specialty, experience, rating }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border-primary/10 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 p-6 items-center">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {name?.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{specialty}</p>
          <div className="flex items-center justify-center sm:justify-start gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating || 5.0}</span>
            </div>
            <span className="text-muted-foreground">{experience || 0} лет</span>
          </div>
        </div>

        <Button asChild className="rounded-xl bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
          <Link href={`/doctors/${id}`}>Профиль</Link>
        </Button>
      </div>
    </Card>
  )
}