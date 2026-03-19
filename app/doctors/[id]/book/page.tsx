"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, Award, GraduationCap, Clock, ArrowLeft, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function DoctorProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadDoctor()
    }
  }, [params.id])

  const loadDoctor = async () => {
    try {
      const res = await fetch(`/api/doctors/${params.id}`)
      const data = await res.json()
      setDoctor(data.doctor)
    } catch (error) {
      console.error('Error loading doctor:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Загрузка...</div>
  }

  if (!doctor) {
    return <div className="p-8 text-center">Врач не найден</div>
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card className="rounded-3xl border-primary/10 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7C5CFF]/10 to-[#C7B8FF]/10 p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-muted flex-shrink-0">
              <div className="h-full w-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white text-4xl font-bold">
                {doctor.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                <p className="text-lg text-muted-foreground">{doctor.specialty}</p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xl">{doctor.rating || 5.0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#7C5CFF]" />
                  <span className="font-medium">{doctor.experience || 0} лет опыта</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-[#7C5CFF]" />
              О враче
            </h2>
            <p className="text-muted-foreground leading-relaxed">{doctor.bio || "Информация о враче отсутствует"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#7C5CFF]" />
              Образование и опыт
            </h2>
            <ul className="space-y-2">
              {doctor.education?.length > 0 ? (
                doctor.education.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#7C5CFF] mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground">Информация об образовании отсутствует</li>
              )}
            </ul>
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