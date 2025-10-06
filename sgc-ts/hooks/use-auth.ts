"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@/lib/types"
import { mockUser } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(mockUser)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser(mockUser)
    setLoading(false)
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: userData.name || "",
      role: userData.role || "analista_financeiro",
      permissions: userData.permissions || [],
      created_at: new Date(),
      updated_at: new Date(),
    }
    setUser(newUser)
    setLoading(false)
  }

  const logout = async () => {
    setUser(null)
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    logout,
  }
}

export { AuthContext }
