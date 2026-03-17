"use client"

import { ArrowLeft, Play, Check, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

const days = [
  { day: 1, title: "Введение в практику", duration: "10:00", completed: true, locked: false },
  { day: 2, title: "Дыхательные упражнения", duration: "10:00", completed: true, locked: false },
  { day: 3, title: "Осознанность", duration: "10:00", completed: true, locked: false },
  { day: 4, title: "Расслабление тела", duration: "10:00", completed: false, locked: false },
  { day: 5, title: "Работа с эмоциями", duration: "10:00", completed: false, locked: false },
  { day: 6, title: "Благодарность", duration: "10:00", completed: false, locked: false },
  { day: 7, title: "Завершение курса", duration: "10:00", completed: false, locked: false },
]

export default function CourseDaysPage() {
  const router = useRouter()
  const params = useParams()

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />К курсам
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">7 дней восстановления</h1>
        <p className="text-muted-foreground mt-2">Выберите день для медитации</p>
      </div>

      <div className="space-y-3">
        {days.map((item) => (
          <Card
            key={item.day}
            className={cn(
              "rounded-3xl border-primary/10 transition-all",
              !item.locked && "hover:shadow-lg cursor-pointer",
              item.locked && "opacity-50",
            )}
            onClick={() => !item.locked && router.push(`/meditations/${params.courseId}/${item.day}`)}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0",
                  item.completed ? "bg-success/10" : "bg-primary/10",
                )}
              >
                {item.locked ? (
                  <Lock className="h-6 w-6 text-muted-foreground" />
                ) : item.completed ? (
                  <Check className="h-6 w-6 text-success" />
                ) : (
                  <Play className="h-6 w-6 text-primary" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">День {item.day}</h3>
                  {item.completed && (
                    <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Пройдено</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
              </div>

              <div className="text-sm text-muted-foreground">{item.duration}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
