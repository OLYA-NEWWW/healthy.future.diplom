import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, role, name, specialty, licenseNumber } = await request.json()

    if (!['PATIENT', 'DOCTOR'].includes(role)) {
      return NextResponse.json(
        { error: 'Неверная роль' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const status = role === 'DOCTOR' ? 'PENDING' : 'ACTIVE'

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        status,
        name,
        specialty: role === 'DOCTOR' ? specialty : null,
        licenseNumber: role === 'DOCTOR' ? licenseNumber : null,
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Ошибка при регистрации' },
      { status: 500 }
    )
  }
}