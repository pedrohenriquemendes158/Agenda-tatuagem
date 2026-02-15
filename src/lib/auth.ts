import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { type JWT } from "next-auth/jwt"
import { type Session } from "next-auth"
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

        const valid = await bcrypt.compare(credentials!.password, user.password)
        if (!valid) return null

        // importante: devolve o user com id
        return user
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // id do prisma
        token.id = user.id
        // (opcional) também seta o sub, que é o padrão do NextAuth
        token.sub = String(user.id)

        token.role = user.role
      }
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = (token.id ?? token.sub) as string
        session.user.role = token.role as any
      }
      return session
    },
  },

  session: { strategy: "jwt" },
}