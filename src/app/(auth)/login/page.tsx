"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    Card,
    CardContent,
    CardHeader, 
     CardTitle, } from "@/components/ui/card" 
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { User, Loader2 } from "lucide-react"
import Link from "next/link"
import { UserCircle } from "lucide-react"

export default function LoginPage () {
const [loading, setLoading] = useState(false)

async function handleLogin() {
    try {
        setLoading(true)

        await signIn("credentials", {
            email:"email@email.com",
            password:"123456",
            redirect: true,
            callbackUrl:"/dashboard"
        })
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

return(

    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        
        <Card className="w-full max-w-sm border-neutral-200 shadow-lg">
            <CardHeader className="items-center space-y-3">

             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
               <UserCircle className="h-12 w-12 text-neutral-600 transition-transform duration-300 hover:scale-105" /> 
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
                placeholder="seu@email"
                className="border-neutral-300 focus-visible:ring-neutral-800" />

                 <Input 
                type="password"
                placeholder="*******"
                className="border-neutral-300 focus-visible:ring-neutral-800" />

            <div className=" flex justify-center">
                <Link href="/esqueci-senha" className="text-sm text-neutral-600 hover:underline">
                Esqueceu a senha ?
                </Link>
            </div>

            <Button className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
            onClick={handleLogin}
            disabled={loading}>

                {loading ? (
                    <span className="flex items-center gab-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Entrando...
                    </span>
                ) : (
                    "Entrar"
                    
                )}

            </Button>

            <div className="flex items-center justify-center gap-2">
                <Separator className="flex-1" />
                <span className=" text-neutral-600">ou</span>
                <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full flex items-center gap-2 border-neutral-300"
            onClick={() => signIn("google")}>
                <FcGoogle className="h-5 w-5" />
                Entrar com Google
            </Button>

            <p className="text-center text-sm text-neutral-600">
                Não tem conta?{""}
                <Link href="/register" className="font-medium text-neutral-900 hover:underline">
                    Criar conta
                </Link>
            </p>


            </CardContent>
        </Card>
    </div>
)

}