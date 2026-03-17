"use client"

import { useState } from "react"
import { Activity, Footprints, Utensils, Moon, Droplet, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const activityData = {
  today: { steps: 6543, calories: 420, distance: 4.8, activeMinutes: 45 },
  weekly: [
    { day: "Пн", steps: 8234 },
    { day: "Вт", steps: 7456 },
    { day: "Ср", steps: 9123 },
    { day: "Чт", steps: 6789 },
    { day: "Пт", steps: 8901 },
    { day: "Сб", steps: 5234 },
    { day: "Вс", steps: 6543 },
  ],
}

const nutritionData = {
  today: { calories: 1847, protein: 78, carbs: 215, fat: 62 },
  target: { calories: 2000, protein: 80, carbs: 250, fat: 67 },
}

const sleepData = {
  lastNight: { duration: 7.2, quality: 85, deep: 2.1, light: 4.3, rem: 0.8 },
  weekly: [
    { day: "Пн", hours: 7.5 },
    { day: "Вт", hours: 6.8 },
    { day: "Ср", hours: 8.2 },
    { day: "Чт", hours: 7.1 },
    { day: "Пт", hours: 6.5 },
    { day: "Сб", hours: 8.5 },
    { day: "Вс", hours: 7.2 },
  ],
}

const waterData = {
  today: { current: 1.2, goal: 2.0 },
  log: [
    { time: "08:00", amount: 0.25 },
    { time: "10:30", amount: 0.3 },
    { time: "12:45", amount: 0.35 },
    { time: "15:00", amount: 0.3 },
  ],
}

export default function MonitoringPage() {
  const [dateFilter, setDateFilter] = useState("week")
  const maxSteps = Math.max(...activityData.weekly.map((d) => d.steps))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-20">
      <div className="bg-primary px-6 pb-6 pt-12 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Мониторинг здоровья</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">Отслеживайте ваш прогресс</p>
          </div>
          <Button variant="secondary" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Фильтр
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-6">
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="activity" className="text-xs">
              <Activity className="mr-1 h-3 w-3" />
              Активность
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs">
              <Utensils className="mr-1 h-3 w-3" />
              Питание
            </TabsTrigger>
            <TabsTrigger value="sleep" className="text-xs">
              <Moon className="mr-1 h-3 w-3" />
              Сон
            </TabsTrigger>
            <TabsTrigger value="water" className="text-xs">
              <Droplet className="mr-1 h-3 w-3" />
              Вода
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Сегодня</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-chart-1/10 p-4">
                    <div className="flex items-center gap-2 text-chart-1">
                      <Footprints className="h-4 w-4" />
                      <span className="text-xs font-medium">Шаги</span>
                    </div>
                    <div className="mt-2 text-2xl font-bold text-foreground">
                      {activityData.today.steps.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg bg-chart-2/10 p-4">
                    <div className="flex items-center gap-2 text-chart-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium">Калории</span>
                    </div>
                    <div className="mt-2 text-2xl font-bold text-foreground">{activityData.today.calories}</div>
                  </div>
                  <div className="rounded-lg bg-chart-3/10 p-4">
                    <p className="text-xs font-medium text-chart-3">Расстояние</p>
                    <div className="mt-2 text-2xl font-bold text-foreground">{activityData.today.distance} км</div>
                  </div>
                  <div className="rounded-lg bg-chart-4/10 p-4">
                    <p className="text-xs font-medium text-chart-4">Активность</p>
                    <div className="mt-2 text-2xl font-bold text-foreground">
                      {activityData.today.activeMinutes} мин
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Неделя</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2">
                  {activityData.weekly.map((day, index) => {
                    const height = (day.steps / maxSteps) * 100
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div className="relative w-full">
                          <div className="h-32 w-full rounded-t-lg bg-secondary">
                            <div
                              className="absolute bottom-0 w-full rounded-t-lg bg-primary transition-all"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Питание сегодня</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Калории</span>
                      <span className="text-muted-foreground">
                        {nutritionData.today.calories} / {nutritionData.target.calories} ккал
                      </span>
                    </div>
                    <Progress value={(nutritionData.today.calories / nutritionData.target.calories) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Белки</span>
                      <span className="text-muted-foreground">
                        {nutritionData.today.protein} / {nutritionData.target.protein} г
                      </span>
                    </div>
                    <Progress value={(nutritionData.today.protein / nutritionData.target.protein) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Углеводы</span>
                      <span className="text-muted-foreground">
                        {nutritionData.today.carbs} / {nutritionData.target.carbs} г
                      </span>
                    </div>
                    <Progress value={(nutritionData.today.carbs / nutritionData.target.carbs) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Жиры</span>
                      <span className="text-muted-foreground">
                        {nutritionData.today.fat} / {nutritionData.target.fat} г
                      </span>
                    </div>
                    <Progress value={(nutritionData.today.fat / nutritionData.target.fat) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-transparent" variant="outline">
              <Utensils className="mr-2 h-4 w-4" />
              Добавить прием пищи
            </Button>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Прошлая ночь</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Продолжительность</p>
                    <p className="text-3xl font-bold text-primary">{sleepData.lastNight.duration} ч</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Качество</p>
                    <p className="text-2xl font-bold text-foreground">{sleepData.lastNight.quality}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-chart-1/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Глубокий</p>
                    <p className="mt-1 text-lg font-bold text-chart-1">{sleepData.lastNight.deep}ч</p>
                  </div>
                  <div className="rounded-lg bg-chart-2/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Легкий</p>
                    <p className="mt-1 text-lg font-bold text-chart-2">{sleepData.lastNight.light}ч</p>
                  </div>
                  <div className="rounded-lg bg-chart-3/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">REM</p>
                    <p className="mt-1 text-lg font-bold text-chart-3">{sleepData.lastNight.rem}ч</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Неделя</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sleepData.weekly.map((day, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-8 text-sm font-medium text-muted-foreground">{day.day}</span>
                      <div className="flex-1">
                        <div className="h-8 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(day.hours / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-12 text-right text-sm font-semibold">{day.hours} ч</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water" className="space-y-4">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Сегодня</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-32 w-32 items-center justify-center rounded-full bg-chart-2/10">
                    <Droplet className="h-16 w-16 text-chart-2" />
                  </div>
                  <p className="text-4xl font-bold text-foreground">{waterData.today.current} л</p>
                  <p className="mt-1 text-sm text-muted-foreground">из {waterData.today.goal} л</p>
                  <Progress value={(waterData.today.current / waterData.today.goal) * 100} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">История</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waterData.log.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/20">
                          <Droplet className="h-5 w-5 text-chart-2" />
                        </div>
                        <span className="text-sm font-medium">{entry.time}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{entry.amount} л</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">
              <Droplet className="mr-2 h-4 w-4" />
              Добавить запись
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}
