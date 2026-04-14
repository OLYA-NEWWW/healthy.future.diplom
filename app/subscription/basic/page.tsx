"use client"

import { ArrowLeft, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function BasicSubscriptionPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к подпискам
      </Button>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Базовая подписка</h1>
        <p className="text-xl text-muted-foreground">Все необходимое для мониторинга и поддержки здоровья</p>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-primary">1290 ₽</span>
            <span className="text-xl text-muted-foreground">/ месяц</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">или 12 900 ₽ за год (экономия 2 месяцев)</p>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/10">
        <CardContent className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Что включено:</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Обсуждение проблем в чатах с врачами</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Задавайте вопросы специалистам в любое время через текстовый чат. Получайте ответы в течение 24 часов.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Один курс медитаций на выбор</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                 Выбирайте понравившийся вам курс,исходя из потребностей.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">3 консультации с врачом</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Проводите полноценные консультации для более детального обсуждения вашего состояния.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Скидка 5% на витамины в маркетплейсе</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Покупайте БАДы и витамины для поддержки здоровья со скидкой для подписчиков.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Безлимитный доступ к ИИ-консультанту</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Задавайте неограниченное количество вопросов ИИ-ассистенту для быстрых рекомендаций.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button asChild className="w-full rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-lg">
        <a href="/payment">Выбрать и оплатить</a>
      </Button>
    </div>
  )
}
