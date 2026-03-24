import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import { AppShell } from "@/components/app-shell"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
})

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope"
})

export const metadata: Metadata = {
  title: "Healthy Future | Платформа мониторинга здоровья",
  description: "Платформа для мониторинга здоровья и восстановления",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}