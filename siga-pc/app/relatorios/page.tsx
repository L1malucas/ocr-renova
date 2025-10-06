"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarNav } from "@/components/sidebar-nav"
import { AuthProvider } from "@/components/auth-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { BarChart3, Download, FileText, Calendar, DollarSign, CheckCircle } from "lucide-react"

// Mock data for reports
const mockAnalysisData = [
  { mes: "Jan", aprovados: 15, reprovados: 3, diligencias: 8, valor: 2500000 },
  { mes: "Fev", aprovados: 22, reprovados: 2, diligencias: 12, valor: 3200000 },
  { mes: "Mar", aprovados: 28, reprovados: 5, diligencias: 15, valor: 4100000 },
]

const mockModalityData = [
  { name: "Fomento Direto", value: 45, color: "#6366f1" },
  { name: "FSA", value: 35, color: "#ec4899" },
  { name: "Fomento Indireto", value: 20, color: "#be123c" },
]

const mockRegionData = [
  { regiao: "Sudeste", projetos: 45, valor: 6800000 },
  { regiao: "Sul", projetos: 28, valor: 4200000 },
  { regiao: "Nordeste", projetos: 32, valor: 4800000 },
  { regiao: "Norte", projetos: 15, valor: 2200000 },
  { regiao: "Centro-Oeste", projetos: 18, valor: 2700000 },
]

function RelatoriosContent() {
  const [reportType, setReportType] = useState("analysis")
  const [dateRange, setDateRange] = useState({ start: "2024-01-01", end: "2024-03-31" })

  return (
    <div className="flex min-h-screen bg-background">
      <div className="border-r bg-card">
        <SidebarNav />
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Relatórios e Análises</h1>
              <p className="text-muted-foreground">Dashboards e relatórios gerenciais</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Dashboard
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros de Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analysis">Análise de Prestações</SelectItem>
                    <SelectItem value="financial">Execução Financeira</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="regional">Distribuição Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Início</Label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Data Fim</Label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Modalidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="fomento-direto">Fomento Direto</SelectItem>
                    <SelectItem value="fsa">FSA</SelectItem>
                    <SelectItem value="fomento-indireto">Fomento Indireto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard Executivo</TabsTrigger>
            <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="custom">Relatórios Customizados</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="analysis">
            <DetailedAnalysis />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceReports />
          </TabsContent>

          <TabsContent value="custom">
            <CustomReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Analisados</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65</div>
            <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Analisado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 9,8M</div>
            <p className="text-xs text-muted-foreground">+28% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">+3% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio Análise</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 dias</div>
            <p className="text-xs text-muted-foreground">-2 dias vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal de Análises</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="aprovados" fill="#6366f1" name="Aprovados" />
                <Bar dataKey="reprovados" fill="#be123c" name="Reprovados" />
                <Bar dataKey="diligencias" fill="#ec4899" name="Diligências" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Modalidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockModalityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockModalityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição Regional</CardTitle>
          <CardDescription>Projetos e valores por região</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Região</TableHead>
                <TableHead className="text-right">Projetos</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-right">Valor Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRegionData.map((region) => (
                <TableRow key={region.regiao}>
                  <TableCell className="font-medium">{region.regiao}</TableCell>
                  <TableCell className="text-right">{region.projetos}</TableCell>
                  <TableCell className="text-right">R$ {(region.valor / 1000000).toFixed(1)}M</TableCell>
                  <TableCell className="text-right">R$ {Math.round(region.valor / region.projetos / 1000)}k</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function DetailedAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Performance</CardTitle>
          <CardDescription>Métricas detalhadas de análise e aprovação</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="aprovados" stroke="#6366f1" name="Aprovados" />
              <Line yAxisId="left" type="monotone" dataKey="diligencias" stroke="#ec4899" name="Diligências" />
              <Line yAxisId="right" type="monotone" dataKey="valor" stroke="#be123c" name="Valor (R$)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Motivos de Diligência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Documentação incompleta</span>
                <Badge variant="secondary">35%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Erro na identificação do projeto</span>
                <Badge variant="secondary">28%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hiato superior a 30 dias</span>
                <Badge variant="secondary">22%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Contrapartida irregular</span>
                <Badge variant="secondary">15%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analistas - Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ana Santos</span>
                <div className="flex space-x-2">
                  <Badge variant="default">28 projetos</Badge>
                  <Badge variant="outline">16 dias</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Carlos Lima</span>
                <div className="flex space-x-2">
                  <Badge variant="default">22 projetos</Badge>
                  <Badge variant="outline">19 dias</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Maria Oliveira</span>
                <div className="flex space-x-2">
                  <Badge variant="default">15 projetos</Badge>
                  <Badge variant="outline">21 dias</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ComplianceReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Compliance</CardTitle>
          <CardDescription>Conformidade com o Manual de Prestação de Contas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <p className="text-sm text-muted-foreground">Taxa de Conformidade</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">15</div>
              <p className="text-sm text-muted-foreground">Não Conformidades</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">3</div>
              <p className="text-sm text-muted-foreground">Críticas</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Hiato de 30 dias (Manual p.9, p.23)</p>
                <p className="text-sm text-muted-foreground">Verificação de prazo entre débito e emissão</p>
              </div>
              <Badge variant="default">98% Conformidade</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Identificação do projeto (Manual p.27)</p>
                <p className="text-sm text-muted-foreground">Título e SALIC nos documentos fiscais</p>
              </div>
              <Badge variant="default">95% Conformidade</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Contrapartida não financeira (Manual p.64-66)</p>
                <p className="text-sm text-muted-foreground">Vedação de contrapartida da proponente</p>
              </div>
              <Badge variant="secondary">87% Conformidade</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Relatórios Customizados</CardTitle>
          <CardDescription>Crie relatórios personalizados para suas necessidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Relatório</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Execução Financeira</SelectItem>
                    <SelectItem value="timeline">Cronograma de Análises</SelectItem>
                    <SelectItem value="compliance">Auditoria de Compliance</SelectItem>
                    <SelectItem value="regional">Distribuição Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Período</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Formato de Saída</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Relatórios Recentes</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Execução Financeira - Mar/2024</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Compliance - Q1/2024</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Regional - Fev/2024</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Relatorios() {
  return (
    <AuthProvider>
      <RelatoriosContent />
    </AuthProvider>
  )
}
