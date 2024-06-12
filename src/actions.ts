"use server"
import { SignJWT } from "jose"
import type { JWTPayload } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secretKey = process.env["SECRET"]

const key = new TextEncoder().encode(secretKey)

async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key)
}

export async function login(_: unknown, formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  if (user.email !== "tanaka@example.com" || user.password !== "12345678") {
    return { error: "email or password invalid." }
  }
  const exp = new Date(Date.now() + 10 * 1000).getTime()
  const encryptedSessionData = await encrypt({ user, exp })
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  })
  redirect("/")
}
