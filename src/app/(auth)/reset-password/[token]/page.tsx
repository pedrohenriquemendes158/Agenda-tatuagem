"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const params = useParams()
  const token = params.token as string

  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleReset() {
    setLoading(true)

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/login")
    } else {
      alert("Token inválido ou expirado")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-center text-2xl font-semibold">
            Nova senha
          </h1>

          <div className="space-y-2">
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-black text-white"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar senha"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
