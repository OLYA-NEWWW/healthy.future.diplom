"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    id: "1",
    title: "7 дней восстановления",
    description: "Курс медитаций для восстановления после стресса и болезней",
    duration: "10 мин/день",
    progress: 3,
    total: 7,
    image: "/meditation-morning.jpg",
  },
  {
    id: "2",
    title: "Сон и спокойствие",
    description: "Улучшите качество сна с помощью вечерних медитаций",
    duration: "15 мин/день",
    progress: 0,
    total: 7,
    image: "/meditation-sleep.jpg",
  },
  {
    id: "3",
    title: "Снижение стресса",
    description: "Техники для управления стрессом в повседневной жизни",
    duration: "12 мин/день",
    progress: 0,
    total: 10,
    image: "/meditation-stress.jpg",
  },
]

export default function MeditationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Медитации</h1>
        <p className="text-muted-foreground mt-2">Курсы медитаций для расслабления и восстановления</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="rounded-3xl border-primary/10 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${course.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">{course.duration}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
              </div>

              {course.progress > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium text-primary">
                      {course.progress} / {course.total}
                    </span>
                  </div>
                  <Progress value={(course.progress / course.total) * 100} className="h-2" />
                </div>
              ) : null}

              <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
                <Link href={`/meditations/${course.id}`}>Открыть курс</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
