"use client"

import { MessageSquare, Video, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PurchasesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Разовые покупки</h1>
        <p className="text-muted-foreground mt-2">Оплатите одну консультацию без подписки</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-[2rem] border-primary/10 hover:shadow-xl transition-all">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Разовая консультация в чате</h3>
              <p className="text-muted-foreground">Текстовое общение с врачом в течение 24 часов</p>
            </div>

            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-primary">500 ₽</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Ответ врача в течение 2 часов</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Доступ к чату 24 часа</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Рекомендации и советы</span>
              </div>
            </div>

            <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
              <Link href="/payment">Выбрать</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-primary/10 hover:shadow-xl transition-all">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5">
                <Video className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Разовая консультация в звонке</h3>
              <p className="text-muted-foreground">Видеозвонок с врачом длительностью 30 минут</p>
            </div>

            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-bold text-primary">1500 ₽</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Видеоконсультация 30 минут</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Запись разговора доступна 7 дней</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Детальный план лечения</span>
              </div>
            </div>

            <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
              <Link href="/payment">Выбрать</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-primary/5">
        <CardContent className="p-6">
          <p className="text-sm text-foreground leading-relaxed text-center">
            <strong>Совет:</strong> Если вам нужны регулярные консультации, рассмотрите{" "}
            <Link href="/subscription" className="text-primary hover:underline">
              подписку
            </Link>{" "}
            - это выгоднее разовых покупок.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
