"use client"

import { Star, Award, GraduationCap, Clock, ArrowLeft, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const doctor = {
  id: "1",
  name: "Иванова Елена Сергеевна",
  specialty: "Терапевт",
  experience: 15,
  rating: 4.9,
  reviewCount: 234,
  price: 3000,
  image: "/female-doctor.jpg",
  about:
    "Специалист высшей категории с 15-летним опытом работы. Специализируюсь на диагностике и лечении широкого спектра заболеваний. Индивидуальный подход к каждому пациенту.",
  education: [
    "Первый МГМУ им. И.М. Сеченова, лечебное дело (2008)",
    "Ординатура по терапии, НИИ им. Склифосовского (2010)",
    "Повышение квалификации, Европейская школа медицины (2020)",
  ],
  reviews: [
    {
      author: "Мария К.",
      date: "15 дек 2024",
      rating: 5,
      text: "Отличный врач! Внимательная, профессиональная. Помогла разобраться с моими жалобами, назначила эффективное лечение.",
    },
    {
      author: "Алексей П.",
      date: "10 дек 2024",
      rating: 5,
      text: "Очень довольна консультацией. Врач уделила достаточно времени, всё подробно объяснила. Рекомендую!",
    },
  ],
}

export default function DoctorProfilePage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card className="rounded-3xl border-primary/10 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-muted flex-shrink-0">
              <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                <p className="text-lg text-muted-foreground">{doctor.specialty}</p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xl">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviewCount} отзывов)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{doctor.experience} лет опыта</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{doctor.price} ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />О враче
            </h2>
            <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Образование и опыт
            </h2>
            <ul className="space-y-2">
              {doctor.education.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Отзывы</h2>
            <div className="space-y-4">
              {doctor.reviews.map((review, index) => (
                <Card key={index} className="rounded-2xl border-primary/10 bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sticky bottom-4">
        <Button
          onClick={() => router.push("/consultations/1")}
          variant="outline"
          className="flex-1 rounded-2xl h-14 bg-transparent"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Задать вопрос в чате
        </Button>
        <Button asChild className="flex-1 rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
          <Link href={`/doctors/${doctor.id}/book`}>Записаться</Link>
        </Button>
      </div>
    </div>
  )
}
