import { RequestCard } from "@/components/tattoo/request-card"
import { prisma } from "@/lib/@prisma"
import type { Prisma } from "@prisma/client"

export default async function TattooArtistPage() {
  const requests = await prisma.tattooRequest.findMany({
    include: {
      client: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-2xl text-center font-semibold text-neutral-800">
          Orçamentos
        </h1>

        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              id={request.id}
              clientName={
                request.client.name || request.client.email
              }
              date={request.date}
              time={request.time}
              bodyPlace={request.bodyPlace}
              size={request.size}
              imageUrl={request.imageUrl}
              status={request.status}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
