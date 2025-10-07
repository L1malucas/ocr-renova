"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

const dashboardItem = { href: "/", label: "Dashboard", icon: LayoutDashboard }

const menuGroups = [
  {
    title: "Financeiro",
    items: [
      { href: "/receitas", label: "Receitas", icon: TrendingUp },
      { href: "/despesas", label: "Despesas", icon: TrendingDown },
      { href: "/pagamentos", label: "Pagamentos", icon: Banknote },
      { href: "/conciliacao", label: "Conciliação", icon: CreditCard },
      { href: "/orcamento", label: "Orçamento", icon: PieChart },
    ],
  },
  {
    title: "Prestação de Contas",
    items: [
      { href: "/projetos", label: "Projetos", icon: Briefcase },
      { href: "/objeto", label: "Objeto", icon: Package },
      { href: "/contrapartida", label: "Contrapartida", icon: GitCompareArrows },
      { href: "/execucao", label: "Execução", icon: Play },
      { href: "/analise", label: "Análise", icon: Search },
      { href: "/prestacao", label: "Prestação", icon: ClipboardCheck },
      { href: "/sancoes", label: "Sanções", icon: Gavel },
    ],
  },
  {
    title: "Administrativo",
    items: [
      { href: "/relatorios", label: "Relatórios", icon: FileText },
      { href: "/integracoes", label: "Integrações", icon: Plug },
      { href: "/usuarios", label: "Usuários", icon: Users },
      { href: "/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const activeGroup = menuGroups.find((group) => group.items.some((item) => pathname.startsWith(item.href) && item.href !== "/"))?.title

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
      <nav className="flex-1 p-2 space-y-1">
        {/* Dashboard Link */}
        <Button asChild variant={pathname === dashboardItem.href ? "default" : "ghost"} className={cn(
          "w-full justify-start gap-3 h-10",
           pathname === dashboardItem.href
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "justify-center px-2",
        )}>
          <Link href={dashboardItem.href}>
            <dashboardItem.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-left">{dashboardItem.label}</span>}
          </Link>
        </Button>

        {/* Accordion for Groups */}
        <Accordion type="single" collapsible defaultValue={activeGroup} className="w-full space-y-1">
          {menuGroups.map((group) => (
            <AccordionItem key={group.title} value={group.title} className="border-none">
              <AccordionTrigger className={cn(
                "w-full justify-start gap-3 h-10 px-4 rounded-md text-sm font-medium",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
                collapsed && "justify-center px-2",
              )}>
                 {!collapsed && <span className="flex-1 text-left">{group.title}</span>}
              </AccordionTrigger>
              <AccordionContent className="p-0 pl-4">
                <div className="space-y-1 py-1">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Button asChild key={item.href} variant={isActive ? "secondary" : "ghost"} className={cn(
                        "w-full justify-start gap-3 h-9",
                        collapsed && "justify-center px-2",
                      )}>
                        <Link href={item.href}>
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
