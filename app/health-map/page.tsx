"use client"

import { Heart, Activity, Brain, TrendingUp, Smile, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"

const healthCategories = [
  {
    name: "Физическое здоровье",
    score: 78,
    icon: Activity,
    color: "text-chart-1",
    bgColor: "bg-chart-1",
    metrics: [
      { name: "Активность", value: 85 },
      { name: "Питание", value: 72 },
      { name: "Сон", value: 68 },
    ],
  },
  {
    name: "Восстановление",
    score: 65,
    icon: Heart,
    color: "text-chart-2",
    bgColor: "bg-chart-2",
    metrics: [
      { name: "Отдых", value: 70 },
      { name: "Гидратация", value: 60 },
      { name: "Энергия", value: 65 },
    ],
  },
  {
    name: "Психоэмоциональное",
    score: 82,
    icon: Brain,
    color: "text-chart-3",
    bgColor: "bg-chart-3",
    metrics: [
      { name: "Настроение", value: 88 },
      { name: "Стресс", value: 75 },
      { name: "Медитация", value: 83 },
    ],
  },
]

const overallScore = Math.round(healthCategories.reduce((acc, cat) => acc + cat.score, 0) / healthCategories.length)

export default function HealthMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-20">
      <div className="bg-primary px-6 pb-6 pt-12 text-primary-foreground">
        <h1 className="text-2xl font-bold">Карта здоровья</h1>
        <p className="mt-1 text-sm text-primary-foreground/80">Визуализация вашего состояния</p>
      </div>

      <div className="mx-auto max-w-lg space-y-6 px-4 py-6">
        <Card className="border-primary/10 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-4 inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-card">
                  <div>
                    <div className="text-4xl font-bold text-primary">{overallScore}</div>
                    <div className="text-xs text-muted-foreground">из 100</div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Общий показатель</h2>
              <p className="mt-1 text-sm text-muted-foreground">Хорошее состояние здоровья</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {healthCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="border-primary/10 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.bgColor}/10`}>
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-semibold">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.score}%</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${category.color}`}>{category.score}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={category.score} className="h-2" />
                  <div className="space-y-2 pt-2">
                    {category.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.value} className="h-1.5 w-20" />
                          <span className="w-10 text-right font-medium">{metric.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border-accent/50 bg-gradient-to-br from-accent/20 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-primary" />
              Рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-background/50 p-3">
              <Smile className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Продолжайте в том же духе!</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ваш уровень физической активности соответствует рекомендациям
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-background/50 p-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Улучшите режим сна</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Старайтесь спать не менее 7-8 часов в сутки для лучшего восстановления
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-destructive">Важно:</span> Данная визуализация основана на введенных
              данных и не является медицинским диагнозом. При любых проблемах со здоровьем обратитесь к врачу.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
