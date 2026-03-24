"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Mail, Lock, Eye, EyeOff, User, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"

type UserRole = "PATIENT" | "DOCTOR"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<UserRole>("PATIENT")
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Ошибка входа')
        }

        localStorage.setItem('user', JSON.stringify(data.user))

       if (data.user.role === 'DOCTOR') {
          router.push('/doctor-profile') 
      } else {
          router.push('/dashboard')
        }

      } else {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            role,
            name,
            specialty: role === 'DOCTOR' ? specialty : undefined,
            licenseNumber: role === 'DOCTOR' ? licenseNumber : undefined,
          })
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Ошибка регистрации')
        }

        if (role === 'DOCTOR') {
          alert('Регистрация успешна! Ожидайте подтверждения администратором.')
          setIsLogin(true)
        } else {
          localStorage.setItem('user', JSON.stringify(data.user))
          router.push('/onboarding')
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex overflow-hidden">
      
      <div className="hidden lg:flex absolute top-10 left-15 z-20 items-center gap-3">
        <img src="/logo.png" alt="" className="w-16 h-16 -mt-1" />
        <h1 className="text-5xl font-bold text-[#1F2937]">Healthy Future</h1>
      </div>

      <div className="hidden lg:flex w-1/4 flex-col justify-center pl-16 pr-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#C4B5FD] to-[#A78BFA] rounded-full blur-3xl opacity-60" />
        
        <h2 className="relative text-5xl text-[#1F2937] leading-tight w-[400px]">
          Начните путь<br />
          к здоровью<br />
          прямо сейчас!
        </h2>

        <h2 className="relative font-light text-2xl text-[#1F2937] leading-tight w-[400px]">
          Зарегестрируйтесь или войдите.
        </h2>

      </div>

     <div className="hidden lg:flex w-2/4 items-end justify-center relative">
  <img 
    src="/doctor.png" 
    alt="Doctor"
    className="w-auto object-contain object-bottom mr-40"
  />
</div>

      <div className="w-full lg:w-[28%] flex items-center justify-end p-6 lg:pr-20">
  <div className="w-[500px] shrink-0">
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1F2937]">Healthy Future</h1>
            <h2 className="text-3xl font-bold text-[#1F2937] mt-2">
              Начните путь<br />к здоровью<br />прямо сейчас!
            </h2>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
            <CardHeader className="space-y-1 pb-4">
              <div className="inline-flex rounded-2xl bg-[#F3F0FF] p-1.5 gap-1 w-full">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${
                    isLogin
                      ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                      : "text-[#7C6F9B] hover:text-[#4A3F6B]"
                  }`}
                >
                  Вход
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${
                    !isLogin
                      ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                      : "text-[#7C6F9B] hover:text-[#4A3F6B]"
                  }`}
                >
                  Регистрация
                </button>
              </div>

              {!isLogin && (
                <div className="pt-4">
                  <p className="text-sm text-[#7C6F9B] mb-3 text-center">Выберите тип аккаунта</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("PATIENT")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        role === "PATIENT"
                          ? "border-[#7C5CFF] bg-[#7C5CFF]/5"
                          : "border-[#E8E3F5] hover:border-[#7C5CFF]/30"
                      }`}
                    >
                      <User className={`h-6 w-6 ${role === "PATIENT" ? "text-[#7C5CFF]" : "text-[#9B8FC7]"}`} />
                      <span className={`text-sm font-medium ${role === "PATIENT" ? "text-[#7C5CFF]" : "text-[#7C6F9B]"}`}>
                        Пациент
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("DOCTOR")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        role === "DOCTOR"
                          ? "border-[#7C5CFF] bg-[#7C5CFF]/5"
                          : "border-[#E8E3F5] hover:border-[##7C5CFF]/30"
                      }`}
                    >
                      <Stethoscope className={`h-6 w-6 ${role === "DOCTOR" ? "text-[#7C5CFF]" : "text-[#9B8FC7]"}`} />
                      <span className={`text-sm font-medium ${role === "DOCTOR" ? "text-[#7C5CFF]" : "text-[#7C6F9B]"}`}>
                        Врач
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#4A3F6B]">ФИО</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-[#9B8FC7]" />
                      <Input
                        id="name"
                        placeholder="Иванов Иван Иванович"
                        className="pl-10 rounded-xl border-[#E8E3F5] focus:border-[#7C5CFF] focus:ring-[#7C5CFF]/20"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#4A3F6B]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#9B8FC7]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      className="pl-10 rounded-xl border-[#E8E3F5] focus:border-[#7C5CFF] focus:ring-[#7C5CFF]/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#4A3F6B]">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#9B8FC7]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 rounded-xl border-[#E8E3F5] focus:border-[#7C5CFF] focus:ring-[#7C5CFF]/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#9B8FC7] hover:text-[#4A3F6B]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && role === "DOCTOR" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-[#4A3F6B]">Специальность</Label>
                      <Input
                        id="specialty"
                        placeholder="Терапевт"
                        className="rounded-xl border-[#E8E3F5] focus:border-[#7C5CFF] focus:ring-[#7C5CFF]/20"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license" className="text-[#4A3F6B]">Номер лицензии</Label>
                      <Input
                        id="license"
                        placeholder="ЛО-77-01-123456"
                        className="rounded-xl border-[#E8E3F5] focus:border-[#7C5CFF] focus:ring-[#7C5CFF]/20"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex items-start gap-3 rounded-2xl bg-[#F3F0FF] p-4">
                  <Checkbox
                    id="disclaimer"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-0.5 border-[#C7B8FF] data-[state=checked]:bg-[#7C5CFF] data-[state=checked]:border-[#7C5CFF]"
                  />
                  <Label htmlFor="disclaimer" className="text-sm leading-relaxed text-[#4A3F6B] cursor-pointer">
                    Платформа не заменяет консультацию врача
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg hover:shadow-[#7C5CFF]/25 transition-all text-white font-medium"
                  disabled={!agreed || loading}
                >
                  {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-[#9B8FC7] leading-relaxed mt-6">
            Продолжая, вы соглашаетесь с{" "}
            <button className="text-[#7C5CFF] hover:underline font-medium">Условиями использования</button>
          </p>
        </div>
      </div>

    </div>
  )
}