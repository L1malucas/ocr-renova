"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarNav } from "@/components/sidebar-nav"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import {
  FileText,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Edit,
  Download,
} from "lucide-react"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    salic: "2024001234",
    title: "Documentário sobre Cultura Popular Brasileira",
    modalidade: "Fomento Direto",
    status: "Em Execução",
    prazoFinal: "2024-12-31",
    valorAprovado: 150000,
    valorExecutado: 75000,
    percentualExecutado: 50,
  },
  {
    id: "2",
    salic: "2024005678",
    title: "Festival de Cinema Independente",
    modalidade: "FSA",
    status: "Prestação de Contas",
    prazoFinal: "2024-10-15",
    valorAprovado: 300000,
    valorExecutado: 280000,
    percentualExecutado: 93,
  },
]

function DashboardContent() {
  const { user } = useAuth()
  const [selectedProject, setSelectedProject] = useState(mockProjects[0])

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="border-r bg-card">
        <SidebarNav />
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            {user.type === "producer" ? "Gerencie seus projetos culturais" : "Analise projetos em prestação de contas"}
          </p>
        </div>

        {user.type === "producer" ? (
          <ProducerDashboard projects={mockProjects} selectedProject={selectedProject} />
        ) : (
          <AnalystDashboard />
        )}
      </div>
    </div>
  )
}

function ProducerDashboard({ projects, selectedProject }: { projects: any[]; selectedProject: any }) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 novo este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Aprovado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 450.000</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Dias até próximo prazo</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meus Projetos</CardTitle>
              <CardDescription>Gerencie e acompanhe seus projetos culturais</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Projeto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <Badge variant="outline">SALIC {project.salic}</Badge>
                      <Badge variant={project.status === "Em Execução" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Modalidade: {project.modalidade}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Prazo: {project.prazoFinal}</span>
                      <span>
                        Executado: R$ {project.valorExecutado.toLocaleString()} / R${" "}
                        {project.valorAprovado.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={project.percentualExecutado} className="w-64" />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalystDashboard() {
  return (
    <div className="space-y-6">
      {/* Summary Cards for Analysts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos em Análise</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diligências Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Aguardando resposta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Analisado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.1M</div>
            <p className="text-xs text-muted-foreground">Total este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Fila de Análise</CardTitle>
          <CardDescription>Projetos aguardando análise técnica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                salic: "2024001234",
                title: "Documentário sobre Cultura Popular",
                proponente: "João Silva",
                prazo: "2024-11-15",
                valor: 150000,
                prioridade: "Alta",
              },
              {
                salic: "2024005678",
                title: "Festival de Cinema Independente",
                proponente: "Maria Santos",
                prazo: "2024-11-20",
                valor: 300000,
                prioridade: "Média",
              },
            ].map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <Badge variant="outline">SALIC {project.salic}</Badge>
                      <Badge variant={project.prioridade === "Alta" ? "destructive" : "secondary"}>
                        {project.prioridade}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Proponente: {project.proponente}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Prazo: {project.prazo}</span>
                      <span>Valor: R$ {project.valor.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Analisar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Documentos
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  )
}
