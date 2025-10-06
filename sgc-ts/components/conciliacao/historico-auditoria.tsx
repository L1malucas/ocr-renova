"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Calendar, User, Building2 } from "lucide-react"

const mockConciliacoesFechadas = [
  {
    id: 1,
    mes: "2024-09",
    mesNome: "Setembro 2024",
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "67890-1",
    finalizadoPor: "João Silva",
    dataFinalizacao: "2024-10-02",
    totalMovimentos: 150,
    valorTotal: 125430.5,
    status: "Fechado",
  },
  {
    id: 2,
    mes: "2024-08",
    mesNome: "Agosto 2024",
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "54321-0",
    finalizadoPor: "Maria Souza",
    dataFinalizacao: "2024-09-03",
    totalMovimentos: 128,
    valorTotal: 89750.25,
    status: "Fechado",
  },
  {
    id: 3,
    mes: "2024-07",
    mesNome: "Julho 2024",
    banco: "Itaú",
    agencia: "5678",
    conta: "12345-9",
    finalizadoPor: "Carlos Santos",
    dataFinalizacao: "2024-08-01",
    totalMovimentos: 95,
    valorTotal: 45230.75,
    status: "Fechado",
  },
]

const mockDetalhesAuditoria = [
  {
    id: 1,
    extratoData: "2024-09-15",
    extratoDescricao: "PIX RECEBIDO - DOACAO MENSAL",
    extratoValor: 1500.0,
    sistemaData: "2024-09-15",
    sistemaDescricao: "Doação Mensal - João Silva",
    sistemaValor: 1500.0,
    tipoConciliacao: "1-para-1",
    confianca: 99,
    dataConciliacao: "2024-09-16",
    usuarioConciliacao: "Maria Souza",
  },
  {
    id: 2,
    extratoData: "2024-09-14",
    extratoDescricao: "SAQUE CAIXA ELETRONICO",
    extratoValor: -500.0,
    sistemaData: "2024-09-14",
    sistemaDescricao: "Despesa Administrativa - Material Escritório; Despesa Operacional - Combustível",
    sistemaValor: -500.0,
    tipoConciliacao: "1-para-N",
    confianca: 85,
    dataConciliacao: "2024-09-16",
    usuarioConciliacao: "João Silva",
  },
]

export function HistoricoAuditoria() {
  const [mesSelecionado, setMesSelecionado] = useState("all")
  const [bancoSelecionado, setBancoSelecionado] = useState("all")
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("all")
  const [conciliacaoSelecionada, setConciliacaoSelecionada] = useState<number | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleExportarPDF = (conciliacao: any) => {
    console.log(`[v0] Exportando PDF para ${conciliacao.mesNome} - ${conciliacao.banco}`)
    // Mock: simular download
    alert(`PDF da conciliação de ${conciliacao.mesNome} - ${conciliacao.banco} seria baixado aqui`)
  }

  const conciliacoesFiltradas = mockConciliacoesFechadas.filter((conciliacao) => {
    return (
      (mesSelecionado === "all" || conciliacao.mes === mesSelecionado) &&
      (bancoSelecionado === "all" || conciliacao.banco === bancoSelecionado) &&
      (usuarioSelecionado === "all" || conciliacao.finalizadoPor === usuarioSelecionado)
    )
  })

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Mês/Ano</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  <SelectItem value="2024-09">Setembro 2024</SelectItem>
                  <SelectItem value="2024-08">Agosto 2024</SelectItem>
                  <SelectItem value="2024-07">Julho 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Banco</label>
              <Select value={bancoSelecionado} onValueChange={setBancoSelecionado}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os bancos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os bancos</SelectItem>
                  <SelectItem value="Banco do Brasil">Banco do Brasil</SelectItem>
                  <SelectItem value="Caixa Econômica">Caixa Econômica</SelectItem>
                  <SelectItem value="Itaú">Itaú</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Usuário</label>
              <Select value={usuarioSelecionado} onValueChange={setUsuarioSelecionado}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os usuários" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os usuários</SelectItem>
                  <SelectItem value="João Silva">João Silva</SelectItem>
                  <SelectItem value="Maria Souza">Maria Souza</SelectItem>
                  <SelectItem value="Carlos Santos">Carlos Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setMesSelecionado("all")
                  setBancoSelecionado("all")
                  setUsuarioSelecionado("all")
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Conciliações Fechadas */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileText className="h-5 w-5 text-purple-600" />
            Conciliações Mensais Finalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conciliacoesFiltradas.map((conciliacao) => (
              <Card key={conciliacao.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Conciliação de {conciliacao.mesNome} - {conciliacao.banco}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Finalizada por {conciliacao.finalizadoPor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(conciliacao.dataFinalizacao)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {conciliacao.totalMovimentos} movimentos
                          </Badge>
                          <span className="font-medium text-slate-800">{formatCurrency(conciliacao.valorTotal)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setConciliacaoSelecionada(conciliacao.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Auditoria - {conciliacao.mesNome} - {conciliacao.banco}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Card className="bg-slate-50">
                              <CardContent className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-slate-600">Período:</span>
                                    <p className="font-medium">{conciliacao.mesNome}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Conta:</span>
                                    <p className="font-medium">
                                      Ag: {conciliacao.agencia} | Conta: {conciliacao.conta}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Movimentos:</span>
                                    <p className="font-medium">{conciliacao.totalMovimentos}</p>
                                  </div>
                                  <div>
                                    <span className="text-slate-600">Valor Total:</span>
                                    <p className="font-medium">{formatCurrency(conciliacao.valorTotal)}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Transação do Extrato</TableHead>
                                  <TableHead>Lançamento(s) do Sistema</TableHead>
                                  <TableHead>Detalhes da Conciliação</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {mockDetalhesAuditoria.map((detalhe) => (
                                  <TableRow key={detalhe.id}>
                                    <TableCell>
                                      <div className="space-y-1">
                                        <p className="font-medium">{detalhe.extratoDescricao}</p>
                                        <p className="text-sm text-slate-600">{formatDate(detalhe.extratoData)}</p>
                                        <p
                                          className={`font-bold ${detalhe.extratoValor > 0 ? "text-green-600" : "text-red-600"}`}
                                        >
                                          {formatCurrency(detalhe.extratoValor)}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="space-y-1">
                                        <p className="font-medium">{detalhe.sistemaDescricao}</p>
                                        <p className="text-sm text-slate-600">{formatDate(detalhe.sistemaData)}</p>
                                        <p className="font-bold text-blue-600">
                                          {formatCurrency(detalhe.sistemaValor)}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="space-y-2">
                                        <Badge variant="outline">{detalhe.tipoConciliacao}</Badge>
                                        <p className="text-sm">
                                          <span className="text-slate-600">Confiança:</span> {detalhe.confianca}%
                                        </p>
                                        <p className="text-sm">
                                          <span className="text-slate-600">Conciliado em:</span>{" "}
                                          {formatDate(detalhe.dataConciliacao)}
                                        </p>
                                        <p className="text-sm">
                                          <span className="text-slate-600">Por:</span> {detalhe.usuarioConciliacao}
                                        </p>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => handleExportarPDF(conciliacao)}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {conciliacoesFiltradas.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhuma conciliação encontrada</p>
                <p className="text-sm">Ajuste os filtros ou verifique se há conciliações finalizadas</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
