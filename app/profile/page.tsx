"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Edit, LogOut, Trash2, Save, X, User, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const menuItems = [
  { label: "Указать общую информацию о себе", href: "/onboarding" },
  { label: "Указать пищевые привычки", href: "/onboarding" },
  { label: "Оценить психологическое состояние", href: "/health/map" },
  { label: "Выбрать область, в которой нужна помощь", href: "/ai" },
  { label: "Добавить носимые устройства", href: "/devices" },
  { label: "Указать данные о сне", href: "/health" },
  { label: "Указать данные о текущем здоровье", href: "/health" },
  { label: "Описать образ жизни", href: "/onboarding" },
  { label: "Оценить физическую активность", href: "/health" },
  { label: "Добавить историю болезней", href: "/onboarding" },
]

type User = {
  id: string
  email: string
  name?: string
  role: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [tempName, setTempName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setTempName(parsedUser.name || parsedUser.email.split('@')[0])
    } else {
      router.push('/auth')
    }
    setLoading(false)
  }, [router])

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name: tempName }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTempName(user?.name || user?.email.split('@')[0] || "")
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth')
  }

  const handleDeleteAccount = async () => {
    if (!user) return
    try {
      const res = await fetch(`/api/auth/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })
      if (res.ok) {
        localStorage.removeItem('user')
        router.push('/auth')
      } else {
        alert('Ошибка при удалении аккаунта')
      }
    } catch (error) {
      alert('Ошибка при удалении аккаунта')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF]">
        <div className="animate-pulse text-[#7C5CFF]">Загрузка...</div>
      </div>
    )
  }

  if (!user) return null

  const displayName = user.name || user.email.split('@')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF]">
      <div className="max-w-xl mx-auto">
        
        <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] px-6 pt-12 pb-24 relative">
          <div className="absolute top-6 right-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Edit className="h-5 w-5 text-white" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleSave}
                  className="h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Save className="h-5 w-5 text-[#7C5CFF]" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="px-4 -mt-16">
          <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden">
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {tempName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
                      <Input
                        id="name"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="rounded-xl h-12 bg-muted/50 border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="rounded-xl h-12 bg-muted border-0"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-foreground mb-1">{displayName}</h1>
                  <p className="text-muted-foreground text-sm mb-3">{user.email}</p>
                  
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-sm font-medium">
                    <User className="h-4 w-4" />
                    {user.role === 'PATIENT' ? 'Пациент' : 'Врач'}
                  </span>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="px-4 mt-6">
          <Card className="rounded-[2rem] border-primary/10 shadow-lg overflow-hidden">
            <CardContent className="p-2">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <button className="flex w-full items-center justify-between rounded-2xl p-4 text-left transition-colors hover:bg-[#7C5CFF]/5 group">
                    <span className="text-sm font-medium text-foreground pr-4">{item.label}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:text-[#7C5CFF] transition-colors" />
                  </button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mt-6 pb-8 space-y-3">
          <Button
            variant="outline"
            className="w-full rounded-2xl h-14 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Выйти
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full rounded-2xl h-14 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Удалить аккаунт
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl max-w-sm mx-4">
              <DialogHeader>
                <DialogTitle className="text-center">Удалить аккаунт?</DialogTitle>
                <DialogDescription className="text-center text-sm">
                  Это действие нельзя отменить. Все ваши данные будут безвозвратно удалены.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1 rounded-xl h-12 bg-transparent">
                  Отмена
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 rounded-xl h-12"
                  onClick={handleDeleteAccount}
                >
                  Удалить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </div>
  )
}