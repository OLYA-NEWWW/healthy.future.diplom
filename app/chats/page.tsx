"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, User, Loader2, Clock, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ChatUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
}

type LastMessage = {
  id: string
  content: string
  createdAt: string
  read: boolean
  senderId: string
  receiverId: string
}

type Chat = {
  user: ChatUser
  lastMessage: LastMessage
  unreadCount: number
}

export default function ChatsPage() {
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      loadChats(user.id)
    } else {
      router.push('/auth')
    }
  }, [router])

  const loadChats = async (userId: string) => {
    try {
      const res = await fetch(`/api/chats?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        setChats(data.chats || [])
      }
    } catch (error) {
      console.error('Error loading chats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Только что'
    if (diffMins < 60) return `${diffMins} мин назад`
    if (diffHours < 24) return `${diffHours} ч назад`
    if (diffDays < 7) return `${diffDays} дн назад`
    
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
  }

  const handleOpenChat = (userId: string) => {
    router.push(`/chat/${userId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#7C5CFF]">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Загрузка чатов...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold text-foreground">Чаты с врачами</h1>
          <p className="text-muted-foreground">Ваши консультации и общение с медицинскими специалистами</p>
        </div>

        {chats.length === 0 ? (
          <Card className="rounded-2xl border-primary/10">
            <CardContent className="p-12 text-center">
              <div className="h-16 w-16 rounded-full bg-[#7C5CFF]/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-[#7C5CFF]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Нет активных чатов</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                У вас пока нет чатов с врачами. Запишитесь на консультацию, чтобы начать общение
              </p>
              <Button 
                onClick={() => router.push('/doctors')}
                className="rounded-xl bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white"
              >
                Найти врача
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => {
              const doctorName = chat.user.name || chat.user.email.split('@')[0]
              const isMyMessage = chat.lastMessage.senderId === currentUser?.id
              
              return (
                <Card 
                  key={chat.user.id}
                  className="rounded-2xl border-primary/10 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => handleOpenChat(chat.user.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      {/* Аватар */}
                      <div className="flex-shrink-0">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white font-bold text-lg">
                          {chat.user.image ? (
                            <img 
                              src={chat.user.image} 
                              alt="" 
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            doctorName.charAt(0).toUpperCase()
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {doctorName}
                          </h3>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {formatTime(chat.lastMessage.createdAt)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate">
                          {isMyMessage && "Вы: "}
                          {chat.lastMessage.content}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#7C5CFF]/10 text-[#7C5CFF]">
                            Врач
                          </span>
                          {chat.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#7C5CFF] text-white">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}