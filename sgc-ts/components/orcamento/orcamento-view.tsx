"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOrcamentario } from "./dashboard-orcamentario"
import { ContratosFontes } from "./contratos-fontes"
import { PlanejamentoTrabalho } from "./planejamento-trabalho"
import { ExecucaoPlanejado } from "./execucao-planejado"
import { RevisoesVersoes } from "./revisoes-versoes"
import { ConfiguracoesAlertas } from "./configuracoes-alertas"
import { TrendingUp, FileText, Target, BarChart3, GitBranch, Bell } from "lucide-react"

export function OrcamentoView() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="space-y-6">
      {/* Header com KPIs Globais */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Gestão Orçamentária - Centro de Controle</CardTitle>
          <p className="text-blue-700">O coração estratégico do sistema de prestação de contas</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">78.5%</div>
              <div className="text-sm text-blue-700">Execução Orçamentária Geral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-900">3</div>
              <div className="text-sm text-amber-700">Projetos em Risco</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">R$ 245k</div>
              <div className="text-sm text-emerald-700">Orçamento Disponível</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">8</div>
              <div className="text-sm text-purple-700">Contratos Ativos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por Abas - Estilo Windows UI 11 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border shadow-sm rounded-lg p-1">
          <TabsTrigger
            value="dashboard"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <TrendingUp className="h-4 w-4" />
            Dashboard Orçamentário
          </TabsTrigger>
          <TabsTrigger
            value="contratos"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <FileText className="h-4 w-4" />
            Contratos e Fontes
          </TabsTrigger>
          <TabsTrigger
            value="planejamento"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <Target className="h-4 w-4" />
            Planejamento
          </TabsTrigger>
          <TabsTrigger
            value="execucao"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <BarChart3 className="h-4 w-4" />
            Execução vs. Planejado
          </TabsTrigger>
          <TabsTrigger
            value="revisoes"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <GitBranch className="h-4 w-4" />
            Revisões e Versões
          </TabsTrigger>
          <TabsTrigger
            value="alertas"
            className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            <Bell className="h-4 w-4" />
            Alertas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <DashboardOrcamentario />
        </TabsContent>

        <TabsContent value="contratos" className="space-y-6">
          <ContratosFontes />
        </TabsContent>

        <TabsContent value="planejamento" className="space-y-6">
          <PlanejamentoTrabalho />
        </TabsContent>

        <TabsContent value="execucao" className="space-y-6">
          <ExecucaoPlanejado />
        </TabsContent>

        <TabsContent value="revisoes" className="space-y-6">
          <RevisoesVersoes />
        </TabsContent>

        <TabsContent value="alertas" className="space-y-6">
          <ConfiguracoesAlertas />
        </TabsContent>
      </Tabs>
    </div>
  )
}
