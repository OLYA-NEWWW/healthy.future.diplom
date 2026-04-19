"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Calendar, Clock, User, MessageSquare, ChevronLeft, 
  Droplets, AlertCircle, Pill, FileText, Loader2 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Patient = {
  id: string
  name: string | null
  email: string
  image: string | null
  bloodType: string | null
  chronicDiseases: string
  allergies: string
  medications: string
  healthDescription: string | null
}

type Appointment = {
  id: string
  doctorId: string
  patientId: string
  dateTime: string
  status: string
  price: number
  createdAt: string
  patient: Patient
}

export default function DoctorAppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [showPatientProfile, setShowPatientProfile] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      if (user.role !== 'DOCTOR') {
        router.push('/dashboard')
        return
      }
      setCurrentUser(user)
      loadAppointments(user.id)
    } else {
      router.push('/auth')
    }
  }, [router])

  const loadAppointments = async (doctorId: string) => {
    try {
      const res = await fetch(`/api/appointments?doctorId=${doctorId}`)
      if (res.ok) {
        const data = await res.json()
        setAppointments(data.appointments || [])
      }
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewProfile = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowPatientProfile(true)
  }

  const handleOpenChat = (patientId: string) => {
    router.push(`/chat/${patientId}`)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  const parseJsonArray = (str: string) => {
    try {
      return JSON.parse(str) || []
    } catch {
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#7C5CFF]">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Загрузка записей...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Записи пациентов</h1>
            <p className="text-muted-foreground">Управление консультациями</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="rounded-2xl border-primary/10 bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF]">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-white">{appointments.length}</p>
              <p className="text-sm text-white/80">Всего записей</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-primary/10">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-[#7C5CFF]">
                {appointments.filter(a => a.status === 'PENDING').length}
              </p>
              <p className="text-sm text-muted-foreground">Ожидают</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-primary/10">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {appointments.filter(a => a.status === 'COMPLETED').length}
              </p>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <Card className="rounded-2xl border-primary/10">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-[#7C5CFF]/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Пока нет записей</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Когда пациент запишется на консультацию, здесь появится информация о записи
                </p>
              </CardContent>
            </Card>
          ) : (
            appointments.map((appointment) => {
              const { date, time } = formatDateTime(appointment.dateTime)
              const patientName = appointment.patient.name || appointment.patient.email.split('@')[0]
              
              return (
                <Card key={appointment.id} className="rounded-2xl border-primary/10 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] p-4 lg:p-6 text-white lg:w-48 flex-shrink-0">
                        <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
                          <Clock className="h-5 w-5 lg:h-6 lg:w-6" />
                          <div>
                            <p className="text-lg font-bold">{time}</p>
                            <p className="text-sm opacity-80">{date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-4 lg:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                              {appointment.patient.image ? (
                                <img 
                                  src={appointment.patient.image} 
                                  alt="" 
                                  className="h-full w-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-6 w-6 text-[#7C5CFF]" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">{patientName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.patient.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  appointment.status === 'PENDING' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : appointment.status === 'COMPLETED'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {appointment.status === 'PENDING' ? 'Ожидается' : 
                                   appointment.status === 'COMPLETED' ? 'Завершено' : 'Отменено'}
                                </span>
                                <span className="text-xs text-muted-foreground">{appointment.price} ₽</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 lg:flex-col lg:w-40">
                            <Button
                              variant="outline"
                              onClick={() => handleViewProfile(appointment.patient)}
                              className="flex-1 lg:w-full rounded-xl border-[#7C5CFF]/30 text-[#7C5CFF] hover:bg-[#7C5CFF]/10"
                            >
                              <User className="h-4 w-4 mr-2" />
                              Профиль
                            </Button>
                            <Button
                              onClick={() => handleOpenChat(appointment.patient.id)}
                              className="flex-1 lg:w-full rounded-xl bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Чат
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

      </div>

      <Dialog open={showPatientProfile} onOpenChange={setShowPatientProfile}>
        <DialogContent className="rounded-3xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-[#7C5CFF]" />
              Медицинская карта пациента
            </DialogTitle>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#7C5CFF]/10 to-[#C7B8FF]/10 rounded-2xl">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md">
                  {selectedPatient.image ? (
                    <img 
                      src={selectedPatient.image} 
                      alt="" 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[#7C5CFF]">
                      {(selectedPatient.name || selectedPatient.email).charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedPatient.name || 'Без имени'}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#7C5CFF]/5">
                <div className="h-12 w-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center flex-shrink-0">
                  <Droplets className="h-6 w-6 text-[#7C5CFF]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Группа крови</p>
                  <p className="text-lg font-semibold">{selectedPatient.bloodType || "Не указана"}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-[#7C5CFF]" />
                  <span className="font-medium">Хронические заболевания</span>
                </div>
                {parseJsonArray(selectedPatient.chronicDiseases).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {parseJsonArray(selectedPatient.chronicDiseases).map((d: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                        {d}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Не указаны</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-[#7C5CFF]" />
                  <span className="font-medium">Аллергии</span>
                </div>
                {parseJsonArray(selectedPatient.allergies).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {parseJsonArray(selectedPatient.allergies).map((a: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Не указаны</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="h-5 w-5 text-[#7C5CFF]" />
                  <span className="font-medium">Принимаемые лекарства</span>
                </div>
                {parseJsonArray(selectedPatient.medications).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {parseJsonArray(selectedPatient.medications).map((m: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white text-sm text-[#7C5CFF] border border-[#7C5CFF]/20 shadow-sm">
                        {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Не указаны</p>
                )}
              </div>

              {selectedPatient.healthDescription && (
                <div className="p-4 rounded-xl bg-[#7C5CFF]/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-[#7C5CFF]" />
                    <span className="font-medium">Описание состояния</span>
                  </div>
                  <p className="text-sm leading-relaxed">{selectedPatient.healthDescription}</p>
                </div>
              )}

              <Button 
                onClick={() => setShowPatientProfile(false)}
                className="w-full rounded-xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
              >
                Закрыть
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}