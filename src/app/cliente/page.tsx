import { prisma } from "@/lib/@prisma"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function ClientePage() {
  const session = await getServerSession(authOptions)
console.log(session)
  if (!session?.user) {
    redirect("/login")
  }

  const clientId = session.user.id

  const requests = await prisma.tattooRequest.findMany({
    where: {
      clientId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  async function aceitar(id: string) {
    "use server"

    await prisma.tattooRequest.update({
      where: { id },
      data: { status: "ACEITO" },
    })

    redirect("/cliente")
  }

  async function recusar(id: string) {
    "use server"

    await prisma.tattooRequest.update({
      where: { id },
      data: { status: "RECUSADO" },
    })

    redirect("/cliente")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Meus Pedidos</h1>

      {requests.map((request) => (
        <div
          key={request.id}
          className="border p-4 rounded-md space-y-2"
        >
          <p>Status: {request.status}</p>

          {request.budget && (
            <p>💰 Orçamento: R$ {request.budget}</p>
          )}

          {request.status === "ORCAMENTO_ENVIADO" && (
            <div className="flex gap-4">
              <form action={aceitar.bind(null, request.id)}>
                <Button type="submit">
                  Aceitar
                </Button>
              </form>

              <form action={recusar.bind(null, request.id)}>
                <Button variant="destructive" type="submit">
                  Recusar
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
