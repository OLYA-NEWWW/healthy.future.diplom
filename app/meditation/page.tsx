"use client"

import { Play, Pause, SkipBack, SkipForward, Clock, CheckCircle2, Lock, Volume2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"

const courses = [
  {
    id: 1,
    title: "Утренняя медитация",
    description: "Начните день с позитива",
    duration: "10 мин",
    sessions: 7,
    completed: 3,
    locked: false,
    image: "/meditation-morning.jpg",
  },
  {
    id: 2,
    title: "Снятие стресса",
    description: "Техники расслабления",
    duration: "15 мин",
    sessions: 10,
    completed: 0,
    locked: false,
    image: "/meditation-stress.jpg",
  },
  {
    id: 3,
    title: "Глубокий сон",
    description: "Подготовка ко сну",
    duration: "20 мин",
    sessions: 14,
    completed: 0,
    locked: true,
    image: "/meditation-sleep.jpg",
  },
]

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([75])
  const totalTime = 600 

  const handlePlayCourse = (courseId: number) => {
    setShowPlayer(true)
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-20">
      <div className="bg-gradient-to-br from-primary to-primary/80 px-6 pb-6 pt-12 text-primary-foreground">
        <h1 className="text-2xl font-bold">Медитация</h1>
        <p className="mt-1 text-sm text-primary-foreground/80">Курсы для восстановления и релаксации</p>
      </div>

      <div className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {showPlayer && (
          <Card className="border-primary/10 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={courses[0].image || "/placeholder.svg"}
                    alt={courses[0].title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Button size="icon" className="h-16 w-16 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="ml-1 h-8 w-8" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{courses[0].title}</h3>
                    <Badge>День 4 из 7</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Практика осознанности</p>
                </div>

                <div className="space-y-2">
                  <Progress value={(currentTime / totalTime) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalTime)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                  <span className="w-12 text-right text-xs text-muted-foreground">{volume[0]}%</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="h-12 w-12" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Завершить сессию
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Доступные курсы</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`border-primary/10 transition-all ${course.locked ? "opacity-60" : "hover:shadow-md"}`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      {course.locked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">{course.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>
                              {course.completed} / {course.sessions}
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          disabled={course.locked}
                          onClick={() => !course.locked && handlePlayCourse(course.id)}
                        >
                          {course.locked ? "Заблокировано" : "Начать"}
                        </Button>
                      </div>

                      {!course.locked && course.completed > 0 && (
                        <Progress value={(course.completed / course.sessions) * 100} className="mt-2 h-1.5" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-accent/50 bg-gradient-to-br from-accent/20 to-accent/10">
          <CardHeader>
            <CardTitle className="text-base">Польза медитации</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              Снижение уровня стресса и тревожности
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              Улучшение качества сна
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              Повышение концентрации и внимания
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
