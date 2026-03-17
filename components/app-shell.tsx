"use client"

import type { ReactNode } from "react"
import { SidebarNav } from "./sidebar-nav"
import { BottomNav } from "./bottom-nav"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  const noNavPages = ["/", "/auth", "/onboarding"]
  const hideNav = noNavPages.includes(pathname)

  if (hideNav) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border bg-card">
        <SidebarNav />
      </aside>

      <main className="flex-1 lg:pl-64 pb-20 lg:pb-0">
        <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">{children}</div>
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
