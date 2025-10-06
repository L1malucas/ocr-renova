"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, DollarSign, Eye, Bell, X, Settings } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockProjects = [
  { id: 1, name: "Capacitação Jovens Tech", orcado: 150000, realizado: 95000, status: "warning" },
  { id: 2, name: "Educação Ambiental", orcado: 80000, realizado: 45000, status: "success" },
  { id: 3, name: "Inclusão Digital", orcado: 120000, realizado: 110000, status: "danger" },
  { id: 4, name: "Saúde Comunitária", orcado: 200000, realizado: 85000, status: "success" },
  { id: 5, name: "Arte e Cultura", orcado: 90000, realizado: 78000, status: "warning" },
]

const mockAlerts = [
  {
    id: 1,
    message: "O item 'Recursos Humanos' do Projeto Capacitação Jovens Tech excedeu o orçamento planejado",
    type: "error",
    time: "2h atrás",
  },
  {
    id: 2,
    message: "Projeto Educação Ambiental está 15% abaixo do cronograma de execução",
    type: "warning",
    time: "4h atrás",
  },
  {
    id: 3,
    message: "Novo contrato 'Fundação ABC' foi aprovado e está disponível para planejamento",
    type: "info",
    time: "1d atrás",
  },
]

const mockAlertasAtivos = [
  {
    id: 1,
    nome: "Execução Orçamentária Alta",
    message: "Projeto Capacitação Jovens Tech atingiu 92% do orçamento (limite: 85%)",
    tipo: "contrato",
    entidade: "Capacitação Jovens Tech",
    severidade: "critical",
    time: "15 min atrás",
    valor_atual: 92,
    valor_limite: 85,
    cor: "red",
  },
  {
    id: 2,
    nome: "Categoria Pessoal Crítica",
    message: "Categoria Pessoal e Encargos atingiu 88% do orçamento (limite: 85%)",
    tipo: "categoria",
    entidade: "Pessoal e Encargos",
    severidade: "warning",
    time: "1h atrás",
    valor_atual: 88,
    valor_limite: 85,
    cor: "amber",
  },
  {
    id: 3,
    nome: "Prazo Prestação Contas",
    message: "Contrato BNDES vence em 25 dias (limite: 30 dias)",
    tipo: "contrato",
    entidade: "Contrato BNDES 2024",
    severidade: "info",
    time: "2h atrás",
    valor_atual: 25,
    valor_limite: 30,
    cor: "blue",
  },
]

export function DashboardOrcamentario() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [alertasVisibles, setAlertasVisibles] = useState(true)
  const [alertasDismissed, setAlertasDismissed] = useState<string[]>([])

  const totalOrcado = mockProjects.reduce((sum, p) => sum + p.orcado, 0)
  const totalRealizado = mockProjects.reduce((sum, p) => sum + p.realizado, 0)
  const execucaoGeral = (totalRealizado / totalOrcado) * 100

  const projetosEmRisco = mockProjects.filter((p) => p.realizado / p.orcado > 0.8).length
  const orcamentoDisponivel = totalOrcado - totalRealizado
  const contratosAtivos = 8

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-500"
      case "warning":
        return "bg-amber-500"
      case "danger":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (project: any) => {
    const percent = (project.realizado / project.orcado) * 100
    if (percent < 70) return "Saudável"
    if (percent < 90) return "Atenção"
    return "Crítico"
  }

  const dismissAlert = (alertId: string) => {
    setAlertasDismissed([...alertasDismissed, alertId])
  }

  const alertasAtivos = mockAlertasAtivos.filter((alerta) => !alertasDismissed.includes(alerta.id.toString()))

  const getSeverityColor = (severidade: string) => {
    switch (severidade) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "warning":
        return "border-amber-500 bg-amber-50"
      case "info":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getSeverityIcon = (severidade: string) => {
    switch (severidade) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {alertasVisibles && alertasAtivos.length > 0 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Bell className="h-5 w-5" />
                Alertas Ativos ({alertasAtivos.length})
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar Alertas
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setAlertasVisibles(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasAtivos.map((alerta) => (
                <div key={alerta.id} className={`p-3 border-l-4 rounded-r ${getSeverityColor(alerta.severidade)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getSeverityIcon(alerta.severidade)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{alerta.nome}</h4>
                          <Badge variant="outline" className="text-xs">
                            {alerta.tipo.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{alerta.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{alerta.time}</span>
                          <span>Entidade: {alerta.entidade}</span>
                          <span>
                            Atual: {alerta.valor_atual}
                            {alerta.tipo === "contrato" && alerta.nome.includes("Prazo") ? " dias" : "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => dismissAlert(alerta.id.toString())}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPIs Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Execução Orçamentária Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{execucaoGeral.toFixed(1)}%</div>
            <Progress value={execucaoGeral} className="mt-2" />
            <p className="text-xs text-blue-600 mt-1">
              R$ {totalRealizado.toLocaleString()} de R$ {totalOrcado.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Projetos em Risco</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{projetosEmRisco}</div>
            <p className="text-xs text-amber-600 mt-1">Execução {">"} 80% do orçamento</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Orçamento Disponível</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">R$ {orcamentoDisponivel.toLocaleString()}</div>
            <p className="text-xs text-emerald-600 mt-1">Não comprometido</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle>Contratos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{contratosAtivos}</div>
            <p className="text-xs text-purple-600 mt-1">Com orçamento em andamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Orçado vs. Realizado por Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockProjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
              <Bar dataKey="orcado" fill="#e2e8f0" name="Orçado" />
              <Bar dataKey="realizado" fill="#3b82f6" name="Realizado" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa de Saúde dos Projetos */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa de Saúde dos Projetos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProjects.map((project) => {
              const percent = (project.realizado / project.orcado) * 100
              const temAlerta = alertasAtivos.some((alerta) =>
                alerta.entidade.toLowerCase().includes(project.name.toLowerCase()),
              )
              return (
                <div
                  key={project.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${temAlerta ? "border-red-200 bg-red-50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{project.name}</h4>
                      {temAlerta && <Bell className="h-4 w-4 text-red-500" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          project.status === "success"
                            ? "default"
                            : project.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {getStatusText(project)}
                      </Badge>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedProject(project.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={percent} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {project.realizado.toLocaleString()}</span>
                      <span>R$ {project.orcado.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-500">{percent.toFixed(1)}% executado</div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Feed de Alertas Histórico */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Alertas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded-r">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Badge
                    variant={
                      alert.type === "error" ? "destructive" : alert.type === "warning" ? "secondary" : "default"
                    }
                  >
                    {alert.type === "error" ? "Erro" : alert.type === "warning" ? "Aviso" : "Info"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
