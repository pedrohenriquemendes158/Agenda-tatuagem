"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { FcGoogle } from "react-icons/fc"
import { Loader2, UserCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    try {
      setLoading(true)

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!res?.ok) {
        alert("Email ou senha inválidos")
        return
      }

      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      )

      const role = session?.user?.role

      if (role === "CLIENT") {
        router.push("/cliente/novo")
      } else if (role === "ARTIST") {
        router.push("/tatuador")
      } else if (role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error(error)
      alert("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <Card className="w-full max-w-sm border-neutral-200 shadow-lg">
        <CardHeader className="items-center space-y-3">
          <div className="h-16 w-16 rounded-full bg-white shadow flex items-center justify-center">
            <UserCircle className="h-12 w-12 text-neutral-600" />
          </div>

          <CardTitle className="text-2xl text-neutral-800">
            Entrar
          </CardTitle>

          <p className="text-sm text-neutral-500">
            Acesse sua conta
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-center">
            <Link
              href="/forgot-password"
              className="text-sm text-neutral-600 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="flex items-center justify-center gap-2">
            <Separator className="flex-1" />
            <span className="text-neutral-600">ou</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-neutral-300"
            onClick={() =>
              signIn("google", { callbackUrl: "/redirect" })
            }
          >
            <FcGoogle className="h-5 w-5" />
            Entrar com Google
          </Button>

          <p className="text-center text-sm text-neutral-600">
            Não tem conta?{" "}
            <Link
              href="/register"
              className="font-medium text-neutral-900 hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
