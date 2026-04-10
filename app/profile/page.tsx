"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronRight, Edit, LogOut, Trash2, Save, X, User, 
  Heart, Plus, Minus, Watch, Droplets, Pill, 
  AlertCircle, FileText, Camera
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type User = {
  id: string
  email: string
  name?: string
  role: string
  image?: string
  bloodType?: string
  chronicDiseases: string[]
  allergies: string[]
  medications: string[]
  healthDescription?: string
}

const bloodTypes = ["I+", "I-", "II+", "II-", "III+", "III-", "IV+", "IV-"]

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingMedical, setIsEditingMedical] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [tempProfile, setTempProfile] = useState<Partial<User>>({})
  const [tempMedical, setTempMedical] = useState<Partial<User>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      loadUserData(parsed.id)
    } else {
      router.push('/auth')
    }
  }, [router])

  const loadUserData = async (userId: string) => {
    try {
      const res = await fetch(`/api/user/profile?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        setTempProfile({ name: data.name, image: data.image })
        setTempMedical({
          bloodType: data.bloodType,
          chronicDiseases: data.chronicDiseases || [],
          allergies: data.allergies || [],
          medications: data.medications || [],
          healthDescription: data.healthDescription,
        })
        localStorage.setItem('user', JSON.stringify(data))
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error)
    }
    setLoading(false)
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: tempProfile.name,
          image: tempProfile.image,
          bloodType: user.bloodType,
          chronicDiseases: user.chronicDiseases,
          allergies: user.allergies,
          medications: user.medications,
          healthDescription: user.healthDescription,
        }),
      })

      if (res.ok) {
        const updated = await res.json()
        setUser(updated)
        localStorage.setItem('user', JSON.stringify(updated))
        setIsEditingProfile(false)
      }
    } catch (error) {
      alert('Ошибка сохранения')
    }
    setSaving(false)
  }

  const handleSaveMedical = async () => {
    if (!user) return
    setSaving(true)
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: user.name,
          image: user.image,
          ...tempMedical,
        }),
      })

      if (res.ok) {
        const updated = await res.json()
        setUser(updated)
        localStorage.setItem('user', JSON.stringify(updated))
        setIsEditingMedical(false)
      }
    } catch (error) {
      alert('Ошибка сохранения')
    }
    setSaving(false)
  }

  const handleCancelProfile = () => {
    setTempProfile({ name: user?.name, image: user?.image })
    setIsEditingProfile(false)
  }

  const handleCancelMedical = () => {
    setTempMedical({
      bloodType: user?.bloodType,
      chronicDiseases: user?.chronicDiseases || [],
      allergies: user?.allergies || [],
      medications: user?.medications || [],
      healthDescription: user?.healthDescription,
    })
    setIsEditingMedical(false)
  }

  const addItem = (field: 'chronicDiseases' | 'allergies' | 'medications') => {
    setTempMedical(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), ""]
    }))
  }

  const removeItem = (field: 'chronicDiseases' | 'allergies' | 'medications', index: number) => {
    setTempMedical(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }))
  }

  const updateItem = (field: 'chronicDiseases' | 'allergies' | 'medications', index: number, value: string) => {
    setTempMedical(prev => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => i === index ? value : item)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', user?.id || '')

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        const { url } = await res.json()
        setTempProfile(prev => ({ ...prev, image: url }))
      }
    } catch (error) {
      alert('Ошибка загрузки фото')
    }
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
      <div className="w-full p-4 lg:p-8">
        
        <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] rounded-3xl p-6 lg:p-8 relative mb-6">
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Edit className="h-5 w-5 text-white" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelProfile}
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Save className="h-5 w-5 text-[#7C5CFF]" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-4xl lg:text-5xl font-bold shadow-lg overflow-hidden ring-4 ring-white/30">
                {isEditingProfile ? (
                  tempProfile.image ? (
                    <img src={tempProfile.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (tempProfile.name || displayName)?.charAt(0).toUpperCase()
                  )
                ) : (
                  user.image ? (
                    <img src={user.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )
                )}
              </div>
              {isEditingProfile && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#7C5CFF] hover:text-white transition-colors border-2 border-[#7C5CFF]"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="flex-1 text-center lg:text-left">
              {isEditingProfile ? (
                <div className="space-y-3 max-w-md mx-auto lg:mx-0">
                  <Input
                    value={tempProfile.name || ""}
                    onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ваше имя"
                    className="rounded-xl h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{displayName}</h1>
                  <p className="text-white/80 mb-3">{user.email}</p>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur">
                    <User className="h-4 w-4" />
                    {user.role === 'PATIENT' ? 'Пациент' : 'Врач'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#7C5CFF]" />
                Медицинская карта
              </h2>
              {!isEditingMedical ? (
                <button
                  onClick={() => setIsEditingMedical(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C5CFF]/10 text-[#7C5CFF] hover:bg-[#7C5CFF]/20 transition-colors text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Изменить
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelMedical}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm font-medium"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSaveMedical}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C5CFF] text-white hover:bg-[#6B4FE0] transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <Card className="rounded-2xl border-primary/10 shadow-lg">
              <CardContent className="p-4 lg:p-6">
                {isEditingMedical ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#7C5CFF] flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        Группа крови
                      </Label>
                      <Select
                        value={tempMedical.bloodType || ""}
                        onValueChange={(v) => setTempMedical(prev => ({ ...prev, bloodType: v }))}
                      >
                        <SelectTrigger className="rounded-xl h-11 bg-[#7C5CFF]/5 border-[#7C5CFF]/20">
                          <SelectValue placeholder="Выберите группу крови" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="hidden md:block"></div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#7C5CFF] flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Хронические заболевания
                      </Label>
                      {(tempMedical.chronicDiseases || []).map((disease, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={disease}
                            onChange={(e) => updateItem('chronicDiseases', i, e.target.value)}
                            placeholder="Название заболевания"
                            className="rounded-xl bg-[#7C5CFF]/5 border-[#7C5CFF]/20"
                          />
                          <button
                            onClick={() => removeItem('chronicDiseases', i)}
                            className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 flex-shrink-0"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('chronicDiseases')}
                        className="w-full rounded-xl border-dashed border-[#7C5CFF]/30 text-[#7C5CFF] hover:bg-[#7C5CFF]/5 h-10"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить
                      </Button>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#7C5CFF] flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Аллергии
                      </Label>
                      {(tempMedical.allergies || []).map((allergy, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={allergy}
                            onChange={(e) => updateItem('allergies', i, e.target.value)}
                            placeholder="Название аллергии"
                            className="rounded-xl bg-[#7C5CFF]/5 border-[#7C5CFF]/20"
                          />
                          <button
                            onClick={() => removeItem('allergies', i)}
                            className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 flex-shrink-0"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('allergies')}
                        className="w-full rounded-xl border-dashed border-[#7C5CFF]/30 text-[#7C5CFF] hover:bg-[#7C5CFF]/5 h-10"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить
                      </Button>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#7C5CFF] flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        Принимаемые лекарства
                      </Label>
                      {(tempMedical.medications || []).map((med, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={med}
                            onChange={(e) => updateItem('medications', i, e.target.value)}
                            placeholder="Название лекарства"
                            className="rounded-xl bg-[#7C5CFF]/5 border-[#7C5CFF]/20"
                          />
                          <button
                            onClick={() => removeItem('medications', i)}
                            className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 flex-shrink-0"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addItem('medications')}
                        className="w-full rounded-xl border-dashed border-[#7C5CFF]/30 text-[#7C5CFF] hover:bg-[#7C5CFF]/5 h-10"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить
                      </Button>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-[#7C5CFF] flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Описание состояния
                      </Label>
                      <Textarea
                        value={tempMedical.healthDescription || ""}
                        onChange={(e) => setTempMedical(prev => ({ ...prev, healthDescription: e.target.value }))}
                        placeholder="Опишите ваше текущее состояние..."
                        className="rounded-xl min-h-[80px] bg-[#7C5CFF]/5 border-[#7C5CFF]/20 resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#7C5CFF]/5">
                      <div className="h-12 w-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                        <Droplets className="h-6 w-6 text-[#7C5CFF]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Группа крови</p>
                        <p className="text-lg font-semibold text-foreground">{user.bloodType || "Не указана"}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#7C5CFF]/5 md:col-span-2">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-[#7C5CFF]" />
                        <span className="font-medium ">Хронические заболевания</span>
                      </div>
                      {user.chronicDiseases?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.chronicDiseases.map((d, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                              {d}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Не указаны</p>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-[#7C5CFF]/5 md:col-span-2">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-[#7C5CFF]" />
                        <span className="font-medium ">Аллергии</span>
                      </div>
                      {user.allergies?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.allergies.map((a, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                              {a}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Не указаны</p>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-[#7C5CFF]/5 md:col-span-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Pill className="h-5 w-5 text-[#7C5CFF]" />
                        <span className="font-medium ">Принимаемые лекарства</span>
                      </div>
                      {user.medications?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.medications.map((m, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                              {m}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Не указаны</p>
                      )}
                    </div>

                    {user.healthDescription && (
                      <div className="p-4 rounded-xl bg-[#7C5CFF]/5 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-[#7C5CFF]" />
                          <span className="font-medium ">Описание состояния</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{user.healthDescription}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Watch className="h-5 w-5 text-[#7C5CFF]" />
              Устройства
            </h2>
            <Card className="rounded-2xl border-primary/10 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Link href="/devices">
                  <button className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-[#7C5CFF]/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] flex items-center justify-center shadow-lg">
                        <Watch className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <span className="text-base font-semibold text-foreground block">Носимые устройства</span>
                        <span className="text-sm text-muted-foreground">Apple Health, Google Fit, Fitbit</span>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-[#7C5CFF] transition-colors" />
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Аккаунт</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full rounded-2xl h-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent justify-start px-6"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Выйти из аккаунта
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent justify-start px-6"
                  >
                    <Trash2 className="mr-3 h-5 w-5" />
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

      </div>
    </div>
  )
}