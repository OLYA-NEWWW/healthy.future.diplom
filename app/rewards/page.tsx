"use client"

import { Gift, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: "1",
    title: "Витамины группы B",
    brand: "Solgar",
    price: 1200,
    discountPrice: 960,
    pointsDiscount: 50,
    image: "/complexB.png",
  },
  {
    id: "2",
    title: "Цинк",
    brand: "Solgar",
    price: 1800,
    discountPrice: 1440,
    pointsDiscount: 75,
    image: "/zinc.png",
  },
  {
    id: "3",
    title: "Магний B6",
    brand: "Solgar",
    price: 900,
    discountPrice: 720,
    pointsDiscount: 40,
    image: "/magnezium.png",
  },
  {
    id: "4",
    title: "Витамин D3",
    brand: "Solgar",
    price: 750,
    discountPrice: 600,
    pointsDiscount: 35,
    image: "/D3.png",
  },
]

export default function RewardsPage() {
  const userPoints = 240

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Награды</h1>
        <p className="text-muted-foreground mt-2">Обменивайте баллы на скидки и товары для здоровья</p>
      </div>

      <Card className="rounded-3xl border-none bg-gradient-to-br from-[#7C5CFF] to-[#C7B8FF]">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm text-white/80 mb-1">Доступно баллов</p>
            <p className="text-4xl font-bold text-white">{userPoints}</p>
            <p className="text-sm text-white/70 mt-2">Участвуйте в челленджах чтобы заработать больше</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/10 bg-[#7C5CFF]/5">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Как это работает</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Зарабатывайте баллы, участвуя в челленджах и используя платформу.
            Обменивайте баллы на скидки для товаров для здоровья или используйте для оплаты подписки.
          </p>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Маркетплейс</h2>
          <Button asChild variant="link" className="text-primary">
            <Link href="/subscription">Посмотреть подписки</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="rounded-3xl border-primary/10 hover:shadow-lg transition-all">
              <CardContent className="p-4 space-y-3">
                <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center mb-3 overflow-hidden">
                 <img 
                   src={product.image} 
                   alt={product.title}
                   className="w-full h-full object-cover"
                 />
               </div>

                <div>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <h3 className="font-semibold text-foreground">{product.title}</h3>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">{product.discountPrice} ₽</span>
                    <span className="text-sm text-muted-foreground line-through">{product.price} ₽</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Gift className="h-3 w-3 mr-1" />
                    {product.pointsDiscount} баллов
                  </Badge>
                </div>

                <Button
                  disabled={userPoints < product.pointsDiscount}
                  className="w-full rounded-2xl h-10 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
                >
                  {userPoints >= product.pointsDiscount ? "Обменять баллы" : "Недостаточно баллов"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
