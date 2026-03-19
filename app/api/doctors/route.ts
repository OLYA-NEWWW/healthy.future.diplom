import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        status: 'ACTIVE',
        specialty: { not: null }
      },
      select: {
        id: true,
        name: true,
        specialty: true,
        experience: true,
        bio: true,
        education: true,
        image: true,
        format: true,
        rating: true,
      }
    })

    const formatted = doctors.map(d => ({
      ...d,
      education: d.education ? JSON.parse(d.education) : [],
      format: d.format ? JSON.parse(d.format) : ['chat'],
      rating: d.rating || 5.0
    }))

    return NextResponse.json({ doctors: formatted })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Ошибка загрузки врачей' }, { status: 500 })
  }
}