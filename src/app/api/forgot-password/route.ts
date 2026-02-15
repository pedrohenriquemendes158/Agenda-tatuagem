import { NextResponse } from "next/server"
import { prisma } from "@/lib/@prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  const { email } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json({ ok: true })
  }

  const token = crypto.randomBytes(32).toString("hex")

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  })

  console.log(
    `LINK DE RECUPERAÇÃO: http://localhost:3000/reset-password/${token}`
  )

  return NextResponse.json({ ok: true })
}
