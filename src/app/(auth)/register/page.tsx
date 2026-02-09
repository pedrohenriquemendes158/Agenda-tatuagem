"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)

       async function handleRegister() {
        setLoading(true)

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({name, email, password}),
        })

        setLoading(false)
        if (res.ok) {
            router.push("/login")
        } else {
            alert("erro ao criar conta")
        }
    }
    
return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <Card className="w-full max-w-sm border-neutral-200 shadow-lg">
          <CardContent className="p-8 space-y-4">

            <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
                  <UserPlus className="h-8 w-8 text-neutral-600"  /> 
                </div>
            </div>

            <h1 className="text-center text-2xl font-semibold">
                Criar conta
            </h1>

    <div className="space-y-2 ">
        
        <Label>Nome</Label>
        <Input placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-neutral-300 focus-visible:ring-neutral-800" />
         

    </div>


    
    <div className="space-y-2">
        
        <Label>E-mail</Label>
        <Input placeholder="Seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-neutral-300 focus-visible:ring-neutral-800" />

    </div>

    
    <div className="space-y-2">
        
        <Label>Senha</Label>
        
        <Input 
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-neutral-300 focus-visible:ring-neutral-800" />

    </div>

    <Button className="w-full bg-black text-white hover:bg-neutral-800"
            onClick={handleRegister}
            disabled={loading}>

            {loading ? "Criando..." : "Criar conta"}

            </Button>

            <p className="text-center text-sm text-neutral-500">
                Já tem conta?{""}

                <Link href="/login" className="font-medium text-black hover:underline">
                    Entrar                
                </Link>
            </p>

          </CardContent>  
        </Card>
    </div>
 )
}

