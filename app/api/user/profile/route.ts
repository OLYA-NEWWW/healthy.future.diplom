// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, ...updateData } = body

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: updateData.name,
        image: updateData.image,
        bloodType: updateData.bloodType,
        chronicDiseases: JSON.stringify(updateData.chronicDiseases || []),
        allergies: JSON.stringify(updateData.allergies || []),
        medications: JSON.stringify(updateData.medications || []),
        healthDescription: updateData.healthDescription,
      },
    })

    const { password, ...userWithoutPassword } = user
    
    return NextResponse.json({
      ...userWithoutPassword,
      chronicDiseases: JSON.parse(userWithoutPassword.chronicDiseases),
      allergies: JSON.parse(userWithoutPassword.allergies),
      medications: JSON.parse(userWithoutPassword.medications),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")
    if (!userId) {
      return NextResponse.json({ error: "UserId required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      ...userWithoutPassword,
      chronicDiseases: JSON.parse(userWithoutPassword.chronicDiseases),
      allergies: JSON.parse(userWithoutPassword.allergies),
      medications: JSON.parse(userWithoutPassword.medications),
    })
  } catch (error) {
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 })
  }
}