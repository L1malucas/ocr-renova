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
import { AlertTriangle, CheckCircle, Upload, Plus, Eye, FileText, DollarSign } from "lucide-react"

// Mock data for contrapartidas
const mockContrapartidas = [
  {
    id: "1",
    tipo: "Financeira",
    doador: "Empresa ABC LTDA",
    cnpj: "12.345.678/0001-90",
    valor: 50000,
    dataDoacao: "2024-02-15",
    status: "Aprovada",
    comprovante: "Recibo_001.pdf",
    observacoes: "Doação em dinheiro conforme contrato",
  },
  {
    id: "2",
    tipo: "Não Financeira",
    doador: "João Silva",
    cnpj: "123.456.789-00",
    valor: 15000,
    dataDoacao: "2024-03-01",
    status: "Pendente Análise",
    comprovante: "Laudo_Equipamento.pdf",
    observacoes: "Empréstimo de equipamento de som",
  },
  {
    id: "3",
    tipo: "Financeira",
    doador: "Maria Santos",
    cnpj: "987.654.321-00",
    valor: 25000,
    dataDoacao: "2024-03-10",
    status: "Rejeitada",
    comprovante: "Recibo_002.pdf",
    observacoes: "Doadora é sócia da proponente - vedado pelo manual",
  },
]

function NewContrapartidaForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Contrapartida *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financeira">Financeira</SelectItem>
              <SelectItem value="nao-financeira">Não Financeira</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="data-doacao">Data da Doação *</Label>
          <Input id="data-doacao" type="date" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="doador">Nome do Doador *</Label>
          <Input id="doador" placeholder="Nome completo ou razão social" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf-cnpj">CPF/CNPJ *</Label>
          <Input id="cpf-cnpj" placeholder="000.000.000-00" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="valor">Valor da Contrapartida (R$) *</Label>
        <Input id="valor" type="number" placeholder="0,00" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição da Contrapartida *</Label>
        <Textarea id="descricao" placeholder="Descreva detalhadamente a contrapartida oferecida" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comprovante">Comprovante da Doação *</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Clique para fazer upload ou arraste o arquivo aqui</p>
          <p className="text-xs text-muted-foreground">PDF, JPG ou PNG até 10MB</p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Atenção:</strong> Contrapartidas não financeiras da própria proponente ou sócios são vedadas pelo
          Manual de Prestação de Contas.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Contrapartida</Button>
      </div>
    </form>
  )
}

function ContrapartidaDetails({ contrapartida }: { contrapartida: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Tipo</Label>
          <Badge variant={contrapartida.tipo === "Financeira" ? "default" : "secondary"}>{contrapartida.tipo}</Badge>
        </div>
        <div>
          <Label className="text-sm font-medium">Status</Label>
          <Badge
            variant={
              contrapartida.status === "Aprovada"
                ? "default"
                : contrapartida.status === "Pendente Análise"
                  ? "secondary"
                  : "destructive"
            }
          >
            {contrapartida.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Doador</Label>
          <p className="text-sm text-muted-foreground">{contrapartida.doador}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">CPF/CNPJ</Label>
          <p className="text-sm text-muted-foreground">{contrapartida.cnpj}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Data da Doação</Label>
          <p className="text-sm text-muted-foreground">{contrapartida.dataDoacao}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Valor</Label>
          <p className="text-sm text-muted-foreground">R$ {contrapartida.valor.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Observações</Label>
        <p className="text-sm text-muted-foreground">{contrapartida.observacoes}</p>
      </div>

      <div>
        <Label className="text-sm font-medium">Comprovante</Label>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          {contrapartida.comprovante}
        </Button>
      </div>

      {contrapartida.status === "Rejeitada" && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Motivo da Rejeição:</strong> {contrapartida.observacoes}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

function ContrapartidaValidation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validações de Contrapartida</CardTitle>
        <CardDescription>Verificações automáticas realizadas pelo sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Verificação de vínculo com proponente</p>
                <p className="text-sm text-muted-foreground">CPF/CNPJ não consta como sócio da proponente</p>
              </div>
            </div>
            <Badge variant="default">Aprovado</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Documentação obrigatória</p>
                <p className="text-sm text-muted-foreground">Comprovante de doação anexado</p>
              </div>
            </div>
            <Badge variant="default">Aprovado</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium">Avaliação de valor (não financeira)</p>
                <p className="text-sm text-muted-foreground">Laudo técnico em análise</p>
              </div>
            </div>
            <Badge variant="secondary">Pendente</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ContrapartidaWorkflow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow de Aprovação</CardTitle>
        <CardDescription>Fluxo automático para validação de contrapartidas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-2 border-blue-500 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">1. Registro da Contrapartida</p>
                <p className="text-sm text-muted-foreground">Proponente registra dados e anexa comprovantes</p>
              </div>
              <Badge variant="default">Concluído</Badge>
            </div>
          </div>

          <div className="border-l-2 border-yellow-500 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">2. Validação Automática</p>
                <p className="text-sm text-muted-foreground">Sistema verifica vínculos e documentação</p>
              </div>
              <Badge variant="secondary">Em Andamento</Badge>
            </div>
          </div>

          <div className="border-l-2 border-gray-300 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">3. Análise Técnica</p>
                <p className="text-sm text-muted-foreground">Avaliação de laudos e valores (se aplicável)</p>
              </div>
              <Badge variant="outline">Aguardando</Badge>
            </div>
          </div>

          <div className="border-l-2 border-gray-300 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">4. Aprovação Final</p>
                <p className="text-sm text-muted-foreground">Contrapartida aprovada e computada no projeto</p>
              </div>
              <Badge variant="outline">Aguardando</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Contrapartida() {
  const [contrapartidas, setContrapartidas] = useState(mockContrapartidas)
  const [isNewContrapartidaOpen, setIsNewContrapartidaOpen] = useState(false)
  const [selectedContrapartida, setSelectedContrapartida] = useState<any>(null)

  const totalContrapartida = contrapartidas.reduce((sum, c) => sum + c.valor, 0)
  const contrapartidasAprovadas = contrapartidas.filter((c) => c.status === "Aprovada")
  const valorAprovado = contrapartidasAprovadas.reduce((sum, c) => sum + c.valor, 0)

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Contrapartida</h1>
            <p className="text-muted-foreground">Registre e comprove as contrapartidas do projeto</p>
          </div>
          <Dialog open={isNewContrapartidaOpen} onOpenChange={setIsNewContrapartidaOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Contrapartida
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Contrapartida</DialogTitle>
                <DialogDescription>Preencha os dados da contrapartida oferecida</DialogDescription>
              </DialogHeader>
              <NewContrapartidaForm onClose={() => setIsNewContrapartidaOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contrapartida</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalContrapartida.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{contrapartidas.length} registros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {valorAprovado.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{contrapartidasAprovadas.length} aprovadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">Aguardando análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Requer correção</p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Alert */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Contrapartidas não financeiras da própria proponente ou sócios são vedadas pelo
          Manual de Prestação de Contas. Apenas terceiros podem oferecer contrapartidas não financeiras.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Contrapartidas</TabsTrigger>
          <TabsTrigger value="validation">Validação</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Contrapartidas Registradas</CardTitle>
              <CardDescription>Todas as contrapartidas oferecidas ao projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Doador</TableHead>
                    <TableHead>CPF/CNPJ</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contrapartidas.map((contrapartida) => (
                    <TableRow key={contrapartida.id}>
                      <TableCell>
                        <Badge variant={contrapartida.tipo === "Financeira" ? "default" : "secondary"}>
                          {contrapartida.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{contrapartida.doador}</TableCell>
                      <TableCell className="font-mono text-sm">{contrapartida.cnpj}</TableCell>
                      <TableCell>{contrapartida.dataDoacao}</TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {contrapartida.valor.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            contrapartida.status === "Aprovada"
                              ? "default"
                              : contrapartida.status === "Pendente Análise"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {contrapartida.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedContrapartida(contrapartida)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <ContrapartidaValidation />
        </TabsContent>

        <TabsContent value="workflow">
          <ContrapartidaWorkflow />
        </TabsContent>
      </Tabs>

      {/* Contrapartida Details Modal */}
      {selectedContrapartida && (
        <Dialog open={!!selectedContrapartida} onOpenChange={() => setSelectedContrapartida(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes da Contrapartida</DialogTitle>
              <DialogDescription>Informações completas da contrapartida</DialogDescription>
            </DialogHeader>
            <ContrapartidaDetails contrapartida={selectedContrapartida} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
