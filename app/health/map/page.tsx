"use client"

import { Plus, Info, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HealthRing } from "@/components/health-ring"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HealthMapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Карта здоровья</h1>
        <p className="text-muted-foreground mt-2">Визуализация вашего состояния по ключевым категориям</p>
      </div>

      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold text-foreground">Основные показатели</h2>
            <button className="text-muted-foreground hover:text-foreground">
              <Info className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HealthRing value={85} label="Физическое здоровье" color="#7C5CFF" />
            <HealthRing value={72} label="Восстановление" color="#B9A7FF" />
            <HealthRing value={90} label="Психоэмоциональное" color="#C7B8FF" />
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-muted/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Как считается:</strong> Показатели рассчитываются на основе ваших
              данных о активности, сне, питании, стрессе и общем самочувствии за последние 7 дней.
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Интерактивные индикаторы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-3xl border-primary/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Вода за сегодня</h3>
                  <p className="text-2xl font-bold text-primary mt-2">1.2 / 2.0 л</p>
                </div>
                <div className="text-3xl">💧</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">60% от цели</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-primary/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Шаги</h3>
                  <p className="text-2xl font-bold text-primary mt-2">6,420 / 10,000</p>
                </div>
                <div className="text-3xl">👟</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: "64%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">64% от цели</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-primary/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Сон</h3>
                  <p className="text-2xl font-bold text-primary mt-2">7 / 8 ч</p>
                </div>
                <div className="text-3xl">😴</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: "87%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">87% от цели</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
          <Plus className="mr-2 h-5 w-5" />
          Добавить данные
        </Button>
        <Button asChild variant="outline" className="flex-1 rounded-2xl h-12 bg-transparent">
          <Link href="/">
            <TrendingUp className="mr-2 h-5 w-5" />
           На главную
          </Link>
        </Button>
      </div>

      <Card className="rounded-3xl border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Данные предоставлены для информационных целей. При значительных отклонениях показателей или ухудшении
            самочувствия обратитесь к врачу.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
