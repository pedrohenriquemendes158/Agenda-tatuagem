async function changeRole(userId: string, role: "CLIENT" | "ARTIST" | "ADMIN") {
  await fetch("/api/admin/users", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, role }),
  })

}