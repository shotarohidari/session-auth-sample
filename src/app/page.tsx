import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const jwt = cookies().get("session")?.value
  if (!jwt) {
    redirect("/login")
  }
  const secret = new TextEncoder().encode(process.env["SECRET"])
  try {
    const result = await jwtVerify(jwt, secret)
    if (
      result.payload.exp &&
      result.payload.exp < new Date().getTime() - 10 * 1000
    ) {
      redirect("/login")
    }
  } catch (e) {
    console.error(e)
    redirect("/login")
  }
  return <main>ログインできました！</main>
}
