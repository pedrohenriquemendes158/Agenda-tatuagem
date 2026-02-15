import { NextResponse } from "next/server"
import { prisma } from "@/lib/@prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const { token, password } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })
  
  return NextResponse.json({ ok: true })
}
