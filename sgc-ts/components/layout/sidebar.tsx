"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  PieChart,
  CreditCard,
  Settings,
  Users,
  FileText,
  Menu,
  X,
  LogOut,
  Search,
  GitCompareArrows,
  Play,
  Plug,
  Package,
  Banknote,
  ClipboardCheck,
  Briefcase,
  Gavel,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { href: "/receitas", label: "Receitas", icon: TrendingUp, badge: null },
  { href: "/despesas", label: "Despesas", icon: TrendingDown, badge: 3 },
  { href: "/orcamento", label: "Orçamento", icon: PieChart, badge: null },
  { href: "/conciliacao", label: "Conciliação", icon: CreditCard, badge: 5 },
  { href: "/relatorios", label: "Relatórios", icon: FileText, badge: null },
  { href: "/usuarios", label: "Usuários", icon: Users, badge: null },
  { href: "/analise", label: "Análise", icon: Search, badge: null },
  { href: "/contrapartida", label: "Contrapartida", icon: GitCompareArrows, badge: null },
  { href: "/execucao", label: "Execução", icon: Play, badge: null },
  { href: "/integracoes", label: "Integrações", icon: Plug, badge: null },
  { href: "/objeto", label: "Objeto", icon: Package, badge: null },
  { href: "/pagamentos", label: "Pagamentos", icon: Banknote, badge: null },
  { href: "/prestacao", label: "Prestação", icon: ClipboardCheck, badge: null },
  { href: "/projetos", label: "Projetos", icon: Briefcase, badge: null },
  { href: "/sancoes", label: "Sanções", icon: Gavel, badge: null },
  { href: "/configuracoes", label: "Configurações", icon: Settings, badge: null },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">SGC-TS</h1>
              <p className="text-sm text-sidebar-foreground/70">Sistema de Gestão</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Button asChild key={item.href} variant={isActive ? "default" : "ghost"} className={cn(
              "w-full justify-start gap-3 h-10",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center px-2",
            )}>
              <Link href={item.href}>
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            </Button>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="mb-3">
            <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role.replace("_", " ")}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground",
            collapsed ? "justify-center px-2" : "justify-start gap-3",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>
    </div>
  )
}
