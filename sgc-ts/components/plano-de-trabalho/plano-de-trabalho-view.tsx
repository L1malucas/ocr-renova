"use client"

import { useState } from "react"
import { useGetPlanoTrabalhoByContratoId } from "@/hooks/use-plano-de-trabalho"
import { ItensTrabalhoList } from "./itens-trabalho-list"
import { ItemTrabalhoForm } from "./item-trabalho-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ItemPlanoTrabalhoDto } from "@/models/item-plano-trabalho.model"

export function PlanoDeTrabalhoView() {
  // Simula a obtenção do contratoId
  const [contratoId] = useState("contrato-id-placeholder")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ItemPlanoTrabalhoDto | null>(null)

  const { data: planoTrabalhoData, isLoading, isError, error } = useGetPlanoTrabalhoByContratoId(contratoId)

  const handleCreateNew = () => {
    setEditingItem(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (item: ItemPlanoTrabalhoDto) => {
    setEditingItem(item)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingItem(null)
  }

  if (isLoading) {
    return <div>Carregando plano de trabalho...</div>
  }

  if (isError || !planoTrabalhoData?.data) {
    return <div className="text-red-600">Erro ao carregar plano de trabalho: {error instanceof Error ? error.message : "Erro desconhecido"}</div>
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
          Novo Item
        </Button>
      </div>

      <ItensTrabalhoList 
        itens={planoTrabalho.itens || []} 
        onEdit={handleEdit} 
      />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingItem ? "Editar Item" : "Criar Novo Item do Plano"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <ItemTrabalhoForm
              planoTrabalhoId={planoTrabalho.id}
              itemToEdit={editingItem}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
