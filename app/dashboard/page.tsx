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
  ShieldCheck,
  BrainCircuit,
  HeartPulse,
  Video,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="rounded-3xl border-none bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] overflow-hidden relative">
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-white max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-white/90" />
                <span className="text-sm font-medium text-white/90">Healthy Future</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Забота о здоровье — это проще, чем кажется
              </h1>
              <p className="text-white/80 mt-3 text-base leading-relaxed">
                Вся медицинская помощь, ИИ-консультант, медитации и мотивация — в одном приложении
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shrink-0">
              <HeartPulse className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Проверенные врачи</p>
                <p className="text-white/70 text-xs">Верификация лицензий</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">ИИ-консультант</p>
                <p className="text-white/70 text-xs">Ответы 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Онлайн-консультации</p>
                <p className="text-white/70 text-xs">Чат и видеозвонки</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Психоэмоциональная поддержка</p>
                <p className="text-white/70 text-xs">Медитации и челленджи</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <Sparkles className="h-5 w-5 text-primary" />
            Ваш план восстановления
          </h2>
          <div className="space-y-4">
            {/* Шаг 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Утренняя медитация</p>
                <p className="text-sm text-muted-foreground mt-1">10 минут для заряда энергией и снятия стресса</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]" />
                  </div>
                  <span className="text-xs text-muted-foreground">3/4 дня</span>
                </div>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Выпейте стакан воды</p>
                <p className="text-sm text-muted-foreground mt-1">Поддерживайте водный баланс в течение дня</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]" />
                  </div>
                  <span className="text-xs text-muted-foreground">0.6/1.2 л</span>
                </div>
              </div>
            </div>

            {/* Шаг 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Прогулка на свежем воздухе</p>
                <p className="text-sm text-muted-foreground mt-1">Цель: 8 000 шагов. Осталось ещё 1 580</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]" />
                  </div>
                  <span className="text-xs text-muted-foreground">6 420/8 000</span>
                </div>
              </div>
            </div>

            {/* Шаг 4 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 opacity-60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Вечерняя запись в дневник</p>
                <p className="text-sm text-muted-foreground mt-1">Отметьте настроение и самочувствие перед сном</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Не начато</span>
                </div>
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