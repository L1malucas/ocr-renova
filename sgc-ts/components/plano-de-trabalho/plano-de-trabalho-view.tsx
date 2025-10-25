"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useGetPlanoTrabalhoByContratoId } from "@/hooks/use-plano-de-trabalho"
import { PlanosTrabalhoList } from "./planos-trabalho-list"
import { PlanoTrabalhoForm } from "./plano-trabalho-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { PlanoTrabalhoDto } from "@/models/plano-trabalho.model"

export function PlanoDeTrabalhoView() {
  const searchParams = useSearchParams()
  const contratoId = searchParams.get("contratoId")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingPlanoTrabalho, setEditingPlanoTrabalho] = useState<PlanoTrabalhoDto | null>(null)

  const { data: planoTrabalhoData, isLoading, isError, error } = useGetPlanoTrabalhoByContratoId(contratoId)

  const handleCreateNew = () => {
    setEditingPlanoTrabalho(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (planoTrabalho: PlanoTrabalhoDto) => {
    setEditingPlanoTrabalho(planoTrabalho)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingPlanoTrabalho(null)
  }

  if (!contratoId) {
    return <div>Selecione um contrato para ver o plano de trabalho.</div>
  }

  if (isLoading) {
    return <div>Carregando plano de trabalho...</div>
  }

  if (isError || !planoTrabalhoData?.data) {
    return <div className="text-red-600">Erro ao carregar plano de trabalho: {error instanceof Error ? error.message : "Plano de trabalho não encontrado ou erro na API."}</div>
  }

  const { data: planoTrabalho } = planoTrabalhoData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Plano de Trabalho</h1>
          <p className="text-muted-foreground">Metas, etapas e indicadores do projeto.</p>
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Plano de Trabalho
        </Button>
      </div>

      <PlanosTrabalhoList 
        contratoId={contratoId}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
      />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingPlanoTrabalho ? "Editar Plano de Trabalho" : "Criar Novo Plano de Trabalho"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <PlanoTrabalhoForm
              planoTrabalhoToEdit={editingPlanoTrabalho}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
