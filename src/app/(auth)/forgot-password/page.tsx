"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { useState } from "react"


export default function ForgotpasswordPage() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)

    async function handleSubmit() {
        await fetch("/api/forgot-password", {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({email}),
        })

        setSent(true)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="p-8 space-y-6">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-white shadow flex items-center justify-center">
                            <Mail className="h-8 w-8 text-neutral-600" />
                        </div>
                    </div>

                    <h1 className="text-center text-2xl font-semibold">
                        Recuperar senha
                    </h1>

                    {sent ? (
                        <p className="text-center text-sm text-neutral-600">
                            Se o e-mail existir, você receberá as instruções.
                        </p>
                    ): (
                        <>
                           <div className="space-y-2">
                              <Label>E-mail</Label>
                              
                              <Input placeholder="seu@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} />
                           </div>
                           <Button className="w-ful bg-black text-white"
                           onClick={handleSubmit}>
                            Enviar Link
                            </Button>                        
                        </>
                    )}
                </CardContent> 
            </Card>
        </div>
    )
}