"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "producer" | "analyst"
  cpfCnpj?: string
  matricula?: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface LoginCredentials {
  identifier: string // CPF/CNPJ or Matrícula
  password: string
  type: "producer" | "analyst"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("siga-pc-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (credentials.password === "demo123") {
      const mockUser: User = {
        id: "1",
        name: credentials.type === "producer" ? "João Silva" : "Ana Santos",
        email: credentials.type === "producer" ? "joao@exemplo.com" : "ana.santos@ancine.gov.br",
        type: credentials.type,
        ...(credentials.type === "producer"
          ? { cpfCnpj: credentials.identifier }
          : { matricula: credentials.identifier }),
      }

      setUser(mockUser)
      localStorage.setItem("siga-pc-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("siga-pc-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
