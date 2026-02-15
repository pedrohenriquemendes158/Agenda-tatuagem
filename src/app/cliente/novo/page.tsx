import { cloudinary } from "@/lib/cloudinary"
import { prisma } from "@/lib/@prisma"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { FormPedido } from "./FormPedido"

export default function NovoPedidoPage() {

  async function criarPedido(formData: FormData) {
    "use server"

    // ✅ PEGA A SESSION
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado")
    }

    const file = formData.get("image") as File

    if (!file || file.size === 0) {
      throw new Error("Imagem obrigatória")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "tatuagens" }, (error, result) => {
          if (error) return reject(error)
          resolve(result)
        })
        .end(buffer)
    })

    if (!upload?.secure_url) {
      throw new Error("Erro no upload da imagem")
    }

    const imageUrl = upload.secure_url

    await prisma.tattooRequest.create({
      data: {
        clientId: session.user.id, // ✅ agora funciona
        bodyPlace: formData.get("bodyPlace") as string,
        size: formData.get("size") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        imageUrl,
        status: "PENDENTE",
      },
    })

    redirect("/cliente")
  }

  return <FormPedido action={criarPedido} />
}


