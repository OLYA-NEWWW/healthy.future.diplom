import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()

    if (!['ACTIVE', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Неверный статус' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({ success: true, user })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении', details: error.message },
      { status: 500 }
    )
  }
}