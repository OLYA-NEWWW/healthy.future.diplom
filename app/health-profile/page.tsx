"use client"

import { useState } from "react"
import { Heart, ArrowRight, User, Target, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

export default function HealthProfilePage() {
  const [step, setStep] = useState(1)
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [goal, setGoal] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [wellness, setWellness] = useState([3])

  const handleComplete = () => {
    console.log({ age, gender, goal, activityLevel, wellness })
  }

  const totalSteps = 5

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="mx-auto w-full max-w-md space-y-6 py-8">
        <div className="text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Анкета здоровья</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Шаг {step} из {totalSteps}
          </p>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <Card className="border-primary/10 shadow-lg">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base">
                    Ваш возраст
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Введите возраст"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="text-base"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Label className="text-base">Пол</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="flex-1 cursor-pointer text-base font-normal">
                      Мужской
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="flex-1 cursor-pointer text-base font-normal">
                      Женский
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer text-base font-normal">
                      Другое
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Label className="text-base">Цель использования платформы</Label>
                <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="recovery" id="recovery" />
                    <Label htmlFor="recovery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Восстановление</div>
                          <div className="text-xs text-muted-foreground">После болезни или операции</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="prevention" id="prevention" />
                    <Label htmlFor="prevention" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Профилактика</div>
                          <div className="text-xs text-muted-foreground">Поддержание здоровья</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <Label className="text-base">Уровень физической активности</Label>
                <RadioGroup value={activityLevel} onValueChange={setActivityLevel} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary" className="flex-1 cursor-pointer text-base font-normal">
                      Малоподвижный
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex-1 cursor-pointer text-base font-normal">
                      Легкая активность
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="flex-1 cursor-pointer text-base font-normal">
                      Умеренная активность
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="flex-1 cursor-pointer text-base font-normal">
                      Высокая активность
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base">Оцените ваше текущее самочувствие</Label>
                  <div className="space-y-6 pt-2">
                    <Slider value={wellness} onValueChange={setWellness} min={1} max={5} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Плохо</span>
                      <span className="text-base font-medium text-primary">{wellness[0]}</span>
                      <span>Отлично</span>
                    </div>
                  </div>
                </div>

                <Card className="border-accent/50 bg-accent/20">
                  <CardContent className="flex items-start gap-3 p-4">
                    <Smile className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-xs leading-relaxed text-foreground">
                      Ваши данные помогут нам персонализировать рекомендации и отслеживать прогресс
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="flex-1">
              Назад
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              size="lg"
              onClick={() => setStep(step + 1)}
              className="flex-1"
              disabled={
                (step === 1 && !age) ||
                (step === 2 && !gender) ||
                (step === 3 && !goal) ||
                (step === 4 && !activityLevel)
              }
            >
              Далее
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button asChild size="lg" className="flex-1">
              <Link href="/dashboard">
                Завершить
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
