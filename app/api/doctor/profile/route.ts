import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, specialty, experience, bio, education, format, image } = body

    // Проверяем обязательные поля
    if (!userId) {
      return NextResponse.json({ error: 'ID пользователя обязателен' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        specialty: specialty || null,
        experience: parseInt(experience) || 0,
        bio: bio || null,
        education: education || "[]",           // ← гарантированно строка
        format: format || "[\"chat\"]",         // ← гарантированно строка
        image: image || null,
      }
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Ошибка обновления профиля' }, { status: 500 })
  }
}