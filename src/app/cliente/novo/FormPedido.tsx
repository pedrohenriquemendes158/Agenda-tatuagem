"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type Props = {
  action: (formData: FormData) => void
}

export function FormPedido({ action }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-xl rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Novo Pedido de Tatuagem
        </h2>

        <form action={action} className="space-y-4">

          <div className="space-y-2">
            <Label>Local do Corpo</Label>
            <Input name="bodyPlace" placeholder="Ex: Braço" required />
          </div>

          <div className="space-y-2">
            <Label>Tamanho</Label>
            <Input name="size" placeholder="Ex: 10cm" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input name="date" type="date" required />
            </div>

            <div className="space-y-2">
              <Label>Horário</Label>
              <Input name="time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imagem de Referência</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-2">Pré-visualização:</p>
              <img
                src={preview}
                alt="Preview"
                className="rounded-xl shadow-md max-h-60 object-cover"
              />
            </div>
          )}

          <Button className="w-full mt-4">
            Enviar Pedido
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}
