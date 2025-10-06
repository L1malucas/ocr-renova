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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Building2, AlertTriangle, CheckCircle, Download, Upload, Eye, RefreshCw } from "lucide-react"

// Mock data for bank accounts and transactions
const mockAccounts = [
  {
    id: "1",
    tipo: "Captação",
    numero: "12345-6",
    agencia: "1234",
    saldo: 150000,
    status: "Ativa",
  },
  {
    id: "2",
    tipo: "Movimentação",
    numero: "12346-7",
    agencia: "1234",
    saldo: 75000,
    status: "Ativa",
  },
  {
    id: "3",
    tipo: "Aplicação",
    numero: "12347-8",
    agencia: "1234",
    saldo: 25000,
    status: "Ativa",
  },
]

const mockTransactions = [
  {
    id: "1",
    data: "2024-03-15",
    tipo: "Transferência",
    descricao: "Transferência Captação → Movimentação",
    valor: -50000,
    saldoAnterior: 200000,
    saldoAtual: 150000,
    conta: "Captação",
    documento: "TED123456",
  },
  {
    id: "2",
    data: "2024-03-15",
    tipo: "Transferência",
    descricao: "Recebimento de Captação",
    valor: 50000,
    saldoAnterior: 25000,
    saldoAtual: 75000,
    conta: "Movimentação",
    documento: "TED123456",
  },
  {
    id: "3",
    data: "2024-03-10",
    tipo: "Aplicação",
    descricao: "Aplicação em CDB",
    valor: -25000,
    saldoAnterior: 100000,
    saldoAtual: 75000,
    conta: "Movimentação",
    documento: "APL789012",
  },
]

function ExecutionContent() {
  const [accounts] = useState(mockAccounts)
  const [transactions] = useState(mockTransactions)
  const [selectedAccount, setSelectedAccount] = useState(accounts[0])

  return (
    <div className="flex min-h-screen bg-background">
      <div className="border-r bg-card">
        <SidebarNav />
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Demonstrativo de Execução (DE)</h1>
              <p className="text-muted-foreground">Conciliação bancária e movimentação financeira</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sincronizar BB
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar DE
              </Button>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Importar Extrato
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <Alert className="mb-6">
          <Building2 className="h-4 w-4" />
          <AlertDescription>
            <strong>Integração Banco do Brasil:</strong> Conectado. Última sincronização: hoje às 14:30. Extratos
            atualizados automaticamente.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Contas Bancárias</TabsTrigger>
            <TabsTrigger value="transactions">Movimentação</TabsTrigger>
            <TabsTrigger value="reconciliation">Conciliação</TabsTrigger>
            <TabsTrigger value="gru">Geração de GRU</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <div className="grid gap-4">
              {accounts.map((account) => (
                <Card key={account.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Conta de {account.tipo}
                        </CardTitle>
                        <CardDescription>
                          Banco do Brasil - Ag: {account.agencia} - CC: {account.numero}
                        </CardDescription>
                      </div>
                      <Badge variant={account.status === "Ativa" ? "default" : "secondary"}>{account.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm">Saldo Atual</Label>
                        <p className="text-2xl font-bold">R$ {account.saldo.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedAccount(account)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Extrato
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Movimentação Financeira</CardTitle>
                    <CardDescription>Extrato consolidado de todas as contas</CardDescription>
                  </div>
                  <Select
                    value={selectedAccount.id}
                    onValueChange={(value) => setSelectedAccount(accounts.find((a) => a.id === value) || accounts[0])}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.tipo} - {account.numero}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.conta === selectedAccount.tipo)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.data}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.tipo}</Badge>
                          </TableCell>
                          <TableCell>{transaction.descricao}</TableCell>
                          <TableCell className="font-mono text-sm">{transaction.documento}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${transaction.valor > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.valor > 0 ? "+" : ""}R$ {Math.abs(transaction.valor).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">R$ {transaction.saldoAtual.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reconciliation">
            <BankReconciliation />
          </TabsContent>

          <TabsContent value="gru">
            <GRUGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BankReconciliation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conciliação Bancária</CardTitle>
        <CardDescription>Verificação automática entre extratos e lançamentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold">Conciliados</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="font-semibold">Pendentes</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold">Diferenças</p>
                  <p className="text-2xl font-bold">R$ 0,00</p>
                </div>
              </div>
            </Card>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Conciliação OK:</strong> Todos os lançamentos estão conciliados com os extratos bancários. Última
              verificação: hoje às 14:30.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

function GRUGenerator() {
  const [gruData, setGruData] = useState({
    codigo: "28832-2",
    valor: "",
    vencimento: "",
    referencia: "",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geração de GRU</CardTitle>
        <CardDescription>Gere Guias de Recolhimento da União automaticamente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codigo-receita">Código da Receita</Label>
              <Select value={gruData.codigo} onValueChange={(value) => setGruData({ ...gruData, codigo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="28832-2">28832-2 - Multa ANCINE</SelectItem>
                  <SelectItem value="28833-0">28833-0 - Glosa ANCINE</SelectItem>
                  <SelectItem value="28834-9">28834-9 - Juros ANCINE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                placeholder="0,00"
                value={gruData.valor}
                onChange={(e) => setGruData({ ...gruData, valor: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vencimento">Data de Vencimento</Label>
              <Input
                id="vencimento"
                type="date"
                value={gruData.vencimento}
                onChange={(e) => setGruData({ ...gruData, vencimento: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencia">Número de Referência</Label>
              <Input
                id="referencia"
                placeholder="SALIC ou processo"
                value={gruData.referencia}
                onChange={(e) => setGruData({ ...gruData, referencia: e.target.value })}
              />
            </div>

            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Gerar GRU
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-3">Pré-visualização da GRU</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Código:</span>
                <span className="font-mono">{gruData.codigo}</span>
              </div>
              <div className="flex justify-between">
                <span>Valor:</span>
                <span className="font-mono">R$ {gruData.valor || "0,00"}</span>
              </div>
              <div className="flex justify-between">
                <span>Vencimento:</span>
                <span className="font-mono">{gruData.vencimento || "DD/MM/AAAA"}</span>
              </div>
              <div className="flex justify-between">
                <span>Referência:</span>
                <span className="font-mono">{gruData.referencia || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Execution() {
  return (
    <AuthProvider>
      <ExecutionContent />
    </AuthProvider>
  )
}
