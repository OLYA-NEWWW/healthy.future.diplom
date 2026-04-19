import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const doctorId = searchParams.get("doctorId")
    const patientId = searchParams.get("patientId")

    if (!doctorId && !patientId) {
      return NextResponse.json(
        { error: "doctorId or patientId required" },
        { status: 400 }
      )
    }

    const where: { doctorId?: string; patientId?: string } = {}
    if (doctorId) {
      where.doctorId = doctorId
    } else if (patientId) {
      where.patientId = patientId
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            chronicDiseases: true,
            allergies: true,
            medications: true,
            healthDescription: true,
            image: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
            specialty: true,
            image: true,
          },
        },
      },
      orderBy: {
        dateTime: "asc",
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { doctorId, patientId, dateTime, price = 3000 } = body

    if (!doctorId || !patientId || !dateTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId,
        dateTime: new Date(dateTime),
        price,
        status: "PENDING",
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            bloodType: true,
            chronicDiseases: true,
            allergies: true,
            medications: true,
            healthDescription: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    )
  }
}