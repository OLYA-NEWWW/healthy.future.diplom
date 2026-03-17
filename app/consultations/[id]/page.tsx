"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { ArrowLeft, Send, Paperclip, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageBubble } from "@/components/message-bubble"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialMessages = [
  {
    content: "Здравствуйте! Я ознакомилась с вашими жалобами. Расскажите подробнее о симптомах.",
    isUser: false,
    timestamp: "14:30",
  },
  {
    content: "Здравствуйте! Уже третий день беспокоит головная боль и общая слабость.",
    isUser: true,
    timestamp: "14:32",
  },
]

export default function ConsultationPage() {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rating, setRating] = useState(0)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Иванова Елена Сергеевна</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success"></span>
              Онлайн
            </p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-xl bg-transparent">
              Завершить
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Завершить консультацию?</DialogTitle>
              <DialogDescription>Вы уверены, что хотите завершить консультацию с врачом?</DialogDescription>
            </DialogHeader>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-xl">
                Отмена
              </Button>
              <Button onClick={() => router.push("/doctors")} className="flex-1 rounded-xl">
                Завершить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex-1 rounded-3xl border-primary/10 mb-4 overflow-hidden">
        <CardContent className="p-6 h-full overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <div className="flex-1 flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Напишите сообщение..."
            className="rounded-2xl h-12"
          />
          <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 flex-shrink-0 bg-transparent">
            <Paperclip className="h-5 w-5" />
          </Button>
        </div>
        <Button
          onClick={handleSendMessage}
          className="rounded-2xl h-12 px-6 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-primary mt-2">
            Оценить врача
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Оцените консультацию</DialogTitle>
            <DialogDescription>Ваш отзыв поможет другим пациентам</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} onClick={() => setRating(value)} className="transition-transform hover:scale-110">
                  <Star
                    className={cn(
                      "h-10 w-10",
                      value <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            <Button className="w-full rounded-xl">Отправить оценку</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
