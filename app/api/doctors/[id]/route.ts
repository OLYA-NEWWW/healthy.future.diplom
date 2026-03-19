import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const doctor = await prisma.user.findUnique({
      where: { 
        id: id,
        role: 'DOCTOR',
        status: 'ACTIVE'
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

    if (!doctor) {
      return NextResponse.json({ error: 'Врач не найден' }, { status: 404 })
    }

    const formatted = {
      ...doctor,
      education: doctor.education ? JSON.parse(doctor.education) : [],
      format: doctor.format ? JSON.parse(doctor.format) : ['chat'],
      rating: doctor.rating || 5.0
    }

    return NextResponse.json({ doctor: formatted })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 })
  }
}