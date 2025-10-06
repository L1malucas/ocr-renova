"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardView } from "@/components/dashboard/dashboard-view"
import { ReceitasView } from "@/components/receitas/receitas-view"
import { DespesasView } from "@/components/despesas/despesas-view"
import { OrcamentoView } from "@/components/orcamento/orcamento-view"
import { ConciliacaoView } from "@/components/conciliacao/conciliacao-view"
import { UsuariosView } from "@/components/usuarios/usuarios-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Login Component
function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
    } catch (error) {
      console.error("Erro no login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">SGC-TS</CardTitle>
          <CardDescription>Sistema de Gestão e Prestação de Contas para o Terceiro Setor</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>
              🚀 <strong>Demo:</strong> Qualquer email e senha funcionam
            </p>
            <p className="text-xs mt-1 text-green-600">✅ Sistema com dados mockados - navegação completa disponível</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main App Component
function MainApp() {
  const [currentModule, setCurrentModule] = useState("dashboard")

  const renderModule = () => {
    switch (currentModule) {
      case "dashboard":
        return <DashboardView />
      case "receitas":
        return <ReceitasView />
      case "despesas":
        return <DespesasView />
      case "orcamento":
        return <OrcamentoView />
      case "conciliacao":
        return <ConciliacaoView />
      case "relatorios":
        return <div className="p-6">Módulo de Relatórios (Em desenvolvimento)</div>
      case "usuarios":
        return <UsuariosView />
      case "configuracoes":
        return <div className="p-6">Módulo de Configurações (Em desenvolvimento)</div>
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderModule()}</div>
      </main>
    </div>
  )
}

// Root Page Component
export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <MainApp />
}
