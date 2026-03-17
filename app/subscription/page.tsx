"use client"

import { useState } from "react"
import { Check, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SegmentedControl } from "@/components/segmented-control"
import Link from "next/link"

export default function SubscriptionPage() {
  const [period, setPeriod] = useState("Год")

  const monthlyPrices = { basic: 990, pro: 1990 }
  const yearlyPrices = { basic: 9900, pro: 19900 }

  const prices = period === "Год" ? yearlyPrices : monthlyPrices

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Подписка</h1>
        <p className="text-muted-foreground mt-2">Выберите план подписки для полного доступа к возможностям</p>
      </div>

      <Card className="rounded-3xl border-warning/30 bg-warning/5">
        <CardContent className="p-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">Бесплатная версия</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              В бесплатной версии доступно 3 диалога с ИИ-консультантом в месяц. Оформите подписку для безлимитного
              доступа и дополнительных функций.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <SegmentedControl options={["Год", "Месяц"]} value={period} onChange={setPeriod} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="rounded-[2rem] border-primary/10 hover:shadow-xl transition-all">
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Базовая подписка</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">{prices.basic} ₽</span>
                <span className="text-muted-foreground">/ {period === "Год" ? "год" : "месяц"}</span>
              </div>
              {period === "Год" && <p className="text-sm text-success mt-1">Экономия 2 месяцев при годовой оплате</p>}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Безлимитные чаты с ИИ-консультантом</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Полный доступ к мониторингу здоровья</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">3 видеозвонка с врачами в месяц</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Скидка 5% на витамины в маркетплейсе</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Доступ к базовым курсам медитаций</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
                <Link href="/payment">Оплатить</Link>
              </Button>
              <Button asChild variant="link" className="text-primary">
                <Link href="/subscription/basic">Узнать подробнее</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-primary/10 hover:shadow-xl transition-all relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Популярный
          </div>
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Продвинутая подписка</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">{prices.pro} ₽</span>
                <span className="text-muted-foreground">/ {period === "Год" ? "год" : "месяц"}</span>
              </div>
              {period === "Год" && <p className="text-sm text-success mt-1">Экономия 2 месяцев при годовой оплате</p>}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Все возможности базовой подписки</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Неограниченные видеозвонки с врачами</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Приоритетная поддержка 24/7</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Расширенный курс медитаций и практик</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Скидка 10% на витамины в маркетплейсе</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Персональный план восстановления</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button asChild className="w-full rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
                <Link href="/payment">Оплатить</Link>
              </Button>
              <Button asChild variant="link" className="text-primary">
                <Link href="/subscription/pro">Узнать подробнее</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
