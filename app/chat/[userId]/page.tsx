"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, Send, User, Loader2, Check, CheckCheck 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: string
  sender: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
}

type OtherUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  role?: string
}

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const otherUserId = params.userId as string
  
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      loadMessages(user.id, otherUserId)
      loadOtherUser(otherUserId)
    } else {
      router.push('/auth')
    }
  }, [otherUserId, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (!currentUser) return
    
    const interval = setInterval(() => {
      loadMessages(currentUser.id, otherUserId, false)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentUser, otherUserId])

  const loadMessages = async (userId: string, otherId: string, showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      const res = await fetch(`/api/messages?userId=${userId}&otherUserId=${otherId}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  const loadOtherUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/user/profile?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        setOtherUser({
          ...data,
          role: data.role || 'PATIENT'
        })
      }
    } catch (error) {
      console.error('Error loading other user:', error)
    }
  }

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser?.id || !otherUserId) return

    setSending(true)
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser.id,
          receiverId: otherUserId,
          content: newMessage.trim(),
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      const data = await res.json()
      setMessages(prev => [...prev, data.message])
      setNewMessage("")
      inputRef.current?.focus()
    } catch (error) {
      console.error('Error:', error)
      alert('Ошибка при отправке')
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isMyMessage = (msg: Message) => msg.senderId === currentUser?.id

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#7C5CFF]">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Загрузка чата...</span>
        </div>
      </div>
    )
  }

  const otherUserName = otherUser?.name || otherUser?.email?.split('@')[0] || 'Собеседник'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] flex flex-col">
      <div className="bg-white/80 backdrop-blur-md border-b border-[#7C5CFF]/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white font-bold">
              {otherUser?.image ? (
                <img src={otherUser.image} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                otherUserName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="font-semibold text-foreground">{otherUserName}</h1>
              <p className="text-xs text-muted-foreground">
                {otherUser?.role === 'DOCTOR' ? 'Врач' : 'Пациент'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-[#7C5CFF]/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-[#7C5CFF]" />
              </div>
              <p className="text-muted-foreground">Начните общение</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const myMsg = isMyMessage(msg)
              const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId
              
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${myMsg ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white text-sm font-bold">
                      {msg.sender.image ? (
                        <img src={msg.sender.image} alt="" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        (msg.sender.name || msg.sender.email).charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>

                  <div className={`max-w-[70%] ${myMsg ? 'items-end' : 'items-start'} flex flex-col`}>
                    <Card className={`rounded-2xl border-0 shadow-sm ${
                      myMsg 
                        ? 'bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white rounded-br-none' 
                        : 'bg-white text-foreground rounded-bl-none'
                    }`}>
                      <CardContent className="p-3 py-2">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </CardContent>
                    </Card>
                    
                    <div className={`flex items-center gap-1 mt-1 ${myMsg ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(msg.createdAt)}
                      </span>
                      {myMsg && (
                        <span className="text-xs text-muted-foreground">
                          {msg.read ? (
                            <CheckCheck className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md border-t border-[#7C5CFF]/10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение..."
              className="flex-1 rounded-full h-12 px-5 bg-white border-[#7C5CFF]/20 focus:border-[#7C5CFF]"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className="rounded-full h-12 w-12 p-0 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:opacity-90 disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}