"use client"

import { useState, useEffect, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DoctorCard } from "@/components/doctor-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")
  const [format, setFormat] = useState<"all" | "chat" | "video">("all")
  const [sortBy, setSortBy] = useState("rating")
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      const res = await fetch('/api/doctors')
      const data = await res.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error('Error loading doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors]

    if (searchQuery) {
      filtered = filtered.filter(
        (doctor: any) =>
          doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (specialty !== "all") {
      const specialtyMap: Record<string, string> = {
        therapist: "Терапевт",
        cardiologist: "Кардиолог",
        neurologist: "Невролог",
        endocrinologist: "Эндокринолог",
        psychologist: "Психолог",
      }
      filtered = filtered.filter((doctor: any) => doctor.specialty === specialtyMap[specialty])
    }

    if (format !== "all") {
      filtered = filtered.filter((doctor: any) => doctor.format?.includes(format))
    }

    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "price-asc":
          return (a.price || 0) - (b.price || 0)
        case "price-desc":
          return (b.price || 0) - (a.price || 0)
        case "experience":
          return (b.experience || 0) - (a.experience || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, specialty, format, sortBy, doctors])

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Загрузка врачей...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Врачи</h1>
        <p className="text-muted-foreground mt-2">Выберите специалиста для консультации</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск врача или специальности..."
          className="pl-12 rounded-2xl h-12"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="rounded-xl h-11">
            <SelectValue placeholder="Специализация" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все специализации</SelectItem>
            <SelectItem value="therapist">Терапевт</SelectItem>
            <SelectItem value="cardiologist">Кардиолог</SelectItem>
            <SelectItem value="neurologist">Невролог</SelectItem>
            <SelectItem value="endocrinologist">Эндокринолог</SelectItem>
            <SelectItem value="psychologist">Психолог</SelectItem>
          </SelectContent>
        </Select>

        <div className="inline-flex rounded-2xl bg-muted p-1.5 gap-1 flex-1">
          <button
            onClick={() => setFormat("all")}
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              format === "all"
                ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Все форматы
          </button>
          <button
            onClick={() => setFormat("chat")}
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              format === "chat"
                ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Чат
          </button>
          <button
            onClick={() => setFormat("video")}
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              format === "video"
                ? "bg-gradient-to-r from-[#C7B8FF] to-[#7C5CFF] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Видеозвонок
          </button>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="rounded-xl h-11 md:w-48">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">По рейтингу</SelectItem>
            <SelectItem value="experience">По опыту</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Найдено врачей: <span className="font-semibold text-foreground">{filteredDoctors.length}</span>
      </p>

      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor: any) => (
            <DoctorCard 
              key={doctor.id} 
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              experience={doctor.experience}
              rating={doctor.rating}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Врачи не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}