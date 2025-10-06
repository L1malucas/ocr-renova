"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarNav } from "@/components/sidebar-nav"
import { AuthProvider } from "@/components/auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Calculator, AlertTriangle, Download, Upload, Edit, Plus, Trash2 } from "lucide-react"

// Mock data for budget items
const mockBudgetItems = [
  {
    id: "1",
    rubrica: "1.1.1",
    descricao: "Direção",
    valorAprovado: 25000,
    valorExecutado: 12500,
    valorDisponivel: 12500,
    categoria: "Recursos Humanos",
  },
  {
    id: "2",
    rubrica: "1.1.2",
    descricao: "Roteiro",
    valorAprovado: 15000,
    valorExecutado: 15000,
    valorDisponivel: 0,
    categoria: "Recursos Humanos",
  },
  {
    id: "3",
    rubrica: "2.1.1",
    descricao: "Equipamentos de Filmagem",
    valorAprovado: 35000,
    valorExecutado: 28000,
    valorDisponivel: 7000,
    categoria: "Equipamentos",
  },
  {
    id: "4",
    rubrica: "3.1.1",
    descricao: "Locação de Estúdio",
    valorAprovado: 20000,
    valorExecutado: 8000,
    valorDisponivel: 12000,
    categoria: "Locações",
  },
]

function BudgetContent() {
  const [budgetItems, setBudgetItems] = useState(mockBudgetItems)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProject] = useState({
    salic: "2024001234",
    title: "Documentário sobre Cultura Popular Brasileira",
    valorTotal: 150000,
  })

  const totalAprovado = budgetItems.reduce((sum, item) => sum + item.valorAprovado, 0)
  const totalExecutado = budgetItems.reduce((sum, item) => sum + item.valorExecutado, 0)
  const totalDisponivel = budgetItems.reduce((sum, item) => sum + item.valorDisponivel, 0)
  const percentualExecutado = (totalExecutado / totalAprovado) * 100

  // Check if any item exceeds 20% threshold for remanejamento alert
  const needsRemanejamento = budgetItems.some((item) => (item.valorExecutado / item.valorAprovado) * 100 > 80)

  return (
    <div className="flex min-h-screen bg-background">
      <div className="border-r bg-card">
        <SidebarNav />
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Demonstrativo Orçamentário (DO)</h1>
              <p className="text-muted-foreground">Gerencie o orçamento aprovado vs executado</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar DO
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Importar Planilha
              </Button>
              <Button onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Salvar" : "Editar"}
              </Button>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Projeto: {selectedProject.title}
            </CardTitle>
            <CardDescription>SALIC {selectedProject.salic}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">Valor Total Aprovado</Label>
                <p className="text-2xl font-bold">R$ {totalAprovado.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Valor Executado</Label>
                <p className="text-2xl font-bold text-blue-600">R$ {totalExecutado.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Valor Disponível</Label>
                <p className="text-2xl font-bold text-green-600">R$ {totalDisponivel.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Percentual Executado</Label>
                <p className="text-2xl font-bold">{percentualExecutado.toFixed(1)}%</p>
                <Progress value={percentualExecutado} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {needsRemanejamento && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Atenção:</strong> Algumas rubricas atingiram mais de 80% de execução. Considere solicitar
              remanejamento se necessário alterações superiores a 20% do orçamento global.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="budget" className="space-y-4">
          <TabsList>
            <TabsTrigger value="budget">Orçamento Detalhado</TabsTrigger>
            <TabsTrigger value="summary">Resumo por Categoria</TabsTrigger>
            <TabsTrigger value="history">Histórico de Alterações</TabsTrigger>
          </TabsList>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rubricas Orçamentárias</CardTitle>
                    <CardDescription>Comparativo aprovado × executado por rubrica</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Rubrica
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rubrica</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Aprovado</TableHead>
                      <TableHead className="text-right">Executado</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                      <TableHead className="text-right">%</TableHead>
                      {isEditing && <TableHead>Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetItems.map((item) => {
                      const percentage = (item.valorExecutado / item.valorAprovado) * 100
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.rubrica}</TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.categoria}</Badge>
                          </TableCell>
                          <TableCell className="text-right">R$ {item.valorAprovado.toLocaleString()}</TableCell>
                          <TableCell className="text-right">R$ {item.valorExecutado.toLocaleString()}</TableCell>
                          <TableCell className="text-right">R$ {item.valorDisponivel.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={percentage > 80 ? "destructive" : percentage > 50 ? "secondary" : "default"}
                            >
                              {percentage.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          {isEditing && (
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <BudgetSummary budgetItems={budgetItems} />
          </TabsContent>

          <TabsContent value="history">
            <BudgetHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BudgetSummary({ budgetItems }: { budgetItems: any[] }) {
  const categories = budgetItems.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = {
        aprovado: 0,
        executado: 0,
        disponivel: 0,
      }
    }
    acc[item.categoria].aprovado += item.valorAprovado
    acc[item.categoria].executado += item.valorExecutado
    acc[item.categoria].disponivel += item.valorDisponivel
    return acc
  }, {} as any)

  return (
    <div className="grid gap-4">
      {Object.entries(categories).map(([categoria, valores]: [string, any]) => {
        const percentage = (valores.executado / valores.aprovado) * 100
        return (
          <Card key={categoria}>
            <CardHeader>
              <CardTitle className="text-lg">{categoria}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm">Aprovado</Label>
                  <p className="text-xl font-bold">R$ {valores.aprovado.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm">Executado</Label>
                  <p className="text-xl font-bold text-blue-600">R$ {valores.executado.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm">Disponível</Label>
                  <p className="text-xl font-bold text-green-600">R$ {valores.disponivel.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm">Execução</Label>
                  <p className="text-xl font-bold">{percentage.toFixed(1)}%</p>
                  <Progress value={percentage} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function BudgetHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Alterações Orçamentárias</CardTitle>
        <CardDescription>Registro de remanejamentos e ajustes aprovados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-2 border-primary pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Orçamento inicial aprovado</p>
                <p className="text-sm text-muted-foreground">15/01/2024 - ANCINE</p>
              </div>
              <Badge variant="default">Aprovado</Badge>
            </div>
          </div>
          <div className="border-l-2 border-yellow-500 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Remanejamento: Equipamentos → Recursos Humanos</p>
                <p className="text-sm text-muted-foreground">20/03/2024 - João Silva</p>
                <p className="text-xs text-muted-foreground">Valor: R$ 5.000,00 (3,3% do total)</p>
              </div>
              <Badge variant="secondary">Em Análise</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Budget() {
  return (
    <AuthProvider>
      <BudgetContent />
    </AuthProvider>
  )
}
