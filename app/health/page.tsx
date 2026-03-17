"use client"

import { useState } from "react"
import { ArrowRight, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SegmentedControl } from "@/components/segmented-control"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const mockData = {
  день: { value: 1200, label: "ккал", data: [800, 900, 1200, 1100, 950, 1150, 1200] },
  неделя: { value: 8400, label: "ккал", data: [5600, 6200, 7800, 8400, 7900, 8100, 8400] },
  месяц: { value: 36000, label: "ккал", data: [28000, 30000, 33000, 36000] },
}

export default function HealthPage() {
  const [period, setPeriod] = useState("Неделя")
  const currentData = mockData[period.toLowerCase() as keyof typeof mockData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Мониторинг</h1>
        <p className="text-muted-foreground mt-2">Отслеживайте активность, питание, сон и воду</p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center">
        <SegmentedControl options={["День", "Неделя", "Месяц"]} value={period} onChange={setPeriod} />
      </div>

      {/* Main Stats */}
      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-2">
              {currentData.value.toLocaleString()}{" "}
              <span className="text-2xl text-muted-foreground">{currentData.label}</span>
            </div>
            <p className="text-muted-foreground">Активность за {period.toLowerCase()}</p>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 flex items-end justify-around gap-2 border-b border-border pb-4">
            {currentData.data.map((value, index) => {
              const maxValue = Math.max(...currentData.data)
              const height = (value / maxValue) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#7C5CFF] to-[#C7B8FF] rounded-t-xl transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {period === "День"
                      ? `${index * 4}:00`
                      : period === "Неделя"
                        ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][index]
                        : `Нед ${index + 1}`}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Показатели за 7 дней</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">54,231</div>
              <div className="text-sm text-muted-foreground">Шаги</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">8.4 л</div>
              <div className="text-sm text-muted-foreground">Вода</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50 ч</div>
              <div className="text-sm text-muted-foreground">Сон</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="rounded-3xl border-primary/10 bg-accent/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Рекомендации
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              <span>Старайтесь проходить минимум 8000 шагов в день для поддержания активности</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              <span>Пейте воду регулярно в течение дня, минимум 2 литра</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              <span>Обеспечьте себе 7-8 часов качественного сна каждую ночь</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline" className="flex-1 rounded-2xl h-12 bg-transparent">
          <Link href="/health/map">
            Перейти к карте здоровья
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
