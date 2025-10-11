"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComplianceValidator } from "@/components/compliance-validator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
  MessageSquare,
  Send,
  Calculator,
} from "lucide-react"

import { OrganizacoesView } from "@/components/analise/organizacoes-view"

// Mock data for projects under analysis
const mockProjectsAnalysis = [
  {
    id: "1",
    salic: "2024001234",
    title: "Documentário sobre Cultura Popular Brasileira",
    proponente: "João Silva Produções LTDA",
    valorAprovado: 150000,
    valorExecutado: 145000,
    dataSubmissao: "2024-03-20",
    prazoAnalise: "2024-04-19",
    status: "Em Análise",
    analista: "Ana Santos",
    prioridade: "Normal",
    pendencias: 2,
  },
  {
    id: "2",
    salic: "2024005678",
    title: "Festival de Cinema Independente",
    proponente: "Associação Cultural Cine Arte",
    valorAprovado: 300000,
    valorExecutado: 295000,
    dataSubmissao: "2024-03-15",
    prazoAnalise: "2024-04-14",
    status: "Diligência",
    analista: "Carlos Lima",
    prioridade: "Alta",
    pendencias: 1,
  },
  {
    id: "3",
    salic: "2024009012",
    title: "Série Documental Regional",
    proponente: "Produtora Norte LTDA",
    valorAprovado: 200000,
    valorExecutado: 198000,
    dataSubmissao: "2024-03-25",
    prazoAnalise: "2024-04-24",
    status: "Aprovado",
    analista: "Ana Santos",
    prioridade: "Normal",
    pendencias: 0,
  },
]

function ProjectAnalysis({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">SALIC</Label>
              <p className="text-sm text-muted-foreground">{project.salic}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Proponente</Label>
              <p className="text-sm text-muted-foreground">{project.proponente}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Valor Aprovado</Label>
              <p className="text-sm text-muted-foreground">R$ {project.valorAprovado.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Valor Executado</Label>
              <p className="text-sm text-muted-foreground">R$ {project.valorExecutado.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Validation */}
      <ComplianceValidator projectId={project.id} validationType="full" />

      {/* Side-by-side Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>Visualizador Comparativo</CardTitle>
          <CardDescription>Análise lado a lado: orçamento × pagamentos × documentos × extratos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Orçamento vs Executado
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Direção:</span>
                  <span>R$ 12.500 / R$ 25.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipamentos:</span>
                  <span>R$ 28.000 / R$ 35.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Locações:</span>
                  <span>R$ 8.000 / R$ 20.000</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos Fiscais
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NF 001234:</span>
                  <span>R$ 5.000 ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>NF 005678:</span>
                  <span>R$ 15.000 ✓</span>
                </div>
                <div className="flex justify-between">
                  <span>NF 009876:</span>
                  <span>R$ 8.000 ⚠️</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações de Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Aprovar
            </Button>
            <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 bg-transparent">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Aprovar com Ressalvas
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              <MessageSquare className="mr-2 h-4 w-4" />
              Solicitar Diligência
            </Button>
            <Button variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Reprovar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DiligenciasManagement() {
  const [newDiligencia, setNewDiligencia] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Solicitar Diligência</CardTitle>
          <CardDescription>Solicite documentos ou esclarecimentos adicionais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projeto">Projeto</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o projeto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024001234">SALIC 2024001234 - Documentário Cultura Popular</SelectItem>
                  <SelectItem value="2024005678">SALIC 2024005678 - Festival Cinema Independente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo-diligencia">Tipo de Diligência</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="documentos">Documentos Adicionais</SelectItem>
                  <SelectItem value="esclarecimentos">Esclarecimentos</SelectItem>
                  <SelectItem value="correcoes">Correções</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Diligência</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva detalhadamente o que está sendo solicitado..."
                value={newDiligencia}
                onChange={(e) => setNewDiligencia(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo para Resposta</Label>
              <Input id="prazo" type="date" />
            </div>

            <Button>
              <Send className="mr-2 h-4 w-4" />
              Enviar Diligência
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diligências Pendentes</CardTitle>
          <CardDescription>Acompanhe as diligências enviadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">SALIC 2024005678 - Festival de Cinema</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Solicitação de comprovante adicional para pagamento de R$ 15.000
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Enviado em: 20/03/2024 | Prazo: 03/04/2024</p>
                </div>
                <Badge variant="secondary">Aguardando</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Analise() {
  const [projects, setProjects] = useState(mockProjectsAnalysis)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)

  const projectsEmAnalise = projects.filter((p) => p.status === "Em Análise").length
  const projectsDiligencia = projects.filter((p) => p.status === "Diligência").length
  const projectsAprovados = projects.filter((p) => p.status === "Aprovado").length
  const totalPendencias = projects.reduce((sum, p) => sum + p.pendencias, 0)

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Análise e Deliberação</h1>
            <p className="text-muted-foreground">Análise técnica de prestações de contas</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Relatório de Análise
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{projectsEmAnalise}</div>
            <p className="text-xs text-muted-foreground">Projetos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diligências</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{projectsDiligencia}</div>
            <p className="text-xs text-muted-foreground">Aguardando resposta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{projectsAprovados}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendências</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalPendencias}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queue">Fila de Análise</TabsTrigger>
          <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="diligencias">Diligências</TabsTrigger>
          <TabsTrigger value="organizacoes">Organizações</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Projetos em Análise</CardTitle>
              <CardDescription>Fila de prestações de contas para análise técnica</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SALIC</TableHead>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Proponente</TableHead>
                    <TableHead>Analista</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-mono">{project.salic}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{project.title}</p>
                          {project.pendencias > 0 && (
                            <p className="text-xs text-red-600">{project.pendencias} pendência(s)</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{project.proponente}</TableCell>
                      <TableCell className="text-sm">{project.analista}</TableCell>
                      <TableCell className="text-right">R$ {project.valorExecutado.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "Aprovado"
                              ? "default"
                              : project.status === "Em Análise"
                                ? "secondary"
                                : project.status === "Diligência"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{project.prazoAnalise}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProject(project)
                              setIsAnalysisOpen(true)
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          {selectedProject ? (
            <ProjectAnalysis project={selectedProject} />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Selecione um projeto para análise detalhada</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="diligencias">
          <DiligenciasManagement />
        </TabsContent>

        <TabsContent value="organizacoes">
          <OrganizacoesView />
        </TabsContent>
      </Tabs>

      {/* Analysis Modal */}
      {selectedProject && (
        <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Análise Técnica - SALIC {selectedProject.salic}</DialogTitle>
              <DialogDescription>{selectedProject.title}</DialogDescription>
            </DialogHeader>
            <ProjectAnalysis project={selectedProject} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
