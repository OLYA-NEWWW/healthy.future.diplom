import Image from "next/image"
import Link from "next/link"
import { Star, MessageSquare, Video } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DoctorCardProps {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  price: number
  image: string
  format: string[]
}

export function DoctorCard({ id, name, specialty, experience, rating, price, image, format }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border-primary/10 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 p-6">
        <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-muted-foreground">{experience} лет опыта</span>
            <span className="font-semibold text-primary">{price} ₽</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {format.includes("chat") && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                Чат
              </div>
            )}
            {format.includes("video") && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Video className="h-3.5 w-3.5" />
                Видео
              </div>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 sm:justify-center">
          <Button asChild variant="outline" className="flex-1 sm:flex-none rounded-xl bg-transparent">
            <Link href={`/doctors/${id}`}>Профиль</Link>
          </Button>
          <Button asChild className="flex-1 sm:flex-none rounded-xl bg-primary">
            <Link href={`/doctors/${id}/book`}>Записаться</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
