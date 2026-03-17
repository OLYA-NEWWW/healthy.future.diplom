import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'ID пользователя не указан' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении пользователя' },
      { status: 500 }
    )
  }
}