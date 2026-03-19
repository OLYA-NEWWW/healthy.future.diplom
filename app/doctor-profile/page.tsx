"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Plus, Trash2, Save, Star, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SPECIALTIES = [
  "Терапевт", "Кардиолог", "Невролог", "Эндокринолог", 
  "Психолог", "Гастроэнтеролог", "Дерматолог", "Хирург"
]

type UserData = {
  id: string
  email: string
  name?: string
  role: string
  specialty?: string
  experience?: number
  bio?: string
  education?: string
  image?: string
  format?: string
  rating?: number
}

export default function DoctorProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [experience, setExperience] = useState("")
  const [bio, setBio] = useState("")
  const [educationList, setEducationList] = useState<string[]>([])
  const [newEducation, setNewEducation] = useState("")
  const [formatList, setFormatList] = useState<string[]>(["chat"])

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (!saved) {
      router.push('/auth')
      return
    }

    const parsed: UserData = JSON.parse(saved)
    if (parsed.role !== 'DOCTOR') {
      router.push('/dashboard')
      return
    }

    setUser(parsed)
    setName(parsed.name || "")
    setSpecialty(parsed.specialty || "")
    setExperience(parsed.experience?.toString() || "")
    setBio(parsed.bio || "")
    setEducationList(parsed.education ? JSON.parse(parsed.education) : [])
    setFormatList(parsed.format ? JSON.parse(parsed.format) : ["chat"])
    setLoading(false)
  }, [router])

  const addEducation = () => {
    if (newEducation.trim()) {
      setEducationList([...educationList, newEducation.trim()])
      setNewEducation("")
    }
  }

  const removeEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index))
  }

  const toggleFormat = (fmt: string) => {
    if (formatList.includes(fmt)) {
      setFormatList(formatList.filter(f => f !== fmt))
    } else {
      setFormatList([...formatList, fmt])
    }
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)

    try {
      const res = await fetch('/api/doctor/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name,
          specialty,
          experience,
          bio,
          education: JSON.stringify(educationList),
          format: JSON.stringify(formatList),
          image: user.image
        })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        alert('Профиль сохранён!')
      } else {
        alert(data.error || 'Ошибка сохранения')
      }
    } catch (err) {
      alert('Ошибка соединения')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF]">
        <div className="text-[#7C5CFF]">Загрузка...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Личный кабинет врача</h1>
          <p className="text-muted-foreground mt-2">Заполните профиль для отображения в каталоге</p>
        </div>

        <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden">
          
          <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] p-6 text-center">
            <div className="relative inline-block">
              <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                {name ? name.charAt(0).toUpperCase() : "?"}
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white text-[#7C5CFF] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold text-lg">{user.rating || 5.0}</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ФИО</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Специальность</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Выберите специальность" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Стаж работы (лет)</Label>
                <Input 
                  type="number"
                  value={experience} 
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="10"
                  className="rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>О себе</Label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Расскажите о своём опыте, подходе к лечению и достижениях..."
                  className="rounded-xl min-h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Образование и курсы повышения квалификации</Label>
              
              <div className="space-y-2">
                {educationList.map((edu, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-[#7C5CFF]/5 border border-[#7C5CFF]/10">
                    <span className="flex-1 text-sm">{edu}</span>
                    <button 
                      onClick={() => removeEducation(i)}
                      className="h-8 w-8 rounded-lg hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input 
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                  placeholder="Например: МГУ им. Ломоносова, лечебное дело (2010)"
                  className="rounded-xl h-12 flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addEducation()}
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={addEducation}
                  className="rounded-xl h-12 px-4 border-[#7C5CFF]/30 hover:bg-[#7C5CFF]/10"
                >
                  <Plus className="h-5 w-5 text-[#7C5CFF]" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Форматы консультации</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => toggleFormat('chat')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    formatList.includes('chat')
                      ? 'border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]'
                      : 'border-muted text-muted-foreground hover:border-[#7C5CFF]/30'
                  }`}
                >
                Чат
                </button>
                <button
                  type="button"
                  onClick={() => toggleFormat('video')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    formatList.includes('video')
                      ? 'border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]'
                      : 'border-muted text-muted-foreground hover:border-[#7C5CFF]/30'
                  }`}
                >
                 Видео
                </button>
              </div>
            </div>

            <Button 
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg text-lg font-semibold transition-all"
            >
              <Save className="mr-2 h-5 w-5" />
              {saving ? 'Сохранение...' : 'Сохранить профиль'}
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}