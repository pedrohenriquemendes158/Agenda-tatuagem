import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { prisma } from "./@prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        })

        if (!user || !user.password) return null

        const valid = await bcrypt.compare(
          credentials!.password,
          user.password
        )

        if (!valid) return null
        return user
      },
    }),
  ],
  session: { strategy: "jwt" },
}
