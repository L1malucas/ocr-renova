"use client"

import { useState } from "react"
import { ContratosList } from "./contratos-list"
import { ContratoForm } from "./contrato-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ContratoDto } from "@/models/contrato.model"

export function ContratosView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingContrato, setEditingContrato] = useState<ContratoDto | null>(null)

  const handleCreateNew = () => {
    setEditingContrato(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (contrato: ContratoDto) => {
    setEditingContrato(contrato)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingContrato(null)
  }

  return (
    <div className="space-y-6">
      <ContratosList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingContrato ? "Editar Contrato" : "Criar Novo Contrato"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <ContratoForm
              contratoToEdit={editingContrato}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
