"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, Award, GraduationCap, ArrowLeft, Calendar, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export default function DoctorProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
 
  const [showBooking, setShowBooking] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    if (params.id) loadDoctor()
  }, [params.id])

  const loadDoctor = async () => {
    try {
      const res = await fetch(`/api/doctors/${params.id}`)
      const data = await res.json()
      setDoctor(data.doctor)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) {
      alert('Необходимо авторизоваться')
      router.push('/auth')
      return
    }

    if (!selectedTime || !doctor) return

    setPaymentProcessing(true)

    try {
      const today = new Date()
      const [hours, minutes] = selectedTime.split(':')
      today.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id,
          patientId: currentUser.id,
          dateTime: today.toISOString(),
          price: 3000,
        }),
      })

      if (res.ok) {
        setPaymentSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        throw new Error('Failed to create appointment')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Ошибка при создании записи')
    } finally {
      setPaymentProcessing(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Загрузка...</div>
  if (!doctor) return <div className="p-8 text-center">Врач не найден</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] p-6 text-center">
            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold mx-auto border-4 border-white/30">
              {doctor.name?.charAt(0).toUpperCase()}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold text-lg">{doctor.rating || 5.0}</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{doctor.name}</h1>
              <p className="text-muted-foreground">{doctor.specialty}</p>
              <p className="text-sm text-[#7C5CFF] mt-1">{doctor.experience || 0} лет опыта</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#7C5CFF]" />
                О враче
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {doctor.bio || "Информация о враче отсутствует"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#7C5CFF]" />
                Образование
              </h2>
              <ul className="space-y-1">
                {doctor.education?.length > 0 ? (
                  doctor.education.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-[#7C5CFF]">•</span>
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-muted-foreground">Информация отсутствует</li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {!showBooking && !paymentSuccess && (
          <Button 
            onClick={() => setShowBooking(true)}
            className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-lg font-semibold"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Купить разовую консультацию
          </Button>
        )}

        {showBooking && !showPayment && !paymentSuccess && (
          <Card className="rounded-[2rem] border-primary/10 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-center">Выберите время</h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white'
                        : 'bg-muted hover:bg-[#7C5CFF]/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => setShowPayment(true)}
                disabled={!selectedTime}
                className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
              >
                Продолжить
              </Button>
            </CardContent>
          </Card>
        )}

        {showPayment && !paymentSuccess && (
          <Card className="rounded-[2rem] border-primary/10 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Оплата консультации
              </h3>
              
              <div className="bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] text-white p-4 rounded-xl">
                <p className="text-xs opacity-70 mb-1">Врач: {doctor.name}</p>
                <p className="text-xs opacity-70 mb-1">Время: {selectedTime}</p>
                <p className="text-lg font-bold">3000 ₽</p>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Номер карты</Label>
                  <Input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="rounded-xl h-12"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Владелец</Label>
                  <Input
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="IVAN IVANOV"
                    className="rounded-xl h-12"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Срок</Label>
                    <Input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="ММ/ГГ"
                      className="rounded-xl h-12"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">CVV</Label>
                    <Input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="rounded-xl h-12"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  disabled={paymentProcessing}
                  className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
                >
                  {paymentProcessing ? 'Обработка...' : 'Оплатить 3000 ₽'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {paymentSuccess && (
          <Card className="rounded-[2rem] border-green-200 shadow-lg bg-green-50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Запись подтверждена!</h3>
              <p className="text-green-700">
                Вы успешно записались к {doctor.name} на {selectedTime}
              </p>
              <p className="text-sm text-green-600">
                Перенаправление в личный кабинет...
              </p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}