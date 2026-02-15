import NextAuth, { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"
import NextAuth from "next-auth"
declare module "next-auth" {

  
  interface Session {
    user: {
      id: string
      role: "CLIENT" | "ARTIST" | "ADMIN"
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "CLIENT" | "ARTIST" | "ADMIN" 
  }
}

