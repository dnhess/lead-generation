"use server"

import { cookies } from "next/headers"

export async function login(email: string, password: string) {
  if (email === "admin@tryalma.com" && password === "password123") {
    const cookieStore = await cookies()
    cookieStore.set("user", "admin", { secure: true, httpOnly: true })
    return { success: true, message: "Login successful" }
  }
  return { success: false, message: "Invalid email or password" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
  return { success: true, message: "Logout successful" }
}

export async function checkAuth() {
  const cookieStore = await cookies()
  const user = cookieStore.get("user")
  return user ? { isAuthenticated: true } : { isAuthenticated: false }
}

