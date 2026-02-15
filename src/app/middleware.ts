import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  // 🔒 Rotas protegidas
  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/tatuador") ||
      pathname.startsWith("/cliente")
    ) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // 🔐 Controle por role
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/tatuador") && token?.role !== "ARTIST") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/cliente") && token?.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/tatuador/:path*", "/cliente/:path*"],
}
