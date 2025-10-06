"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, Lock, Send, Calendar, FileCheck } from "lucide-react"

const mockChecklist = [
  {
    id: 1,
    item: "Todos os extratos do período foram importados",
    status: "ok",
    detalhes: "3 contas bancárias com extratos importados",
  },
  {
    id: 2,
    item: "Nenhum movimento do extrato está pendente de conciliação",
    status: "ok",
    detalhes: "150 movimentos conciliados de 150 importados",
  },
  {
    id: 3,
    item: "Saldo final do extrato confere com o saldo do sistema",
    status: "erro",
    detalhes: "Diferença de R$ 5,50 na conta Banco do Brasil",
  },
  {
    id: 4,
    item: "Nenhum lançamento do sistema no período está pendente",
    status: "ok",
    detalhes: "Todos os lançamentos foram conciliados ou justificados",
  },
  {
    id: 5,
    item: "Todas as regras de automação foram executadas",
    status: "aviso",
    detalhes: "2 regras pausadas - verificar se é intencional",
  },
]

const mockResumoMensal = {
  mes: "Setembro 2024",
  periodo: "01/09/2024 a 30/09/2024",
  contas: [
    {
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "67890-1",
      saldoInicial: 98750.25,
      entradas: 45230.75,
      saidas: -18550.5,
      saldoFinal: 125430.5,
      saldoSistema: 125425.0,
      diferenca: 5.5,
    },
    {
      banco: "Caixa Econômica",
      agencia: "0987",
      conta: "54321-0",
      saldoInicial: 67890.0,
      entradas: 32150.25,
      saidas: -10290.0,
      saldoFinal: 89750.25,
      saldoSistema: 89750.25,
      diferenca: 0,
    },
  ],
}

export function FechamentoMensal() {
  const [mesSelecionado, setMesSelecionado] = useState("2024-09")
  const [showConfirmacao, setShowConfirmacao] = useState(false)
  const [enviandoRelatorio, setEnviandoRelatorio] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "erro":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "aviso":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-green-700 bg-green-50 border-green-200"
      case "erro":
        return "text-red-700 bg-red-50 border-red-200"
      case "aviso":
        return "text-yellow-700 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-700 bg-gray-50 border-gray-200"
    }
  }

  const itensOk = mockChecklist.filter((item) => item.status === "ok").length
  const progressoPercentual = (itensOk / mockChecklist.length) * 100
  const podeFechar = mockChecklist.every((item) => item.status === "ok")

  const handleFinalizarConciliacao = () => {
    setEnviandoRelatorio(true)
    console.log(`[v0] Finalizando conciliação de ${mockResumoMensal.mes}`)

    // Simular processo de envio
    setTimeout(() => {
      setEnviandoRelatorio(false)
      setShowConfirmacao(false)
      alert(`Conciliação de ${mockResumoMensal.mes} finalizada e enviada com sucesso!`)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Seletor de Mês */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Mês para Fechamento</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger className="bg-white max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-09">Setembro 2024</SelectItem>
                  <SelectItem value="2024-08">Agosto 2024</SelectItem>
                  <SelectItem value="2024-07">Julho 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Progresso do Fechamento</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progressoPercentual} className="w-32" />
                <span className="text-sm font-medium">{Math.round(progressoPercentual)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Mês */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileCheck className="h-5 w-5 text-blue-600" />
            Resumo de {mockResumoMensal.mes}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockResumoMensal.contas.map((conta, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">{conta.banco}</h4>
                      <p className="text-sm text-slate-600">
                        Ag: {conta.agencia} | Conta: {conta.conta}
                      </p>
                    </div>
                    {conta.diferenca === 0 ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Conferido
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Diferença: {formatCurrency(conta.diferenca)}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Saldo Inicial:</span>
                      <p className="font-medium">{formatCurrency(conta.saldoInicial)}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Entradas:</span>
                      <p className="font-medium text-green-600">+{formatCurrency(conta.entradas)}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Saídas:</span>
                      <p className="font-medium text-red-600">{formatCurrency(conta.saidas)}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Saldo Extrato:</span>
                      <p className="font-medium">{formatCurrency(conta.saldoFinal)}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Saldo Sistema:</span>
                      <p className="font-medium">{formatCurrency(conta.saldoSistema)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checklist de Validação */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Checklist de Fechamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockChecklist.map((item) => (
              <div key={item.id} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(item.status)}
                  <div className="flex-1">
                    <p className="font-medium">{item.item}</p>
                    <p className="text-sm mt-1 opacity-80">{item.detalhes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ação de Fechamento */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {podeFechar ? (
              <>
                <div className="p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-800">Pronto para Fechamento</p>
                  <p className="text-sm text-green-700">Todos os itens do checklist foram validados</p>
                </div>
                <Dialog open={showConfirmacao} onOpenChange={setShowConfirmacao}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <Lock className="h-5 w-5 mr-2" />
                      Finalizar e Enviar Conciliação de {mockResumoMensal.mes}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar Fechamento da Conciliação</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">Atenção</p>
                            <p className="text-sm text-yellow-700">
                              Após a confirmação, a conciliação de {mockResumoMensal.mes} será "trancada" e se tornará
                              somente leitura. Esta ação não pode ser desfeita.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">O que acontecerá:</p>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• A conciliação será marcada como "Fechada"</li>
                          <li>• Um relatório PDF será gerado automaticamente</li>
                          <li>• Notificação por e-mail será enviada aos gestores</li>
                          <li>• Os dados ficarão disponíveis apenas para consulta</li>
                        </ul>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowConfirmacao(false)}>
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleFinalizarConciliacao}
                          disabled={enviandoRelatorio}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {enviandoRelatorio ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processando...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Confirmar Fechamento
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="p-4 bg-red-50 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="font-medium text-red-800">Não é Possível Fechar</p>
                <p className="text-sm text-red-700">
                  Corrija os itens pendentes no checklist antes de finalizar a conciliação
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
