"use server"

import { cookies } from "next/headers"

export async function login(email: string, password: string) {
  if (email === "admin@alma.ai" && password === "password123") {
    // Set a cookie to indicate the user is logged in
    cookies().set("user", "admin", { secure: true, httpOnly: true })
    return { success: true, message: "Login successful" }
  }
  return { success: false, message: "Invalid email or password" }
}

export async function logout() {
  cookies().delete("user")
  return { success: true, message: "Logout successful" }
}

export async function checkAuth() {
  const user = cookies().get("user")
  return user ? { isAuthenticated: true } : { isAuthenticated: false }
}

