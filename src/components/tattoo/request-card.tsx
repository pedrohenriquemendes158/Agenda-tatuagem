import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { RequestStatus } from "@prisma/client"

interface RequestCardProps {
  id: string
  clientName: string
  date: string
  time: string
  bodyPlace: string
  size: string
  imageUrl: string
  status: RequestStatus
}

export function RequestCard({
  id,
  clientName,
  date,
  time,
  bodyPlace,
  size,
  imageUrl,
  status,
}: RequestCardProps) {
  return (
    <Link href={`/tatuador/${id}`}>
      <Card className="border-neutral-200 hover:shadow-md transition cursor-pointer">
        <CardContent className="flex gap-4 p-4">

          <div className="relative h-24 w-24 rounded-md overflow-hidden bg-neutral-100">
            <Image
              src={imageUrl && imageUrl.startsWith("http")
                ? imageUrl : "https://via.placeholder.com/300"
              }
              alt="Referência"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-neutral-800">
                {clientName}
              </h3>

              <Badge
                variant="outline"
                className="border-neutral-400 text-neutral-700"
              >
                {status}
              </Badge>
            </div>

            <p className="text-sm text-neutral-600">
              📍 {bodyPlace} • 📏 {size}
            </p>

            <p className="text-sm text-neutral-600">
              🗓️ {date} às {time}
            </p>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
