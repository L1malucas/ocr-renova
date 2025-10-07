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
import { Receipt, AlertTriangle, CheckCircle, Upload, Plus, Eye, Edit, FileText, Calendar } from "lucide-react"

// Mock data for payments
const mockPayments = [
  {
    id: "1",
    data: "2024-03-15",
    fornecedor: "João Silva",
    cpfCnpj: "123.456.789-00",
    documento: "NF 001234",
    rubrica: "1.1.1",
    descricaoRubrica: "Direção",
    valor: 5000,
    formaPagamento: "PIX",
    status: "Validado",
    observacoes: "Pagamento de direção - março/2024",
  },
  {
    id: "2",
    data: "2024-03-10",
    fornecedor: "Equipamentos Cine LTDA",
    cpfCnpj: "12.345.678/0001-90",
    documento: "NF 005678",
    rubrica: "2.1.1",
    descricaoRubrica: "Equipamentos de Filmagem",
    valor: 15000,
    formaPagamento: "Transferência",
    status: "Pendente Validação",
    observacoes: "Locação de câmeras - semana 1",
  },
  {
    id: "3",
    data: "2024-03-08",
    fornecedor: "Estúdio Central",
    cpfCnpj: "98.765.432/0001-10",
    documento: "NF 009876",
    rubrica: "3.1.1",
    descricaoRubrica: "Locação de Estúdio",
    valor: 8000,
    formaPagamento: "Transferência",
    status: "Rejeitado",
    observacoes: "Documento fiscal sem identificação do projeto",
  },
]

function NewPaymentForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="data-debito">Data do Débito *</Label>
          <Input id="data-debito" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="forma-pagamento">Forma de Pagamento *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pix">PIX</SelectItem>
              <SelectItem value="transferencia">Transferência Eletrônica</SelectItem>
              <SelectItem value="ted">TED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fornecedor">Fornecedor *</Label>
          <Input id="fornecedor" placeholder="Nome do fornecedor" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf-cnpj">CPF/CNPJ *</Label>
          <Input id="cpf-cnpj" placeholder="000.000.000-00" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="documento">Número do Documento *</Label>
          <Input id="documento" placeholder="NF, RPA, etc." required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="data-emissao">Data de Emissão *</Label>
          <Input id="data-emissao" type="date" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rubrica">Rubrica *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a rubrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.1.1">1.1.1 - Direção</SelectItem>
              <SelectItem value="1.1.2">1.1.2 - Roteiro</SelectItem>
              <SelectItem value="2.1.1">2.1.1 - Equipamentos</SelectItem>
              <SelectItem value="3.1.1">3.1.1 - Locações</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="valor">Valor (R$) *</Label>
          <Input id="valor" type="number" placeholder="0,00" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea id="observacoes" placeholder="Descrição do pagamento" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documento-fiscal">Documento Fiscal *</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Clique para fazer upload ou arraste o arquivo aqui</p>
          <p className="text-xs text-muted-foreground">PDF, JPG ou PNG até 10MB</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Pagamento</Button>
      </div>
    </form>
  )
}

function PaymentDetails({ payment }: { payment: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Data do Débito</Label>
          <p className="text-sm text-muted-foreground">{payment.data}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Status</Label>
          <Badge
            variant={
              payment.status === "Validado"
                ? "default"
                : payment.status === "Pendente Validação"
                  ? "secondary"
                  : "destructive"
            }
          >
            {payment.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Fornecedor</Label>
          <p className="text-sm text-muted-foreground">{payment.fornecedor}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">CPF/CNPJ</Label>
          <p className="text-sm text-muted-foreground">{payment.cpfCnpj}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Documento Fiscal</Label>
          <p className="text-sm text-muted-foreground">{payment.documento}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Valor</Label>
          <p className="text-sm text-muted-foreground">R$ {payment.valor.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Rubrica</Label>
        <p className="text-sm text-muted-foreground">
          {payment.rubrica} - {payment.descricaoRubrica}
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium">Observações</Label>
        <p className="text-sm text-muted-foreground">{payment.observacoes}</p>
      </div>

      {payment.status === "Rejeitado" && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Motivo da Rejeição:</strong> {payment.observacoes}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

function PaymentValidation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Validações Automáticas</CardTitle>
          <CardDescription>Verificações realizadas pelo sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Hiato de 30 dias</p>
                  <p className="text-sm text-muted-foreground">Débito vs emissão do documento</p>
                </div>
              </div>
              <Badge variant="default">Aprovado</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Identificação do projeto</p>
                  <p className="text-sm text-muted-foreground">Título e SALIC no documento</p>
                </div>
              </div>
              <Badge variant="default">Aprovado</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Pagamento via conta movimentação</p>
                  <p className="text-sm text-muted-foreground">Verificação de origem dos recursos</p>
                </div>
              </div>
              <Badge variant="secondary">Pendente</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentReports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatório por Rubrica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consolidado de pagamentos agrupados por rubrica orçamentária
            </p>
            <Button className="w-full">Gerar Relatório</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Relatório por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Pagamentos realizados em período específico</p>
            <Button className="w-full">Gerar Relatório</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Payments() {
  const [payments, setPayments] = useState(mockPayments)
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const totalPagamentos = payments.reduce((sum, payment) => sum + payment.valor, 0)
  const pagamentosValidados = payments.filter((p) => p.status === "Validado").length
  const pagamentosPendentes = payments.filter((p) => p.status === "Pendente Validação").length

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relação de Pagamentos (RP)</h1>
            <p className="text-muted-foreground">Registre e valide todos os pagamentos do projeto</p>
          </div>
          <Dialog open={isNewPaymentOpen} onOpenChange={setIsNewPaymentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Pagamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Registrar Novo Pagamento</DialogTitle>
                <DialogDescription>Preencha os dados do pagamento realizado</DialogDescription>
              </DialogHeader>
              <NewPaymentForm onClose={() => setIsNewPaymentOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalPagamentos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{payments.length} pagamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{pagamentosValidados}</div>
            <p className="text-xs text-muted-foreground">Aprovados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pagamentosPendentes}</div>
            <p className="text-xs text-muted-foreground">Aguardando validação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Requer correção</p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Alerts */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Validações Automáticas:</strong> Sistema verifica hiato máximo de 30 dias entre débito e emissão do
          documento fiscal, identificação do projeto nos documentos e conformidade com rubricas aprovadas.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Pagamentos</TabsTrigger>
          <TabsTrigger value="validation">Validação</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Registrados</CardTitle>
              <CardDescription>Todos os pagamentos realizados no projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Rubrica</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.data}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.fornecedor}</p>
                          <p className="text-xs text-muted-foreground">{payment.cpfCnpj}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.documento}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.rubrica}</p>
                          <p className="text-xs text-muted-foreground">{payment.descricaoRubrica}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">R$ {payment.valor.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "Validado"
                              ? "default"
                              : payment.status === "Pendente Validação"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => setSelectedPayment(payment)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
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

        <TabsContent value="validation">
          <PaymentValidation />
        </TabsContent>

        <TabsContent value="reports">
          <PaymentReports />
        </TabsContent>
      </Tabs>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Pagamento</DialogTitle>
              <DialogDescription>Informações completas do pagamento</DialogDescription>
            </DialogHeader>
            <PaymentDetails payment={selectedPayment} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
