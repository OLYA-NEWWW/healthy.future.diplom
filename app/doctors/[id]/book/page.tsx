"use client"

import { useState } from "react"
import { ArrowLeft, MessageSquare, Video, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function BookDoctorPage() {
  const router = useRouter()
  const [format, setFormat] = useState<"chat" | "video">("chat")
  const [plan, setPlan] = useState<"basic" | "pro">("basic")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleBooking = () => {
    router.push("/payment")
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к профилю
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Запись на консультацию</h1>
        <p className="text-muted-foreground mt-2">Иванова Елена Сергеевна, Терапевт</p>
      </div>

      {/* Format Selection */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Выберите формат</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={cn(
              "rounded-3xl cursor-pointer transition-all hover:shadow-lg",
              format === "chat" ? "border-primary border-2 bg-primary/5" : "border-primary/10",
            )}
            onClick={() => setFormat("chat")}
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Чат</h3>
                <p className="text-sm text-muted-foreground mt-1">Текстовое общение</p>
              </div>
              {format === "chat" && (
                <div className="flex justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={cn(
              "rounded-3xl cursor-pointer transition-all hover:shadow-lg",
              format === "video" ? "border-primary border-2 bg-primary/5" : "border-primary/10",
            )}
            onClick={() => setFormat("video")}
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Video className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Видеозвонок</h3>
                <p className="text-sm text-muted-foreground mt-1">Личная встреча онлайн</p>
              </div>
              {format === "video" && (
                <div className="flex justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Plan Selection */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Выберите тариф</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={cn(
              "rounded-3xl cursor-pointer transition-all hover:shadow-lg",
              plan === "basic" ? "border-primary border-2 bg-primary/5" : "border-primary/10",
            )}
            onClick={() => setPlan("basic")}
          >
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Базовый</h3>
                {plan === "basic" && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-primary">3000 ₽</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>30 минут консультации</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Рекомендации по лечению</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Чат поддержки 24 часа</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "rounded-3xl cursor-pointer transition-all hover:shadow-lg",
              plan === "pro" ? "border-primary border-2 bg-primary/5" : "border-primary/10",
            )}
            onClick={() => setPlan("pro")}
          >
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Продвинутый</h3>
                {plan === "pro" && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-primary">5000 ₽</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>60 минут консультации</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Подробный план лечения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Чат поддержки 7 дней</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Повторная консультация -50%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Выберите время</h2>
        <Card className="rounded-3xl border-primary/10">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">Доступные слоты на завтра, 30 декабря</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "rounded-xl py-3 px-4 text-sm font-medium transition-all",
                    selectedTime === time ? "bg-primary text-white" : "bg-muted hover:bg-primary/10 text-foreground",
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Button */}
      <div>
        <Button
          onClick={handleBooking}
          disabled={!selectedTime}
          className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
        >
          Перейти к оплате
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">Оплата демонстрационная (для диплома)</p>
      </div>
    </div>
  )
}
