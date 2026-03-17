"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DoctorCard } from "@/components/doctor-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const doctors = [
  {
    id: "1",
    name: "Иванова Елена Сергеевна",
    specialty: "Терапевт",
    experience: 15,
    rating: 4.9,
    price: 3000,
    image: "/female-doctor.jpg",
    format: ["chat", "video"],
  },
  {
    id: "2",
    name: "Смирнов Дмитрий Александрович",
    specialty: "Кардиолог",
    experience: 20,
    rating: 4.8,
    price: 4500,
    image: "/male-doctor.jpg",
    format: ["chat", "video"],
  },
  {
    id: "3",
    name: "Петрова Анна Викторовна",
    specialty: "Невролог",
    experience: 12,
    rating: 4.9,
    price: 4000,
    image: "/female-doctor-neurologist.jpg",
    format: ["chat", "video"],
  },
  {
    id: "4",
    name: "Козлов Сергей Иванович",
    specialty: "Эндокринолог",
    experience: 18,
    rating: 4.7,
    price: 3500,
    image: "/male-doctor-endocrinologist.jpg",
    format: ["chat", "video"],
  },
  {
    id: "5",
    name: "Новикова Мария Петровна",
    specialty: "Психолог",
    experience: 10,
    rating: 4.8,
    price: 3200,
    image: "/female-nutritionist.jpg",
    format: ["chat", "video"],
  },
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")
  const [format, setFormat] = useState<"all" | "chat" | "video">("all")
  const [sortBy, setSortBy] = useState("rating")

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors]

    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
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
      filtered = filtered.filter((doctor) => doctor.specialty === specialtyMap[specialty])
    }

    if (format !== "all") {
      filtered = filtered.filter((doctor) => doctor.format.includes(format))
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "experience":
          return b.experience - a.experience
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, specialty, format, sortBy])

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
            <SelectItem value="price-asc">По цене (возрастание)</SelectItem>
            <SelectItem value="price-desc">По цене (убывание)</SelectItem>
            <SelectItem value="experience">По опыту</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Найдено врачей: <span className="font-semibold text-foreground">{filteredDoctors.length}</span>
      </p>

      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} {...doctor} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">По вашему запросу врачи не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}
