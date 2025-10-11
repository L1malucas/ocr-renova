"use client"

import { useState } from "react"
import { ReceitasList } from "./receitas-list"
import { ReceitaForm } from "./receita-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ReceitaDto } from "@/models/receita.model"

export function ReceitasView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingReceita, setEditingReceita] = useState<ReceitaDto | null>(null)

  const handleCreateNew = () => {
    setEditingReceita(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (receita: ReceitaDto) => {
    setEditingReceita(receita)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingReceita(null)
  }

  return (
    <div className="space-y-6">
      <ReceitasList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingReceita ? "Editar Receita" : "Criar Nova Receita"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <ReceitaForm
              receitaToEdit={editingReceita}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
