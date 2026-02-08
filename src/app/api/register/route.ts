import { NextResponse } from "next/server"
import { prisma } from "@/lib/@prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro no servidor" },
      { status: 500 }
    )
  }
}
