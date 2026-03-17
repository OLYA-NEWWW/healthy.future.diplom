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

  // Поля формы
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
          router.push('/doctor-dashboard')
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link
            href="/welcome"
            className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] shadow-lg"
          >
            <Heart className="h-8 w-8 text-white" />
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Healthy Future</h1>
          <p className="mt-2 text-muted-foreground">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте аккаунт"}
          </p>
        </div>

        <Card className="border-primary/10 shadow-2xl rounded-[2rem]">
          <CardHeader className="space-y-1 pb-4">
            <div className="inline-flex rounded-2xl bg-muted/50 p-1.5 gap-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
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
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Регистрация
              </button>
            </div>

            {!isLogin && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3 text-center">Выберите тип аккаунта</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("PATIENT")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      role === "PATIENT"
                        ? "border-[#7C5CFF] bg-[#7C5CFF]/5"
                        : "border-muted hover:border-[#7C5CFF]/30"
                    }`}
                  >
                    <User className={`h-6 w-6 ${role === "PATIENT" ? "text-[#7C5CFF]" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${role === "PATIENT" ? "text-[#7C5CFF]" : "text-muted-foreground"}`}>
                      Пациент
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("DOCTOR")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      role === "DOCTOR"
                        ? "border-[#7C5CFF] bg-[#7C5CFF]/5"
                        : "border-muted hover:border-[#7C5CFF]/30"
                    }`}
                  >
                    <Stethoscope className={`h-6 w-6 ${role === "DOCTOR" ? "text-[#7C5CFF]" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${role === "DOCTOR" ? "text-[#7C5CFF]" : "text-muted-foreground"}`}>
                      Врач
                    </span>
                  </button>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Иванов Иван Иванович"
                      className="pl-10 rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    className="pl-10 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && role === "DOCTOR" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Специальность</Label>
                    <Input
                      id="specialty"
                      placeholder="Терапевт"
                      className="rounded-xl"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Номер лицензии</Label>
                    <Input
                      id="license"
                      placeholder="ЛО-77-01-123456"
                      className="rounded-xl"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex items-start gap-3 rounded-2xl bg-primary/5 p-4">
                <Checkbox
                  id="disclaimer"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="disclaimer" className="text-sm leading-relaxed text-foreground cursor-pointer">
                  Платформа не заменяет консультацию врача
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg transition-all"
                disabled={!agreed || loading}
              >
                {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Продолжая, вы соглашаетесь с{" "}
          <button className="text-primary hover:underline">Условиями использования</button>
        </p>
      </div>
    </div>
  )
}