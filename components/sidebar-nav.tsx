"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Главная", icon: Home },
  { href: "/health", label: "Мониторинг", icon: Activity },
  { href: "/health/map", label: "Карта здоровья", icon: Map },
  { href: "/ai", label: "ИИ-чат", icon: MessageSquare },
  { href: "/doctors", label: "Врачи", icon: Stethoscope },
  { href: "/meditations", label: "Медитации", icon: Music },
  { href: "/challenges", label: "Челленджи", icon: Trophy },
  { href: "/rewards", label: "Награды", icon: Gift },
  { href: "/subscription", label: "Подписка", icon: CreditCard },
  { href: "/profile", label: "Профиль", icon: User },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF]">
          <Heart className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Healthy Future</h1>
          <span className="text-xs text-muted-foreground">beta</span>
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
