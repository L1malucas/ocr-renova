"use client"

import { useState } from "react"
import { DespesasList } from "./despesas-list"
import { DespesaFormAvancado } from "./despesa-form-avancado"
import { CaixaEntradaAcoes } from "./caixa-entrada-acoes"
import { AgendamentoPagamentos } from "./agendamento-pagamentos"
import { FornecedoresCategorias } from "./fornecedores-categorias"
import { KPIsDashboard } from "./kpis-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DespesasView() {
  const [currentView, setCurrentView] = useState<"list" | "form">("list")
  const [activeTab, setActiveTab] = useState("minhas-despesas")
  const [activeFilter, setActiveFilter] = useState("todos")

  const handleCreateNew = () => {
    setCurrentView("form")
  }

  const handleFormCancel = () => {
    setCurrentView("list")
  }

  const handleFormSuccess = () => {
    setCurrentView("list")
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "aprovacao") {
      setActiveTab("caixa-entrada")
    } else if (filter === "aprovadas") {
      setActiveTab("agendamento")
    } else {
      setActiveTab("minhas-despesas")
    }
  }

  if (currentView === "form") {
    return <DespesaFormAvancado onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
  }

  return (
    <div className="space-y-6">
      <KPIsDashboard onFilterClick={handleFilterClick} activeFilter={activeFilter} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="minhas-despesas">Minhas Despesas</TabsTrigger>
          <TabsTrigger value="caixa-entrada">Caixa de Entrada</TabsTrigger>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
        </TabsList>

        <TabsContent value="minhas-despesas" className="mt-6">
          <DespesasList onCreateNew={handleCreateNew} />
        </TabsContent>

        <TabsContent value="caixa-entrada" className="mt-6">
          <CaixaEntradaAcoes />
        </TabsContent>

        <TabsContent value="visao-geral" className="mt-6">
          <DespesasList onCreateNew={handleCreateNew} showAllDespesas={true} />
        </TabsContent>

        <TabsContent value="agendamento" className="mt-6">
          <AgendamentoPagamentos />
        </TabsContent>

        <TabsContent value="fornecedores" className="mt-6">
          <FornecedoresCategorias />
        </TabsContent>
      </Tabs>
    </div>
  )
}
