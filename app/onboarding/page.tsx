"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Stepper } from "@/components/stepper"
import { SegmentedControl } from "@/components/segmented-control"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState("Женщина")
  const [goal, setGoal] = useState("Восстановление")
  const [activity, setActivity] = useState("Средний")
  const [wellbeing, setWellbeing] = useState(3)

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#FAF7FF] via-white to-[#F5F0FF] p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Расскажите о себе</h1>
          <p className="text-muted-foreground">Это поможет нам персонализировать рекомендации для вашего здоровья</p>
          <Stepper steps={TOTAL_STEPS} currentStep={currentStep} />
        </div>

        <Card className="border-primary/10 shadow-2xl rounded-[2rem] p-8 md:p-12">
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Укажите ваш вес</h2>
                <p className="text-muted-foreground">Это поможет рассчитать нужные показатели</p>
              </div>

              <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                  <div className="text-7xl font-bold text-primary">{weight}</div>
                  <div className="text-2xl text-muted-foreground mt-2">кг</div>
                </div>

                <div className="w-full max-w-md">
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2 rounded-full bg-primary/20 appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #7C5CFF 0%, #7C5CFF ${((weight - 40) / 110) * 100}%, #e5e7eb ${((weight - 40) / 110) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>40 кг</span>
                    <span>150 кг</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Укажите ваш рост</h2>
                <p className="text-muted-foreground">Для расчета индекса массы тела</p>
              </div>

              <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                  <div className="text-7xl font-bold text-primary">{height}</div>
                  <div className="text-2xl text-muted-foreground mt-2">см</div>
                </div>

                <div className="w-full max-w-md">
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 rounded-full bg-primary/20 appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7C5CFF 0%, #7C5CFF ${((height - 140) / 80) * 100}%, #e5e7eb ${((height - 140) / 80) * 100}%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>140 см</span>
                    <span>220 см</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Общая информация</h2>
                <p className="text-muted-foreground">Несколько вопросов о вас</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Возраст</Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="rounded-xl text-lg h-12"
                    min="10"
                    max="100"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Пол</Label>
                  <SegmentedControl
                    options={["Женщина", "Мужчина", "Другое"]}
                    value={gender}
                    onChange={setGender}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Ваша цель</Label>
                  <SegmentedControl
                    options={["Восстановление", "Профилактика"]}
                    value={goal}
                    onChange={setGoal}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Уровень активности</Label>
                  <SegmentedControl
                    options={["Низкий", "Средний", "Высокий"]}
                    value={activity}
                    onChange={setActivity}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Самочувствие и привычки</h2>
                <p className="text-muted-foreground">Последние вопросы для персонализации</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base">Как вы оцениваете своё самочувствие?</Label>
                  <div className="flex items-center justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setWellbeing(value)}
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all ${
                          wellbeing === value
                            ? "border-primary bg-primary text-white scale-110"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xl font-bold">{value}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Плохо</span>
                    <span>Отлично</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Питание (выберите подходящее)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Много сладкого", "Фастфуд часто", "Овощи ежедневно", "Пью много воды"].map((habit) => (
                      <button
                        key={habit}
                        className="rounded-xl border-2 border-border px-4 py-3 text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
                      >
                        {habit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button onClick={handleBack} variant="outline" size="lg" className="rounded-2xl h-14 px-8 bg-transparent">
              <ChevronLeft className="mr-2 h-5 w-5" />
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            size="lg"
            className="flex-1 rounded-2xl h-14 bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] hover:shadow-lg transition-all"
          >
            {currentStep === TOTAL_STEPS - 1 ? "Завершить" : "Далее"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
