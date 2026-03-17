"use client"

import { useState } from "react"
import { ChevronRight, Heart, Activity, MessageSquare, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

const slides = [
  {
    icon: Heart,
    title: "Добро пожаловать в Healthy Future",
    description:
      "Платформа для отслеживания здоровья и восстановления после болезней. Мониторинг показателей, консультации с врачами и ИИ-поддержка.",
  },
  {
    icon: Activity,
    title: "Мониторинг здоровья",
    description:
      "Отслеживайте шаги, сон, воду, питание и другие показатели. Получайте персонализированные рекомендации для восстановления.",
  },
  {
    icon: MessageSquare,
    title: "ИИ-консультант в чате",
    description:
      "Задавайте вопросы о здоровье и получайте рекомендации. ИИ-консультант не ставит диагноз и не заменяет врача.",
  },
  {
    icon: Stethoscope,
    title: "Врачи онлайн: чат и видеозвонок",
    description: "Общайтесь с квалифицированными врачами онлайн. Доступны подписки и разовые консультации.",
  },
]

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const currentSlideData = slides[currentSlide]
  const Icon = currentSlideData.icon

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-6">
      <div className="mt-12 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] shadow-lg">
          <Heart className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">Healthy Future</h1>
        <p className="mt-2 text-muted-foreground">Ваше здоровье — наш приоритет</p>
      </div>

      <Card className="w-full max-w-lg border-primary/10 shadow-2xl rounded-[2rem]">
        <CardContent className="flex flex-col items-center gap-8 p-10 text-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5">
            <Icon className="h-12 w-12 text-primary" />
          </div>

          <div className="space-y-4">
            <h2 className="text-balance text-2xl font-semibold text-foreground leading-tight">
              {currentSlideData.title}
            </h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">{currentSlideData.description}</p>
          </div>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === currentSlide ? "w-10 bg-primary" : "w-2.5 bg-primary/20 hover:bg-primary/40",
                )}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-12 flex w-full max-w-lg flex-col gap-3">
        {currentSlide === slides.length - 1 ? (
          <>
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl text-base h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg transition-all"
            >
              <Link href="/auth">
                Начать
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full rounded-2xl text-base h-12">
              <Link href="/auth">У меня уже есть аккаунт</Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              <Link href="#" className="underline hover:text-foreground">
                Условия и конфиденциальность
              </Link>
            </p>
          </>
        ) : (
          <>
            <Button
              onClick={() => setCurrentSlide((prev) => prev + 1)}
              size="lg"
              className="w-full rounded-2xl text-base h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg transition-all"
            >
              Далее
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            {currentSlide > 0 && (
              <Button
                onClick={() => setCurrentSlide((prev) => prev - 1)}
                variant="ghost"
                size="lg"
                className="w-full rounded-2xl"
              >
                Назад
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
