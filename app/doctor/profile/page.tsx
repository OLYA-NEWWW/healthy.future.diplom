"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Edit, LogOut, Trash2, Save, X, User, 
  Star, Plus, Minus, Camera, Stethoscope, 
  GraduationCap, Clock, Video, MessageSquare, 
  Award, FileText
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

const SPECIALTIES = ["Терапевт", "Кардиолог", "Невролог", "Эндокринолог", "Психолог", "Гастроэнтеролог", "Дерматолог", "Хирург"]

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: "",
    image: "",
    specialty: "",
    experience: "",
    bio: "",
    education: [] as string[],
    format: ["chat"] as string[],
  })
  const [newEdu, setNewEdu] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (!saved) return router.push('/auth')
    const parsed: UserData = JSON.parse(saved)
    if (parsed.role !== 'DOCTOR') return router.push('/dashboard')
    
    setUser(parsed)
    setForm({
      name: parsed.name || "",
      image: parsed.image || "",
      specialty: parsed.specialty || "",
      experience: parsed.experience?.toString() || "",
      bio: parsed.bio || "",
      education: parsed.education ? JSON.parse(parsed.education) : [],
      format: parsed.format ? JSON.parse(parsed.format) : ["chat"],
    })
    setLoading(false)
  }, [router])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      const res = await fetch('/api/doctor/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: form.name,
          image: form.image,
          specialty: form.specialty,
          experience: parseInt(form.experience) || 0,
          bio: form.bio,
          education: JSON.stringify(form.education),
          format: JSON.stringify(form.format),
        })
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        setIsEditing(false)
      }
    } catch {
      alert('Ошибка сохранения')
    }
    setSaving(false)
  }

  const toggleFormat = (fmt: string) => {
    setForm(prev => ({
      ...prev,
      format: prev.format.includes(fmt) ? prev.format.filter(f => f !== fmt) : [...prev.format, fmt]
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-[#7C5CFF]">Загрузка...</div></div>
  if (!user) return null

  const display = isEditing ? form : {
    ...user,
    education: user.education ? JSON.parse(user.education) : [],
    format: user.format ? JSON.parse(user.format) : ["chat"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF]">
      <div className="w-full p-4 lg:p-8">
        
        {/* Шапка */}
        <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] rounded-3xl p-6 lg:p-8 relative mb-6">
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex gap-2">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                  <X className="h-5 w-5 text-white" />
                </button>
                <button onClick={handleSave} disabled={saving} className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50">
                  <Save className="h-5 w-5 text-[#7C5CFF]" />
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <Edit className="h-5 w-5 text-white" />
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-4xl lg:text-5xl font-bold shadow-lg overflow-hidden ring-4 ring-white/30">
                {display.image ? <img src={display.image} alt="" className="w-full h-full object-cover" /> : (display.name || "В").charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <>
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#7C5CFF] hover:text-white transition-colors border-2 border-[#7C5CFF]">
                    <Camera className="h-5 w-5" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('userId', user.id)
                    const res = await fetch('/api/upload', { method: 'POST', body: formData })
                    if (res.ok) {
                      const { url } = await res.json()
                      setForm(prev => ({ ...prev, image: url }))
                    }
                  }} />
                </>
              )}
            </div>

            <div className="flex-1 text-center lg:text-left">
              {isEditing ? (
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ФИО" className="rounded-xl h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg max-w-md" />
              ) : (
                <>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{display.name || "Врач"}</h1>
                  <p className="text-white/80 mb-3">{user.email}</p>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur">
                      <Stethoscope className="h-4 w-4" />Врач
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{user.rating || 5.0}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#7C5CFF]" />Профессиональная информация
          </h2>
          <Card className="rounded-2xl border-primary/10 shadow-lg">
            <CardContent className="p-4 lg:p-6 space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#7C5CFF] flex items-center gap-2"><Stethoscope className="h-4 w-4" />Специальность</Label>
                      <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
                        <SelectTrigger className="rounded-xl h-11 bg-[#7C5CFF]/5 border-[#7C5CFF]/20"><SelectValue placeholder="Выберите" /></SelectTrigger>
                        <SelectContent>{SPECIALTIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#7C5CFF] flex items-center gap-2"><Clock className="h-4 w-4" />Стаж (лет)</Label>
                      <Input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="rounded-xl h-11 bg-[#7C5CFF]/5 border-[#7C5CFF]/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#7C5CFF] flex items-center gap-2"><FileText className="h-4 w-4" />О себе</Label>
                    <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="rounded-xl min-h-[80px] bg-[#7C5CFF]/5 border-[#7C5CFF]/20 resize-none" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#7C5CFF] flex items-center gap-2"><GraduationCap className="h-4 w-4" />Образование</Label>
                    {form.education.map((edu, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={edu} onChange={(e) => {
                          const newEdu = [...form.education]
                          newEdu[i] = e.target.value
                          setForm({ ...form, education: newEdu })
                        }} className="rounded-xl bg-[#7C5CFF]/5 border-[#7C5CFF]/20" />
                        <button onClick={() => setForm({ ...form, education: form.education.filter((_, idx) => idx !== i) })} className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"><Minus className="h-4 w-4" /></button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input value={newEdu} onChange={(e) => setNewEdu(e.target.value)} placeholder="Добавить" className="rounded-xl bg-[#7C5CFF]/5 border-[#7C5CFF]/20" onKeyPress={(e) => e.key === 'Enter' && (setForm({ ...form, education: [...form.education, newEdu] }), setNewEdu(""))} />
                      <button onClick={() => { if (newEdu.trim()) { setForm({ ...form, education: [...form.education, newEdu.trim()] }); setNewEdu("") } }} className="h-10 w-10 rounded-xl bg-[#7C5CFF]/10 text-[#7C5CFF] flex items-center justify-center hover:bg-[#7C5CFF]/20"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#7C5CFF]">Форматы</Label>
                    <div className="flex gap-3">
                      {['chat', 'video'].map(fmt => (
                        <button key={fmt} onClick={() => toggleFormat(fmt)} className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${form.format.includes(fmt) ? 'border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]' : 'border-muted text-muted-foreground hover:border-[#7C5CFF]/30'}`}>
                          {fmt === 'chat' ? <><MessageSquare className="h-4 w-4 inline mr-2" />Чат</> : <><Video className="h-4 w-4 inline mr-2" />Видео</>}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoBlock icon={<Stethoscope className="h-6 w-6" />} label="Специальность" value={display.specialty || "Не указана"} />
                    <InfoBlock icon={<Clock className="h-6 w-6" />} label="Стаж" value={display.experience ? `${display.experience} лет` : "Не указан"} />
                  </div>
                  {display.bio && <div className="p-4 rounded-xl bg-[#7C5CFF]/5"><div className="flex items-center gap-2 mb-2 text-[#7C5CFF] font-medium"><FileText className="h-5 w-5" />О себе</div><p className="text-sm text-foreground">{display.bio}</p></div>}
                  <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                    <div className="flex items-center gap-2 mb-3 text-[#7C5CFF] font-medium"><GraduationCap className="h-5 w-5" />Образование</div>
                    {display.education.length > 0 ? display.education.map((edu: string, i: number) => <div key={i} className="flex items-center gap-2 text-sm text-foreground mb-1"><div className="h-2 w-2 rounded-full bg-[#7C5CFF]" />{edu}</div>) : <p className="text-sm text-muted-foreground">Не указано</p>}
                  </div>
                  <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                    <div className="flex items-center gap-2 mb-3 text-[#7C5CFF] font-medium">Форматы консультации</div>
                    <div className="flex gap-2">{display.format.map((f: string) => <span key={f} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20">{f === 'chat' ? 'Чат' : 'Видео'}</span>)}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Аккаунт</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full rounded-2xl h-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent justify-start px-6" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />Выйти из аккаунта
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full rounded-2xl h-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent justify-start px-6">
                  <Trash2 className="mr-3 h-5 w-5" />Удалить аккаунт
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-w-sm mx-4">
                <DialogHeader>
                  <DialogTitle className="text-center">Удалить аккаунт?</DialogTitle>
                  <DialogDescription className="text-center text-sm">Это действие нельзя отменить.</DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1 rounded-xl h-12 bg-transparent">Отмена</Button>
                  <Button variant="destructive" className="flex-1 rounded-xl h-12">Удалить</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </div>
    </div>
  )
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#7C5CFF]/5">
      <div className="h-12 w-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0 text-[#7C5CFF]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}