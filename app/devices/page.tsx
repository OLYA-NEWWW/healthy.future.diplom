"use client"

import { useState } from "react"
import { ArrowLeft, Smartphone, Watch, Activity, Download, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const devices = [
  {
    id: "apple-health",
    name: "Apple Health",
    icon: Smartphone,
    description: "Синхронизация данных с iPhone и Apple Watch",
    connected: false,
  },
  {
    id: "google-fit",
    name: "Google Fit",
    icon: Activity,
    description: "Импорт активности и здоровья из Google Fit",
    connected: false,
  },
  {
    id: "fitbit",
    name: "Fitbit",
    icon: Watch,
    description: "Подключение трекеров и умных часов Fitbit",
    connected: false,
  },
]

export default function DevicesPage() {
  const router = useRouter()
  const [connectedDevices, setConnectedDevices] = useState<string[]>([])

  const handleConnect = (deviceId: string) => {
    if (connectedDevices.includes(deviceId)) {
      setConnectedDevices(connectedDevices.filter((id) => id !== deviceId))
    } else {
      setConnectedDevices([...connectedDevices, deviceId])
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к профилю
      </Button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Интеграция устройств</h1>
        <p className="text-muted-foreground mt-2">
          Подключите носимые устройства для автоматического отслеживания показателей
        </p>
      </div>

      <Card className="rounded-3xl border-primary/10 bg-primary/5">
        <CardContent className="p-6">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Автоматическая синхронизация:</strong> После подключения устройства данные о вашей активности, сне,
            пульсе и других показателях будут автоматически импортироваться в приложение.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {devices.map((device) => {
          const Icon = device.icon
          const isConnected = connectedDevices.includes(device.id)

          return (
            <Card key={device.id} className="rounded-3xl border-primary/10 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{device.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{device.description}</p>
                      </div>
                      {isConnected && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 flex-shrink-0">
                          <Check className="h-5 w-5 text-success" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button
                        onClick={() => handleConnect(device.id)}
                        className={`flex-1 rounded-2xl h-11 ${
                          isConnected
                            ? "bg-muted text-foreground hover:bg-muted/80"
                            : "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF]"
                        }`}
                      >
                        {isConnected ? "Отключить" : "Подключить"}
                      </Button>
                      {isConnected && (
                        <Button variant="outline" className="flex-1 rounded-2xl h-11 bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Импортировать данные
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="rounded-3xl border-primary/10 bg-muted/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Нужна помощь?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Если у вас возникли проблемы с подключением устройства, обратитесь в службу поддержки или ознакомьтесь с
            инструкциями по интеграции.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
