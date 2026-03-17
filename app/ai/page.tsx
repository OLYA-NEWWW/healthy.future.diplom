"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Shield, Heart, Zap, Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickQuestions = [
  { text: "Болит голова"},
  { text: "Температура"},
  { text: "Кашель"},
  { text: "Бессонница"},
  { text: "Стресс"},
  { text: "Усталость" }
]

type Message = {
  id: number
  text: string
  isUser: boolean
  time: string
  isAI?: boolean
}

const initialMessages: Message[] = [{
  id: 1,
  text: "Здравствуйте! Я ваш медицинский помощник. Расскажите, что вас беспокоит, и я дам полезные рекомендации. Я помню всю нашу беседу, так что можете уточнять детали.",
  isUser: false,
  time: "10:00",
  isAI: true
}]

export default function MedicalAIPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState("готов к работе")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setAiStatus("анализирую симптомы...")

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }))

      const response = await fetch('/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputValue,
          chatHistory: chatHistory
        })
      })

      const data = await response.json()
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: data.message,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAI: data.isAI
      }

      setMessages(prev => [...prev, aiMessage])
      setAiStatus(`использовал ${data.model}`)
      
    } catch (error) {
      console.error('Error:', error)
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Соединение с ИИ прервано. Пожалуйста, попробуйте позже или обратитесь напрямую к врачу.",
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages(prev => [...prev, errorMessage])
      setAiStatus("ошибка соединения")
      
      setTimeout(() => setAiStatus("готов к работе"), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (text: string) => {
    setInputValue(text.replace(/[🤕🌡️🫁😴😰💪]/g, '').trim())
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Медицинский ИИ-помощник
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-700">{aiStatus}</span>
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Помнит диалог</p>
                <p className="text-sm text-gray-600">Учитывает историю беседы</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Конфиденциально</p>
                <p className="text-sm text-gray-600">Ваши данные защищены</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-white">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">24/7</p>
                <p className="text-sm text-gray-600">Всегда доступен</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {messages.length <= 1 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Выберите симптом:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-4 text-left transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{q.icon}</div>
                  <p className="font-medium text-gray-800 group-hover:text-blue-600">
                    {q.text.replace(/[🤕🌡️🫁😴😰💪]/g, '')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <Card className="mb-8 border border-gray-300/50 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Диалог с помощником</h3>
                  <p className="text-sm opacity-90">Помнит всю историю разговора</p>
                </div>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {messages.filter(m => m.isUser).length} вопросов
              </div>
            </div>
          </div>
          
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                      msg.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {msg.isUser ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`max-w-[75%] ${msg.isUser ? 'text-right' : ''}`}>
                      <div className={`rounded-2xl px-5 py-3 ${
                        msg.isUser 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                          : 'bg-white border border-gray-200 shadow-sm'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                        {!msg.isUser && msg.isAI && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                            ИИ помощник
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">Анализирую симптомы...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/50 shadow-lg">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Опишите симптомы подробнее... (нажмите Enter для отправки)"
                className="h-14 rounded-xl border-2 border-gray-300 focus:border-blue-500 text-base"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-2 ml-2">
                ИИ помнит всю беседу. Можете уточнять детали.
              </p>
            </div>
            
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Отправка...</span>
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Отправить
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm mb-1">
                  Важная информация
                </p>
                <p className="text-xs text-red-700">
                  ИИ-помощник не ставит диагнозы. При острых симптомах (сильная боль в груди, кровотечение, 
                  затрудненное дыхание, высокая температура) немедленно вызывайте скорую помощь по номеру 103.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Healthy Future • Медицинский ИИ-помощник • Версия 1.0</p>
          <p className="mt-2">Все ответы носят информационный характер</p>
        </div>
      </div>
    </div>
  )
}