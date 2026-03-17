"use client"

import { use, useState } from "react"
import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

type Message = {
  id: number
  text: string
  sender: "user" | "doctor"
  timestamp: string
  attachment?: string
}

const doctorData = {
  name: "Иванова Елена Сергеевна",
  specialty: "Терапевт",
  avatar: "/female-doctor.jpg",
  online: true,
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Здравствуйте! Чем могу помочь?",
    sender: "doctor",
    timestamp: "14:30",
  },
  {
    id: 2,
    text: "Добрый день! Последние несколько дней чувствую усталость и головную боль",
    sender: "user",
    timestamp: "14:32",
  },
  {
    id: 3,
    text: "Понимаю. Давайте разберемся. Как долго это продолжается? Есть ли какие-то факторы, которые усиливают симптомы?",
    sender: "doctor",
    timestamp: "14:33",
  },
]

export default function ConsultationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <Link href="/doctors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="relative">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary">
                <img
                  src={doctorData.avatar || "/placeholder.svg"}
                  alt={doctorData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {doctorData.online && (
                <Circle className="absolute -right-0.5 -top-0.5 h-3 w-3 fill-success stroke-card stroke-2 text-success" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{doctorData.name}</h2>
              <p className="text-xs text-muted-foreground">{doctorData.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-card px-4 py-2">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between text-xs">
            <Badge variant="secondary" className="gap-1">
              <Circle className="h-2 w-2 fill-success text-success" />
              Консультация активна
            </Badge>
            <span className="text-muted-foreground">Оплачено: 3000 ₽</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="mx-auto max-w-lg space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-primary/10 text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`mt-1 text-xs ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-card px-4 py-2">
        <div className="mx-auto max-w-lg">
          <Card className="border-accent/30 bg-accent/10">
            <CardContent className="flex items-center gap-2 p-2">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Вы можете прикрепить результаты анализов</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border-t border-border bg-card px-4 pb-4 pt-3">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Введите сообщение..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
