import { prisma } from "@/lib/@prisma"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const { userId, role } = await req.json()

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  return NextResponse.json({ success: true })
}
