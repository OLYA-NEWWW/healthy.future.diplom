"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [email, setEmail] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Оплата</h1>
        <p className="text-muted-foreground mt-2">Введите данные карты для завершения оплаты</p>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground">Все платежи защищены и зашифрованы</p>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF] text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-12">
            <div className="h-12 w-16 rounded bg-white/20 backdrop-blur" />
            <CreditCard className="h-8 w-8 opacity-80" />
          </div>
          <div className="space-y-4">
            <p className="text-2xl font-mono tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70 mb-1">Владелец карты</p>
                <p className="font-semibold">{cardHolder || "ИМЯ ФАМИЛИЯ"}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 mb-1">Срок</p>
                <p className="font-semibold">{expiry || "ММ/ГГ"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-8">
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Номер карты</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="rounded-xl h-12"
                maxLength={19}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardHolder">Владелец карты</Label>
              <Input
                id="cardHolder"
                type="text"
                placeholder="IVAN IVANOV"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                className="rounded-xl h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl h-12"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Дата</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="ММ/ГГ"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="rounded-xl h-12"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="rounded-xl h-12"
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-lg"
            >
              Оплатить
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-warning/30 bg-warning/5">
        <CardContent className="p-4">
          <p className="text-sm text-center text-foreground">
            <strong>Демо-форма.</strong> Реальная оплата не выполняется
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
