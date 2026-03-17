"use client"

import {
  MessageSquare,
  Stethoscope,
  Music,
  Map,
  Footprints,
  Droplet,
  Moon,
  Smile,
  TrendingUp,
  Award,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Добрый день, Ольга</h1>
        <p className="text-muted-foreground mt-2">Как ваше самочувствие сегодня?</p>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Состояние сегодня</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Ваше самочувствие хорошее. Все показатели в норме, продолжайте поддерживать активный образ жизни.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Сон: хорошо</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Вода: 1.2л</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Стресс: низкий
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Footprints} label="Шаги" value="6,420" unit="шагов" />
        <StatCard icon={Droplet} label="Вода" value="1.2" unit="л" />
        <StatCard icon={Moon} label="Сон" value="7ч 10м" />
        <StatCard icon={Smile} label="Настроение" value="Спокойно" />
      </div>

      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Прогресс за неделю
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-2xl bg-primary/5">
              <p className="text-2xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground mt-1">Цель по воде</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-success/10">
              <p className="text-2xl font-bold text-success">12,450</p>
              <p className="text-sm text-muted-foreground mt-1">Средн. шаги</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-primary/5">
              <p className="text-2xl font-bold text-primary">7.5ч</p>
              <p className="text-sm text-muted-foreground mt-1">Средн. сон</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-warning/10">
              <p className="text-2xl font-bold text-warning">240</p>
              <p className="text-sm text-muted-foreground mt-1">Баллы</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Активные челленджи
            </h2>
            <Link href="/challenges" className="text-sm text-primary hover:underline">
              Все
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div className="flex-1">
                <p className="font-semibold text-foreground">7 дней воды</p>
                <p className="text-sm text-muted-foreground">День 4 из 7</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">50</p>
                <p className="text-xs text-muted-foreground">баллов</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div className="flex-1">
                <p className="font-semibold text-foreground">10 000 шагов</p>
                <p className="text-sm text-muted-foreground">День 3 из 7</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">75</p>
                <p className="text-xs text-muted-foreground">баллов</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/ai">
            <Card className="rounded-3xl border-primary/10 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF]">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Чат с ИИ</h3>
                  <p className="text-sm text-muted-foreground">Задайте вопрос о здоровье</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/doctors">
            <Card className="rounded-3xl border-primary/10 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Stethoscope className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Выбрать врача</h3>
                  <p className="text-sm text-muted-foreground">Запишитесь на консультацию</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/meditations">
            <Card className="rounded-3xl border-primary/10 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/50">
                  <Music className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Медитация дня</h3>
                  <p className="text-sm text-muted-foreground">10 минут расслабления</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/health/map">
            <Card className="rounded-3xl border-primary/10 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
                  <Map className="h-7 w-7 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Карта здоровья</h3>
                  <p className="text-sm text-muted-foreground">Визуализация состояния</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
