import { prisma } from "@/lib/@prisma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect, notFound } from "next/navigation"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function RequestDetailPage({ params }: Props) {

  const { id } = await params  // 🔥 AQUI ESTÁ A CORREÇÃO

  if (!id) {
    return notFound()
  }

  const request = await prisma.tattooRequest.findUnique({
    where: { id },
    include: { client: true },
  })

  if (!request) {
    return notFound()
  }

  async function sendBudget(formData: FormData) {
    "use server"

    const value = Number(formData.get("budget"))

    await prisma.tattooRequest.update({
      where: { id },
      data: {
        budget: value,
        status: "ORCAMENTO_ENVIADO",
      },
    })

    redirect("/tatuador")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">
        Pedido de {request.client.name || request.client.email}
      </h1>

      <p>Status: {request.status}</p>

      <form action={sendBudget} className="space-y-4">
        <Input
          name="budget"
          type="number"
          placeholder="Digite o orçamento"
          required
        />

        <Button type="submit">
          Enviar orçamento
        </Button>
      </form>
    </div>
  )
}




