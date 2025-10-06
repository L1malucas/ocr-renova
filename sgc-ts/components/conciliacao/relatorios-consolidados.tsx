"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Calendar, Building2, CheckCircle } from "lucide-react"

const mockRelatoriosDisponiveis = [
  {
    id: 1,
    mes: "2024-09",
    mesNome: "Setembro 2024",
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "67890-1",
    dataFechamento: "2024-10-02",
    totalMovimentos: 150,
    valorTotal: 125430.5,
    status: "Disponível",
  },
  {
    id: 2,
    mes: "2024-08",
    mesNome: "Agosto 2024",
    banco: "Caixa Econômica",
    agencia: "0987",
    conta: "54321-0",
    dataFechamento: "2024-09-03",
    totalMovimentos: 128,
    valorTotal: 89750.25,
    status: "Disponível",
  },
  {
    id: 3,
    mes: "2024-07",
    mesNome: "Julho 2024",
    banco: "Itaú",
    agencia: "5678",
    conta: "12345-9",
    dataFechamento: "2024-08-01",
    totalMovimentos: 95,
    valorTotal: 45230.75,
    status: "Disponível",
  },
]

export function RelatoriosConsolidados() {
  const [mesSelecionado, setMesSelecionado] = useState("all")
  const [bancoSelecionado, setBancoSelecionado] = useState("all")
  const [gerandoRelatorio, setGerandoRelatorio] = useState<number | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleGerarRelatorio = (relatorio: any) => {
    setGerandoRelatorio(relatorio.id)
    console.log(`[v0] Gerando relatório PDF para ${relatorio.mesNome} - ${relatorio.banco}`)

    // Simular geração do PDF
    setTimeout(() => {
      setGerandoRelatorio(null)
      // Simular download do arquivo
      const link = document.createElement("a")
      link.href = "#"
      link.download = `Conciliacao_${relatorio.mesNome.replace(" ", "_")}_${relatorio.banco.replace(" ", "_")}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      alert(`Relatório de ${relatorio.mesNome} - ${relatorio.banco} foi gerado e baixado com sucesso!`)
    }, 2000)
  }

  const handleVisualizarRelatorio = (relatorio: any) => {
    console.log(`[v0] Visualizando relatório para ${relatorio.mesNome} - ${relatorio.banco}`)
    alert(`Abrindo visualização do relatório de ${relatorio.mesNome} - ${relatorio.banco}`)
  }

  const relatoriosFiltrados = mockRelatoriosDisponiveis.filter((relatorio) => {
    return (
      (mesSelecionado === "all" || relatorio.mes === mesSelecionado) &&
      (bancoSelecionado === "all" || relatorio.banco === bancoSelecionado)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Relatórios Consolidados</h2>
        <p className="text-slate-600 mt-1">Gere e baixe relatórios formais de conciliação bancária</p>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setMesSelecionado("all")
                  setBancoSelecionado("all")
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre o Relatório */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Sobre os Relatórios Consolidados</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  • <strong>Capa Profissional:</strong> Logo da organização, título, período de referência
                </p>
                <p>
                  • <strong>Resumo Executivo:</strong> Saldos inicial/final, total de entradas/saídas, resultado da
                  conciliação
                </p>
                <p>
                  • <strong>Detalhamento:</strong> Tabela completa com matching entre extrato e sistema
                </p>
                <p>
                  • <strong>Transações Ignoradas:</strong> Lista com justificativas para transparência
                </p>
                <p>
                  • <strong>Termo de Fechamento:</strong> Espaço para assinaturas do responsável e aprovador
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileText className="h-5 w-5 text-emerald-600" />
            Relatórios Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatoriosFiltrados.map((relatorio) => (
              <Card key={relatorio.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Relatório de Conciliação - {relatorio.mesNome}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <span>{relatorio.banco}</span>
                          <span>
                            Ag: {relatorio.agencia} | Conta: {relatorio.conta}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Fechado em {formatDate(relatorio.dataFechamento)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {relatorio.totalMovimentos} movimentos
                          </Badge>
                          <span className="font-medium text-slate-800">{formatCurrency(relatorio.valorTotal)}</span>
                          <Badge className="bg-emerald-100 text-emerald-800">{relatorio.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleVisualizarRelatorio(relatorio)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleGerarRelatorio(relatorio)}
                        disabled={gerandoRelatorio === relatorio.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {gerandoRelatorio === relatorio.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Gerando...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Gerar PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {relatoriosFiltrados.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhum relatório disponível</p>
                <p className="text-sm">
                  {mesSelecionado !== "all" || bancoSelecionado !== "all"
                    ? "Ajuste os filtros para ver outros relatórios"
                    : "Finalize uma conciliação mensal para gerar relatórios"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Exemplo de Estrutura do Relatório */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Estrutura do Relatório PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-800 mb-2">1. Capa</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Logo da organização</li>
                <li>• Título do relatório</li>
                <li>• Período de referência</li>
                <li>• Dados da conta bancária</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-800 mb-2">2. Resumo Executivo</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Saldo inicial/final</li>
                <li>• Total de entradas/saídas</li>
                <li>• Nº de transações</li>
                <li>• Resultado da conciliação</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-800 mb-2">3. Detalhamento</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Transações do extrato</li>
                <li>• Lançamentos do sistema</li>
                <li>• Tipo de conciliação</li>
                <li>• Data e responsável</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-medium text-slate-800 mb-2">4. Assinaturas</div>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Termo de fechamento</li>
                <li>• Analista financeiro</li>
                <li>• Diretor financeiro</li>
                <li>• Data de aprovação</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
