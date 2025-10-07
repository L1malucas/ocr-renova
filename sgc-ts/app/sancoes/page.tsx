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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Scale, FileText, Calculator, Clock, Plus, Eye, Download, Send, DollarSign } from "lucide-react"

// Mock data for sanctions and appeals
const mockSanctions = [
  {
    id: "1",
    salic: "2024001234",
    proponente: "João Silva Produções LTDA",
    tipo: "Glosa",
    valor: 15000,
    motivo: "Pagamento sem comprovação adequada",
    dataAplicacao: "2024-03-25",
    prazoRecolhimento: "2024-04-24",
    status: "Pendente Recolhimento",
    observacoes: "Documento fiscal sem identificação do projeto",
  },
  {
    id: "2",
    salic: "2024005678",
    proponente: "Associação Cultural Cine Arte",
    tipo: "Multa",
    valor: 5000,
    motivo: "Atraso na prestação de contas",
    dataAplicacao: "2024-03-20",
    prazoRecolhimento: "2024-04-19",
    status: "Recolhido",
    observacoes: "Prestação entregue 15 dias após o prazo",
  },
  {
    id: "3",
    salic: "2024009012",
    proponente: "Produtora Norte LTDA",
    tipo: "TCE",
    valor: 25000,
    motivo: "Não prestação de contas",
    dataAplicacao: "2024-03-15",
    prazoRecolhimento: "2024-04-14",
    status: "Em TCE",
    observacoes: "Projeto não prestou contas no prazo regulamentar",
  },
]

const mockAppeals = [
  {
    id: "1",
    salic: "2024001234",
    proponente: "João Silva Produções LTDA",
    tipoSancao: "Glosa",
    valorOriginal: 15000,
    dataRecurso: "2024-03-28",
    prazoAnalise: "2024-04-27",
    status: "Em Análise",
    justificativa: "Apresentação de documentação complementar que comprova a regularidade do pagamento",
  },
]

function NewSanctionForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projeto">Projeto (SALIC)</Label>
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
          <Label htmlFor="tipo-sancao">Tipo de Sanção</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="glosa">Glosa</SelectItem>
              <SelectItem value="multa">Multa</SelectItem>
              <SelectItem value="tce">TCE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="valor">Valor da Sanção (R$)</Label>
          <Input id="valor" type="number" placeholder="0,00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prazo">Prazo para Recolhimento</Label>
          <Input id="prazo" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivo">Motivo da Sanção</Label>
        <Textarea id="motivo" placeholder="Descreva o motivo que levou à aplicação da sanção..." rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea id="observacoes" placeholder="Informações adicionais..." rows={2} />
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Atenção:</strong> A aplicação de sanções deve seguir os procedimentos estabelecidos no Manual de
          Prestação de Contas (p.72-75).
        </AlertDescription>
      </Alert>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Aplicar Sanção</Button>
      </div>
    </form>
  )
}

function SanctionDetails({ sanction }: { sanction: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Tipo de Sanção</Label>
          <Badge
            variant={sanction.tipo === "Glosa" ? "secondary" : sanction.tipo === "Multa" ? "outline" : "destructive"}
          >
            {sanction.tipo}
          </Badge>
        </div>
        <div>
          <Label className="text-sm font-medium">Status</Label>
          <Badge
            variant={
              sanction.status === "Recolhido"
                ? "default"
                : sanction.status === "Pendente Recolhimento"
                  ? "secondary"
                  : "destructive"
            }
          >
            {sanction.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Valor</Label>
          <p className="text-sm text-muted-foreground">R$ {sanction.valor.toLocaleString()}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Prazo para Recolhimento</Label>
          <p className="text-sm text-muted-foreground">{sanction.prazoRecolhimento}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Motivo</Label>
        <p className="text-sm text-muted-foreground">{sanction.motivo}</p>
      </div>

      <div>
        <Label className="text-sm font-medium">Observações</Label>
        <p className="text-sm text-muted-foreground">{sanction.observacoes}</p>
      </div>

      <div className="flex space-x-2">
        <Button size="sm">
          <Calculator className="mr-2 h-4 w-4" />
          Gerar GRU
        </Button>
        <Button size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Relatório TCE
        </Button>
      </div>
    </div>
  )
}

function AppealsManagement({ appeals }: { appeals: any[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recursos Interpostos</CardTitle>
          <CardDescription>Recursos contra sanções aplicadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SALIC</TableHead>
                <TableHead>Proponente</TableHead>
                <TableHead>Tipo Sanção</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Data Recurso</TableHead>
                <TableHead>Prazo Análise</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appeals.map((appeal) => (
                <TableRow key={appeal.id}>
                  <TableCell className="font-mono">{appeal.salic}</TableCell>
                  <TableCell className="text-sm">{appeal.proponente}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{appeal.tipoSancao}</Badge>
                  </TableCell>
                  <TableCell className="text-right">R$ {appeal.valorOriginal.toLocaleString()}</TableCell>
                  <TableCell>{appeal.dataRecurso}</TableCell>
                  <TableCell>{appeal.prazoAnalise}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{appeal.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function ExtrajudicialCollection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobrança Extrajudicial</CardTitle>
        <CardDescription>Gestão de cobranças de débitos em atraso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Procedimento:</strong> Débitos não recolhidos no prazo de 30 dias são encaminhados para cobrança
              extrajudicial com atualização monetária e juros.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Débitos em Atraso</h3>
              <div className="text-2xl font-bold text-red-600">R$ 45.000</div>
              <p className="text-sm text-muted-foreground">3 processos</p>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Em Cobrança</h3>
              <div className="text-2xl font-bold text-yellow-600">R$ 25.000</div>
              <p className="text-sm text-muted-foreground">2 processos</p>
            </Card>
          </div>

          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório de Cobrança
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TCEManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tomada de Contas Especial (TCE)</CardTitle>
        <CardDescription>Processos de TCE para projetos não prestados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <Scale className="h-4 w-4" />
            <AlertDescription>
              <strong>TCE:</strong> Instaurada quando o proponente não presta contas no prazo regulamentar ou quando há
              danos ao erário público.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">TCE Instauradas</h3>
              <div className="text-2xl font-bold text-red-600">5</div>
              <p className="text-sm text-muted-foreground">Este ano</p>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Em Andamento</h3>
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <p className="text-sm text-muted-foreground">Processos ativos</p>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Valor Total</h3>
              <div className="text-2xl font-bold">R$ 125.000</div>
              <p className="text-sm text-muted-foreground">Em TCE</p>
            </Card>
          </div>

          <div className="flex space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Instaurar TCE
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Relatório TCE
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Sancoes() {
  const [sanctions, setSanctions] = useState(mockSanctions)
  const [appeals, setAppeals] = useState(mockAppeals)
  const [isNewSanctionOpen, setIsNewSanctionOpen] = useState(false)
  const [selectedSanction, setSelectedSanction] = useState<any>(null)

  const totalSancoes = sanctions.length
  const valorTotal = sanctions.reduce((sum, s) => sum + s.valor, 0)
  const pendentesRecolhimento = sanctions.filter((s) => s.status === "Pendente Recolhimento").length
  const recursosAtivos = appeals.filter((a) => a.status === "Em Análise").length

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sanções, Recursos e Cobranças</h1>
            <p className="text-muted-foreground">Gestão de glosas, multas e tomadas de contas especiais</p>
          </div>
          <Dialog open={isNewSanctionOpen} onOpenChange={setIsNewSanctionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Sanção
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Aplicar Sanção</DialogTitle>
                <DialogDescription>Registre uma nova sanção conforme análise técnica</DialogDescription>
              </DialogHeader>
              <NewSanctionForm onClose={() => setIsNewSanctionOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Sanções</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSancoes}</div>
            <p className="text-xs text-muted-foreground">Aplicadas este ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {valorTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Em sanções aplicadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendentesRecolhimento}</div>
            <p className="text-xs text-muted-foreground">Aguardando recolhimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recursos Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{recursosAtivos}</div>
            <p className="text-xs text-muted-foreground">Em análise</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert for overdue payments */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Atenção:</strong> Existem {pendentesRecolhimento} sanções com prazo de recolhimento vencendo em
          breve. Acompanhe os prazos para evitar cobrança extrajudicial.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="sanctions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sanctions">Sanções Aplicadas</TabsTrigger>
          <TabsTrigger value="appeals">Recursos</TabsTrigger>
          <TabsTrigger value="collection">Cobrança Extrajudicial</TabsTrigger>
          <TabsTrigger value="tce">TCE</TabsTrigger>
        </TabsList>

        <TabsContent value="sanctions">
          <Card>
            <CardHeader>
              <CardTitle>Sanções Aplicadas</CardTitle>
              <CardDescription>Glosas, multas e outras sanções por projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SALIC</TableHead>
                    <TableHead>Proponente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sanctions.map((sanction) => (
                    <TableRow key={sanction.id}>
                      <TableCell className="font-mono">{sanction.salic}</TableCell>
                      <TableCell className="text-sm">{sanction.proponente}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sanction.tipo === "Glosa"
                              ? "secondary"
                              : sanction.tipo === "Multa"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {sanction.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{sanction.motivo}</TableCell>
                      <TableCell className="text-right font-medium">R$ {sanction.valor.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{sanction.prazoRecolhimento}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sanction.status === "Recolhido"
                              ? "default"
                              : sanction.status === "Pendente Recolhimento"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {sanction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => setSelectedSanction(sanction)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
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

        <TabsContent value="appeals">
          <AppealsManagement appeals={appeals} />
        </TabsContent>

        <TabsContent value="collection">
          <ExtrajudicialCollection />
        </TabsContent>

        <TabsContent value="tce">
          <TCEManagement />
        </TabsContent>
      </Tabs>

      {/* Sanction Details Modal */}
      {selectedSanction && (
        <Dialog open={!!selectedSanction} onOpenChange={() => setSelectedSanction(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Sanção</DialogTitle>
              <DialogDescription>SALIC {selectedSanction.salic}</DialogDescription>
            </DialogHeader>
            <SanctionDetails sanction={selectedSanction} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
