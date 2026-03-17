"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Play, Pause, SkipForward, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function MeditationPlayerPage() {
  const router = useRouter()
  const params = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [audioError, setAudioError] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrl = `/audio/course-${params.courseId}/day-${params.dayId}.mp3`

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      audioRef.current = new Audio(audioUrl)
      setAudioError(false)
      
      const audio = audioRef.current
      
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration || 0)
      })
      
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime)
      })
      
      audio.addEventListener("ended", () => {
        setIsPlaying(false)
      })
      
      audio.addEventListener("error", () => {
        setAudioError(true)
        setIsPlaying(false)
        setIsLoading(false)
      })
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
        }
      }
    }
  }, [audioUrl, params.courseId, params.dayId])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setIsLoading(false)
          setAudioError(false)
        })
        .catch(error => {
          console.error("Ошибка:", error)
          setAudioError(true)
          setIsLoading(false)
        })
    }
  }

  const skipForward = () => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, duration)
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0)
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />К списку дней
      </Button>

      <div className="max-w-2xl mx-auto">
        <Card className="rounded-[3rem] border-primary/10 overflow-hidden">
          <div className="h-80 bg-cover bg-center relative" style={{ backgroundImage: "url(/meditation-morning.jpg)" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                disabled={isLoading || audioError}
                className={`h-20 w-20 rounded-full flex items-center justify-center transition-transform ${
                  audioError 
                    ? "bg-red-100 cursor-not-allowed" 
                    : "bg-white/90 backdrop-blur hover:scale-110"
                }`}
              >
                {audioError ? (
                  <span className="text-xs text-red-600 p-2 text-center">Файл не найден</span>
                ) : isLoading ? (
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-10 w-10 text-primary" />
                ) : (
                  <Play className="h-10 w-10 text-primary ml-1" />
                )}
              </button>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">День {params.dayId}</h1>
              <p className="text-muted-foreground">Курс {params.courseId}, Медитация</p>
              
              {audioError && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">
                    Файл не найден: <code className="text-xs">{audioUrl}</code>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Положите файл в: <code>public{audioUrl}</code>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 bg-transparent"
                onClick={skipBackward}
                disabled={isLoading || audioError}
              >
                <SkipForward className="h-5 w-5 rotate-180" />
              </Button>
              <Button
                onClick={togglePlay}
                size="icon"
                disabled={isLoading || audioError}
                className={`rounded-full h-16 w-16 ${
                  audioError 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:opacity-90"
                }`}
              >
                {audioError ? (
                  <span className="text-xs">Ошибка</span>
                ) : isLoading ? (
                  <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 bg-transparent"
                onClick={skipForward}
                disabled={isLoading || audioError}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => router.back()}
                className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
              >
                <Check className="mr-2 h-5 w-5" />
                Отметить как выполнено
              </Button>
              <Button
                onClick={() => {
                  const nextDay = Number(params.dayId) + 1
                  if (nextDay <= 7) {
                    router.push(`/meditations/${params.courseId}/${nextDay}`)
                  } else {
                    router.push("/meditations")
                  }
                }}
                variant="outline"
                className="flex-1 rounded-2xl h-12 bg-transparent"
              >
                Следующий день
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}