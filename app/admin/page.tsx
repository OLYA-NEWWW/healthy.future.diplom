"use client"

import { useEffect, useState } from "react"
import { Check, X, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Doctor = {
  id: string
  email: string
  name: string | null
  specialty: string | null
  licenseNumber: string | null
  createdAt: string
}

export default function AdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      const res = await fetch('/api/admin/doctors')
      const data = await res.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error('Error loading doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id: string, status: 'ACTIVE' | 'REJECTED') => {
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        setDoctors(doctors.filter(d => d.id !== id))
      }
    } catch (error) {
      console.error('Error updating doctor:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Панель администратора</h1>
          <p className="mt-2 text-muted-foreground">Подтверждение регистрации врачей</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Загрузка...</div>
        ) : doctors.length === 0 ? (
          <Card className="rounded-[2rem]">
            <CardContent className="p-12 text-center">
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Нет врачей, ожидающих подтверждения</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="rounded-[2rem] border-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg">{doctor.name || 'Без имени'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{doctor.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Специальность:</span>
                      <p className="font-medium">{doctor.specialty || '—'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Лицензия:</span>
                      <p className="font-medium">{doctor.licenseNumber || '—'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Дата регистрации:</span>
                      <p className="font-medium">
                        {new Date(doctor.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleAction(doctor.id, 'ACTIVE')}
                      className="flex-1 rounded-xl bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Подтвердить
                    </Button>
                    <Button
                      onClick={() => handleAction(doctor.id, 'REJECTED')}
                      variant="outline"
                      className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Отклонить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}