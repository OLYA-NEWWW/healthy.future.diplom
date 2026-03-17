import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        status: 'PENDING'
      },
      select: {
        id: true,
        email: true,
        name: true,
        specialty: true,
        licenseNumber: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ doctors })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении списка' },
      { status: 500 }
    )
  }
}