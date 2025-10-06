"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, X, Split, Plus, Sparkles, AlertCircle } from "lucide-react"

const mockExtratoItems = [
  {
    id: 1,
    data: "2024-09-15",
    descricao: "PIX RECEBIDO - DOACAO MENSAL",
    valor: 1500.0,
    tipo: "credito",
    status: "pendente",
  },
  {
    id: 2,
    data: "2024-09-14",
    descricao: "SAQUE CAIXA ELETRONICO",
    valor: -500.0,
    tipo: "debito",
    status: "pendente",
  },
  {
    id: 3,
    data: "2024-09-13",
    descricao: "TED RECEBIDA - PROJETO EDUCACAO",
    valor: 25000.0,
    tipo: "credito",
    status: "pendente",
  },
]

const mockLancamentosSistema = [
  {
    id: 1,
    data: "2024-09-15",
    descricao: "Doação Mensal - João Silva",
    valor: 1500.0,
    categoria: "Receitas",
    confianca: 99,
  },
  {
    id: 2,
    data: "2024-09-14",
    descricao: "Despesa Administrativa - Material Escritório",
    valor: 250.0,
    categoria: "Despesas",
    confianca: 45,
  },
  {
    id: 3,
    data: "2024-09-14",
    descricao: "Despesa Operacional - Combustível",
    valor: 150.0,
    categoria: "Despesas",
    confianca: 40,
  },
  {
    id: 4,
    data: "2024-09-13",
    descricao: "Receita Projeto Educação - Convênio MEC",
    valor: 25000.0,
    categoria: "Receitas",
    confianca: 95,
  },
]

export function MatchingAvancado() {
  const [selectedExtrato, setSelectedExtrato] = useState<number | null>(null)
  const [selectedLancamentos, setSelectedLancamentos] = useState<number[]>([])
  const [showDividirModal, setShowDividirModal] = useState(false)
  const [contaSelecionada, setContaSelecionada] = useState("")
  const [mesSelecionado, setMesSelecionado] = useState("2024-09")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value))
  }

  const getSugestoes = (extratoId: number) => {
    const extratoItem = mockExtratoItems.find((item) => item.id === extratoId)
    if (!extratoItem) return []

    return mockLancamentosSistema
      .filter((lancamento) => {
        const valorCompativel = Math.abs(extratoItem.valor) === Math.abs(lancamento.valor)
        const dataProxima =
          Math.abs(new Date(extratoItem.data).getTime() - new Date(lancamento.data).getTime()) <=
          2 * 24 * 60 * 60 * 1000
        return valorCompativel || dataProxima
      })
      .sort((a, b) => b.confianca - a.confianca)
  }

  const handleConciliar = (extratoId: number, lancamentoId: number) => {
    console.log(`[v0] Conciliando extrato ${extratoId} com lançamento ${lancamentoId}`)
    // Mock: remover itens das listas
    setSelectedExtrato(null)
  }

  const handleDividir = () => {
    const extratoItem = mockExtratoItems.find((item) => item.id === selectedExtrato)
    const lancamentosSelecionados = mockLancamentosSistema.filter((l) => selectedLancamentos.includes(l.id))
    const somaLancamentos = lancamentosSelecionados.reduce((acc, l) => acc + l.valor, 0)

    console.log(
      `[v0] Dividindo extrato ${extratoItem?.descricao} (${formatCurrency(extratoItem?.valor || 0)}) entre ${lancamentosSelecionados.length} lançamentos (${formatCurrency(somaLancamentos)})`,
    )
    setShowDividirModal(false)
    setSelectedLancamentos([])
    setSelectedExtrato(null)
  }

  const sugestoes = selectedExtrato ? getSugestoes(selectedExtrato) : []
  const melhorSugestao = sugestoes[0]
  const outrasOpcoes = sugestoes.slice(1)

  const somaLancamentosSelecionados = mockLancamentosSistema
    .filter((l) => selectedLancamentos.includes(l.id))
    .reduce((acc, l) => acc + l.valor, 0)

  const extratoSelecionado = mockExtratoItems.find((item) => item.id === selectedExtrato)
  const diferenca = extratoSelecionado ? Math.abs(extratoSelecionado.valor) - somaLancamentosSelecionados : 0

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Conta Bancária</label>
              <Select value={contaSelecionada} onValueChange={setContaSelecionada}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a conta bancária" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bb-1234">Banco do Brasil - Ag: 1234-5</SelectItem>
                  <SelectItem value="caixa-0987">Caixa Econômica - Ag: 0987</SelectItem>
                  <SelectItem value="itau-5678">Itaú - Ag: 5678</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Mês/Ano</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-09">Setembro 2024</SelectItem>
                  <SelectItem value="2024-08">Agosto 2024</SelectItem>
                  <SelectItem value="2024-07">Julho 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout de Duas Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna Esquerda - Extrato Bancário */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
            <CardTitle className="text-slate-800">Extrato Bancário</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-4">
              {mockExtratoItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedExtrato === item.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedExtrato(item.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{item.descricao}</p>
                      <p className="text-sm text-slate-600">{new Date(item.data).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${item.tipo === "credito" ? "text-green-600" : "text-red-600"}`}>
                        {item.tipo === "credito" ? "+" : ""}
                        {formatCurrency(item.valor)}
                      </p>
                    </div>
                  </div>
                  {selectedExtrato === item.id && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-600 font-medium">Item selecionado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coluna Direita - Lançamentos do Sistema */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-slate-800">
              Lançamentos do Sistema
              {selectedExtrato && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">{sugestoes.length} sugestão(ões)</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-4">
              {selectedExtrato ? (
                <>
                  {/* Melhor Sugestão */}
                  {melhorSugestao && (
                    <div className="p-4 rounded-lg border-2 border-green-400 bg-green-50 relative">
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-green-500 text-white">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Sugestão {melhorSugestao.confianca}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{melhorSugestao.descricao}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(melhorSugestao.data).toLocaleDateString("pt-BR")}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {melhorSugestao.categoria}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatCurrency(melhorSugestao.valor)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Outras Opções */}
                  {outrasOpcoes.map((lancamento) => (
                    <div
                      key={lancamento.id}
                      className="p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{lancamento.descricao}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {lancamento.categoria}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-600">{formatCurrency(lancamento.valor)}</p>
                          <Badge variant="secondary" className="mt-1">
                            {lancamento.confianca}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {sugestoes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                      <p>Nenhuma sugestão encontrada</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ArrowRight className="h-12 w-12 mx-auto mb-2" />
                  <p>Selecione um item do extrato para ver as sugestões</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Ações */}
      {selectedExtrato && melhorSugestao && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ação sugerida para conciliação</p>
                  <p className="text-sm opacity-90">Confiança: {melhorSugestao.confianca}%</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => handleConciliar(selectedExtrato, melhorSugestao.id)}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar
                </Button>
                <Dialog open={showDividirModal} onOpenChange={setShowDividirModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                      <Split className="h-4 w-4 mr-2" />
                      Dividir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Dividir Lançamento</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Item do Extrato */}
                      <Card className="bg-blue-50">
                        <CardContent className="p-4">
                          <p className="font-medium">Transação do Extrato:</p>
                          <p className="text-lg font-bold text-blue-600">
                            {extratoSelecionado?.descricao} - {formatCurrency(extratoSelecionado?.valor || 0)}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Lista de Lançamentos */}
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {mockLancamentosSistema.map((lancamento) => (
                          <div key={lancamento.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <Checkbox
                              checked={selectedLancamentos.includes(lancamento.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLancamentos([...selectedLancamentos, lancamento.id])
                                } else {
                                  setSelectedLancamentos(selectedLancamentos.filter((id) => id !== lancamento.id))
                                }
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{lancamento.descricao}</p>
                              <p className="text-sm text-gray-600">{lancamento.categoria}</p>
                            </div>
                            <p className="font-bold">{formatCurrency(lancamento.valor)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Resumo */}
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-gray-600">Valor do Extrato</p>
                              <p className="font-bold">{formatCurrency(extratoSelecionado?.valor || 0)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Soma Selecionada</p>
                              <p className="font-bold">{formatCurrency(somaLancamentosSelecionados)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Diferença</p>
                              <p className={`font-bold ${diferenca === 0 ? "text-green-600" : "text-red-600"}`}>
                                {formatCurrency(diferenca)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowDividirModal(false)}>
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleDividir}
                          disabled={diferenca !== 0}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Conciliar Lançamentos
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Ignorar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
