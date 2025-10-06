import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useConciliacao } from "@/hooks/use-conciliacao"
import {
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Lock,
  Download,
  Eye,
  Bell,
  AlertTriangle,
} from "lucide-react"
import { VisaoGeral } from "./visao-geral"
import { ExtratoImport } from "./extrato-import"
import { MatchingAvancado } from "./matching-avancado"
import { HistoricoAuditoria } from "./historico-auditoria"
import { RegrasAutomacao } from "./regras-automacao"
import { FechamentoMensal } from "./fechamento-mensal"
import { RelatoriosConsolidados } from "./relatorios-consolidados"

export function ConciliacaoView() {
  const { conciliacoes, movimentosBancarios, movimentosFinanceiros, loading } = useConciliacao()

  const stats = {
    totalLancamentos: 150,
    movimentosConciliados: 120,
    movimentosPendentes: 30,
    valorPendente: 15230.5,
  }

  const alertasOrcamentarios = [
    {
      id: 1,
      message: "Divergências na conciliação podem impactar relatório orçamentário",
      tipo: "warning",
      impacto: "30 movimentos pendentes afetam fechamento mensal",
      acao: "Priorizar conciliação",
      valor: "R$ 15.230,50",
    },
    {
      id: 2,
      message: "Prazo para fechamento mensal em 3 dias",
      tipo: "critical",
      impacto: "Prestação de contas do Contrato BNDES pode atrasar",
      acao: "Acelerar processo",
      prazo: "3 dias restantes",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const progressoPercentual = (stats.movimentosConciliados / stats.totalLancamentos) * 100

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Conciliação Bancária</h1>
        <p className="text-slate-600 mt-2">Sistema completo de conciliação financeira mensal</p>
      </div>

      {/* Alertas Orçamentários para Conciliação */}
      {alertasOrcamentarios.length > 0 && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Bell className="h-5 w-5" />
                Alertas Orçamentários - Impacto na Conciliação
              </CardTitle>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Orçamento
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasOrcamentarios.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-3 border-l-4 rounded-r ${
                    alerta.tipo === "critical" ? "border-red-500 bg-red-50" : "border-amber-500 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle
                          className={`h-4 w-4 ${alerta.tipo === "critical" ? "text-red-600" : "text-amber-600"}`}
                        />
                        <p className="font-medium text-sm">{alerta.message}</p>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{alerta.impacto}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {alerta.acao}
                        </Badge>
                        {alerta.valor && <span>Valor Pendente: {alerta.valor}</span>}
                        {alerta.prazo && <span className="text-red-600 font-medium">{alerta.prazo}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Painel de KPIs - Fixo no Topo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total de Lançamentos</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalLancamentos}</p>
                <p className="text-xs text-blue-600 mt-1">Setembro 2024</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Movimentos Conciliados</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-900">{stats.movimentosConciliados}</p>
                  <Badge className="bg-green-200 text-green-800 text-xs">{Math.round(progressoPercentual)}%</Badge>
                </div>
                <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressoPercentual}%` }}
                  ></div>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Movimentos Pendentes</p>
                <p className="text-2xl font-bold text-orange-900">{stats.movimentosPendentes}</p>
                <p className="text-xs text-orange-600 mt-1">Requer atenção</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Valor Pendente</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(stats.valorPendente)}</p>
                <p className="text-xs text-red-600 mt-1">Impacto financeiro</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navegação de Sub-Módulos */}
      <Tabs defaultValue="visao-geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger
            value="visao-geral"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger
            value="importar"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Importar</span>
          </TabsTrigger>
          <TabsTrigger
            value="matching"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Matching</span>
          </TabsTrigger>
          <TabsTrigger
            value="historico"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Histórico</span>
          </TabsTrigger>
          <TabsTrigger
            value="regras"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Regras</span>
          </TabsTrigger>
          <TabsTrigger
            value="fechamento"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Fechamento</span>
          </TabsTrigger>
          <TabsTrigger
            value="relatorios"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Relatórios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral">
          <VisaoGeral />
        </TabsContent>

        <TabsContent value="importar">
          <ExtratoImport />
        </TabsContent>

        <TabsContent value="matching">
          <MatchingAvancado />
        </TabsContent>

        <TabsContent value="historico">
          <HistoricoAuditoria />
        </TabsContent>

        <TabsContent value="regras">
          <RegrasAutomacao />
        </TabsContent>

        <TabsContent value="fechamento">
          <FechamentoMensal />
        </TabsContent>

        <TabsContent value="relatorios">
          <RelatoriosConsolidados />
        </TabsContent>
      </Tabs>
    </div>
  )
}
