"use client"

import { useState } from "react"
import { DespesasList } from "./despesas-list"
import { DespesaFormAvancado } from "./despesa-form-avancado"
import { CaixaEntradaAcoes } from "./caixa-entrada-acoes"
import { AgendamentoPagamentos } from "./agendamento-pagamentos"
import { FornecedoresCategorias } from "./fornecedores-categorias"
import { KPIsDashboard } from "./kpis-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { DespesaDto } from "@/models/despesa.model"

export function DespesasView() {
  const [activeTab, setActiveTab] = useState("minhas-despesas")
  const [activeFilter, setActiveFilter] = useState("todos")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingDespesa, setEditingDespesa] = useState<DespesaDto | null>(null)

  const handleCreateNew = () => {
    setEditingDespesa(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (despesa: DespesaDto) => {
    setEditingDespesa(despesa)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingDespesa(null)
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

  return (
    <div className="space-y-6">
      <KPIsDashboard onFilterClick={handleFilterClick} activeFilter={activeFilter} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="minhas-despesas">Minhas Despesas</TabsTrigger>
          <TabsTrigger value="caixa-entrada">Caixa de Entrada</TabsTrigger>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
        </TabsList>

        <TabsContent value="minhas-despesas" className="mt-6">
          <DespesasList onCreateNew={handleCreateNew} onEdit={handleEdit} />
        </TabsContent>

        <TabsContent value="caixa-entrada" className="mt-6">
          <CaixaEntradaAcoes />
        </TabsContent>

        <TabsContent value="visao-geral" className="mt-6">
          <DespesasList onCreateNew={handleCreateNew} onEdit={handleEdit} showAllDespesas={true} />
        </TabsContent>

        <TabsContent value="agendamento" className="mt-6">
          <AgendamentoPagamentos />
        </TabsContent>
      </Tabs>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingDespesa ? "Editar Despesa" : "Criar Nova Despesa"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <DespesaFormAvancado
              despesaToEdit={editingDespesa}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
