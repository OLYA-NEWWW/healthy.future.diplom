"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Home,
  Activity,
  Map,
  MessageSquare,
  Stethoscope,
  Music,
  Trophy,
  Gift,
  CreditCard,
  User,
  Calendar,
  Users,
  UserCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const patientNavItems = [
  { href: "/dashboard", label: "Главная", icon: Home },
  { href: "/health/map", label: "Карта здоровья", icon: Map },
  { href: "/ai", label: "ИИ-чат", icon: MessageSquare },
  { href: "/doctors", label: "Врачи", icon: Stethoscope },
  { href: "/meditations", label: "Медитации", icon: Music },
  { href: "/challenges", label: "Челленджи", icon: Trophy },
  { href: "/rewards", label: "Награды", icon: Gift },
  { href: "/subscription", label: "Подписка", icon: CreditCard },
  { href: "/profile", label: "Профиль", icon: User },
]

const doctorNavItems = [
  { href: "/doctor/appointments", label: "Записи", icon: Calendar },
  { href: "/doctor/patients", label: "Пациенты", icon: Users },
  { href: "/doctor/profile", label: "Профиль", icon: UserCircle },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      const user = JSON.parse(saved)
      setUserRole(user.role)
    }
  }, [])

  const isDoctor = userRole === 'DOCTOR'
  const navItems = isDoctor ? doctorNavItems : patientNavItems

  const subtitle = isDoctor ? "Кабинет врача" : null

  if (!userRole) return null 

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="flex h-15 w-15 items-center justify-center rounded-xl ">
          <img 
            src="/logo.png" 
            alt="Healthy Future" 
            className="h-50 w-50 object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Healthy Future</h1>
          {subtitle && <p className="text-xs text-[#7C5CFF]">{subtitle}</p>}
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}