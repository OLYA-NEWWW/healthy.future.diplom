// app/api/chats/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      )
    }

    const messages = await (prisma as any).message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    })

    const chatsMap = new Map()

    messages.forEach((message: any) => {
      const otherUser = message.senderId === userId ? message.receiver : message.sender
      
      if (otherUser.role !== 'DOCTOR') return

      if (!chatsMap.has(otherUser.id)) {
        chatsMap.set(otherUser.id, {
          user: otherUser,
          lastMessage: message,
          unreadCount: message.receiverId === userId && !message.read ? 1 : 0,
        })
      } else {
        const existing = chatsMap.get(otherUser.id)
        if (message.createdAt > existing.lastMessage.createdAt) {
          existing.lastMessage = message
        }
        if (message.receiverId === userId && !message.read) {
          existing.unreadCount++
        }
      }
    })

    const chats = Array.from(chatsMap.values())

    return NextResponse.json({ chats })
  } catch (error) {
    console.error("Error fetching chats:", error)
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    )
  }
}