"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  LayoutDashboard,
  FileText,
  Calculator,
  CreditCard,
  Receipt,
  Users,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  Settings,
  LogOut,
  Globe,
  Send,
} from "lucide-react"
import { useAuth } from "./auth-provider"

interface SidebarNavProps {
  className?: string
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Análise de Projetos",
    href: "/analise",
    icon: FileText,
  },
  {
    title: "Contrapartida",
    href: "/contrapartida",
    icon: Users,
  },
  {
    title: "Execução Financeira",
    href: "/execucao",
    icon: CreditCard,
  },
  {
    title: "Integrações Gov",
    href: "/integracoes",
    icon: Globe,
  },
  {
    title: "Cumprimento do Objeto",
    href: "/objeto",
    icon: CheckCircle,
  },
  {
    title: "Orçamento",
    href: "/orcamento",
    icon: Calculator,
  },
  {
    title: "Pagamentos",
    href: "/pagamentos",
    icon: Receipt,
  },
  {
    title: "Prestação Final",
    href: "/prestacao",
    icon: Send,
  },
  {
    title: "Meus Projetos",
    href: "/projetos",
    icon: FileText,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Sanções e Recursos",
    href: "/sancoes",
    icon: AlertTriangle,
  },
]

export function SidebarNav({ className }: SidebarNavProps) {
  const { user, logout } = useAuth()

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">SIGA-PC</h2>
              <p className="text-xs text-muted-foreground">{user?.type === "producer" ? "Proponente" : "Analista"}</p>
            </div>
          </div>

          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="px-3">
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button key={item.href} variant="ghost" className="w-full justify-start" asChild>
                  <a href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </a>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="px-3 pt-4 border-t">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
