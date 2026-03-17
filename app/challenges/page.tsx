"use client"

import { useState } from "react"
import { Trophy, Target, Users, Gift, CheckCircle2, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const challenges = [
  {
    id: "1",
    title: "7 дней воды",
    description: "Пейте минимум 2 литра воды каждый день",
    progress: 4,
    total: 7,
    points: 50,
    participants: 1234,
    active: true,
  },
  {
    id: "2",
    title: "10 000 шагов",
    description: "Проходите 10 000 шагов ежедневно",
    progress: 3,
    total: 7,
    points: 75,
    participants: 2145,
    active: true,
  },
  {
    id: "3",
    title: "Неделя сна",
    description: "Спите минимум 7 часов каждую ночь",
    progress: 0,
    total: 7,
    points: 60,
    participants: 989,
    active: false,
  },
  {
    id: "4",
    title: "Медитация 10 дней",
    description: "Ежедневная медитация в течение 10 дней",
    progress: 0,
    total: 10,
    points: 100,
    participants: 756,
    active: false,
  },
]

export default function ChallengesPage() {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [userPoints, setUserPoints] = useState(240)
  const [activeChallenges, setActiveChallenges] = useState<string[]>(["1", "2"])

  const handleJoinChallenge = (challengeId: string, points: number) => {
    setActiveChallenges([...activeChallenges, challengeId])
    setUserPoints((prev) => prev + 10)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Челленджи</h1>
        <p className="text-muted-foreground mt-2">Присоединяйтесь к сообществу и зарабатывайте баллы</p>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ваши баллы</p>
              <p className="text-4xl font-bold text-primary">{userPoints}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF]">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/50 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Активных</p>
              <p className="text-lg font-bold text-foreground">{activeChallenges.length}</p>
            </div>
            <div className="rounded-2xl bg-white/50 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Завершено</p>
              <p className="text-lg font-bold text-success">5</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/10 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" />
            Как зарабатывать баллы
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />
              <span>+10 баллов за присоединение к челленджу</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />
              <span>Полная награда за завершение челленджа</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />
              <span>+5 баллов за каждый день активности</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />
              <span>Бонусы за топ-позиции в таблице лидеров</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          variant="outline"
          className="flex-1 rounded-2xl h-12 bg-transparent"
        >
          <Users className="mr-2 h-5 w-5" />
          Таблица лидеров
        </Button>
        <Button asChild className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]">
          <Link href="/rewards">
            <Gift className="mr-2 h-5 w-5" />
            Обменять баллы
          </Link>
        </Button>
      </div>

      {showLeaderboard && (
        <Card className="rounded-3xl border-primary/10">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Топ участников
            </h3>
            <div className="space-y-3">
              {[
                { name: "Анна К.", points: 1250, rank: 1 },
                { name: "Дмитрий П.", points: 1100, rank: 2 },
                { name: "Мария С.", points: 950, rank: 3 },
                { name: "Вы", points: userPoints, rank: 47 },
              ].map((user) => (
                <div key={user.rank} className="flex items-center gap-4 p-3 rounded-2xl bg-muted/30">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                      user.rank <= 3
                        ? "bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                  </div>
                  <p className="font-bold text-primary">{user.points}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Доступные челленджи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => {
            const isActive = activeChallenges.includes(challenge.id)
            return (
              <Card key={challenge.id} className="rounded-3xl border-primary/10 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 flex-shrink-0 ml-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span>{challenge.points} баллов</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants.toLocaleString()}</span>
                    </div>
                  </div>

                  {isActive ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium text-primary">
                          {challenge.progress} / {challenge.total}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleJoinChallenge(challenge.id, challenge.points)}
                      className="w-full rounded-2xl h-11 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Присоединиться (+10 баллов)
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
